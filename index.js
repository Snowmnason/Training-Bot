const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ChannelType } = require('discord.js');
const { token } = require('./config.json');
const { getdb } = require("./events/ready");
//this determines the permissions the bot has
const client = new Client({
    intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMembers,
]})
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

//////////////////////////////////////////
//////////////////////////////////////////
client.commands = new Collection();
client.login(token)
//Find all commands
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
//find all events
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


//on join
client.on("guildCreate", async guild => {
	//Create Channel
	const ch = guild.channels.cache.find(c => c.name === 'transcript');
	if(!ch){
		let newChannel = await guild.channels.create({
			name: "transcript",
			type: ChannelType.GuildText,
		})
		await newChannel.send("Hello Thank you for helping me learn more");
		await newChannel.send("To Opt in please do /accept and fill in the information! I do not care what you say just how you speak, nothing will be attached to your name!");
		await newChannel.send("To see what is saved, ask an admin to do /subtitles to show what I converted to text")
		await newChannel.send("I would recommend muting that channel (right-click the channel) or having a server Mod making the channel private so you don't get overloaded with notifications(make sure the admin gives permissions for the bot to message in the channel");
		console.log(`The bot has been added to ${guild}`);
	}
	//Create and assign roles
	let role = guild.roles.cache.find(x => x.name === 'accepted');
	if (!role) {
		guild.roles.create({ name: 'accepted' }).then(role =>{
			// Fetch all members
			guild.members.fetch().then(members => {
				// For each member
				members.each(member => {
					let user = member.id;
					checkUserExists(user).then(foundMatch => {
						console.log('Found match: ', foundMatch);
						if(foundMatch){
							member.roles.add(role);
							//console.log(`${member.id}`);//look through sql server
						}
					});
				});
			}).catch(console.error);
		})
	}
})
client.on("guildMemberAdd", member=> {
		let user = member.id;
		checkUserExists(user).then(foundMatch => {
			//console.log('Found match: ', foundMatch);
			if(foundMatch){
				role = member.guild.roles.cache.find(x => x.name === 'accepted')
				member.roles.add(role);
				//console.log(`${member.id}`);//look through sql server
			}
		});
})

async function checkUserExists(user) {
	dbConnection = getdb();
	return new Promise((resolve, reject) => {
		let sqlSelect = 'SELECT * FROM users WHERE id = ? and opt = ?';
		let valueSelect = [user, true]
		dbConnection.query(sqlSelect, valueSelect, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results.length > 0);
			}
		});
	});
}

const { getChan } = require ('./commands/Important/subtitles')
client.on('voiceStateUpdate', (oldState, newState) => {
	// Disconnection
	if(oldState.channelId && !newState.channelId){
	  //console.log('Disconnection Update');
	  //Bot was disconnected?
	if(newState.id === client.user.id){
		const ch = getChan()
		if (ch) {
			ch.delete();
		}
		//console.log(`${client.user.username} was disconnected!`);
		return
		}
	}
});

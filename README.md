# Training Bot
## Overview
Welcome to Training Bot, a sophisticated AI Discord bot designed to train a Natural Language Processor (NLP) for generating fluent dialogues for scripts and books. Training Bot listens to conversations on a Discord server, analyzes how people interact, and collects data to improve the coherence and quality of generated text. To ensure user privacy and compliance, users must consent to being listened to by answering demographic questions.

## Features
* Detailed Demographics: Collects detailed demographic information to enhance the accuracy and diversity of the language model.
* Closed Caption Simulation: Allows users to write and simulate closed captions, providing a comprehensive dataset for training the NLP.
## Installation
There is no traditional installation required for Training Bot. It's a Discord bot that can be easily added to your server. Follow these simple steps to 

1. Invite the Bot: with a link that has not been generated yet.
1. Activate the Bot: Use the /join command to activate the bot in your server.
Once added, Training Bot will run autonomously, collecting and analyzing conversations based on user consent.

## Usage
Users interact with Training Bot through intuitive slash commands:

* /join: Activates the bot in the current server.
* /accept: Prompts users to provide demographic information, ensuring personalized and accurate data collection.
* /caption: Allows users to write and simulate closed captions, contributing to the dataset.
## Code Structure
The bot is elegantly crafted in JavaScript, ensuring robust performance and seamless integration with Discord. Here's an overview of the project's structure:

* src: Contains all JavaScript source files.
> * bot.js: The main entry point of the bot.
> * commands/: Directory containing command handlers.
> * utils/: Utility functions and helpers.
* data: Directory for storing collected demographic and interaction data.
Key Files:

* bot.js: Initializes the bot and handles core functionality.
* commands/join.js: Handles the /join command logic.
* commands/demographics.js: Manages the demographic data collection process.
* commands/caption.js: Facilitates the closed caption simulation feature.
## Contributing
Currently, we are not accepting contributions. However, we appreciate your interest and encourage you to stay tuned for future updates where we might open the project for community contributions.

Known Issues
* Privacy Concerns: Ensuring user privacy and obtaining consent are paramount. Users must explicitly agree to be listened to by the bot.
* Inconsistent Recording: There might be inconsistencies in recording conversations, affecting data accuracy.
## Future Plans
We have exciting plans for the future development of Training Bot:

* Distribution: Wider distribution of the bot to gather diverse conversational data.
* Sophisticated Speech-to-Text Algorithm: Implementing a more advanced speech-to-text algorithm to improve data quality and NLP training.
Stay tuned for updates and new features!

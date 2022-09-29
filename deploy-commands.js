const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

const clientId = process.env['clientId']
const token = process.env['token']
//const { clientId, guildId, token } = require('./config.json');

const commands = []

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

// ---TO DELETE COMMANDS---
// Go to bot settings in server and copy id of the command
// uncomment this code and run 'node deploy-commands.js'

// for guild-based commands
/* rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error); */

// for global commands
/* rest.delete(Routes.applicationCommand(clientId, '1010335158513172571'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error); */
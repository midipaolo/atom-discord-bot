const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	execute(interaction) {
		if (!interaction.isChatInputCommand() && !interaction.isButton() && !interaction.isSelectMenu()) return;

		const buttonCommand = interaction.client.buttonCommands.get(interaction.customId);
		const menuCommand = interaction.client.menuCommands.get(interaction.customId);
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command && !buttonCommand && !menuCommand) return;

		if (interaction.isChatInputCommand()) {
			try {
				console.log('executing slash command...');
				command.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
		};

		if (interaction.isButton()) {
			try {
				console.log('executing button command...');
				buttonCommand.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: 'There was an error while executing this button\'s command!',
					ephemeral: true,
				});
			}
		};

		if (interaction.isSelectMenu()) {
			try {
				console.log('executing menu command...');
				menuCommand.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: 'There was an error while executing this menu\'s command!',
					ephemeral: true,
				});
			}
		};

		console.log(
			`${interaction.user.tag} in #${interaction.channel.name} triggered the interaction ${interaction.customId}`,
		);
	},
};

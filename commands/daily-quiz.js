const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily-quiz')
		.setDescription('Start a quiz!'),

	async execute(interaction) {

		const filter = m => m.content.includes('discord');
		const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

		collector.on('collect', m => {
			console.log(`Collected ${m.content}`);
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);
		});

		await interaction.reply(
			{ content: 'I think you should,', ephemeral: true },
		);
	},
};
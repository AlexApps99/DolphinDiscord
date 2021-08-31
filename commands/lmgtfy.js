const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `
1. Go to [www.google.com](https://www.google.com/)
2. Type in your search query
3. Press the "Search" button
`;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lmgtfy')
		.setDescription('Let me Google that for you')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('Search query')
				.setRequired(true)
		),
	async execute(interaction) {
		// TODO LMGTFY has a sketchy search engine now
		return interaction.reply({ embeds: [new MessageEmbed().setTitle('How to use Google:').setDescription(text + `<https://www.google.com/search?q=${encodeURIComponent(interaction.options.getString('query'))}>`)] });
	},
};

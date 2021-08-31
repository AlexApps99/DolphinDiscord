const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('google')
		.setDescription('Google search')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('Search query')
				.setRequired(true)
		),
	async execute(interaction) {
		return interaction.reply({ embeds: [new MessageEmbed().setTitle('Google:').setDescription(`<https://www.google.com/search?q=${encodeURIComponent(interaction.options.getString('query'))}>`)] });
	},
};

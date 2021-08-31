const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `https://github.com/AlexApps99/DolphinDiscord`;

const embed = new MessageEmbed()
	.setTitle('Source code:')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('source')
		.setDescription('Link to Dolphin Discord\'s source code'),
	async execute(interaction) {
		return interaction.reply({ embeds: [embed] });
	},
};

const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `Project Slippi aims to improve and update Super Smash Bros. Melee's online functionality. A Dolphin fork is available for improved Netplay. 
Discord server and download links:
https://discord.gg/XpHZex6
https://github.com/project-slippi/project-slippi`

const embed = new MessageEmbed()
	.setTitle('Slippi:')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slippi')
		.setDescription('Links to the Github page and Discord server for Project Slippi'),
	async execute(interaction) {
		return interaction.reply({ embeds: [embed] });
	},
};
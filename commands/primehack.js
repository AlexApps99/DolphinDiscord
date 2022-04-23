const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `The Primehack fork implements traditional FPS-style controls for the *Metroid Prime* series, along with recommended settings profiles, bugfixes and improvements. It's compatible with most versions of Metroid Prime 1-3 and Metroid Prime Trilogy.
Discord server and download links:
https://discord.gg/hYp5Naz
https://github.com/shiiion/dolphin`

const embed = new MessageEmbed()
	.setTitle('Primehack:')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('primehack')
		.setDescription('Links to the Github page and Discord server for the Primehack fork of Dolphin'),
	async execute(interaction) {
		return interaction.reply({ embeds: [embed] });
	},
};
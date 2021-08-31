const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `To properly help you, we first need some more info.
- What version of dolphin are you running? (latest dev build is recommended to most)
- What are your system specs? (CPU, GPU, RAM, Windows version)`;

const embed = new MessageEmbed()
	.setTitle('How to explain your question:')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('explain')
		.setDescription('Explain more about your hardware and Dolphin message.'),
	async execute(interaction) {
		return interaction.reply({ embeds: [embed] });
	},
};

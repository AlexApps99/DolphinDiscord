const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `Easily and legally acquiring a dump of the GBA BIOS can be done following the guide here: https://glazedbelmont.github.io/gbabiosdump/`;

const embed = new MessageEmbed()
	.setTitle('GBA BIOS dump guide info:')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gbabios')
		.setDescription('Walks people through getting the BIOS legally'),
	async execute(interaction) {
		return interaction.reply({ embeds: [embed] });
	},
};

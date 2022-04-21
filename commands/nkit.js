const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `Nkit is a compressed file format for GC & Wii games. Nkit has numerous problems:
  - Loading times are incorrect (sometimes 10% - 20% slower), causing issues with TASing and Netplay
  - Some games will not boot at all when compressed to Nkit
  - Lossy compression means games cannot be easily decompressed back to their clean ISO state
For these reasons, **we recommend RVZ instead**. RVZ is a lossless compressed file format with similar (or better!) compression ratios to Nkit, whilst having none of Nkit's downsides. ISO <-> RVZ conversion is done within Dolphin, and RVZs are still verifiable.
Refer to https://dolphin-emu.org/blog/2020/07/05/dolphin-progress-report-may-and-june-2020/#50-12188-support-for-rvz-and-wia-disc-formats-by-josjuice for further info and comparisons between RVZ and other file formats.`

const embed = new MessageEmbed()
	.setTitle('Nkit vs. RVZ:')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nkit')
		.setDescription('Info on Nkit vs. RVZ'),
	async execute(interaction) {
		return interaction.reply({ embeds: [embed] });
	},
};
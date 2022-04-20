const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `https://github.com/Ryochan7/DS4Windows
Use DS4Windows to connect your Dualshock4 or Dualsense controller as an XInput device. 
Or, set up its DSU server and configure Dolphin to use the Dshock/Dsense gyros for Wii Remote emulation.
Refer to https://wiki.dolphin-emu.org/index.php?title=DSU_Client for more info on DSU.`;

const embed = new MessageEmbed()
	.setTitle('DS4Windows:')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ds4')
		.setDescription('Links to ryochan\'s DS4windows fork for connecting Playstation 4 and 5 controllers.'),
	async execute(interaction) {
		return interaction.reply({ embeds: [embed] });
	},
};

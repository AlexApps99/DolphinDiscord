const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `https://github.com/Davidobot/BetterJoy
Use Betterjoy to connect your Joycon or Pro Controller as an XInput device. 
Or, set up its DSU server and configure Dolphin to use the Joycon/Procon sensors for Wii Remote motion emulation.
Refer to https://wiki.dolphin-emu.org/index.php?title=DSU_Client for more info on DSU.`;

const embed = new MessageEmbed()
	.setTitle('Betterjoy:')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('betterjoy')
		.setDescription('Links to Davidobot\'s BetterJoy program for connecting Joycon and Procon'),
	async execute(interaction) {
		return interaction.reply({ embeds: [embed] });
	},
};

const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `Piracy is not allowed in this server. Please read <#521711544925552642>!
We will only support the dumping of games you own.
If you don't want to do that, find out what to do yourself.`;

const embed = new MessageEmbed()
	.setTitle('Piracy Policy:')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('piracy')
		.setDescription('Explains our piracy policy'),
	async execute(interaction) {
		return interaction.reply({ embeds: [embed] });
	},
};

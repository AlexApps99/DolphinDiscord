const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `Piracy is illegal, and is not tolerated in this server. Owning or previously owning a game does not make downloading it legal. Please read <#521711544925552642>!
We will only provide support for games that you have dumped.
Dump your games, or find out what to do yourself.`;

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

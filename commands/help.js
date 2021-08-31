const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const start = `Dolphin Discord Bot
Want to contribute? Get the link to the source code with \`/source\`.

\`\`\`
`;

let h = null;

const end = '```';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List of commands and information about the bot'),
	async execute(interaction) {
		if (h == null) {
			h = start;
			for (const cmd of interaction.client.commands.values()) {
				h += cmd.data.name.padEnd(12) + cmd.data.description + '\n';
			}
			h += end;
		}
		return interaction.reply({ content: h, ephemeral: true });
	},
};

const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `Dolphin site: <https://dolphin-emu.org/>
Downloads: <https://dolphin-emu.org/download/>
FAQ: <https://dolphin-emu.org/docs/faq/>
Wiki: <https://wiki.dolphin-emu.org>
Forums: <https://forums.dolphin-emu.org/>
Source code: <https://github.com/dolphin-emu/dolphin>
Bug tracker: <https://bugs.dolphin-emu.org/projects/emulator/issues>
Translation: <https://www.transifex.com/delroth/dolphin-emu/>
TODO list: <https://wiki.dolphin-emu.org/index.php?title=TODO_List>
Developer wiki: <https://github.com/dolphin-emu/dolphin/wiki>
Reddit: <https://www.reddit.com/r/DolphinEmulator>
Twitter: <https://twitter.com/Dolphin_Emu>`;

const embed = new MessageEmbed()
	.setTitle('Links:')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('links')
		.setDescription('Shows info about Dolphin'),
	async execute(interaction) {
		return interaction.reply({ embeds: [embed] });
	},
};

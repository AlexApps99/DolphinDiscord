const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

function netplay_index() {
	return fetch("https://lobby.dolphin-emu.org/v0/list").then(res => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(`Invalid status: ${res.status} ${res.statusText}`);
		}
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('netplay')
		.setDescription('Search for Netplay sessions on the index.')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('Search query')
				.setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();
		const query = interaction.options.get('query').value;
		let idx = null;
		try {
			idx = await netplay_index();
		} catch (error) {
			return interaction.editReply('Sorry, the Netplay index seems to be down.');
		}
		for (const party of idx.sessions) {
			if (party.name === query || party.server_id == query) {
				let titleBar = '**Session: *"' + party.name + '"* **';
				if (party.in_game) titleBar += ' **(In game)**';
				let embed = new MessageEmbed()
					.setTitle(titleBar)
					.setColor(0x3FCAFF)
					.setAuthor('Dolphin Netplay Session Search', 'https://wiki.dolphin-emu.org/images/dolphin.40.png')
					.addField("Game:", party.game)
					.addField("Total players:", party.player_count.toString())
					.addField("Dolphin version:", party.version + " | http://dolp.in/v" + party.version)
					.addField("Server region:", party.region)
					.addField("Connection type:", party.method)
					.addField("IP address/Join code:", party.server_id)
					.addField("Port number:", party.port.toString());
				if (party.password) embed = embed.setFooter("Password required.")
				return interaction.editReply({ content: '**Search result for:** ***"' + query + '"***', embeds: [embed] });
			}
		}
		return interaction.editReply('Sorry, your search could not be found.\n*Did you enable "Show in Netplay Browser"*?');
	},
};

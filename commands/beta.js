const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

function get_update_info() {
	return fetch("https://dolphin-emu.org/update/check/v1/beta/31524288e3b2450eaefff8202c6d26c4ba3f7333/win").then(res => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(`Invalid status: ${res.status} ${res.statusText}`);
		}
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beta')
		.setDescription('Get the version of the latest beta release of Dolphin'),
	async execute(interaction) {
		await interaction.deferReply();
		const i = await get_update_info();
		return interaction.editReply(i.new.name + " (" + i.new.hash + ")");
	},
};

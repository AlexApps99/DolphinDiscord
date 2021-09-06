const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

const default_args = {
	action: 'query',
	utf8: 1,
	format: 'json',
};

function wiki(args = {}) {
	const params = new URLSearchParams({
		...default_args,
		...args,
	});
	const params_str = params.toString();
	return fetch('https://wiki.dolphin-emu.org/api.php?' + params_str).then(res => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(`Invalid status: ${res.status} ${res.statusText}`);
		}
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wiki')
		.setDescription('Search for info on games with Dolphin Wiki')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('Search query')
				.setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();
		const query = interaction.options.get('query').value;
		let usedNearMatch = false;
		let sea = null;
		for (const x of ['nearmatch', 'title', 'text']) {
			sea = await wiki({
				list: 'search',
				srsearch: query,
				srlimit: 5,
				srwhat: x,
			});
			sea = sea.query;
			if (x === 'nearmatch' && sea.search.length > 0) {
				usedNearMatch = true;
				break;
			} else if (x !== 'nearmatch' && sea.searchinfo.totalhits !== 0) {
				break;
			} else {
				sea = null;
			}
		}
		if (sea == null) {
			await interaction.editReply('Sorry, your search could not be found.');
			return;
		}
		let req = null;
		if (usedNearMatch) {
			const article = sea.search[0].title;
			req = await wiki({
				redirects: 1,
				prop: 'info|categories',
				inprop: 'url',
				titles: article,
			});
			req = req.query.pages;
		} else {
			for (const res of sea.search) {
				const article = res.title;
				req = await wiki({
					redirects: 1,
					prop: 'info|categories',
					inprop: 'url',
					titles: article,
				});
				req = req.query.pages;
				if (req[0] != "-1") {
					break;
				} else {
					req = null;
				}
			}
		}
		if (req == null) {
			await interaction.editReply('Sorry, your search could not be found.');
			return;
		}
		const key = Object.keys(req)[0];
		const article = req[key]['title'];
		const arturl = req[key]['fullurl'];
		const lastedited = Date.parse(req[key]['touched']);
		const categories = req[key]['categories'];
		let starsfound = 0;
		let compatibility = 0;
		for (const category of categories) {
			if (category['title'].length == 25 && category['title'].startsWith('Category:') && category['title'].endsWith(' stars (Rating)')) {
				starsfound += 1;
				compatibility = parseInt(category['title'][9]);
			}
		}
		let embed = new MessageEmbed()
			.setTitle('**' + article + '**')
			.setURL(arturl)
			.setColor(0x3FCAFF)
			.setFooter('Wiki entry last modified', 'https://wiki.dolphin-emu.org/images/dolphin.40.png')
			.setAuthor('Dolphin Emulator Wiki', 'https://wiki.dolphin-emu.org/images/dolphin.40.png', 'https://wiki.dolphin-emu.org/')
			.setTimestamp(lastedited);

		if (starsfound != 0 && compatibility > 0) {
			embed = embed.addField(
				"Compatibility:",
				':star:'.repeat(compatibility),
				false
			);
		}
		await interaction.editReply({ content: '**Search result for:** ***' + query + '***:', embeds: [embed] });
	},
};

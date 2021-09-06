const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

const INT_REG = /^\d+$/;
const LIMIT = 3;

function search_by_id(id) {
	return fetch("https://bugs.dolphin-emu.org/issues/" + encodeURIComponent(id.toString()) + ".json").then(res => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(`Invalid status: ${res.status} ${res.statusText}`);
		}
	});
}

function search_by_query(query) {
	return fetch("https://bugs.dolphin-emu.org/projects/emulator/search.json?limit=" + LIMIT.toString() + "&all_words=1&open_issues=1&titles_only=&q=" + encodeURIComponent(query)).then(res => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(`Invalid status: ${res.status} ${res.statusText}`);
		}
	});
}

function isInt(val) {
	return INT_REG.test(val);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bugs')
		.setDescription('Search for bugs with Dolphin Bug Reporter')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('Search query')
				.setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();
		const query = interaction.options.get('query').value;
		if (isInt(query)) {
			const r = await search_by_id(query);
			const issue = r.issue;
			let embed = new MessageEmbed()
				.setTitle('**' + issue.subject + '**')
				.setURL("https://bugs.dolphin-emu.org/issues/" + issue.id.toString())
				.setColor(0x3FCAFF)
				.setAuthor('Dolphin Bug Reporter', 'https://wiki.dolphin-emu.org/images/dolphin.40.png', 'https://bugs.dolphin-emu.org/projects/emulator')
				.setFooter('Report last modified', 'https://wiki.dolphin-emu.org/images/dolphin.40.png')
				.addField("Reported by:", issue.author.name)
				.addField("Status:", issue.status.name)
				.setTimestamp(Date.parse(issue.updated_on));
			const fixed = issue.custom_fields[9].value;
			if (fixed) embed = embed.addField("Fixed in:", fixed.toString() + ' | http://dolp.in/v' + fixed.toString());
			return interaction.editReply({ content: "**Bug report for:** ***" + query + "***", embeds: [embed] });
		} else {
			const r = await search_by_query(query);
			const hits = r.total_count;
			let max = hits;
			if (!r.total_count) {
				return interaction.editReply("Sorry, your search could not be found.");
			} else if (r.total_count > LIMIT) {
				max = LIMIT;
			}
			let embed = new MessageEmbed()
				.setTitle('**Bug Search Results**')
				.setURL("https://bugs.dolphin-emu.org/projects/emulatio/search?limit=25&all_words=1&open_issues=1&titles_only=&q=" + encodeURIComponent(query))
				.setColor(0x3FCAFF)
				.setAuthor('Dolphin Bug Reporter', 'https://wiki.dolphin-emu.org/images/dolphin.40.png', 'https://bugs.dolphin-emu.org/projects/emulator')
				.setFooter('Total results: ' + hits.toString(), 'https://wiki.dolphin-emu.org/images/dolphin.40.png');
			for (let i = 0; i < max; i++) {
				const date = Date.parse(r.results[i].datetime);
				const url = r.results[i].title;
				embed = embed.addField(r.results[i].title, `Date Reported: ${date} | ${url}`);
			}
			return interaction.editReply({ content: "**Search result for:** ***" + query + "***:", embeds: [embed] });
		}
	},
};

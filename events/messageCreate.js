const { MessageEmbed } = require('discord.js');

// TODO use channel name
const piracy_warning = `Piracy is not allowed in this server. Please read <#521711544925552642>!
We will only support the dumping of games you own.
If you don't want to do that, find out what to do yourself.`;

const embed = new MessageEmbed()
	.setTitle('Automessage:')
	.setDescription(piracy_warning);

// These regexes aren't great: by all means submit a PR to improve them
const piracy_regexes = [
	/(pirating|downloading|torrenting|stealing)\s+(a\s+|an\s+|the\s+|any\s+|all\s+)?((?:\w+)?\s+|wii\s+|gc\s+|gamecube\s+|game\s+cube\s+|nintendo\s+)?((game|iso|wad|gcm|rom|wbfs|ciso|img|title)s?\s+)?(work|legit|legal|allowed|ok|easy|illegal|dangerous|safe|fast|quick)/mi,
	/(to|do|does|can|should|could|give|who)\s+(you\s+|i\s+|one\s+|somebody\s+|someone\s+|anyone\s+|anybody\s+|we\s+|me\s+)?(pirate|download|torrent|steal|free)\s+(a\s+|an\s+|the\s+|any\s+|all\s+)?((?:\w+)?\s+|wii\s+|gc\s+|gamecube\s+|game\s+cube\s+|nintendo\s+)?(game|iso|wad|gcm|rom|wbfs|ciso|img|title)s?/mi,
];

module.exports = {
	name: 'messageCreate',
	/**
	 * 
	 * @param {import('discord.js').Message} message 
	 */
	execute(message) {
		if (message.content) {
			if (message.content.startsWith('d!')) {
				message.reply('Dolphin Discord Bot no longer uses `d!` as a prefix, try `/` instead.'); // TODO make both work because we can ;)
			} else if (message.toLowerCase().content.search('dead chat') >= 0) {
				message.reply('Go outside.');
			} else {
				for (const reg of piracy_regexes) {
					if (message.content.search(reg) >= 0) {
						message.reply({ embeds: [embed] });
						break;
					}
				}
			}
		}
	},
};

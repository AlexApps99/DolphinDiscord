const games = [
	'Cheggers Party Quiz',
	'True Crime: New York City',
	'Ninjabread Man',
	'Smurfs Dance Party',
	'CTGP-R',
	'Shrek SuperSlam',
	// TODO we need more high quality games to be added to the list
];

const game = games[Math.floor(Math.random() * games.length)];

module.exports = {
	name: 'ready',
	once: true,
	/**
	 * 
	 * @param {import('discord.js').Client} client 
	 */
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('/help - ' + game, { type: 'PLAYING' });
	},
};

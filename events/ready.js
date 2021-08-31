const games = [
	'Super Smash Bros. Melee',
	'Mario Kart Wii',
	'Super Mario Galaxy',
	'Super Mario Sunshine',
	'Xenoblade Chronicles',
	'Wii Party',
];

const game = games[Math.floor(Math.random() * games.length)];

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('/help - ' + game, { type: 'PLAYING' });
	},
};

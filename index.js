const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

/**@type {import('discord.js').Client} */
const client = new Client({ allowedMentions: false, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	// Do for each guild, just in case there is more than one and to automatically fetch it
	client.guilds.cache.forEach(guild => {
		// Purposefully not async
		guild.commands.fetch().then(() => {
			guild.commands.cache.forEach(command => {
				// Check if it exists in the list of commands
				if (!Array.from(client.commands.keys()).includes(command.name)) {
					// Delete if there is no file for it
					command.delete().catch(err => {
						console.log(err);
					});
				}
			});
			Array.from(client.commands.keys()).forEach(cmdName => {
				// For all the commands, send the JSON over to the API
				// According to Discord's documentation, commands that exist will simply be updated
				guild.commands.create(client.commands.get(cmdName).toJSON()).catch((err) => {
					console.log(err);
				})
			})
		});
	});

	// temp, only needed to remove global commands for the per commands
	client.application.commands.fetch().then(() => {
		client.application.commands.cache.forEach(cmd => {
			cmd.delete().catch(err => {
				console.log(err);
			})
		})
	})


});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.TOKEN_DISCORD);

const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `Crostini, referred to by Google as "Linux (Beta)," is not suitable for gaming. This includes Dolphin.
There's a few reasons for this, including:
- Broken OpenGL drivers (no ARB_buffer_storage, a thing Dolphin uses for performance)
- No Vulkan support (which runs better than OpenGL in almost every instance where it's supported)
- It all runs in a VM instead of having direct hardware access
- No controller support over Bluetooth or USB whatsoever

If none of that means anything to you, in English that means Dolphin will run very badly if you use the ancient stable versions, and it won't run at all if you use a beta or development version. If you want to run Dolphin on your Chromebook, you have a few options.

You can try: (do some research on these!):
- Crouton (run a Linux operating system alongside Chrome OS and use a keyboard shortcut to switch between them at will)
- MrChromeBox firmware scripts (https://mrchromebox.tech/) to install Linux distros (GalliumOS is not recommended despite being designed for Chromebooks due to how outdated it is, but you should still read their documentation for it to understand Chromebook-specific issues, like the hardware compatibility list. - Google this!
- Google is apparently working on some sort of new Ubuntu environment for Chromebooks called Borealis that has Steam preinstalled, that may be a good option in the future
ARM CHROMEBOOKS ONLY: Cadmium (specialized Linux distro for ARM Chromebooks) https://github.com/Maccraft123/Cadmium

These are unfortunately out of the scope of what we can provide support for here.
You'll have to find other support forums for these methods and be a bit computer savvy, but when you get them set up then this server can help you get Dolphin installed very easily.`;

const embed = new MessageEmbed()
	.setTitle('Chromebook starter guide:')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chromebook')
		.setDescription('Gives installation info for Chromebook users'),
	async execute(interaction) {
		return interaction.reply({ embeds: [embed] });
	},
};

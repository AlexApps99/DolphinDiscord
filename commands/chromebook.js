const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const text = `Crostini, referred to by Google as "Linux (Beta)," is not suitable for gaming. This includes Dolphin.
There's a few reasons for this, including:
- Broken OpenGL drivers (no ARB_buffer_storage, something Dolphin NEEDS for performance)
- No Vulkan support (which runs better than OpenGL in almost every instance where it's supported)
- It all runs in a VM instead of having direct hardware access
- No controller support over Bluetooth or USB whatsoever

If none of that means anything to you, in English that means Dolphin will run very badly if you use the ancient stable versions, and it won't run at all if you use a beta or development version. If you want to run Dolphin on your Chromebook, you have a few options.

You can try: (do some research on these!):
- MrChromeBox firmware scripts (https://mrchromebox.tech/) to overwrite ChromeOS entirely and install full Linux distros (GalliumOS is discontinued and should NOT be used, but you should still read their documentation for it to understand Chromebook-specific issues, like the hardware compatibility list. - Google this!)
- Depthboot/EupneaOS (Recommended if you can't modify firmware or the MrChromeBox method doesn't support your device): An experimental way to natively run Linux on modern Chromebooks without replacing firmware https://eupnea-linux.github.io/
- ARM USERS LOOK HERE: Cadmium (specialized Linux distro for ARM Chromebooks only) https://github.com/Maccraft123/Cadmium
- Crouton (run a Linux operating system alongside Chrome OS and use a keyboard shortcut to switch between them at will)
- Google is working on a Steam environment for Chromebooks called Borealis - in the future, it might be possible to add non-Steam programs (like Dolphin) to this? https://www.chromium.org/chromium-os/steam-on-chromeos/

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

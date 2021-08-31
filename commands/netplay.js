const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

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
		return interaction.reply("Sorry, this command has not been implemented yet. Ping <@292383975048216576> until he finishes rewriting the bot.");
	},
};

/*
  @commands.command(
    help='Search for Netplay sessions on the index.',
    aliases=['np','party']
  )
  async def netplay(self, ctx, *, query: str):
    try:
      sea = requests.get(
        f'https://lobby.dolphin-emu.org/v0/list'
        ).json()['sessions']
    except:
      await ctx.send('Sorry, the Netplay index seems to be down.')
      return
    for party in sea:
        if party["name"] == query or party["server_id"] == query:
            if party["in_game"] == True:
                titleBar = f'**Session: *"{party["name"]}"*  (In game)**'
            else:
                titleBar = f'**Session: *"{party["name"]}"* **'
            embed = discord.Embed(
              title=titleBar,
              color=0x3FCAFF
            )
            embed.set_author(
              name='Dolphin Netplay Session Search',
              icon_url='https://wiki.dolphin-emu.org/images/dolphin.40.png'
            )
            embed.add_field(
              name="Game:",
              value=party["game"],
              inline=False
            )
            embed.add_field(
              name="Total players:",
              value=party["player_count"],
              inline=False
            )
            embed.add_field(
              name="Dolphin version:",
              value=f'{party["version"]} | http://dolp.in/v{party["version"]}',
              inline=False
            )
            embed.add_field(
              name="Server region:",
              value=party["region"],
              inline=False
            )
            embed.add_field(
              name="Connection type:",
              value=party["method"],
              inline=False
            )
            embed.add_field(
              name="IP address/Join code:",
              value=party["server_id"],
              inline=False
            )
            embed.add_field(
              name="Port number:",
              value=party["port"],
              inline=False
            )
            if party["password"] == True:
                embed.set_footer(text='Password required.')
            await ctx.send(
              f'**Search result for:** ***"{query}"***:',
              embed=embed
            )
            return
        
    # No results, then fail.
    await ctx.send('Sorry, your search could not be found.\n*Did you enable "Show in Netplay Browser"*?')
    return
*/

const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

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
		return interaction.reply("Sorry, this command has not been implemented yet. Ping <@292383975048216576> until he finishes rewriting the bot.");
	},
};

/*
  @commands.command(
    help='Search for bugs with Dolphin Bug Reporter',
    aliases=['b']
  )
  async def bugs(self, ctx, *, query: str):
    '''
    Uses Dolphin Redmine to lookup bug reports
    '''
    if (query.isdecimal()):
        try:
            sea = requests.get(
              f'https://bugs.dolphin-emu.org/issues/{query}.json'
            ).json()['issue']
        except ValueError:
            await ctx.send('Sorry, your search could not be found.')
            return

        id = sea['id']
        status = sea['status']['name']
        author = sea['author']['name']
        subject = sea['subject']
        fixed = sea['custom_fields'][9]['value']
        update = datetime.datetime.strptime(sea['updated_on'],"%Y-%m-%dT%H:%M:%SZ")

        embed = discord.Embed(
            title=f'**{subject}**',
            url=f'https://bugs.dolphin-emu.org/issues/{id}',
            color=0xFC2C03
        )
        embed.set_footer(
          text='Report last modified',
          icon_url='https://wiki.dolphin-emu.org/images/dolphin.40.png'
        )
        embed.set_author(
          name='Dolphin Bug Reporter',
          url='https://bugs.dolphin-emu.org/projects/emulator',
          icon_url='https://wiki.dolphin-emu.org/images/dolphin.40.png'
        )
        embed.timestamp=update
        embed.add_field(
          name="Reported by:",
          value=author,
          inline=False
        )
        embed.add_field(
          name="Status:",
          value=status,
          inline=False
        )
        if (fixed):
          embed.add_field(
            name="Fixed in:",
            value=f'{fixed} | http://dolp.in/v{fixed}',
            inline=False
          )
        await ctx.send(
          f'**Bug report for:** ***{query}***:',
          embed=embed
        )

    else:
        sea=requests.get(
            'https://bugs.dolphin-emu.org/projects/emulator/search.json?'
            f'limit=3&all_words=1&open_issues=1&titles_only=&q="{query}"'
        ).json()
        hits = sea['total_count']
        if not hits:
            await ctx.send('Sorry, your search could not be found.')
            return
        if (hits > 3):
            max = sea['limit']
        else:
            max = sea['total_count']
        embed = discord.Embed(
            title=f'**Bug Search Results**',
            url='https://bugs.dolphin-emu.org/projects/emulator/search?'
            f'limit=25&all_words=1&open_issues=1&titles_only=&q="{urllib.parse.quote_plus(query)}"',
            color=0xFC2C03
        )
        embed.set_author(
          name='Dolphin Bug Reporter',
          url='https://bugs.dolphin-emu.org/projects/emulator',
          icon_url='https://wiki.dolphin-emu.org/images/dolphin.40.png'
        )
        embed.set_footer(
          text=f'Total results: {hits}',
          icon_url='https://wiki.dolphin-emu.org/images/dolphin.40.png'
        )
        for x in range(max):
           date = datetime.datetime.strptime(sea['results'][x]['datetime'],"%Y-%m-%dT%H:%M:%SZ")
           url = sea['results'][x]['url']
           embed.add_field(
              name=sea['results'][x]['title'],
              value=f'Date Reported: {date} | {url}',
              inline=False
            )
        await ctx.send(
          f'**Search result for:** ***"{query}"***:',
          embed=embed
        )
*/

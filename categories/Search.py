import datetime
import urllib.parse
import requests
import discord
from discord.ext import commands

class Search(commands.Cog):
  def __init__(self, bot):
    self.bot = bot
  
  @commands.command(
    help='Search for info on games with Dolphin Wiki',
    aliases=['w', 'game', 'details']
  )
  async def wiki(self, ctx, *, query: str):
    '''
    Uses Dolphin Wiki APIs to summarise search
    '''
    for x in ['title', 'text', 'nearmatch']:
      sea = requests.get(
        'https://wiki.dolphin-emu.org/api.php?action=query'
        f'&format=json&list=search&utf8=1&srsearch={query}&srlimit=5&srwhat={x}'
      ).json()['query']
      if sea['searchinfo']['totalhits'] != 0:
        break
    else:
      await ctx.send('Sorry, your search could not be found.')
      return
    for x in range(len(sea['search'])):
      article = sea['search'][x]['title']
      req = requests.get(
        'https://wiki.dolphin-emu.org/api.php?action=query'
        '&utf8=1&redirects&format=json&prop=info|categories'
        f'&inprop=url&titles={article}'
      ).json()['query']['pages']
      if str(list(req)[0]) != "-1":
        break
    else:
      await ctx.send('Sorry, your search could not be found.')
      return
    article = req[list(req)[0]]['title']
    arturl = req[list(req)[0]]['fullurl']
    lastedited = datetime.datetime.strptime(
      req[list(req)[0]]['touched'],
      "%Y-%m-%dT%H:%M:%SZ"
    )
    categories = req[list(req)[0]]['categories']
    starsfound = 0
    for category in categories:
      if len(category['title']) == 25:
        if category['title'].startswith('Category:'):
          if category['title'].endswith(' stars (Rating)'):
            starsfound += 1
            compatibility = int(category['title'][9])
    embed = discord.Embed(
      title=f'**{article}**', 
      url=arturl,
      color=0x3FCAFF
    )
    if starsfound != 0:
      embed.add_field(
        name="Compatibility:",
        value=':star:' * compatibility,
        inline=False
      )
    embed.set_footer(
      text='Wiki entry last modified',
      icon_url='https://wiki.dolphin-emu.org/images/dolphin.40.png'
    )
    embed.set_author(
      name='Dolphin Emulator Wiki',
      url='https://wiki.dolphin-emu.org/',
      icon_url='https://wiki.dolphin-emu.org/images/dolphin.40.png'
    )
    embed.timestamp = lastedited
    await ctx.send(
      f'**Search result for:** ***"{query}"***:',
      embed=embed
    )

  @commands.group(help='Google for websites/images/videos', aliases=['g'])
  async def google(self, ctx):
    '''
    Googles searchquery, or images if you specified that
    '''
    if ctx.invoked_subcommand is None:
      await ctx.send(embed=discord.Embed(title='Google:', description=
        'Usage: `d!google [search|images|videos] [query]`\n'
        'Did you mean `d!google search [query]`?'
      ))
  
  @google.command(name='search')
  async def googlesearch(self, ctx, *, query: str):
    await ctx.send(embed=discord.Embed(title='Google Search:', description=f'<https://www.google.com/search?q={urllib.parse.quote_plus(query)}>'))
  
  @google.command(name='images')
  async def googleimages(self, ctx, *, query: str):
    await ctx.send(embed=discord.Embed(title='Google Images:', description=f'<https://www.google.com/search?tbm=isch&q={urllib.parse.quote_plus(query)}>'))
  
  @google.command(name='videos')
  async def googlevideos(self, ctx, *, query: str):
    await ctx.send(embed=discord.Embed(title='Google Videos:', description=f'<https://www.google.com/search?tbm=vid&q={urllib.parse.quote_plus(query)}>'))
  
  
  @commands.group(help='Let me Google that for you')
  async def lmgtfy(self, ctx):
    '''
    Let me Google that for you
    '''
    if ctx.invoked_subcommand is None:
      await ctx.send(embed=discord.Embed(title='LMGTFY:', description=
        'Usage: `d!lmgtfy [search|images|videos] [query]`\n'
        'Did you mean `d!lmgtfy search [query]`?'
      ))
  
  @lmgtfy.command(name='search')
  async def lmgtfysearch(self, ctx, *, query: str):
    await ctx.send(embed=discord.Embed(title='LMGTFY Search:', description=f'<https://www.lmgtfy.com/search?t=w&q={urllib.parse.quote_plus(query)}>'))
  
  @lmgtfy.command(name='images')
  async def lmgtfyimages(self, ctx, *, query: str):
    await ctx.send(embed=discord.Embed(title='LMGTFY Images:', description=f'<https://www.lmgtfy.com/search?t=i&q={urllib.parse.quote_plus(query)}>'))
  
  @lmgtfy.command(name='videos')
  async def lmgtfyvideos(self, ctx, *, query: str):
    await ctx.send(embed=discord.Embed(title='LMGTFY Videos:', description=f'<https://www.lmgtfy.com/search?t=v&q={urllib.parse.quote_plus(query)}>'))


def setup(bot):
  bot.add_cog(Search(bot))

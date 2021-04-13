import discord
from discord.ext import commands

class Misc(commands.Cog):
  def __init__(self, bot):
    self.bot = bot
  
  @commands.command(help='Who created the bot', hidden=True, aliases=['creator'])
  async def credits(self, ctx):
    '''
    Pretty self-explanatory
    '''
    await ctx.send(embed=discord.Embed(title='Credits:', description='This bot was made by `@AlexApps#9295`. Complain to <@268818599290863616> in a DM if you think this bot is garbage.'))
  
  @commands.command(help='Link to Dolphin Discord\'s source code', aliases=['git', 'github'])
  async def source(self, ctx):
    '''
    Link to Dolphin Discord's source code. Complain to <@268818599290863616> in a DM if you think the code is absolute trash.
    '''
    await ctx.send(embed=discord.Embed(title='Source code:', description='https://github.com/AlexApps99/DolphinDiscord'))
  
  @commands.command(help='Checks ping', aliases=['pong', 'lag', 'ms'])
  async def ping(self, ctx):
    '''
    Checks latency on Discord. Complain to <@268818599290863616> in a DM if the ping is too high.
    '''
    await ctx.send(embed=discord.Embed(title='🏓 Pong:', description=f"**{round(self.bot.latency * 1000, 2)}ms**"))
                   
def setup(bot):
  bot.add_cog(Misc(bot))

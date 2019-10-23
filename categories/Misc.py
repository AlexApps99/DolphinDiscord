import discord
from discord.ext import commands

class Misc(commands.Cog):
  def __init__(self, bot):
    self.bot = bot
  
  @commands.command(help='Who created the bot', hidden=True)
  async def credits(self, ctx):
    '''
    Pretty self-explanatory
    '''
    await ctx.send('This bot was made by `@AlexApps#9295`.')
  
  @commands.command(help='Checks ping')
  async def ping(self, ctx):
    '''
    Checks latency on Discord
    '''
    await ctx.send(f"🏓 Pong: **{round(self.bot.latency * 1000, 2)}ms**")
                   
def setup(bot):
  bot.add_cog(Misc(bot))

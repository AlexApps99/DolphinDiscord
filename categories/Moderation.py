import discord
from discord.ext import commands

class Moderation(commands.Cog):
  def __init__(self, bot):
    self.bot = bot
  
  @commands.command(help='Kick users (Moderators only)')
  async def kick(self, ctx, user: discord.Member, *, reason=''):
    '''
    Kicks mentioned member
    '''
    try:
      if ctx.author.guild_permissions.kick_members:
        await user.kick(reason=f'Kicker: {ctx.author.name}#{ctx.author.discriminator}, Reason: {reason}')
        await ctx.send(f'Game Over, {user.name}')
      else:
        await ctx.send('Sorry, you do not have permission to kick members.')
    except discord.errors.Forbidden:
      await ctx.send('Sorry, I do not have permission to kick members.')
  
  @commands.command(help='Explains our piracy policy')
  async def piracy(self, ctx):
    '''
    Explains our piracy policy
    '''
    await ctx.send(
      'Piracy is not allowed in this server. Please read the #rules!\n'
      'We will only support the dumping of games you own.\n'
      'If you don\'t want to do that find out what to do yourself.'
    )
  
  @commands.command(help='Explain more about your hardware and Dolphin message.')
  async def explain(self, ctx):
    await ctx.send(
      'To properly help you, we first need some more info.\n'
      '- What version of dolphin are you running? (latest dev build is recommended to most)\n'
      '- What are your system specs? (CPU, GPU, RAM, Windows version)'
    )

def setup(bot):
  bot.add_cog(Moderation(bot))

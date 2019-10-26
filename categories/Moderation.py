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
        await ctx.send(embed=discord.Embed(title='Kick:', description=f'Game Over, {user.name}'))
      else:
        await ctx.send(embed=discord.Embed(title='Error:', description='```diff\n- Sorry, you do not have permission to kick members. -```'))
    except discord.errors.Forbidden:
      await ctx.send(embed=discord.Embed(title='Error:', description='```diff\n- Sorry, I do not have permission to kick members. -```'))
  
  @commands.command(help='Explains our piracy policy', aliases=['p', 'pirating'])
  async def piracy(self, ctx):
    '''
    Explains our piracy policy
    '''
    await ctx.send(embed=discord.Embed(title='Piracy Policy:', description=
      'Piracy is not allowed in this server. Please read the #rules!\n'
      'We will only support the dumping of games you own.\n'
      'If you don\'t want to do that find out what to do yourself.'
    ))
  
  @commands.command(help='Explain more about your hardware and Dolphin message.')
  async def explain(self, ctx):
    await ctx.send(embed=discord.Embed(title='How to explain your question:', description=
      'To properly help you, we first need some more info.\n'
      '- What version of dolphin are you running? (latest dev build is recommended to most)\n'
      '- What are your system specs? (CPU, GPU, RAM, Windows version)'
    ))

def setup(bot):
  bot.add_cog(Moderation(bot))

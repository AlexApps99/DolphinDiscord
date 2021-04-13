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
        await ctx.send(embed=discord.Embed(title='Error:', description='```diff\n- Sorry, you do not have permission to kick members. Complain to <@268818599290863616> in a DM please. -```'))
    except discord.errors.Forbidden:
      await ctx.send(embed=discord.Embed(title='Error:', description='```diff\n- Sorry, I do not have permission to kick members. Complain to <@268818599290863616> in a DM please. -```'))
  
  @commands.command(help='Explains our piracy policy', aliases=['p', 'pirating'])
  async def piracy(self, ctx):
    '''
    Explains our piracy policy
    '''
    await ctx.send(embed=discord.Embed(title='Piracy Policy:', description=
      'Piracy is not allowed in this server. Complain to <@268818599290863616> in a DM if you think this is unfair'
    ))
  
  @commands.command(help='Explain more about your hardware and Dolphin message.')
  async def explain(self, ctx):
    await ctx.send(embed=discord.Embed(title='How to explain your question:', description=
      'To properly help you, you need to DM <@268818599290863616> for futher assistance.'
    ))

def setup(bot):
  bot.add_cog(Moderation(bot))

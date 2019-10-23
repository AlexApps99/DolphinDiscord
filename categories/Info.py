import discord
from discord.ext import commands

class Info(commands.Cog):
  def __init__(self, bot):
    self.bot = bot
  
  @commands.command(help='Shows info about Dolphin', aliases=['link', 'l'])
  async def links(self, ctx):
    '''
    Download links
    '''
    await ctx.send(
      "> Dolphin site: <https://dolphin-emu.org/>\n"
      "> Downloads: <https://dolphin-emu.org/download/>\n"
      "> FAQ: <https://dolphin-emu.org/docs/faq/>\n"
      "> Wiki: <https://wiki.dolphin-emu.org>\n"
      "> Forums: <https://forums.dolphin-emu.org/>\n"
      "> Source code: <https://github.com/dolphin-emu/dolphin>\n"
      "> Bug tracker: <https://bugs.dolphin-emu.org/projects/emulator/issues>\n"
      "> Translation: <https://www.transifex.com/delroth/dolphin-emu/>\n"
      "> TODO list: <https://wiki.dolphin-emu.org/index.php?title=TODO_List>\n"
      "> Developer wiki: <https://github.com/dolphin-emu/dolphin/wiki>\n"
      "> Reddit: <https://www.reddit.com/r/DolphinEmulator>\n"
      "> Twitter: <https://twitter.com/Dolphin_Emu>"
    )
                   
def setup(bot):
  bot.add_cog(Info(bot))

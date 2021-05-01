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
    await ctx.send(embed=discord.Embed(title='Links:', description=
      "Dolphin site: <https://dolphin-emu.org/>\n"
      "Downloads: <https://dolphin-emu.org/download/>\n"
      "FAQ: <https://dolphin-emu.org/docs/faq/>\n"
      "Wiki: <https://wiki.dolphin-emu.org>\n"
      "Forums: <https://forums.dolphin-emu.org/>\n"
      "Source code: <https://github.com/dolphin-emu/dolphin>\n"
      "Bug tracker: <https://bugs.dolphin-emu.org/projects/emulator/issues>\n"
      "Translation: <https://www.transifex.com/delroth/dolphin-emu/>\n"
      "TODO list: <https://wiki.dolphin-emu.org/index.php?title=TODO_List>\n"
      "Developer wiki: <https://github.com/dolphin-emu/dolphin/wiki>\n"
      "Reddit: <https://www.reddit.com/r/DolphinEmulator>\n"
      "Twitter: <https://twitter.com/Dolphin_Emu>"
    ))
   
  @commands.command(help='Gives installation info for Chromebook users', aliases=['cbook', 'cb'])
  async def chromebook(self, ctx):
    '''
    Gives installation info for Chromebook users
    '''
    await ctx.send(embed=discord.Embed(title='Chromebook starter guide:', description=
      'Crostini, referred to by Google as "Linux (Beta)," is not suitable for gaming. '
      'This includes Dolphin.\n'
      "There's a couple reasons for this, including (at the time this was written):\n"
      '-Broken OpenGL drivers (no ARB_buffer_storage, something Dolphin uses for performance)\n'
      "-No Vulkan support (which runs better than OpenGL in just about every instance where it's supported)\n"
      '-The whole thing runs in a VM instead of having any sort of direct hardware access\n'
      '-Absolutely no controller support over Bluetooth or USB whatsoever\n\n'
      'If none of that means anything to you, in English that basically means Dolphin will run very badly if you use the ancient stable versions, '
      "and it won't run at all if you use a beta or development version. "
      'If you want to run Dolphin on your Chromebook, you have a few options.\n\n'
      "Your options are (do some research on these!):\n"
      '-Crouton (run a Linux operating system alongside Chrome OS and use a keyboard shortcut to switch between them at will)\n'
      '-MrChromeBox firmware scripts (https://mrchromebox.tech/) to install standalone Linux distros (GalliumOS is not recommended despite being designed for Chromebooks due to how outdated it is, but you should ABSOLUTELY still read their documentation for it to understand Chromebook-specific issues, ESPECIALLY the GalliumOS hardware compatibility list (which will also apply to any other distro. For example, if internal audio is broken for a Chromebook in GalliumOS, it\'ll almost certainly be broken in any other distro.) - Google this!'
      '-Google is apparently working on some sort of new Ubuntu environment for Chromebooks called Borealis that has Steam preinstalled, so you could try setting up Dolphin on that whenever it comes out\n\n'
      'ARM CHROMEBOOKS ONLY: Cadmium (specialized Linux distro for ARM Chromebooks) https://github.com/Maccraft123/Cadmium'
      'These options are out of the scope of what we can provide support for here, unfortunately. '
      "You'll have to find other support forums for these installations and be a bit computer savvy, "
      'but when you get them set up then this server can help you get Dolphin installed very easily.\n'

    ))
    
    
    
def setup(bot):
  bot.add_cog(Info(bot))

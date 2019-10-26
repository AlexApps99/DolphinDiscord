#!/usr/bin/env python3
'''
Dolphin Discord 2.0
By @AlexApps#9295
Now comes in 8 different flavours of spaghetti!
'''

import os
from random import choice
from sys import argv

import re
import discord
from discord.ext import commands

piracy = '''
Piracy is not allowed in this server. Please read the #rules!
We will only support the dumping of games you own.
If you don\'t want to do that find out what to do yourself.
'''

autoinfo = {
  "(pirating|downloading|torrenting|stealing)\s(a\s|an\s|the\s|any\s|all\s)?(.*\s|wii\s|gc\s|gamecube\s|game\scube\s|nintendo\s)?((game|iso|wad|gcm|rom|wbfs|ciso|img|title)s?\s)?(work|legit|legal|allowed|ok|easy|illegal|dangerous|safe|fast|quick)": piracy,
  "(to|do|does|can|should|could|give|who)\s(you\s|i\s|one\s|somebody\s|someone\s|anyone\s|anybody\s|we\s|me\s)?(has|have|get|pirate|download|torrent|steal|free)\s(a\s|an\s|the\s|any\s|all\s)?(.*\s|wii\s|gc\s|gamecube\s|game\scube\s|nintendo\s)?(game|iso|wad|gcm|rom|wbfs|ciso|img|title)s?": piracy
}

if len(argv) == 2:
  TOKEN_DISCORD = argv[1]
elif os.path.isfile('token_discord.txt'):
  TOKENFILE = open('token_discord.txt', 'r')
  TOKEN_DISCORD = TOKENFILE.read().strip()
  TOKENFILE.close()
elif "TOKEN_DISCORD" in os.environ:
  TOKEN_DISCORD = os.environ['TOKEN_DISCORD']
else:
  print('Please provide a token')
  exit()

bot = commands.Bot(
  command_prefix='d!',
  description='Dolphin Discord 2.0',
  case_insensitive=True,
  activity=discord.Activity(
    type=discord.ActivityType.playing,
    name='d!help - '+choice([
      'Super Smash Bros. Melee',
      'Mario Kart Wii',
      'Super Mario Galaxy',
      'Super Mario Sunshine',
      'Xenoblade Chronicles',
      'Wii Party'
    ])
  )
)

@bot.event
async def on_ready():
  '''
  Prepares and starts the bot
  '''
  print(f'Logged in as: {bot.user.name}')
  print(f'Client User ID: {bot.user.id}')

@bot.event
async def on_command_error(ctx, error):
  '''
  Sends error message when error has happened
  '''
  await ctx.send(embed=discord.Embed(title='Error', description=f'```diff\n- {error} -```', color=0xff0000))

@bot.event
async def on_message(message):
  if message.type != discord.MessageType.default or message.author == bot.user or message.author.bot:
    return
  for k, v in autoinfo.items():
    if re.search(k, message.content, flags=re.IGNORECASE) != None:
      await message.channel.send(v);
      break;
  else:
    await bot.process_commands(message)

for extension in ['categories.Misc', 'categories.Moderation', 'categories.Search', 'categories.Info']:
  bot.load_extension(extension)

bot.run(TOKEN_DISCORD)

module.exports = {
	name: 'interactionCreate',
	/**
	 * 
	 * @param {import('discord.js').CommandInteraction} interaction 
	 * @returns 
	 */
	async execute(interaction) {
		
	if(interaction.isButton())
  		{
    			if(interaction.customId === 'hide')
    				{
    					  await interaction.deferUpdate();
        					interaction.deleteReply();
      
    				}
    		}


		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.deferred || interaction.replied) {
				return interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};

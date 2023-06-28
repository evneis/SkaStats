const commands = require("./globalMethods")
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const axios = require('axios');
var Datastore = require('nedb');

// importing the items we need from discord.js package
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
//configuring events the bot can recieve
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`WARNING The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if(!command) {
        console.error(`No command matching ${interaction.commandName}`);
        return;
    }

    try{
        await command.execute(interaction);
    } catch(error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content: `Uhoh! Error running command`});
        } else {
            await interaction.reply({content: `Uhoh! Error reply`});
        }
    }
    console.log(interaction);
});
const commands = require("./globalMethods")
require('dotenv').config();

const fs = require('fs').promises;
const axios = require('axios');
// importing the items we need from discord.js package
const { Client, GatewayIntentBits } = require('discord.js');
//configuring events the bot can recieve
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.on('ready', () => {
    console.log('bot is ready');
})

client.on('messageCreate', async(message) => {
    if(message.content.includes('%u stats')) {
        var respObj;
        let resp = await axios.get(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/hirachidiamonds`, {
            headers: {
                "TRN-Api-Key": process.env.TRN_API_KEY
            }
        }).then(response => {
            console.log(response.data);
            console.log('success!');
            respObj = response.data.data.platformInfo.avatarUrl;
        }).catch(err => {
            console.log(err);
            respObj = 'error!';
        });
        console.log(message.author);
        message.reply({
            content: respObj,
        })
    }
})

client.login(process.env.DISCORD_BOT_ID);
const commands = require("./globalMethods")
require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
var Datastore = require('nedb');

// importing the items we need from discord.js package
const { Client, GatewayIntentBits } = require('discord.js');
//configuring events the bot can recieve
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.on('ready', () => {
    console.log('bot is ready');
})

client.on('messageCreate', async(message) => {
    if(message.content.includes('%u stats')) {
        var respObj = 'Hasnt been replaces';
        var pic = null;
        let resp = await axios({
            url: `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/HirachiDiamonds`,
            headers: {"TRN-Api-Key": process.env.TRN_API_KEY,},
            method: 'get',
        }).then(response => {
            console.log(response.data.data.segments);
            pic = response.data.data.platformInfo.avatarUrl;
            respObj = `KD: ${response.data.data.segments[0].stats.kd.displayValue}
            Accuracy: ${response.data.data.segments[0].stats.shotsAccuracy.displayValue}
            Headshot Percentage: ${response.data.data.segments[0].stats.headshotPct.displayValue}
            W/L: ${response.data.data.segments[0].stats.wlPercentage.displayValue}
            Bank Account: $${response.data.data.segments[0].stats.moneyEarned.displayValue}`;
        })
        .catch(err => {
            console.log(err);
            respObj = 'Error!';
            pic = null;
        })
        // console.log(message.author);
        if(pic === null){pic='cuck';}
        message.reply({
            content: pic,
        })
        message.channel.send({
            content: respObj,
        })
        
    }
    if(message.content.includes('%u map')) {
        var respObj = 'hasnt been replaced';
        
        let resp = await axios({
            url: `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/HirachiDiamonds/segments/map`,
            headers: {"TRN-Api-Key": process.env.TRN_API_KEY,},
            method: 'get',
        }).then(response => {
            console.log(response.data);
            respObj = "success!";
        })
        .catch(err => {
            console.log(err);
            respObj = 'Error!';
        })
        if(respObj === null) {respObj = 'cuck!';}
        message.reply({
            content: respObj,
        })
    }
})

client.login(process.env.DISCORD_BOT_ID);
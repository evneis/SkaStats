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
        var pic = 'hasnt been replaced';
        var stats = 'hasnt been replaced';
        var map = commands.commandParse(message.content);
        let resp = await axios({
            url: `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/HirachiDiamonds/segments/map`,
            headers: {"TRN-Api-Key": process.env.TRN_API_KEY,},
            method: 'get',
        }).then(response => {
            console.log(response.data);
            var respList = response.data.data;
            for(var i = 0; i < respList.length; i++){
                var obj = respList[i];
                const objName = obj.metadata.name;
                // console.log(objName.toLowerCase());
                // console.log(map.toLowerCase());
                if(obj.metadata.name.toLowerCase() === map.toLowerCase()){
                    pic = obj.metadata.imageUrl;
                    console.log(pic);
                    break;
                }
            }
        })
        .catch(err => {
            console.log(err);
            pic = 'Error!';
        })
        if(pic === null) {pic = 'cuck!';}
        message.reply({
            content: pic,
        })
    }
})

client.login(process.env.DISCORD_BOT_ID);
// const globalMethods = require("./globalMethods")
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
var Datastore = require('nedb');

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}
function commandParse(str){
    if(str.includes('%u map'))
        return str.split('map ')[1];
    else if(str.includes('%u stats'))
        return str.split('stats ')[1];
}
// importing the items we need from discord.js package
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
//configuring events the bot can recieve
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

client.on('ready', () => {
    console.log('bot is ready');
})

client.on('messageCreate', async(message) => {
    if(message.content.includes('%u stats')) {
        var respObj = 'Hasnt been replaces';
        var pic = null;
        var embedTest = null;
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

            embedTest = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`Stats for ${message.author.username}`)
                //Maybe change these to the bot's stuff
                .setAuthor({name: client.user.username, iconURL: `${client.user.avatarURL({dynamic: true})}`})
                .addFields({name: 'KD', value: response.data.data.segments[0].stats.kd.displayValue, inline: true},
                    {name: 'Accuracy', value: response.data.data.segments[0].stats.shotsAccuracy.displayValue, inline: true},
                    {name: 'Headshot Percentage', value: response.data.data.segments[0].stats.headshotPct.displayValue},
                    {name: 'W/L', value: response.data.data.segments[0].stats.wlPercentage.displayValue, inline: true},
                    {name: 'Bank Account', value: `$${response.data.data.segments[0].stats.moneyEarned.displayValue}`, inline: true},
                )
                .setImage(`${response.data.data.platformInfo.avatarUrl}`);
        })
        .catch(err => {
            console.log(err);
            respObj = 'Error!';
            pic = null;
        })
        // console.log(message.author);
        if(embedTest === null){embedTest='cuck';}
        // message.reply({
        //     content: pic,
        // })
        message.channel.send({
            embeds: [embedTest],
        })
        
    }

    if(message.content.includes('%u map')) {
        var pic = 'not found';
        var stats = 'not found';
        var embedded = null;
        var map = commandParse(message.content);
        let resp = await axios({
            url: `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/HirachiDiamonds/segments/map`,
            headers: {"TRN-Api-Key": process.env.TRN_API_KEY,},
            method: 'get',
        }).then(response => {
            console.log(response.data);
            var respList = response.data.data;
            //TODO other map commands here in if statement
            for(var i = 0; i < respList.length; i++){
                var obj = respList[i];
                const objName = obj.metadata.name;
                // console.log(objName.toLowerCase());
                // console.log(map.toLowerCase());
                if(obj.metadata.name.toLowerCase() === map.toLowerCase()){
                    pic = obj.metadata.imageUrl;
                    console.log(pic);

                    stats = `Round Won: ${obj.stats.wins.displayValue}
                    Round Win Percentage: ${round((obj.stats.wins.value / obj.stats.rounds.value) * 100, 2)}%`;

                    embedded = new EmbedBuilder()
                        .setTitle(`Stats for ${message.author.username} on ${obj.metadata.name}`)
                        .setAuthor({name: client.user.username, iconURL: `${client.user.avatarURL({dynamic: true})}`})
                        .addFields({name: `Rounds Won`, value: `${obj.stats.wins.displayValue}`, inline: true},
                            {name: `Round Win Percentage`, value: `${round((obj.stats.wins.value / obj.stats.rounds.value) * 100, 2)}%`, inline: true})
                        .setImage(`${obj.metadata.imageUrl}`)
                    break;
                }
            }
        })
        .catch(err => {
            console.log(err);
            pic = 'Error!';
        })
        if(pic === null) {pic = 'cuck!';}
        // message.reply({
        //     content: pic,
        // });
        if(embedded === null){embedded = "cucky cheese!";}
        message.channel.send({
            embeds: [embedded],
        });
    }
})

client.login(process.env.DISCORD_BOT_ID);
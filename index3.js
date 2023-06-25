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
        var respObj = 'Hasnt been replaces';

        let resp = await axios({
            url: `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/hirachidiamonds`,
            headers: {"TRN-Api-Key": process.env.TRN_API_KEY,},
            method: 'get',
        }).then(response => {
            respObj = response.data.data.platformInfo.avatarUrl;
        })
        .catch(err => {
            console.log(err);
            respObj = 'Error!';
        })
        // console.log(message.author);
        if(respObj === null){respObj='cuck';}
        message.reply({
            content: respObj,
        })
    }
    else if(message.content.includes('%u map')){
        var respObj;
        var map = commands.commandParse(message.content);

        let resp = await axios({
            url: `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/hirachidiamonds/segments/map`,
            headers: {"TRN-Api-Key": process.env.TRN_API_KEY,},
            method: 'get',
        }).then(response => {
            console.log(response.data);
            var respList = response.data.data;

            for(var i = 0; i < respList.length; i++){
                var obj = respList[i];
                const objName = obj["metadata"]["name"];
                console.log(objName.toLowerCase());
                console.log(map.toLowerCase());
                if(obj.metadata.name.toLowerCase() === map.toLowerCase()){
                    respObj = obj.metadata.imageUrl;
                    console.log(respObj);
                    break;
                }
            }


        }).catch(err => {
            console.log(JSON.stringify(err));
            console.log("error hit - map")
        });

        if(respObj == null){
            respObj = "nothing found";
        }
        message.reply({
            content: PictureInPictureEvent,
        })
    }
})

client.login(process.env.DISCORD_BOT_ID);
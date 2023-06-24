const commands = require("./globalMethods")
require('dotenv').config();

const fs = require('fs').promises;
const axios = require('axios');
// importing the items we need from discord.js package
const { Client, GatewayIntentBits } = require('discord.js');
//configuring events the bot can recieve
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


//Confirmation that bot is online
client.on('ready', () => {
    console.log('bot is ready');
})


client.on('messageCreate', async (message) => {
    var quote;
    if (message.content.includes('%u help') || message.content === ('%u')) {
        message.reply({
            content: "testing",
        })
    }
    else if (message.content.includes('%u stats')) {
        var content;
        let resp = await axios.get(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/hirachidiamonds`, {
            headers: {
                "TRN-Api-Key": process.env.TRN_API_KEY
            }
        }).then(response => {
            console.log(response.data);
            content = response.data.data.platformInfo.avatarUrl;
        }).catch(err => {
            console.log(err);
        });
        if(content === null){
            content = "fuckin error bitch";
        }
        message.reply({
            content: content,
        })
    }
    else if (message.content.includes('%u map')) {
        var map = commands.commandParse(message.content);

        var pic;
        let resp = await axios.get(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/hirachidiamonds/segments/map`, {
            headers: {
                "TRN-Api-Key": process.env.TRN_API_KEY
            }
        }).then(response => {
            console.log(response.data.config.data.errors);
            var respList = response.data.data;

            for(var i = 0; i < respList.length; i++){
                var obj = respList[i];
                const objName = obj["metadata"]["name"];
                console.log(objName.toLowerCase());
                console.log(map.toLowerCase());
                if(obj.metadata.name.toLowerCase() === map.toLowerCase()){
                    pic = obj.metadata.imageUrl;
                    console.log(pic);
                    break;
                }
            }


        })
        .catch(err => {
            console.log(err)
        });
        // const quote = resp.data.content;
        if(pic == null){
            pic = "nothing found";
        }
        quote = pic;

        message.reply({
            content: quote,
        })
    }
})

client.login(process.env.DISCORD_BOT_ID);
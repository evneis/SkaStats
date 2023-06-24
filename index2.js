// import * as commands from "globalMethods.js";
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
    if (message.content === 'ping') {
        message.reply({
            content: 'pong',
        })
    }
    //TODO this must be CONTAINS
    else if (message.content.includes('%u map')) {
        var map = commands.commandParse(message.content);
        
        var pic;
        let resp = await axios.get(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/hirachidiamonds/segments/map`, {
            params: {
                "TRN-Api-Key": process.env.TRN_API_KEY
            }
        }).then(response => {
            // console.log(response.data);
            console.log(JSON.stringify(response.data.data[0].metadata.imageUrl));
            
            pic = response.data["data"][0]["metadata"]["imageUrl"];


            // fs.writeFile('response.json', JSON.stringify(response.data), function (err) {
            //     console.log(err);
            // });
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
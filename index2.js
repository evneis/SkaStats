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
    if (message.content === 'ping') {
        message.reply({
            content: 'pong',
        })
    }
    //TODO this must be CONTAINS
    else if (message.content === '%u') {
        let resp = await axios.get(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/hirachidiamonds/segments/map`, {
            params: {
                "TRN-Api-Key": process.env.TRN_API_KEY
            }
        }).then(response => {
            // console.log(response.data);
            const responseObj = JSON.parse(JSON.stringify(response.data).toString());
            console.log(responseObj)
            fs.writeFile('response.json', JSON.stringify(response.data), function (err) {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err)
        });
        // const quote = resp.data.content;
        const quote = "Response recieved!"

        message.reply({
            content: quote,
        })
    }
})

client.login(process.env.DISCORD_BOT_ID);
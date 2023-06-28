const commands = require("./globalMethods")
require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    //Change to options/selectmenu
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Returns round wins for a provided map')
        .addStringOption(option => 
            option.setName('map input')
                .setDescription('The map you would like to see stats for'))
                .setRequired(true),
    async execute(interaction) {
        const map = interaction.options.getString('map input');
        var pic = 'not found';
        var stats = 'not found';
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
                    Round Win Percentage: ${commands.round((obj.stats.wins.value / obj.stats.rounds.value) * 100, 2)}%`;
                    break;
                }
            }
        })
        .catch(err => {
            console.log(err);
            pic = 'Error!';
        })
        if(pic === null) {pic = 'cuck!';}
        await interaction.reply(pic);
        await interaction.followUp(stats);
    },
};
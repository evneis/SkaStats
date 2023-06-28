// const globalMethods = require("./globalMethods")
require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Returns overall user statistics'),
    async execute(interaction) {
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
        if(pic === null){pic='cuck';}
        await interaction.reply(pic);
        await interaction.followUp(stats);
    },
};
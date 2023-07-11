// const globalMethods = require("./globalMethods")
require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Returns overall user statistics'),
    async execute(interaction) {
        var respObj = 'Hasnt been replaces';
        var pic = null;
        var embedded;
        let resp = await axios({
            url: `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/HirachiDiamonds`,
            headers: {"TRN-Api-Key": process.env.TRN_API_KEY,},
            method: 'get',
        }).then(response => {
            console.log(response.data.data.segments);
            embedded = new EmbedBuilder()
                .setTitle(`Stats for ${interaction.user.username}`)
                .addFields({name: 'KD', value: response.data.data.segments[0].stats.kd.displayValue, inline: true},
                {name: 'Accuracy', value: response.data.data.segments[0].stats.shotsAccuracy.displayValue, inline: true},
                {name: 'Headshot Percentage', value: response.data.data.segments[0].stats.headshotPct.displayValue},
                {name: 'W/L', value: response.data.data.segments[0].stats.wlPercentage.displayValue, inline: true},
                {name: 'Bank Account', value: `$${response.data.data.segments[0].stats.moneyEarned.displayValue}`, inline: true},
            )
            .setImage(`${response.data.data.platformInfo.avatarUrl}`);
            // pic = response.data.data.platformInfo.avatarUrl;
            // respObj = `KD: ${response.data.data.segments[0].stats.kd.displayValue}
            // Accuracy: ${response.data.data.segments[0].stats.shotsAccuracy.displayValue}
            // Headshot Percentage: ${response.data.data.segments[0].stats.headshotPct.displayValue}
            // W/L: ${response.data.data.segments[0].stats.wlPercentage.displayValue}
            // Bank Account: $${response.data.data.segments[0].stats.moneyEarned.displayValue}`;
        })
        .catch(err => {
            console.log(err);
            respObj = 'Error!';
            pic = null;
        })
        if(embedded === null){embedded='cuck';}
        await interaction.reply({embeds: [embedded]});
        // await interaction.followUp(stats);
    },
};
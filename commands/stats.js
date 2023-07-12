// const globalMethods = require("./globalMethods")
require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var userdb = require("../db");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Returns overall user statistics'),
    async execute(interaction) {
        var respObj = 'Hasnt been replaces';
        var pic = null;
        var embedded;
        var username = await new Promise((resolve, reject) => {
            userdb.db.findOne({ discord: `${interaction.user.id}` }, function (err, doc) {
                if (doc) {
                    username = doc.username;
                    console.log(doc.username);
                    resolve(doc.username);
                } else {
                    console.log("no doc");
                }
            });

        });
        let resp = await axios({
            url: `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${username}`,
            headers: {"TRN-Api-Key": process.env.TRN_API_KEY,},
            method: 'get',
        }).then(response => {
            console.log(response.data.data.segments);
            embedded = new EmbedBuilder()
                .setTitle(`Stats for ${interaction.user.username}`)
                // .setAuthor({name: client.user, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
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
        if(embedded === null){embedded='cuck';}
        await interaction.reply({embeds: [embedded]});
        // await interaction.followUp(stats);
    },
};
// const globalMethods = require("../globalMethods")
var userdb = require("../db");
require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder, Client, GatewayIntentBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weapon')
        .setDescription('Returns statistics for a provided map')
        .addStringOption(option =>
            option.setName('weapon')
                .setDescription('The weapon you would like to see stats for')
                .setRequired(true)),
    async execute(interaction) {
        const weap = interaction.options.getString('weapon');
        var embedded;
        var notEmbed;
        var flag = false;
        var flag2 = false;
        var username = await new Promise((resolve, reject) => {
            userdb.db.findOne({ discord: `${interaction.user.id}` }, function (err, doc) {
                if (doc) {
                    username = doc.username;
                    console.log(doc.username);
                    resolve(doc.username);
                } else {
                    console.log("no doc");
                    resolve(null);
                }
            });

        });
        if(!username){
            await interaction.reply({ content: `No user registered`, ephemeral: true });
            return;
        }
        let resp = await axios({
            url: `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${username}/segments/weapon`,
            headers: { "TRN-Api-Key": process.env.TRN_API_KEY, },
            method: 'get',
        }).then(response => {
            // console.log(response.data);
            var respList = response.data.data;
            for (var i = 0; i < respList.length; i++) {
                if (weap.toLowerCase() === 'list') {
                    flag = true;
                    flag2 = true;
                    var allWeaps = `Available Weapons:
                    `;
                    for (var j = 0; j < respList.length; j++) {
                        allWeaps = allWeaps.concat(`${respList[j].metadata.name}
                        `);
                    }
                    notEmbed = allWeaps;
                    break;
                }

                var obj = respList[i];
                const objName = obj.metadata.name;
                if (obj.metadata.name.toLowerCase() === weap.toLowerCase()) {
                    embedded = new EmbedBuilder()
                        .setTitle(`${obj.metadata.name} stats for ${interaction.user.username}`)
                        .addFields({ name: `Kills`, value: `${obj.stats.kills.displayValue}` },
                            { name: `Shots Fired`, value: `${obj.stats.shotsFired.displayValue}` },
                            { name: `Accuracy`, value: `${obj.stats.shotsAccuracy.displayValue}` })
                        .setImage(`${obj.metadata.imageUrl}`);
                    flag2 = true;
                    break;
                }
            }
        }).catch(err => {
            console.log(err);
        });

        if (!embedded) embedded = `CUCK!`;
        if(!flag2)
            await interaction.reply({content: "No Weapon Found", ephemeral: true})
        else if (flag)
            await interaction.reply(notEmbed);
        else
            await interaction.reply({ embeds: [embedded] });
    },
};
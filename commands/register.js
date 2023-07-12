require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var userdb = require("../db");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register name for stats')
        .addStringOption(option =>
            option.setName('username')
            .setDescription('username EXACTLY as seen in Steam profile URL (after /id/')
            .setRequired(true)),
    async execute(interaction) {
        //Datastore interactions here
        const username = interaction.options.getString('username');
        const discordUser = interaction.user.id;
        // var output = 'not replaced';
        var flag = false;
        var output = await new Promise((resolve, reject) => {
            userdb.db.update({ discord: `${discordUser}` }, { discord: `${discordUser}`, username: `${username}` }, { upsert: true }, function (err, numReplaced, upsert) {
                if(err){
                    console.log(err);
                    flag = true;
                    resolve("Error ocurred, please try again");
                }else{
                    console.log(`output recorded? ${username}`);
                    resolve(`Registered to ${username}`);
                }
            });
        })
        
        await interaction.reply({ content: output, ephemeral: true});
        //TODO: I think we can get rid of all of this and simply reply with output
        // if(!flag){
        //     console.log("no flag");
        //     output = `Registered to ${username}`;
        //     console.log(`output recorded? ${output}`);
        //     await interaction.reply({content: output, ephemeral: true});
        //     return;
        // }

        // if(!output){output = 'CUCKO!';}
        // await interaction.reply({ content: output, ephemeral: true });
    },
};
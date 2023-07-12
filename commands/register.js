require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var Datastore = require('nedb');
var db = new Datastore({filename: `users.db`, autoload: true});

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
        var output = 'not replaced';
        var flag = false;
        db.update({ discord: `${discordUser}` }, { discord: `${discordUser}`, username: `${username}` }, { upsert: true }, function (err, numReplaced, upsert) {
            if(err){
                console.log("in error");
                flag = true;
                output = "Error ocurred, please try again";
            }
        });

        if(!flag){
            console.log("no flag");
            output = `Registered to ${username}`;
            console.log(`output recorded? ${output}`);
        }

        // db.findOne({ discord: `${discordUser}` }, function(err, doc) {
        //     if(doc.name != null){

        //     }
        // });
        if(!output){output = 'CUCKO!';}
        await interaction.reply({ content: output, ephemeral: true });
    },
};
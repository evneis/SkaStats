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
            .setDescription('username as seen in Steam profile URL')
            .setRequired(true)),
    async execute(interaction) {
        //Datastore interactions here
        const username = interaction.options.getString('username');
        const discordUser = interaction.user.id;
        
        db.findOne({ discord: `${discordUser}` }, function(err, doc) {
            if(doc.name != null){

            }
        });
    },
};
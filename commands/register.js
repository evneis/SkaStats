require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var Datastore = require('nedb');
const { SlashCommandBuilder, EmbedBuilder, Client, GatewayIntentBits } = require('discord.js');


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
        const user = interaction.options.getString('username');
    },
};
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
        const mapR = interaction.options.getString('map input');
    },
};
const commands = require("./globalMethods")
require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Returns overall user statistics'),
    async execute(interaction) {
        await interaction.reply('cuck');
    },
};
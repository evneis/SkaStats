// const globalMethods = require("./globalMethods")
require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder, Client, GatewayIntentBits } = require('discord.js');
var Datastore = require('nedb');
var db = new Datastore({filename: `users.db`, autoload: true});
// const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

module.exports = {
    //Change to options/selectmenu
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Returns round wins for a provided map')
        .addStringOption(option => 
            option.setName('map')
                .setDescription('The map you would like to see stats for')
                .setRequired(true)),
    async execute(interaction) {
        const map = interaction.options.getString('map');
        var pic = 'not found';
        var stats = 'not found';
        var embedded;
        var notEmbed;
        var flag = false;
        var username;
        db.findOne({discord: `${interaction.user.id}`}, function(err, doc){
            if(doc)
                username = doc.username;
        });

        let resp = await axios({
            url: `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${username}/segments/map`,
            headers: {"TRN-Api-Key": process.env.TRN_API_KEY,},
            method: 'get',
        }).then(response => {
            console.log(response.data);
            var respList = response.data.data;
            //TODO other map commands here in if statement
            for(var i = 0; i < respList.length; i++){
                if(map.toLowerCase() === 'list'){
                   flag = true;
                   var allMaps = `Available Maps:
                   `;
                   for(var j=0; j<respList.length;j++){
                        allMaps = allMaps.concat(`${respList[j].metadata.name}
                        `);
                   }
                   notEmbed = allMaps;
                   break;
                }
                var obj = respList[i];
                const objName = obj.metadata.name;
                // console.log(objName.toLowerCase());
                // console.log(map.toLowerCase());
                if(obj.metadata.name.toLowerCase() === map.toLowerCase()){
                    pic = obj.metadata.imageUrl;
                    console.log(pic);

                    stats = `Round Won: ${obj.stats.wins.displayValue}
                    Round Win Percentage: ${round((obj.stats.wins.value / obj.stats.rounds.value) * 100, 2)}%`;

                    console.log(interaction.user.id);
                    embedded = new EmbedBuilder()
                        .setTitle(`Stats for ${interaction.user.username} on ${obj.metadata.name}`)
                        // .setAuthor({name: client.user, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
                        .addFields({name: `Rounds Won`, value: `${obj.stats.wins.displayValue}`, inline: true},
                            {name: `Round Win Percentage`, value: `${round((obj.stats.wins.value / obj.stats.rounds.value) * 100, 2)}%`, inline: true})
                        .setImage(`${obj.metadata.imageUrl}`);
                    
                    break;
                }
            }
        })
        .catch(err => {
            console.log(err);
            pic = 'Error!';
        })

        if(embedded === null) {embedded = 'cuck!';}
        // await interaction.reply(pic);
        if(flag){
            await interaction.reply(notEmbed);
        }else{
            await interaction.reply({embeds: [embedded]});
        }
    },
};
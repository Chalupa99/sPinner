function highlight(message){
  message.reply('<@LOL> check this out.');
}

//require('dotenv').config({path: '.env'});
//console.log(process.env); // remove this after you've confirmed it working

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });
const token = require('./loginToken');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
  if (msg.content.toLowerCase().includes("*pin")){
      msg.react('📌');

      const role = '<@$703874524134768681>';
      console.log(`${role.toString()}`)

      //msg.reply(`${role.toString()}`);

      const users = [];
      var counter = 0;

      const filter = (reaction, user) => {
          return reaction.emoji.name === '📌' && user.id !== client.user.id;
      };
  
      const collector = msg.createReactionCollector({ filter, max: 20 });
      
      collector.on('collect', (reaction, user) => {
          //msg.reply(`Collected ${reaction.emoji.name} from ${user.tag}`);
          console.log(`Collected ${reaction.emoji.name}, current count: ${collector.total}`);

          if (!users.includes(user.id)) {
              users.push(user.id);
              counter = counter + 1;
          }
          if (counter == 5) {
              highlight(msg);
          }
          if (counter == 10) {
              msg.pin();
              collector.stop();
          }
      });
      collector.on('end', col => {
          console.log(`Collected ${collector.total} items`);
      });
  }

  if(msg.pinned){
      //client.on('messageCreate', m =>)
  }
});

client.login(token);

const dotenv = require('dotenv');
const Discord = require('discord.js');

dotenv.config();

if ( typeof process.env.DISCORD_TOKEN === 'undefined' || !process.env.DISCORD_TOKEN ) {
  console.error('Error: Discordのトークンが設定されていません。');
  console.error('.env.exampleを参考に.envファイルを作成しトークンを設定してください。');
  process.exit(1);
}
const token = process.env.DISCORD_TOKEN;

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`${client.user.username}でログインしました。`)
})

client.on('message', async message => {
  const author = message.author.username;
  if ( ['ブキ', 'ぶき', '武器'].includes(message.content) ) {
    message.reply(`${author}`)
  }
})

client.login(token);
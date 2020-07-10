const dotenv = require('dotenv');
const Discord = require('discord.js');
const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

dotenv.config();

if ( typeof process.env.DISCORD_TOKEN === 'undefined' || !process.env.DISCORD_TOKEN ) {
  console.error('Error: Discordのトークンが設定されていません。');
  console.error('.env.exampleを参考に.envファイルを作成しトークンを設定してください。');
  process.exit(1);
}
const token = process.env.DISCORD_TOKEN;

(async () => {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ika2bot.firebaseio.com"
  });
  const db = admin.firestore();
  const weapons = await db.collection('weapons').get();

  const client = new Discord.Client();

  client.on('ready', () => {
    console.log(`${client.user.username}がログインしました！`);
  })

  client.on('message', async message => {
    const random = Math.floor( Math.random() * weapons.docs.length );
    const weapon = weapons.docs[random].data();
    if ( ['ブキ', 'ぶき', '武器'].includes(message.content) ) {
      message.channel.send(`${message.author} 次は「**${weapon.name}**」を使おう！`);
    }
  })

  client.login(token);

})();


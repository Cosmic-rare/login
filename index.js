const { Client, Intents, MessageButton, MessageActionRow } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const hash = require('./modules/random.js'); // hash作成関数の読み込み
const add = require('./modules/add.js')

client.on('ready', () => {
    console.log(`${client.user.tag} でログインしています。`) 
})

client.on('messageCreate', async message => {
    if (message.content.startsWith("!button")) {
        const tic1 = new MessageButton()
            .setCustomId("contact")
            .setStyle("PRIMARY")
            .setLabel("ログイン")
        // ボタンを表示する
        await message.channel.send({
            content: "ログインはこちらから",
            components: [new MessageActionRow().addComponents(tic1)]
        });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.customId === "contact") {
        // hash生成
        data = hash(interaction.user.id);
        await interaction.reply({
            // 生成したhashをurlに埋め込む
            content: `http://localhost:5000/${interaction.user.id}/${data}`,
            ephemeral: false
        });
        add(interaction.user.id, data);
    }
});

require('dotenv').config(); // 読み込んでログイン

client.login(process.env.TOKEN)
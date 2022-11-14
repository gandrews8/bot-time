//Discord moment
//IDK what the fuck packages are required at this point just install them all as errors occur
const Discord = require('discord.js')
const cheerio = require('cheerio')
const axios = require('axios')
const { createAudioResource, joinVoiceChannel,createAudioPlayer } = require('@discordjs/voice');


const client = new Discord.Client({
  intents: [ // Discord moment
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildBans,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildWebhooks,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.MessageContent,
  ],
  partials: [
    Discord.Partials.User,
    Discord.Partials.Channel,
    Discord.Partials.GuildMember,
    Discord.Partials.Message,
    Discord.Partials.Reaction
  ]
})
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Cancer function go
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (message.content !== '!flashbang') return;

  //Message moment
  let channel = message.channel;
  let image = await flashbang();
  message.channel.send({content:'Throwing a flashbang!', files: [image]})

  //Voice moment
  let voice = message.member.voice.channel
  if (!voice) return
  let resource = createAudioResource('./flashbang.mp3',{inlineVolume: true})
  resource.volume.setVolume(.2);
  const connection = joinVoiceChannel({
    channelId: voice.id,
    guildId: voice.guild.id,
    adapterCreator: voice.guild.voiceAdapterCreator,
  });
  const player = createAudioPlayer();
  connection.subscribe(player);
  player.play(resource);
  await sleep(2000)
  connection.destroy()
});

//Porn time
const url = 'https://rule34.xxx/index.php?page=post&s=random'
async function flashbang() {
  let result = await axios.get(url)
  const $ = cheerio.load(result.data);
  let image = $('.flexi').find('img').attr('src');
  return image;
}

async function sleep(ms) {
  return new Promise(res => setTimeout(() => res(), ms))
}

client.login("MTA0MDE0MDM0NTI2NDA2NjU5MQ.GTtoMq.aAkrUVcXUp_l8GHE2RTyPFX7wMecHVv2U6ph4E");
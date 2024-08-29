const express = require('express');
const app = express();
app.listen(() => console.log(('System Shop DTH ↗️ ')));
app.use('/ping', (req, res) => {  res.send(new Date());
});

app.listen(3000, () => {
  console.log('Bot Started !');
});

const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 100; 

const { Client, Collection,Intents,MessageActionRow,MessageButton,MessageEmbed,MessageSelectMenu,Permissions , Discord, EmbedBuilder, Modal, TextInputComponent } = require('discord.js');
const fs = require('fs')
const inlinereply = require('discord-reply');
const probot = require("probot-tax");
const data = require("./config.json")
const mainGuildID = require("./config.json")
const coolDown = new Set()    
const dotenv = require('dotenv')
const db = require("pro.db")
const mongoose = require("mongoose")
dotenv.config()


let prefix = "-" //بريفكس
const colorE = "#878787" //كود الوان 
const talabtRoom = "1247840266665197638" //ايدي روم طلبات 
const emjTrue = "✅" //حط اموجي الصح 
const emjFalse = "❌" //حط اموجي الغلط   
const montagat = "1216852008699691208" // ايدي روم منتجات
const staffManagerRole = "1215656953267880006"//ايدي رتبه اداره
const discorsLeader = "1215656953267880006"//ايدي رتبه اداره
const OfficialRole = "1215656953267880006"//ايدي رتبه اداره
const discordstaff = "1215656953267880006"//ايدي رتبه اداره
const RolesRole = "1215656953267880006" //ايدي رتبه اداره
const allowedRole = "1215656953267880006" //ايدي رتبه اداره
const lineLink = "https://media.discordapp.net/attachments/1005558964102103130/1253806724150726676/20240224_074121.jpg?ex=66788381&is=66773201&hm=2f6739a917f0fdd5e46c246cc1f30b686ac78ca189e29e4dc2658be8b790ab92&" // رابط الخط 

  let client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION "], repliedUser: false, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING] });

module.exports = client

client.config = data

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});
process.on('typeError', error => {
  console.error('Unhandled type rejection:', error);
});

const chalk = import('chalk');

client.on('ready', () =>{
   console.log("\x1b[31m", `BotName: ${client.user.tag}\nBotPrefix: / `
            );
  console.log("\x1b[32m", `Servers Count : ${client.guilds.cache.size}`)
  console.log(`Users Count : ${client.guilds.cache
.reduce((a, b) => a + b.memberCount, 0)
.toLocaleString()}`)
  client.user.setActivity(client. config.Activity, {type: client.config.ActivityType})
})

mongoose.connect(process.env.mongodb).then(() => console.log("\x1b[36m", `Data Connected `));

const obfuscator = require('javascript-obfuscator');

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ob') {
    if (!args.length) {
      return message.reply('Send Code to obfuscator and check dm');
    }
   message.delete()



    const code = args.join(' ');

    try {
      const obfuscatedCode = obfuscator.obfuscate(code).getObfuscatedCode();

      const user = await client.users.fetch(message.author.id);
      user.send(`Obfuscated code:\n\`\`\`js\n${obfuscatedCode}\`\`\`\nDont forget to rate Kimo`);
    } catch (err) {
      const user = await client.users.fetch(message.author.id);
      user.send('Erorr Please Check This Code , Check Dm');
    }
  }
});

client.on('shardError', error => {
  console.error('A websocket connection encountered an error:', error);
});
client.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  const developer = client.users.cache.get(developerId);
  if (developer) {
    developer.send(`خطأ :\n\`\`\`${reason}\`\`\``)
      .catch(console.error);
  }
});
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 3 * 1000 * 60);

////////////////// كود خط تلقائي 

      let autoline_channel = ['','','','','','','','','',''] // ايدي الرومات بيع (تقدر تضيف اكثر من روم)
      let line = `https://media.discordapp.net/attachments/1005558964102103130/1253806724150726676/20240224_074121.jpg?ex=66788381&is=66773201&hm=2f6739a917f0fdd5e46c246cc1f30b686ac78ca189e29e4dc2658be8b790ab92&` //رابط الخط

      client.on(`messageCreate`, async message => {
              if(message.channel.type === "DM"|| message.author.bot) return
              if(autoline_channel.includes(message.channel.id)) {
                      message.channel.send({files : [line]})
              }
     })   

////////////////// كود ضريبة بروبوت 

const TaxChannel = "1253807856340434995" //ايدي روم ضرائب

client.on("messageCreate", message => {
 if(message.channel.type === "dm" || 
  message.author.bot) return

if(TaxChannel.includes(message.channel.id)){

  var args = message.content.split(' ').slice(0).join(' ')
if(!args) return;

if (args.endsWith("m")) args = args.replace(/m/gi, "") * 1000000;
else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
else if (args.endsWith("K")) args = args.replace(/K/gi, "") * 1000;
else if (args.endsWith("M")) args = args.replace(/M/gi, "") * 1000000;
     let args2 = parseInt(args)
    let tax = Math.floor(args2 * (20) / (19) + (1))
    let tax2 = Math.floor(args2 * (20) / (19) + (1) - (args2))
    let tax3 = Math.floor(tax2 * (20) / (19) + (1))
    let tax4 = Math.floor(tax2 + tax3 + args2)

    let Taxembed = new MessageEmbed()

   .setThumbnail(client.user.avatarURL({ dynamic: true }))   
.addField(`السعر بدون ضرايب : `,`${args2 - (args2 * 0.05)}`)
.addField(`السعر مع ضرايب :`,`${tax}`)
.addField(`ضرايب الوسيط (2.5%) بدون نسبة :`,`${args2 + (args2 * 0.025)}`)
.addField(`ضرايب الوسيط (2.5%) مع نسبة :`,`${tax + (args2 * 0.025)}`)
.addField(`نسبة الوسيط :`,`${args2 * 0.025}`)
.addField(`التحويل بدون ضرايب :`,`${args2 - (args2 * 0.05)}`)
        .setColor(colorE)
      //.setColor(message.guild.me.displayColor)
  .setTimestamp()
message.reply({embeds: [Taxembed]})
        message.channel.send(`${lineLink}`).catch((err) => {
   console.log(err.message)
   });    
  }
}); 

///////////// كود خطط

client.on('messageCreate', message => {
  if (message.content === (`line`)) {
message.channel.send(`${lineLink}`)
message.delete()
  }
})

////////////////// كود نداء شخص

  client.on('messageCreate', async message => {
  const allowedRoles = ['1215656953267880006']; //ايدي رتبه تقدر تستعمل الامر

  if (message.content.startsWith(prefix + 'come') && message.guild) {
    const member = message.member;

    if (member && member.roles.cache.some(role => allowedRoles.includes(role.id))) {
      const args = message.content.slice(6).trim().split(/ +/);

      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!user) {
        return message.reply('**Mention A User **')
      }

      await user.send({
        content: `
**هنالك من يحتاجك في : **<#${message.channel.id}>
**الشخص المحتاج اليك :** ${user}`
      })
      message.reply(`**> | Done Send **`);
    }
  }
})

////////////////// كود تغير حالات بوت

client.on("messageCreate", async message => {
if(message.content.startsWith(prefix + "setstatus")) { 
 const comp = new MessageActionRow()
 function newButton(style,customId,label){let styles = {
   azrq:"PRIMARY",rmade: "SECONDARY", 
   akdr:"SUCCESS",a7mr: "DANGER"}    
   let btn = new MessageButton().setStyle(styles[style])                        
   .setCustomId(customId).setLabel(label) 
   comp.addComponents(btn)           
   return btn;             
   }    
        let eme={
         description:"🟢 | online \n 🟡 | idle\n🔴 | dnd  "
        }
        newButton("rmade","onlinestatus","🟢")
        newButton("rmade","idlestatus","🟡")
        newButton("rmade","dndstatus","🔴")
        const sendstatu= await message.channel.send({embeds:[eme],components:[comp]})
        let filter = m => m.user.id === message.member.id;
        const c = sendstatu.createMessageComponentCollector({filter})
        c.on('collect',async(int)=>{
         if(int.isButton()) { 
            if(int.customId === 'onlinestatus') { 
                 await client.user.setStatus('online')
                 int.message.delete();
                 message.channel.send('**تم تعيين حالة البوت : 🟢**')
            } else if(int.customId === 'idlestatus') { 
             await client.user.setStatus('idle')
             int.message.delete();
             message.channel.send('**تم تعيين حالة البوت : 🟡**')
            } else if(int.customId === 'dndstatus') { 
             await client.user.setStatus('dnd')
             int.message.delete();
             message.channel.send('**تم تعيين حالة البوت : 🔴**')
            } 
         }
        })
    }
})


/////////////// كود بنق بوت

client.on('messageCreate', async (message) => {
  if (message.content === prefix + 'ping') {
    const member = message.member;
    const allowedRole = message.guild.roles.cache.find(role => role.name === '1247718931607720027'); //اسم رتبه يلي تقدر تستعمل امر

    if (member.roles.cache.has(allowedRole.id)) {

      message.channel.sendTyping()


        const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("1")
          .setLabel(`PONG!`)
          .setStyle('SUCCESS')
          .setDisabled(true)
          .setEmoji("😉")
      );
   let circles = {
      supa: "🤯",
      zap: "⚡",
      green: "🟢",
      yellow: "🟡",
      red: "🔴",
      ew: "💢"
  }

 let ping = client.ws.ping

    let embed = new MessageEmbed()
        .setTitle('🏓 Pong!')
        .setDescription(`${ping <= 20 ? circles.supa : ping <= 40 ? circles.zap : ping <= 150 ? circles.green : ping <= 300 ? circles.yellow : ping <= 750 ? circles.red : cirles.ew} | ${ping} ms`)
        .setColor('#878787')
        .setThumbnail("https://media.discordapp.net/attachments/1005558964102103130/1253806724150726676/20240224_074121.jpg?ex=66788381&is=66773201&hm=2f6739a917f0fdd5e46c246cc1f30b686ac78ca189e29e4dc2658be8b790ab92&")
        .setFooter(`Status: ${ping <= 20 ? "Extremely good" : ping <= 40 ? "Very good" : ping <= 150 ? "good" : ping <= 300 ? "bad" : ping <= 750 ? "very bad" : "Extremely bad"}!`);
        message.reply(`wait ....`).then(msg => {  msg.edit({content: ` ` , embeds: [embed] , components: [row]})});
    } else {
      message.channel.send('أنت لا تمتلك الرتبة المسموحة لاستخدام هذا الأمر.');
    }
  }
});

/////////////// كود ساي بدون امبد

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "say") {
    try {
      const text = args.join(' ');
      if (!text) {
        return message.reply('**حط الكلام الي تبيه .**');
      }

      await message.channel.send(text);
      await message.delete();
    } catch (error) {
      console.error(error);
    }
  }
});

/////////////// كود استلام تكت 

client.on("messageCreate", message => {
  if (message.content.startsWith(prefix + "staff-role")) {
    if (message.member.permissions.has("ADMINISTRATOR")) {

      let r = message.content.split(" ").slice(1).join(" ")
      let role = message.guild.roles.cache.find(r => r.id == r)
      if (!r) {
        if (!role) {
          if (isNaN(r)) {
            message.reply("> **Error : Please put the rank ID**")
          }
        }
      }
      const db = require("pro.db");
      db.set(`role_${message.guild.id}`, r)
      message.reply(`> **تم تعيين رتبة <@&${r}> مستخدم لـ زر الكلايم .**`)
    }
  }
});

client.on("channelCreate", channel => {
  if (channel.name.startsWith("تذكرة-")) {
    let embed = new MessageEmbed()
      .setDescription("**إضغط على الزر لتصبح مسؤول التذكرة**")
      .setColor("B7B7B7")
    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Claim")
        .setCustomId("idk")
        .setStyle("SECONDARY")
    )
    setTimeout(() => {
      channel.send({ embeds: [embed], components: [row] }).then(m => db.set(`message_${channel.id}`, m.id))

    }, 1000);
  }
});

client.on('interactionCreate', async interaction => {
    var member;
    let role = interaction.guild.roles.cache.find(role => role.id === "1215656953267880006"); // ايدي رول اللى يستلم التكت
    if(interaction.isButton){

        if(interaction.customId === `idk`){
          if(interaction.member.roles.cache.some(role => role.id === "1215656953267880006")) // حط هنا ايدي الرتبة اللى تستلم التكت
            {
            await interaction.message.delete();
               const db = require("pro.db");
        db.add(`weekuser_${interaction.member.id}`, 1)
        db.add(`alluser_${interaction.member.id}`, 1)
          const embed = new MessageEmbed()
          .setColor("B7B7B7")
          .setDescription(`**لقد تم استلام التكت من قبل <@${interaction.user.id}>**`)
          const product = new MessageActionRow()
          .addComponents(
              new MessageButton()
                  .setCustomId('idk1')
                  .setLabel('ترك التكت')
                  .setStyle('#B7B7B7'),

          )

              
          interaction.channel.send({ embeds: [embed], components: [product]});
          const everyone = interaction.guild.roles.cache.find(r => r.name === "𝐃𝐓𝐇  • Staff");//اسم رتبه اداره
          let l1 = interaction.user;
           let l = l1
           const filter = i => i.customId === 'idk1' && i.user.id === interaction.member.id;

           const collector = interaction.channel.createMessageComponentCollector({filter});

           collector.on('collect', async i => {

            if (i.customId === 'idk1') {

            if(interaction.member.roles.cache.some(role => role.id === "1215656953267880006")) //ايدي رتبة اداره
              {
                  await i.message.delete();
                const embed = new MessageEmbed()
                .setColor("#B7B7B7")
                .setDescription(`**لقد تم ترك التكت من قبل <@${interaction.user.id}>**`);
                const product = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('idk')
                        .setLabel('استلام')
                        .setStyle('SUCCESS'),

                )
               interaction.channel.send({ content: `${role}` , embeds: [embed], components: [product]});
                const everyone = interaction.guild.roles.cache.find(r => r.name === "𝐃𝐓𝐇  • Staff"); //اسم رتب اداره
                        db.subtract(`weekuser_${interaction.member.id}`, 1)
        db.subtract(`alluser_${interaction.member.id}`, 1) 


                interaction.channel.permissionOverwrites.delete(interaction.member.id)
                const unclaim = "UnClaimed"
                  interaction.channel.permissionOverwrites.edit(interaction.member.id,{SEND_MESSAGES: true})

interaction.channel.setName("ticket-" + interaction.user.username);                interaction.channel.permissionOverwrites.edit(role,{SEND_MESSAGES: true})
                 interaction.channel.setName("ticket-غير-مستلم")
                collector.stop();
                }else{
                  interaction.followUp({ 
                      content: `ماشفتك تستخدم الزر ؟`,
                      ephemeral: true 

                    })

                  return;
              }



            }

          });
          interaction.channel.permissionOverwrites.edit(interaction.member.id,{SEND_MESSAGES: true})

          interaction.channel.setName("ticket-" + interaction.user.username);
          interaction.channel.permissionOverwrites.edit('1247717765876420620',{SEND_MESSAGES: false}) //ايدي رتبه يلي تقدر ترسل بعد احد يستلم تكت
          interaction.channel.permissionOverwrites.edit('1215656953267880006',{VIEW_CHANNEL: true}) //ايدي رتبه يلي ماتقدر ترسل بعد احد يستلم تكت
          }else{
            interaction.followUp({ 
                content: `ماشفتك تستخدم الزر ؟`,
                ephemeral: true 
              })
            return;
        }
        return;
        }


    }
});

////////////////// كود اضافه نقطه من استلام تكت للداري
client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "addticket")) {
    if (message.member.roles.cache.some(r=> r.id == 1150011777329930290)) { //ايدي رتبه تقدر تستعمل الامر 
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`weekuser_${user.id}`, args2)
      await db.add(`alluser_${user.id}`, args2)
      let embed = new MessageEmbed()
        .setDescription(`**Done added ${args2} ticket points to ${user}**`)
        .setColor("#B7B7B7")
      message.reply({ embeds: [embed] })
    }
  }
});;;

////////////////// كود اضافه نقطه من استلام تكت للداري

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "allticket")) {
    if (message.member.roles.cache.some(r=> r.id == 1150011777329930290)) { //ايدي رتبه تقدر تستعمل الامر 
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`alluser_${user.id}`, args2)
      let embed = new MessageEmbed()
        .setDescription(`**Done added ${args2} ticket points to ${user}**`)
        .setColor("#B7B7B7")
      message.reply({ embeds: [embed] })
    }
  }
});

////////////////// كود اضافه نقطه من ميوتات للداري

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "mute(+)")) {
    if (message.member.roles.cache.some(r=> r.id == 1247717765876420620)) { //ايدي رتبه تقدر تستعمل الامر
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`muteweek_${user.id}`, args2)
      await db.add(`muteall_${user.id}`, args2)
      let embed = new MessageEmbed()
        .setDescription(`**Done added ${args2} mute points to ${user}**`)
        .setColor("#B7B7B7")
      message.reply({ embeds: [embed] })
    }
  }
});

////////////////// كود اضافه نقطه من ميوتات للداري

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "allmute(+)")) {
    if (message.member.roles.cache.some(r=> r.id == 1247717765876420620)) { //ايدي رتبه تقدر تستعمل الامر
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`muteall_${user.id}`, args2)
      let embed = new MessageEmbed()
        .setDescription(`**Done added ${args2} mute points to ${user}**`)
        .setColor("#B7B7B7")
      message.reply({ embeds: [embed] })
    }
  }
});

////////////////// كود اضافع نقطه من تحذيرات للداري

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "allwarn(+)")) {
    if (message.member.roles.cache.some(r=> r.id == 1247717765876420620)) { //ايدي رتبه تقدر تستعمل الامر 
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`allwarns_${user.id}`, args2)
      let embed = new MessageEmbed()
        .setDescription(`**Done added ${args2} warn points to ${user}**`)
        .setColor("#B7B7B7")
      message.reply({ embeds: [embed] })
    }
  }
});

/////////// كود ازالة نقطه من استلام تكت للداري

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "ticket(-)")) {
    if (message.member.roles.cache.some(r=> r.id == 1247717765876420620)) { //ايدي رتبه تقدر تستعمل الامر
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      if (!db.has(`weekuser_${user.id}`)) return message.reply("**This user does not have any points**")
      if (!db.has(`alluser_${user.id}`)) return message.reply("**This user does not have any points**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be removed**")
      await db.subtract(`weekuser_${user.id}`, args2)
await db.subtract(`alluser_${user.id}`, args2)

      let embed = new MessageEmbed()
        .setDescription(`**Done removed ${args2} ticket points from ${user}**`)
        .setColor("#B7B7B7")
      message.reply({ embeds: [embed] })
    }
  }
});

///////// كود اضافه نقطه من تحذيرات للداري

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "warn(+)")) {
    if (message.member.roles.cache.some(r=> r.id == 1247717765876420620)) { //ايدي رتبه تقدر تستعمل الامر
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`weekwarns_${user.id}`, args2)
      await db.add(`allwarns_${user.id}`, args2)
      let embed = new MessageEmbed()
        .setDescription(`**Done added ${args2} warn points to ${user}**`)
        .setColor("#B7B7B7")
      message.reply({ embeds: [embed] })
    }
  }
});

///////////كود ازالة نقطه من تحذيرات للداري

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "warn(-)")) {
    if (message.member.roles.cache.some(r=> r.id == 1247717765876420620)) { //ايدي رتبه تقدر تستعمل الامر
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      if (!db.has(`weekwarns_${user.id}`)) return message.reply("**This user does not have any points**")
      if (!db.has(`allwarns_${user.id}`)) return message.reply("**This user does not have any points**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be removed**")
      await db.subtract(`weekwarns_${user.id}`, args2)
      await db.subtract(`allwarns_${user.id}`, args2)
      let embed = new MessageEmbed()
        .setDescription(`**Done removed ${args2} warn points from ${user}**`)
        .setColor("#B7B7B7")
      message.reply({ embeds: [embed] })
    }
  }
});

////////// كود ازالة نقطه من ميوتات للداري

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "mute(-)")) {
    if (message.member.roles.cache.some(r=> r.id == 1247717765876420620)) { //ايدي رتبه تقدر تستعمل الامر
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      if (!db.has(`muteweek_${user.id}`)) return message.reply("**This user does not have any points**")
      if (!db.has(`muteall_${user.id}`)) return message.reply("**This user does not have any points**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be removed**")
      await db.subtract(`muteweek_${user.id}`, args2)
      await db.subtract(`muteall_${user.id}`, args2)
      let embed = new MessageEmbed()
        .setDescription(`**Done removed ${args2} mute points from ${user}**`)
        .setColor("#878787")
      message.reply({ embeds: [embed] })
    }
  }
});

////////////////// كود استلام تكت

client.on("messageCreate", message => {
  if (message.content == prefix + "claim") {

    if (message.member.permissions.has("ADMINISTRATOR")) {


      let embed = new MessageEmbed()
        .setDescription("**إضغط على الزر لتصبح مسؤول التذكرة**")
        .setColor("#878787")
      let row = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Claim")
          .setCustomId("idk")
          .setStyle("SECONDARY")
      )
       const db = require("pro.db");
      message.delete()
      message.channel.send({ embeds: [embed], components: [row] 
  }).then(m => db.set(`message_${message.channel.id}`, m.id))
    }
  }

});

/////////////// كود يطلع كم شخص يمتلك رتبه معينه

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix + 'roles')) {
    const roles = message.mentions.roles.first() || message.guild.roles.cache.find((x) => x.id == message.content.split(' ')[1]) || message.guild.roles.cache.find((x) => x.name == message.content.split(' ').slice(1).join(' '));
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      message.reply({ content: '**انت لا تمتلك صلاحيات `Administrator` !**' });
      return;
    }

    const members = roles.members.map((e) => ` <@${e.user.id}>`);
    const membersCount = roles.members.size;

    const MAX_LENGTH = 2000;
    const chunks = [];
    let currentChunk = '';

    for (const member of members) {
      if (currentChunk.length + member.length + 1 <= MAX_LENGTH) {
        currentChunk += `${member}\n`;
      } else {
        chunks.push(currentChunk);
        currentChunk = `${member}\n`;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    for (let i = 0; i < chunks.length; i++) {
      const content = i === chunks.length - 1 ? `**${chunks[i]}\nعددهم : \`${membersCount}\`**` : `**${chunks[i]}**`;
      await message.reply({ content });
    }
  }
});

////////////////// كود يطلع نقاط اداره

let messageCount = 0;

client.on('messageCreate', async (message) => {
    if (message.content.startsWith(prefix +'start')) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("**انت لا تمتلك صلاحيات `Administrator` !**");

        try {
            const memberList = await message.guild.members.fetch();

            memberList.forEach(async (member) => {
                if (member.roles.cache.has('1215656953267880006')) {  //discord staff
                   const db = require("pro.db");
                    var points = db.get(`weekuser_${member.id}`)
                    var weekwarns = db.get(`weekwarns_${member.id}`)
                    var weekmute = db.get(`muteweek_${member.id}`) // استرداد عدد الميوت الأسبوعية
                    points = parseInt(points) || 0;
                    weekwarns = parseInt(weekwarns) || 0;
                    weekmute = parseInt(weekmute) || 0;
                    messageCount++;
                    var roleToAssign = ""; //discord staff
                    var roleToAssignHighStaff = "1215656953267880006"; // ايدي رتبه اداره
                   if (!member.roles.cache.some(r => r.id == 1215656953267880006)) { //ايدي رتبة اداره
                        if (points + weekwarns + weekmute >= 60) {
                            roleToAssign = "دبل ترقية";
                        } else if (points + weekwarns + weekmute >= 40 && points + weekwarns + weekmute <= 59) {
                            roleToAssign = "ترقية";
                        } else if (points + weekwarns + weekmute >= 15 && points + weekwarns + weekmute <= 49) {
                            roleToAssign = "سكب";
                        } else if (points + weekwarns + weekmute < 15) {
                            roleToAssign = "تخفيض";
                        }
                    }
                    if (member.roles.cache.some(r => r.id == 1215656953267880006)) { //ايدي رتبة اداره
                        if (points + weekwarns + weekmute >= 80) {
                            roleToAssignHighStaff = "دبل ترقية";
                        } else if (points + weekwarns + weekmute >= 60 && points + weekwarns + weekmute <= 79) {
                            roleToAssignHighStaff = "ترقية";
                        } else if (points + weekwarns + weekmute >= 40 && points + weekwarns + weekmute < 69) {
                            roleToAssignHighStaff = "سكب";
                        }
                      else if (points + weekwarns + weekmute < 20) {
                            roleToAssignHighStaff = "تخفيض";
                        }
                    }
                    let replyMessage = `> ** الإداري : <@${member.user.id}>**\n> ** الإداري رقم : ${messageCount}**\n** عدد التكتات : ${points}\n عدد التحذيرات : ${weekwarns}\n عدد الميوتات : ${weekmute}\n مجموع النقاط الكلي : ${points + weekwarns + weekmute}**`;

                    if (!member.roles.cache.some(r => r.id == 1215656953267880006)) { //ايدي رتبة اداره
                        if (roleToAssign !== "") {
                            replyMessage += `\n** النتيجة : ${roleToAssign}**`;
                        }
                    }
                    if (member.roles.cache.some(r => r.id == 1215656953267880006)) { //ايدي رتبة اداره
                        if (roleToAssignHighStaff !== "") {
                            replyMessage += `\n** النتيجة : ${roleToAssignHighStaff}**`;
                        }
                    }

                    await message.channel.send(replyMessage);
                }
            });
        } catch (error) {
            console.error('خطأ :', error);
        }
    }
});

////////////////// كود هيلب

client.on("messageCreate", async function (message) {

  if (message.content.toLowerCase().startsWith(`${prefix}help`)) {



    const embed = new MessageEmbed()
      .setColor("#878787")
      .setThumbnail(message.guild.iconURL())

      .setFooter({ text: message.author.tag , iconURL: 
       message.author.displayAvatarURL({dynamic:true})})

      .setTimestamp()

      .setDescription(`**
- ${prefix} come : نداء شخص
- ${prefix} setstatus : تعين حالة بوت 
- ${prefix} ping : يحسب لك سرعة بوت 
- ${prefix} say : تكلم عبر بوت
- ${prefix} claim : استلام تكت 
- ${prefix} roles : يطلع كم شخص له رتبه محدده 
- ${prefix} start : يفحص اداري
- ${prefix} tax : يحسب ضريبة 
- ${prefix} embed : تكلم عبر بوت عن طريق امبد 
- ${prefix} points : نقاط اداره
- ${prefix} tickets : نقاط استلام تكت 
- ${prefix} mutes : نقاط ميوتات
- ${prefix} warns : نقاط تحذيرات
- ${prefix} top : توب اداره 
- ${prefix} sub : صنع روم خاص 
- ${prefix} renew : تجديد روم خاص 
- ${prefix} close : حدف روم خاص 
- ${prefix} setup : يرسل تقديم ادارة
- ${prefix} ad : اضافه نقطه الى نقاط تكتات  
- ${prefix} allticket : اضافه نقطه الى مجموع نقاط تكتات 
- ${prefix} mute(+) : اضافه نقطه الى نقاط ميوتات 
- ${prefix} allmute(+) : اضافه نقطه الى مجموع نقاط ميوتات
- ${prefix} allwarn(+) : اضافه نقطه الى مجموع نقاط تحذيرات
- ${prefix} ticket(-) : ازالة نقطه من نقاط تكتات 
- ${prefix} warn(+) : اضافه نقطه الى نقاط تحذيرات
- ${prefix} warn(-) : ازالة نقطه من نقاط تحذيرات 
- ${prefix} mute(-) : ازالة نقطه من نقاط ميوتات
- ${prefix} delete-tickets : يحدف جميع تكتات موجوده في سيرفر
- ${prefix} server : يظهر معلومات عن سيرفر
- ${prefix} spin : عجلة الحظ 
- ${prefix} clear : مسح رسائل الشات 
- ${prefix} mute : يعطي ميوت 
- ${prefix} Rank : يعطي رتبه لـ شخص
- ${prefix} warn : تحذير شخص 
- ${prefix} Line : يرسل خط 
- ${prefix} crook : تشهير نصاب
- ${prefix} Removal : يشيل نصاب
- ${prefix} examine : فحص شخص نصاب او لا
- ${prefix} send : سلكت منيو اشعارات
- ${prefix} sendinfo : سلكت منيو معلومات
- ${prefix} encryption : تشفير الكلمات 
- ${prefix} unlock : فتح روم 
- ${prefix} lock : قفل روم 
- ${prefix} setups : اتبث نفسك
- ${prefix} roleh : اشعارات بائعين 
- ${prefix} sendEmbed : امبد طلبات 
**`)


    message.reply({ embeds: [embed] })

  }

})

////////////////// كود يحسب ضريبة بربوت

client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + "tax".toLowerCase())) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!args) return message.reply("**:rolling_eyes: Please enter a number**").catch((err) => {
      console.log(err.message);
    });

    if (args.endsWith("m")) args = args.replace(/m/gi, "") * 1000000;
    else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
    else if (args.endsWith("K")) args = args.replace(/K/gi, "") * 1000;
    else if (args.endsWith("M")) args = args.replace(/M/gi, "") * 1000000;
    let args2 = parseInt(args);
    let tax = Math.floor(args2 * (20) / (19) + (1));

    message.reply(`**> ${tax}**`).catch((err) => {
      console.log(err.message);
    });
  }
});

////////////////// كود يعطي ميوت للطلبات

const ms = require("ms");

client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "mute")) {
                                 //ايدي رتبه تقدر تستعمل الامر
    if(!message.member.permissions.has("")) return;
    let args = message.content.split(" ");
    let user = message.mentions.users.first() || client.users.cache.get(args[1]);
    if (!user) return message.reply("يرجى منشن المستخدم.");
    let time = args[2];
    if (!time) return message.reply("يرجى تحديد الوقت.");
    let reason = args.slice(3).join(" ");
    if (!reason) return message.reply("يرجى تحديد السبب.");

    let member = message.guild.members.cache.get(user.id);
    let channel = message.guild.channels.cache.get("1247840266665197638"); //ايدي روم طلبات 

    message.reply(`**تم إسكات ${user} بنجاح **`).then(() => {
       const db = require("pro.db");
      db.add(`muteweek_${message.member.id}` , 1)
      db.add(`muteall_${message.member.id}` , 1)
      channel.permissionOverwrites.create(member.id, {
        SEND_MESSAGES: false
      });
    });
const embed = new MessageEmbed()
.setTitle(' Mute Order')
.setDescription(`**>  الشخص : ${user}\n\n  اداري : ${message.member}\n\n  مدة ميوت : ${time}\n\n  سبب ميوت : ${reason}**`);
const channelID = message.guild.channels.cache.get('') //ايدي روم لوق 
channelID.send({ embeds: [embed] })
    setTimeout(() => {
      channel.permissionOverwrites.create(member.id,  {
        SEND_MESSAGES: true
      });
    }, ms(time));
  }
}); 

////////////////// كود امبد

client.on("messageCreate" , async th => {

if(th.content.startsWith(prefix + "embed")){
if(!th.member.permissions.has("ADMINISTRATOR")){
  return th.reply(`**> You Dont Have permission **`)
}
let msg = th.content.split(" ").slice(1).join(" ")
    if(!msg)return th.reply(`> ** Put Your Message**`)
  let attach = th.attachments.first()
  if (attach){
let attachmd = new MessageEmbed()
  .setColor("#878787")
  .setDescription(msg)   .setImage(`${attach.url}`)

   th.channel.send({embeds: [attachmd]})
  } else {
  let embed = new MessageEmbed()
.setDescription(msg)
.setColor("#878787") 
    await th.channel.send({embeds: [embed]})
   } 

   }
 })

////////////////// كود اعطاء رتبه

client.on('messageCreate', async message => {
  if (message.content.startsWith(prefix +'rank') && message.member.roles.cache.has(RolesRole) || message.content.startsWith('role') && message.member.roles.cache.has(RolesRole)) {
    if (message.content.startsWith(prefix + "رولات")) return false;
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
    if (!args) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
    let row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setPlaceholder("Select Kind Of Role ..")
          .setCustomId('menu-select')
          .setMaxValues(1)
          .addOptions([
            {
              label: 'Seller Roles',
              value: 'sellR'
            },
            {
              label: 'Other Roles',
              value: 'otherR'
            }]))
    let m = await message.reply({ content: `** يرجى تحديد نوع الرتبة :**`, components: [row] })
     const db = require("pro.db");
    db.set(`giverole_${m.id}`, user.id)
  }
});

client.on("interactionCreate", interaction => {
  if (interaction.customId == "menu-select") {
    if (interaction.values[0] === 'sellR') {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let row1 = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setPlaceholder("Select Role ..")
              .setCustomId('menu-select1')
              .setMaxValues(5)
              .addOptions([
                {
                  label: 'VIP', //اسم رتبه 
                  value: '1253827808237719722' //ايدي رتبه
                },
                {
                  label: 'ANGEL',//اسم رتبه 
                  value: '1253828137096314881'//ايدي رتبه
                },
                {
                  label: 'VIKING',//اسم رتبه 
                  value: '1253828712256765983'//ايدي رتبه
                },
                {
                  label: 'The Prince',//اسم رتبه 
                  value: '1253829170635735151'//ايدي رتبه
                },
                {
                  label: 'لا يوجد',//اسم رتبه 
                  value: 'لا يوجد'//ايدي رتبه
                },
                {
                  label: 'لايوجد',//اسم رتبه 
                  value: 'لايوجد'//ايدي رتبه
                },
                {
                  label: 'لا يوجد',//اسم رتبه 
                  value: 'لا يوجد'//ايدي رتبه
                },
                {
                  label: 'لا يوجد',//اسم رتبه 
                  value: 'يوجد لا'//ايدي رتبه
                },]))
        interaction.message.edit({
          content: `** يرجى تحديد الرتب :**`, components: [row1]
        })
        interaction.deferUpdate()
      }
    }
    if (interaction.values[0] === 'otherR') {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let row1 = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setPlaceholder("Select Role ..")
              .setCustomId('menu-select2')
              .setMaxValues(2)
              .addOptions([
                {
                  label: "لا يوجد",//اسم رتبه 
                  value: "لا يوجد",//ايدي رتبه
                },
                {
                  label: "لا يوجد",//اسم رتبه 
                  value: "لا يوجد",//ايدي رتبه
                },
                {
                  label: "لا يوجد",//اسم رتبه 
                  value: "لا يوجد",//ايدي رتبه
                },
                ])
                );
interaction.message.edit({
  content: `** يرجى تحديد الرتبة :**`,
  components: [row1],
});
interaction.deferUpdate();
}
}
}
});

client.on("interactionCreate", async (interaction) => {
if (interaction.isSelectMenu()) {
if (interaction.customId == "menu-select1") {
if (interaction.member.roles.cache.has(RolesRole)) {
let rolesAdded = [];
let rolesRemoved = [];
let u = db.get(`giverole_${interaction.message.id}`);
let member = interaction.guild.members.cache.find((r) => r.id == u);
let roles = interaction.values;
for (const r of roles) {
  var s;
  const role = interaction.guild.roles.cache.find((ro) => ro.id == r);
  if (role) {
    if (member.roles.cache.some((ro) => ro.id == r)) {
      await member.roles.remove([role]);
      rolesRemoved.push(role.name.replace(/\|\|/g, ""));
    } else {
      await member.roles.add([role]);
      rolesAdded.push(role.name.replace(/\|\|/g, ""));
    }
  }
}
let message = `> ** تم تحديث رتب ${member}**\n`;
if (rolesAdded.length > 0) {
  message += `> ** الرتب التي تم اضافتها : ${rolesAdded.join(
    " , "
  )}**\n > ** لاتنسى قراءة قوانين البائعين**`;
}
if (rolesRemoved.length > 0) {
  message += `> ** الرتب التي تم ازالتها : ${rolesRemoved.join(
    " , "
  )}**\n`;
}
interaction.message.edit({ content: `${message}`, components: [] });
interaction.deferUpdate();
db.delete(`giverole_${interaction.message.id}`);
}
}
if (interaction.customId == "menu-select2") {
if (interaction.member.roles.cache.has(RolesRole)) {
let rolesAdded = [];
let rolesRemoved = [];
let u = db.get(`giverole_${interaction.message.id}`);
let member = interaction.guild.members.cache.find((r) => r.id == u);
let roles = interaction.values;
for (const r of roles) {
  var s;
  const role = interaction.guild.roles.cache.find((ro) => ro.id == r);
  if (role) {
    if (member.roles.cache.some((ro) => ro.id == r)) {
      await member.roles.remove([role]);
      rolesRemoved.push(role.name.replace(/\|\|/g, ""));
    } else {
      await member.roles.add([role]);
      rolesAdded.push(role.name.replace(/\|\|/g, ""));
    }
  }
}
let message = `** تم تحديث رتب ${member}**\n`;
if (rolesAdded.length > 0) {
  message += `> ** الرتب التي تم اضافتها : ${rolesAdded.join(
    " , "
  )}**\n`;
}
if (rolesRemoved.length > 0) {
  message += `> ** الرتب التي تم ازالتها : ${rolesRemoved.join(
    " , "
  )}**\n`;
}
interaction.message.edit({ content: `${message}`, components: [] });
interaction.deferUpdate();
db.delete(`giverole_${interaction.message.id}`);
}
}
}
});

////////////// كود تشهير نصاب

client.on('messageCreate', async message => {
  if (message.content.startsWith(prefix + 'crook') && message.member.roles.cache.has(OfficialRole)) {
    const now = new Date();
    const guild = message.guild;
    const role = guild.roles.cache.get('1247717765876420620'); //ايدي رتبه تقدر تستعمل امر 
    const logChannel = await message.client.channels.fetch("1217225728467402846");//ايدي روم  تشهير 
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply(`**منشن الشخص أولاً أو ضع الإيدي !**`)
     const db = require("pro.db");
    if (db.has(`scammer_${user.id}`)) return message.reply("**هذا الشخص بالفعل في قائمة النصابين !**");
    db.add(`scammer_${user.id}`, 1)
    await user.roles.set([]);
    await user.roles.add(role)
    await message.reply(`**تم إضافة ${user} إلى قائمة النصابين !**`)
    let EmbedLog = new MessageEmbed()
      .setTitle(`** Add a New Thief !**`)
      .setDescription(`> ** تم تشهير ${user} , المشرف المسؤول ${message.author} **
        ** إيدي النصاب : ${user.id}
         إيدي المشرف المسؤول : ${message.author.id} \n\n تاريخ التشهير : <t:${Math.floor(now.getTime() / 1000)}:d>**`)
      .setColor(`${colorE}`)
      .setTimestamp()
    await logChannel.send({ embeds: [EmbedLog] })
    await logChannel.send(`${lineLink}`)
  }
});

////////////////// كود ازالة نصاب من قائمة نصابين

client.on('messageCreate', async message => {
  if (message.content.startsWith(prefix + 'Removal') && message.member.roles.cache.has(OfficialRole)) {
    const now = new Date();
    const guild = message.guild;
    const role = guild.roles.cache.get('1247717765876420620'); //ايدي رتبه تقدر تستعمل امر 
    const logChannel = await message.client.channels.fetch("1217225728467402846"); //ايدي روم  تشهير 
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
     const db = require("pro.db");
    if (!db.has(`scammer_${user.id}`)) return message.reply("**هذا الشخص ليس بقائمة النصابين لإزالته !**")
    db.delete(`scammer_${user.id}`, 1)
    await user.roles.remove(role);
    await message.reply(`**تم إزالة ${user} من قائمة النصابين !**`)
    let EmbedLog = new MessageEmbed()
      .setTitle(`** Remove a New Thief !**`)
      .setDescription(`> ** تم إزالة تشهير ${user} , المشرف المسؤول ${message.author} **
** إيدي الشخص : ${user.id}
 إيدي المشرف المسؤول : ${message.author.id} \n\n تاريخ إزالة التشهير : <t:${Math.floor(now.getTime() / 1000)}:d>**`)
      .setColor(`${colorE}`)
      .setTimestamp()
    await logChannel.send({ embeds: [EmbedLog] })
    await logChannel.send(`${lineLink}`)
  }
});

client.on('messageCreate', async message => {
  if (message.content.startsWith(prefix + 'examine') || message.content.startsWith('فحص')) {
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
     const db = require("pro.db");
    if (db.has(`scammer_${user.id}`)) {
      await message.reply(`** إنتبه ! هذا الشخص نصاب، الرجاء عدم التعامل معه .**`);
    } else {
      await message.reply(`**هذا الشخص ليس نصاب <  ، لكن انتبه ! هذا لا يعني أنه مضمون .. الرجاء أخذ وسيط  من هنا <#1253830924877955154>  قبل التعامل مع أي أحد . **`);
    }
  }
});

/////////////// 

client.on("guildMemberAdd", async member => {
  const guild = member.guild;
  const role = guild.roles.cache.find(r => r.name === "1253831430795165778");//اسم رتبه يلي يعطيها بعد تسوي لي شخص تشهير
  const user = guild.members.cache.find(m => m.id === member.id);
  if (role && user && db.get(`scammer_${user.id}`)) {
    try {
      await user.roles.add(role);
      console.log(`تم إعطاء الرتبة ${role.name} للعضو ${user.displayName} في سيرفر ${guild.name}`);
    } catch (error) {
      console.error(`حدث خطأ أثناء إعطاء الرتبة للعضو ${user.displayName} في سيرفر ${guild.name}: ${error}`);
    }
  }
});

////////////////// كود يطلع مجموع نقاط اداره

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "points") || message.content.startsWith(prefix + "نقاط") || message.content.startsWith(prefix + "نقط")) {
    let user = message.mentions.members.first()
    if (user) {
      let member = message.guild.members.cache.find(u => u == user.id)
      var points = db.get(`weekuser_${user.id}`)
      var weekwarns = db.get(`weekwarns_${user.id}`)
      var allpoints = db.get(`alluser_${user.id}`)
      var allwarns = db.get(`allwarns_${user.id}`)
      var allmute = db.get(`muteall_${user.id}`)
      var weekmute = db.get(`muteweek_${user.id}`)
      if (!points) {
        points = 0
      }
      if (!weekwarns) {
        weekwarns = 0
      }
      if (!allpoints) {
        allpoints = 0
      }
      if (!allwarns) {
        allwarns = 0
      }
      if (!allmute) {
        allmute = 0
      }
      if (!weekmute) {
        weekmute = 0
      }
      let embed2 = new MessageEmbed()
        .setDescription(` **${member.user} , Points :**\n     \n>  **Week Points : \`${points + weekwarns + weekmute}\`**\n>  **All Points : \`${allpoints + allwarns + allmute}\`**\n     \n>  **Week Tickets : \`${points}\`**\n>  **Week Warns : \`${weekwarns}\`**\n>  **Week Mutes : \`${weekmute}\`**\n     \n>  **All Tickets : \`${allpoints}\`**\n>  **All Warns : \`${allwarns}\`**\n>  **All Mutes : \`${allmute}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed2] })
    }
    if (!user) {
      const db = require("pro.db");
      var points = db.get(`weekuser_${message.member.id}`)
      var weekwarns = db.get(`weekwarns_${message.member.id}`)
      var allpoints = db.get(`alluser_${message.member.id}`)
      var allwarns = db.get(`allwarns_${message.member.id}`)
      var allmute = db.get(`muteall_${message.member.id}`)
      var weekmute = db.get(`muteweek_${message.member.id}`)
      if (!points) {
        points = 0
      }
      if (!weekwarns) {
        weekwarns = 0
      }
      if (!allpoints) {
        allpoints = 0
      }
      if (!allwarns) {
        allwarns = 0
      }
      if (!allmute) {
        allmute = 0
      }
      if (!weekmute) {
        weekmute = 0
      }
      let embed4 = new MessageEmbed()
        .setDescription(` **${message.member.user} , Points :**\n     \n>  **Week Points : \`${points + weekwarns + weekmute}\`**\n>  **All Points : \`${allpoints + allwarns + allmute}\`**\n     \n>  **Week Tickets : \`${points}\`**\n>  **Week Warns : \`${weekwarns}\`**\n>  **Week Mutes : \`${weekmute}\`**\n     \n>  **All Tickets : \`${allpoints}\`**\n>  **All Warns : \`${allwarns}\`**\n>  **All Mutes : \`${allmute}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed4] })
    }
  }
});

////////////////// كود يطلع لك كم مستلم تكت

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "tickets") || message.content.startsWith(prefix + "تكتات") || message.content.startsWith(prefix + "تكت")) {
    let user = message.mentions.members.first()
    if (user) {
      let member = message.guild.members.cache.find(u => u == user.id)
      let points = db.get(`weekuser_${user.id}`)
      let allpoints = db.get(`alluser_${user.id}`)
      let embed1 = new MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`0\`**\n> **All Tickets : \`${allpoints}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested by : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      let embedd = new MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`${points}\`**\n> **All Tickets : \`0\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested by : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      let embed44 = new MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`0\`**\n> **All Tickets : \`0\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested by : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      if (!db.has(`weekuser_${user.id}`)) return message.reply({ embeds: [embed1] })
      if (!db.has(`alluser_${user.id}`)) return message.reply({ embeds: [embedd] })
      let embed2 = new MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`${points}\`**\n> **All Tickets : \`${allpoints}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed2] })
    }
    const db = require("pro.db");
    if (!user) {
      let points = db.get(`weekuser_${message.member.id}`)
      let allpoints = db.get(`alluser_${message.member.id}`)
      let embed3 = new MessageEmbed()
        .setTitle(`${message.member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`0\`**\n> **All Tickets : \`${allpoints}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      let embedd = new MessageEmbed()
        .setTitle(`${message.member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`${points}\`**\n> **All Tickets : \`0\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      if (!db.has(`weekuser_${message.member.id}`)) return message.reply({ embeds: [embed3] })
      if (!db.has(`alluser_${message.member.id}`)) return message.reply({ embeds: [embedd] })
      let embed4 = new MessageEmbed()
        .setTitle(`${message.member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`${points}\`**\n> **All Tickets : \`${allpoints}\`**`)

        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed4] })
    }
  }
});

////////////////// كود يظهر كم معطي شخص ميوت

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "mutes") || message.content.startsWith(prefix + "ميوتات")) {
    let user = message.mentions.members.first()
    if (user) {
      let member = message.guild.members.cache.find(u => u == user.id)
      var mutes = db.get(`muteweek_${user.id}`)
      var allmutes = db.get(`muteall_${user.id}`)
      if (!mutes) {
        mutes = 0
      }
      if (!allmutes) {
        allmutes = 0
      }
      let embed2 = new MessageEmbed()
        .setTitle(`${member.user.tag}, Mutes :`)
        .setDescription(`> **All Mutes : \`${allmutes}\`**\n> **Week Mutes : \`${mutes}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed2] })
    }
    const db = require("pro.db");
    if (!user) {
      var mutes = db.get(`muteweek_${message.member.id}`)
      var allmutes = db.get(`muteall_${message.member.id}`)
      if (!mutes) {
        mutes = 0
      }
      if (!allmutes) {
        allmutes = 0
      }
      let embed4 = new MessageEmbed()
        .setTitle(`${message.member.user.tag}, Mutes :`)
        .setDescription(`> **Week Mutes : \`${mutes}\`**\n> **All Mutes : \`${allmutes}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed4] })
    }
  }
});

//////////////// كود يظهر كم مسوي تحذير للبائع

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "warns") || message.content.startsWith(prefix + "تحذيرات")) {
    let user = message.mentions.members.first()
    if (user) {
      let member = message.guild.members.cache.find(u => u == user.id)
      var warns = db.get(`weekwarns_${user.id}`)
      var allwarns = db.get(`allwarns_${user.id}`)
      if (!warns) {
        warns = 0
      }
      if (!allwarns) {
        allwarns = 0
      }
      let embed2 = new MessageEmbed()
        .setTitle(`${member.user.tag}, Warns :`)
        .setDescription(`> **All Warns : \`${allwarns}\`**\n> **Week Warns : \`${warns}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed2] })
    }
    const db = require("pro.db");
    if (!user) {
      var warns = db.get(`weekwarns_${message.member.id}`)
      var allwarns = db.get(`allwarns_${message.member.id}`)
      if (!warns) {
        warns = 0
      }
      if (!allwarns) {
        allwarns = 0
      }
      let embed4 = new MessageEmbed()
        .setTitle(`${message.member.user.tag}, Warns :`)
        .setDescription(`> **Week Warns : \`${warns}\`**\n> **All Warns : \`${allwarns}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed4] })
    }
  }
});

////////////////// كود نقاط اداره

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix +'top') || message.content.startsWith(prefix +'توب')) {
    try {
      const memberList = await message.guild.members.fetch();
      let usersData = [];
      memberList.forEach((member) => {
        if (member.roles.cache.has('1215656953267880006')) {//ايدي رتبه اداره
           const db = require("pro.db");
          var points = db.get(`alluser_${member.id}`);
          var weekwarns = db.get(`allwarns_${member.id}`);
          var weekmute = db.get(`muteall_${member.id}`);
          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          if (points > 0 || weekwarns > 0 || weekmute > 0) {
            usersData.push({ user: member.user, points, weekwarns, weekmute, totalPoints: points + weekwarns + weekmute });
          }
        }
      });
      usersData.sort((a, b) => b.totalPoints - a.totalPoints);
      const embed = new MessageEmbed()
        .setColor(`${colorE}`)
        .setTitle('**Top 10 Points :**');
      const topUsers = usersData.slice(0, 10);
      if (topUsers.length === 0) {
        embed.setDescription('**لا يوجد أعضاء يمتلكون نقاط .**');
      } else {
        topUsers.forEach((user, index) => {
          embed.addField(`**#${index + 1} | **`, `**<@${user.user.id}> - ${user.points} Tickets - ${user.weekwarns} Warns - ${user.weekmute} Mutes - All Top : ${user.points + user.weekwarns + user.weekmute} **`);
        });
      }
      let rowtp = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("All")
          .setCustomId("altop")
          .setStyle("SECONDARY")
          .setDisabled(true))
        .addComponents(
          new MessageButton()
            .setLabel("Week")
            .setCustomId("wetop")
            .setStyle("SECONDARY")
            .setDisabled(false))
      await message.channel.send({ embeds: [embed], components: [rowtp] })
    } catch (error) {
      console.error('حدث خطأ :', error);
    }
  }
});
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "wetop") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    try {
      const memberList = await message.guild.members.fetch();
      let usersData = [];
      memberList.forEach((member) => {
        if (member.roles.cache.has('')) { //ايدي رتبه اداره
          var points = db.get(`weekuser_${member.id}`);
          var weekwarns = db.get(`weekwarns_${member.id}`);
          var weekmute = db.get(`muteweek_${member.id}`);

          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          if (points > 0 || weekwarns > 0 || weekmute > 0) {
            usersData.push({ user: member.user, points, weekwarns, weekmute, totalPoints: points + weekwarns + weekmute });
          }
        }
      });
      usersData.sort((a, b) => b.totalPoints - a.totalPoints);
      const embed = new MessageEmbed()
        .setColor(`${colorE}`)
        .setTitle('**Top 10 Week :**');
      const topUsers = usersData.slice(0, 10);
      if (topUsers.length === 0) {
        embed.setDescription('**لا يوجد أعضاء يمتلكون نقاط في هذا الإسبوع .**');
      } else {
        topUsers.forEach((user, index) => {
          embed.addField(`**#${index + 1} | **`, `**<@${user.user.id}> - ${user.points} Tickets - ${user.weekwarns} Warns - ${user.weekmute} Mutes - All Week : ${user.points + user.weekwarns + user.weekmute} **`);
        });
      }
      let rowtpreply = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("All")
          .setCustomId("altop")
          .setStyle("SECONDARY")
          .setDisabled(false))
        .addComponents(
          new MessageButton()
            .setLabel("Week")
            .setCustomId("wetop")
            .setStyle("SECONDARY")
            .setDisabled(true))
      await message.edit({ embeds: [embed], components: [rowtpreply] });
    } catch (error) {
      console.error('حدث خطأ :', error);
    }
  }
})
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "altop") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    try {
      const memberList = await message.guild.members.fetch();
      let usersData = [];
      memberList.forEach((member) => {
        if (member.roles.cache.has('1215656953267880006')) { //ايدي رتبه اداره
          var points = db.get(`alluser_${member.id}`);
          var weekwarns = db.get(`allwarns_${member.id}`);
          var weekmute = db.get(`muteall_${member.id}`);
          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          if (points > 0 || weekwarns > 0 || weekmute > 0) {
            usersData.push({ user: member.user, points, weekwarns, weekmute, totalPoints: points });
          }
        }
      });
      usersData.sort((a, b) => b.totalPoints - a.totalPoints);
      const embed = new MessageEmbed()
        .setColor(`${colorE}`)
        .setTitle('**Top 10 Points :**');
      const topUsers = usersData.slice(0, 10);
      if (topUsers.length === 0) {
        embed.setDescription('**لا يوجد أعضاء يمتلكون نقاط .**');
      } else {
        topUsers.forEach((user, index) => {
          embed.addField(`**#${index + 1} | **`, `**<@${user.user.id}> - ${user.points} Tickets - ${user.weekwarns} Warns - ${user.weekmute} Mutes - All Points : ${user.points + user.weekwarns + user.weekmute} **`);
        });
      }
      let rowtpreply = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("All")
          .setCustomId("altop")
          .setStyle("SECONDARY")
          .setDisabled(true))
        .addComponents(
          new MessageButton()
            .setLabel("Week")
            .setCustomId("wetop")
            .setStyle("SECONDARY")
            .setDisabled(false))
      await message.edit({ embeds: [embed], components: [rowtpreply] });
    } catch (error) {
      console.error('حدث خطأ :', error);
    }
  }

})

////////////////// كود صنع رومات خاصه

client.on("messageCreate", async message => {
  const args = message.content.split(" ")
  const now = new Date()
  if (message.content.startsWith(prefix + 'sub')) {
    if (message.member.roles.cache.some(r => r.id == 1150011777329930290)) { //ايدي رتبه تقدر تستعمل امر 
      let prv = message.guild.roles.cache.find(r => r.id == 1150011777329930290) //ايدي رتبه يلي يعطيها للشخص بعد روم خاص 
      let Emoji = message.guild.roles.cache.find(r => r.name == "")
      let discordstaff = message.guild.roles.cache.find(r => r.name == "")
      let args = message.content.split(" ")
      let member = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
      if (!args[1]) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!member) return message.reply(`${emjFalse} | **منشن شخص !**`)
      const db = require('pro.db')
      if (db.has(`prvuser_${member.id}`)) return message.reply(`${emjFalse} | **هذا الشخص يمتلك بالفعل روم خاص**`)
      if (!args[2]) return message.reply(`${emjFalse} | **حدد مدة الروم !**`)
      if (!args[2].endsWith("d")) {
        if (!args[2].endsWith("h")) {
          if (!args[2].endsWith("m")) {
            return message.reply(`${emjFalse}** | حدد الوقت بالأيام - بالساعات أو بالدقائق**`)
          }
        }
      }
      if (isNaN(args[2][0])) return message.reply(`${emjFalse} | **حدد وقت صحيح !**`)

      message.reply(`${emjTrue} **| تم إنشاء روم خاص لـ ${member} لمدة \`${args[2]}\`**`)

      let embed = new MessageEmbed()
        .setDescription(`** System \`S\` Private Rooms・الرومات الخاصه**\n\n> ** صاحب الروم : <@${member.id}> **

> ** صنع بواسطة : ${message.member} **

> ** صنع في : <t:${Math.floor(now.getTime() / 1000)}:d> **

> ** ينتهي في : <t:${Math.floor((now.getTime() + ms(args[2])) / 1000)}:R> **

> ** مدة الروم : ${args[2]} **
`)
        .setColor(`${colorE}`)
      let mm = await message.guild.channels.create(`〢↬・${member.user.username}`, { type: "text" })
        .then(async m => {
          m.setParent(message.guild.channels.cache.find(r => r.id == 1149671505630855308)) //ايدي كتالوجي يلي يفتح فيه رومات
          member.roles.add([prv]).catch(err => { })
          db.set(`prvuser_${member.id}`, member.id)
          db.set(`prvroom_${m.id}`, member.id)
          m.permissionOverwrites.edit(message.guild.roles.everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: true
          })

          m.permissionOverwrites.edit(Emoji, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: true
          })
          m.permissionOverwrites.edit(discordstaff, {
            MANAGE_MESSAGES: true,
          })
          m.permissionOverwrites.edit(member.id, {
            SEND_MESSAGES: true,
            MENTION_EVERYONE: true,
            ATTACH_FILES: true
          })

          m.send({ content: `<@${member.id}>`, embeds: [embed] })
          db.push(`room`, {
            server: message.guild.id,
            id: member.id,
            endsAt: Date.now() + ms(args[2]),
            channelid: m.id
          })
        });
    }
  }
});
async function saleh() {
  const db = require('pro.db')
  if (db.has(`room`)) {
    const data = await db.get(`room`);
    for (const x of data) {
      let end = x.endsAt;
      let g = await x.server;
        if  (end < new Date()) {
        const guild = await client.guilds.cache.get(g);
        const channel = await guild.channels.cache.find(
          (r) => r.id == x.channelid
        );
        await db.set(`enduser_${x.id}`, x.id);
        await db.set(`endroom_${x.channelid}`, x.channelid);

        await channel.bulkDelete(100);

        const embed = new MessageEmbed()
          .setDescription(
            `** System S Rooms Ended・إنتهاء الروم**\n> ** لقد انتهت مدة هذا الروم، لديك مهلة 24 ساعه لتجديده ..**\n> ** للتجديد تواصل مع <#1175884505911939212> .**`
          )
          .setColor(`${colorE}`)
          .setTimestamp();
        channel.permissionOverwrites.edit(guild.members.cache.get(x.id), {
          SEND_MESSAGES: false,
        });
        await channel.send({ content: `<@${x.id}>`, embeds: [embed] });

        const index = data.indexOf(x);
        if (index !== -1) {
          data.splice(index, 1);
          await db.set("room", data);
        }
      }
    }
  }
}
setInterval(async () => {
  saleh();
}, 10000);

////////////////// كود تجديد روم خاص

client.on("messageCreate", async message => {
  const args = message.content.split(" ")
  const now = new Date()
  if (message.content.startsWith(prefix + 'renew')) {
    if (message.member.roles.cache.some(r => r.id == 1247717614193737779)) { //ايدي رتبه تقدر تستعمل امر 
      let prv = message.guild.roles.cache.find(r => r.id == 1253832215545118823) //ايدي رتبه يلي يعطيها للشخص بعد روم خاص  

      let member = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
      let channel = message.mentions.channels.first() || message.guild.channels.cache.find(r => r.id == args[2])
      if (!args[1]) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!member) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!channel) return message.reply(`${emjFalse} | **منشن الروم !**`)
      if (!args[2]) return message.reply(`${emjFalse} | **منشن الروم !**`)

      if (!args[3]) return message.reply(`${emjFalse} | **حدد مدة الروم !**`)
      if (!args[3].endsWith("d")) {
        if (!args[3].endsWith("h")) {
          if (!args[3].endsWith("m")) {
            return message.reply(`${emjFalse}** | حدد الوقت بالأيام - بالساعات أو بالدقائق**`)
          }
        }
      }
      if (isNaN(args[3][0])) return message.reply(`${emjFalse} | **حدد وقت صحيح !**`)
const db = require('pro.db')
      if (!db.has(`enduser_${member.id}`)) return message.reply(`${emjFalse} | **هذا الشخص لا يمتلك روم منتهي**`)
      if (!db.has(`endroom_${channel.id}`)) return message.reply(`${emjFalse} | **هذا الروم ليس منتهي**`)

      message.reply(`${emjTrue} **| تم تجديد الروم ${channel} لـ ${member} لمدة \`${args[3]}\`**`)
      db.set(`prvuser_${member.id}`, member.id)
      db.set(`prvroom_${channel.id}`, member.id)
      let embed = new MessageEmbed()
        .setDescription(`** System \`S\` Private Rooms・الرومات الخاصه**\n\n> ** صاحب الروم : <@${member.id}> **

> ** تم التجديد بواسطة : ${message.member} **

> ** تم التجديد في : <t:${Math.floor(now.getTime() / 1000)}:d> **

> ** ينتهي في : <t:${Math.floor((now.getTime() + ms(args[3])) / 1000)}:R> **

> ** مدة الروم : ${args[3]} **
`)
        .setColor(`${colorE}`)
      channel.bulkDelete(100)
      member.roles.add([prv]).catch(err => { })
      db.delete(`enduser_${member.id}`)
      db.delete(`endroom_${channel.id}`)
      channel.permissionOverwrites.edit(member.id, {
        SEND_MESSAGES: true
      })
      channel.send({ content: `<@${member.id}>`, embeds: [embed] })
      db.push(`room`, {
        server: message.guild.id,
        id: member.id,
        endsAt: Date.now() + ms(args[3]),
        channelid: channel.id
      })
    }
  }
});

////////////////// كود حدف روم خاص

client.on("messageCreate", async message => {
  const args = message.content.split(" ")
  if (message.content.startsWith(prefix + 'close')) {
    if (message.member.roles.cache.some(r => r.id == 1247717614193737779)) { //ايدي رتبه تقدر تستعمل امر 
      let prv = message.guild.roles.cache.find(r => r.id == 1253832215545118823) //ايدي رتبه يلي يعطيها للشخص بعد روم خاص 
      let member = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
      let channel = message.mentions.channels.first() || message.guild.channels.cache.find(r => r.id == args[2])
      if (!args[1]) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!member) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!channel) return message.reply(`${emjFalse} | **منشن الروم !**`)
      if (!args[2]) return message.reply(`${emjFalse} | **منشن الروم !**`)
       const db = require("pro.db");
      if (!db.has(`prvuser_${member.id}`)) return message.reply(`${emjFalse} | **هذا الشخص ليس لديه روم خاص**`)
      await message.reply(`${emjTrue} | **تم حذف الروم ${channel.name} للشخص ${member} .**`)
      await channel.delete()
      await member.roles.remove([prv])
      if (db.has(`enduser_${member.id}`)) {
        await db.delete(`enduser_${member.id}`)
      }
      if (db.has(`endroom_${channel.id}`)) {
        await db.delete(`endroom_${channel.id}`)
      }
      if (db.has(`prvuser_${member.id}`)) {
        await db.delete(`prvuser_${member.id}`)
      }
      if (db.has(`prvroom_${channel.id}`)) {
        await db.delete(`prvroom_${channel.id}`)
      }
      if (db.has(`room`)) {
        const data = await db.get(`room`)
        for (const x of data) {
          if (x.id == member.id) {
            if (x.channelid == channel.id) {
              const index = data.indexOf(x);
              if (index !== -1) {
                data.splice(index, 1);
                await db.set('room', data);
              }
            }
          }
        }
      }
    }
  }
});

client.on("channelDelete", async channel => {
   const db = require('pro.db')
  if (db.has(`prvroom_${channel.id}`)) {
    let member = channel.guild.members.cache.find(r => r.id == db.get(`prvroom_${channel.id}`))
    if (db.has(`enduser_${member.id}`)) {
      await db.delete(`enduser_${member.id}`)
    }
    if (db.has(`endroom_${channel.id}`)) {
      await db.delete(`endroom_${channel.id}`)
    }
    if (db.has(`prvuser_${member.id}`)) {
      await db.delete(`prvuser_${member.id}`)
    }
    if (db.has(`prvroom_${channel.id}`)) {
      await db.delete(`prvroom_${channel.id}`)
    }
    if (db.has(`room`)) {
      const data = await db.get(`room`)
      for (const x of data) {
        if (x.id == member.id) {
          if (x.channelid == channel.id) {
            const index = data.indexOf(x);
            if (index !== -1) {
              data.splice(index, 1);
              await db.set('room', data);
            }
          }
        }
      }
    }
  }
});

///////////////// كود تقديم ادارة


client.on("messageCreate", (message) => {
  if (message.content == prefix + "setup") {
    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("apply")
        .setEmoji("👨‍💻")
        .setStyle("SECONDARY")
    );
    let embed = new MessageEmbed()
      .setTitle(" Staff Apply ・تقديم الإدارة")
      .setDescription(
        ` **نموذج تقديم :  

>  اسمك ؟
>  عمرك ؟
> < من وين ؟
>  كم مدة تفاعلك في اليوم ؟
>  عندك خبرات بسيرفرات الشوب من قبل ؟ 

يمنع ان تكون اداري في سيرفر اخر في حال تم قبولك في ادارتنا .
التقديم مره وحدة فقط تقدم اكتر من مرة = رفضك . 
يمنع الإستهبال بالتقديم .
ماتحط شعار مرفوض . **`
      )
      .setColor(`${colorE}`);
    message.delete();
    message.channel.send({ components: [row], embeds: [embed] });
  }
});

const cooldown = new Set();

const discordModals = require("discord-modals");
discordModals(client);
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "apply") {
    if (cooldown.has(interaction.member.id))
      return interaction.reply({ content: "Cooldown !", ephemeral: true });
    const db = require("pro.db");
    let user = db.get(`user_${interaction.member.id}`);
    if (db.has(`userapply_${interaction.member.id}`))
      return interaction.reply({
        content: "**انت بالفعل على قائمة المقدمين !**",
        ephemeral: true,
      });
    if (
      interaction.member.roles.cache.some((r) => r.id == 1215656953267880006) || //ايدي رتبة اداره
      interaction.member.roles.cache.some((r) => r.id == 1215656953267880006) //ايدي رتبة اداره
    )
      return interaction.reply({
        content: "**انت بالفعل اداري**",
        ephemeral: true,
      });
    const {
      Modal,
      TextInputComponent,
      SelectMenuComponent,
      showModal,
    } = require("discord-modals");

    const modal = new Modal()
      .setCustomId("modal")
      .setTitle("نموذج التقديم :")
      .addComponents(
        new TextInputComponent()
          .setCustomId("name")
          .setLabel("ما اسمك ؟")
          .setRequired(true)
          .setPlaceholder("ادخل اسمك هنا")
          .setStyle("SHORT"),

        new TextInputComponent()
          .setCustomId("age")
          .setRequired(true)
          .setPlaceholder("ادخل عمرك من هنا")
          .setLabel("كم عمرك ؟")
          .setStyle("SHORT"),

        new TextInputComponent()
          .setCustomId("country")
          .setRequired(true)
          .setPlaceholder("ادخل بلدك من هنا")
          .setLabel("من وين ؟")
          .setStyle("SHORT"),

        new TextInputComponent()
          .setCustomId("active")
          .setRequired(true)
          .setPlaceholder("ادخل هنا مدة تفاعلك")
          .setLabel("مدة تفاعلك باليوم ؟")
          .setStyle("SHORT"),

        new TextInputComponent()
          .setCustomId("shop")
          .setRequired(true)
          .setPlaceholder("ادخل هنا خبرتك و هل كنت اداري في سيرفر شوب اخر")
          .setLabel("عندك خبرات بسيرفرات الشوب من قبل ؟")
          .setStyle("LONG")
      );

    showModal(modal, {
      client: client,
      interaction: interaction,
    });
  }
});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "تقديم")) {
     const args = message.content.split(" ")
    let channel = message.mentions.channels.first() || message.guild.channels.cache.find(r => r.id == args[2])
    if(!channel) return message.reply(`${emjFalse} | **منشن الروم !**`)
    const db = require("pro.db")
      db.set(`applyroom_${message.guild.id}`, channel.id)
    message.channel.send("تم تحديد الروم")
  }
    })

client.on("modalSubmit", async (modal) => {
  if (modal.customId == "modal") {
    const db = require('pro.db')
    let ch = db.get(`applyroom_${modal.guild.id}`);
    let channel = modal.guild.channels.cache.find(
      (c) => c.id == ch
    );
    const name = modal.getTextInputValue("name");
    const age = modal.getTextInputValue("age");
    const country = modal.getTextInputValue("country");
    const active = modal.getTextInputValue("active");
    const shop = modal.getTextInputValue("shop");

    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setEmoji(`${emjTrue}`)
        .setCustomId("acc")
        .setStyle("SECONDARY"),
      new MessageButton()
        .setEmoji(`${emjFalse}`)
        .setCustomId("dec")
        .setStyle("SECONDARY"),
      new MessageButton()
        .setEmoji("🤐")
        .setCustomId("time")
        .setStyle("SECONDARY")
    );
    let embed = new MessageEmbed()
      .setAuthor({
        name: `${modal.member.user.username}`,
        iconURL: `${modal.member.user.displayAvatarURL()}`,
      })
      .setFooter({ text: modal.guild.name, iconURL: modal.guild.iconURL() })
      .setTimestamp()
      .setThumbnail(modal.guild.iconURL())
      .setTitle("**تقديم جديد !**")
      .setDescription(
        `**الشخص : <@${modal.member.id}>**\n\n>  **الاسم : ${name}**\n\n>  **العمر : ${age}**\n\n>  **البلد : ${country}**\n\n>  **مدة التفاعل : ${active}**\n\n>  **خبرته في سيرفرات الشوب : ${shop}**`
      )
      .setColor(`${colorE}`);
    modal.reply({ content: "تم ارسال تقديمك !", ephemeral: true });
    channel
      .send({ content: `${modal.member}`, embeds: [embed], components: [row] })
      .then((m) => {

const db = require("pro.db");
        db.set(`userapply_${modal.member.id}`, modal.member.id);
        db.set(`userm_${m.id}`, modal.member.id);
      });
  }
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId == "acc") {
      if (
        !interaction.member.roles.cache.some((r) => r.id == 1247718263316807720) // ايدي رتبه تقدر تقبل ناس 
      )
        return interaction.reply({
          content: "**ما تقدر تستعمل هذا الامر**",
          ephemeral: true,
        });
      const db = require("pro.db");
      let user = db.get(`userm_${interaction.message.id}`);
      let member = interaction.guild.members.cache.get(user);
      let role = interaction.guild.roles.cache.find(
        (r) => r.id == "1215656953267880006" //ايدي رتبه يلي تجي للشخص بعد قبول 
      );
      let embed = new MessageEmbed()
        .setDescription(`**تقديم مقبول من : ${member} ${emjTrue}**`)
        .setAuthor({
          name: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setFooter({
          text: interaction.guild.name,
          iconURL: interaction.guild.iconURL(),
        })
        .setColor(`${colorE}`)
        .setTimestamp();
      member.roles.add([role]).catch((err) => {});
      member
        .send(
          `**لقد تم قبول تقديمك !**\n**الرجاء مراجعة هذه الرومات و حفظ ما فيها :**\n<#1243132543486791742> | <#1243682424693456987>`
        )
        .catch((err) => {});
      interaction.message.edit({
        content: `${member}`,
        embeds: [embed],
        components: [],
      });
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`);
      db.delete(`userm_${interaction.message.id}`);
    }
    if (interaction.customId == "dec") {
      if (
        !interaction.member.roles.cache.some((r) => r.id == 1247718263316807720)//ايدي رتبه تقدر ترفض ناس 
      )
        return interaction.reply({
          content: "**ما تقدر تستعمل هذا الامر**",
          ephemeral: true,
        });
      const db = require("pro.db");
      let user = db.get(`userm_${interaction.message.id}`);
      let member = interaction.guild.members.cache.get(user);
      let embed = new MessageEmbed()
        .setDescription(`**تقديم مرفوض من : ${member} ${emjFalse}**`)
        .setAuthor({
          name: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setFooter({
          text: interaction.guild.name,
          iconURL: interaction.guild.iconURL(),
        })
        .setColor(`${colorE}`)
        .setTimestamp();
      interaction.message.edit({
        content: `${member}`,
        embeds: [embed],
        components: [],
      });
      member
        .send(
          `**لقد تم رفض تقديمك ! الرجاء عدم التقديم مرة ثانية لتجنب الميوت .**`
        )
        .catch((err) => {});
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`);
      db.delete(`userm_${interaction.message.id}`);
    }
    if (interaction.customId == "time") {
      if (
        !interaction.member.roles.cache.some((r) => r.id == 1215656953267880006) //ايدي رتبه يلي تقدر تعطي ميوت
      )
        return interaction.reply({
          content: "**ما تقدر تستعمل هذا الامر**",
          ephemeral: true,
        });
      const db = require("pro.db");
      let user = db.get(`userm_${interaction.message.id}`);
      let member = interaction.guild.members.cache.get(user);
      let embed = new MessageEmbed()
        .setDescription(`**لقد تم اسكات : ${member} 🤐**`)
        .setAuthor({
          name: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setFooter({
          text: interaction.guild.name,
          iconURL: interaction.guild.iconURL(),
        })
        .setColor(`${colorE}`)
        .setTimestamp();
      interaction.message.edit({
        content: `${member}`,
        embeds: [embed],
        components: [],
      });
      member.send(`**لقد تم اسكاتك !**`).catch((err) => {});
      member.timeout(86400000).catch((err) => {});
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`);
      db.delete(`userm_${interaction.message.id}`);
    }
  }
});


////////////////// كود تحذيرات باائعين

const warnWork = `1200746990930251846`
const cooldown1 = 10000;
const cooldown2 = new Map();

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "warn")) {
if (cooldown2.has(message.content)) {
      const timeLeft = cooldown1 - (Date.now() - cooldown2.get(message.content));
      if (timeLeft > 0) {
        return message.reply(`** يجب عليك إنتظار ${Math.ceil(timeLeft / 1000)} ثانية لإستخدام هذا الأمر ..
 يجب التأكد من عدم تكرارك مخالفة شخص تمت مخالفته من قبل زميلك**`);
      }
    }
cooldown2.set(message.content, Date.now());
    if(message.content.startsWith(prefix + "تحذيرات")) return false;
    const wait = require('node:timers/promises').setTimeout;
    if (warnWork.includes(message.channel.id)) {
      const now = new Date()
    let madri = `(=)`
    let channel = message.guild.channels.cache.find(r => r.id == 
                                                   1210298488802386051);// ايدي روم تحذيرات
    let s1 = message.guild.roles.cache.find(r => r.name == "Warn 50%"); //اسم رتبة تحذير
    let s2 = message.guild.roles.cache.find(r => r.name == "Warn 100%");//اسم رتبة تحذير

    let excellent = message.guild.roles.cache.find(r=>r.name == "7up S ") //اسم رتبة البيع 
    let legendry = message.guild.roles.cache.find(r=>r.name == "Demon S")//اسم رتبة البيع 
    let epic = message.guild.roles.cache.find(r=>r.name == "Spicel S")//اسم رتبة البيع 
    let rare = message.guild.roles.cache.find(r=>r.name == "designer S")//اسم رتبة البيع 
    let normal = message.guild.roles.cache.find(r=>r.name == "Divel S")//اسم رتبة البيع 
    let rolesToCheck = ["7up S " , "Demon S" , "Spicel S" , "designer S" , "Divel S"] // اسماء رتب البيع
    let args = message.content.split(" ")
    let user = message.mentions.members.first() || message.guild.members.cache.find(r=>r.id ==      args[1])
    let reason = message.content.split(" ").slice(2).join(" ")
    if(!user) return message.reply(`**${emjFalse} يرجى وضع منشن الشخص أولاً !**`)
    const roles = user.roles.cache;
    const roleNames = Array.from(roles.values()).map(role => role.name);
    const rolesUserHas = rolesToCheck.filter(role => roleNames.includes(role));
    if(rolesUserHas.length === 0) return message.reply(`**${emjFalse} هذا الشخص لا يمتلك رتب بيع**`)
    if(!reason) return message.reply(`** ${emjFalse} يرجى وضع السبب أولاً !**`)
    if(!message.attachments.size) return message.reply(`**${emjFalse} يرجى وضع الدليل أولاً !**`)

    if(!user.roles.cache.some(r=>r.name == "Warn 50%") && !reason.includes(`(=)`)) {
    message.reply(`**${emjTrue} تم إعطاء التحذير لـ ${user} !**`)
    const db = require("pro.db");
    db.add(`weekwarns_${message.member.id}` , 1)
    db.add(`allwarns_${message.member.id}` , 1)
     const attachments = Array.from(message.attachments.values());
      const attachmentFiles = attachments.map((attachment) => attachment.url);
    channel.send({content:`** الشخص : ${user}\n\n الإداري : ${message.member}\n\n نوع التحذير : Warn 50%\n\n السبب : ${reason}\n\n الدليل :**` , files:attachmentFiles})
      const a = attachmentFiles.join(`\n`)
      channel.send(`${lineLink}`);
      const roles = user.roles.cache;
      const roleNames = Array.from(roles.values()).map(role => role.name);
      const rolesUserHas = rolesToCheck.filter(role => roleNames.includes(role));
 user.roles.add("1254010746644205619")//ايدي رتبه تتحذير اول

    }
    if(user.roles.cache.some(r=>r.name == "Warn 50%") && !reason.includes(`(=)`)) {
      if(!user.roles.cache.some(r=>r.name == "Warn 100%") && !reason.includes(`(=)`)) {
      message.reply(`**${emjTrue} تم إعطاء التحذير لـ ${user} !**`)
        const db = require("pro.db");
    db.add(`weekwarns_${message.member.id}` , 1)
    db.add(`allwarns_${message.member.id}` , 1)
     const attachments = Array.from(message.attachments.values());
      const attachmentFiles = attachments.map((attachment) => attachment.url);
    channel.send({content:`** الشخص : ${user}\n\n الإداري : ${message.member}\n\n نوع التحذير : Warn 100%\n\n السبب : ${reason}\n\n الدليل :**` , files:attachmentFiles})
       channel.send(`${lineLink}`);
        const a = attachmentFiles.join(`\n`)
        const roles = user.roles.cache;
      const roleNames = Array.from(roles.values()).map(role => role.name);
      const rolesUserHas = rolesToCheck.filter(role => roleNames.includes(role));

      user.roles.add("1254010828630523914") //ايدي رتبه تتحذير تاني 

    }
    }
    if(user.roles.cache.some(r=>r.name == "Warn 100%") && !reason.includes(`(=)`)) {
            user.roles.remove([Legendary,Excellent,Gold,Epic,Normal,Designer,Developer,VIP])
                message.reply(`**${emjTrue} تم إعطاء التحذير لـ ${user} !**`)
      const db = require("pro.db");
    db.add(`weekwarns_${message.member.id}` , 1)
    db.add(`allwarns_${message.member.id}` , 1)
     const attachments = Array.from(message.attachments.values());
      const attachmentFiles = attachments.map((attachment) => attachment.url);
    channel.send({content:`** الشخص : ${user}\n\n الإداري : ${message.member}\n\n نوع التحذير : سحب رتبة\n\n السبب : ${reason}\n\n الدليل :**` , files:attachmentFiles})
      const a = attachmentFiles.join(`\n`)
      const roles = user.roles.cache;
      const roleNames = Array.from(roles.values()).map(role => role.name);
      const rolesUserHas = rolesToCheck.filter(role => roleNames.includes(role));

      channel.send(`${lineLink}`);
    }
    if(reason.includes(`(=)`)) {
                message.reply(`**${emjTrue} تم إعطاء التحذير لـ ${user} !**`)
      const db = require("pro.db");
    db.add(`weekwarns_${message.member.id}` , 1)
    db.add(`allwarns_${message.member.id}` , 1)
     const attachments = Array.from(message.attachments.values());
      const attachmentFiles = attachments.map((attachment) => attachment.url);
    channel.send({content:`** الشخص : ${user}\n\n الإداري : ${message.member}\n\n نوع التحذير : سحب رتبة\n\n السبب : ${reason}\n\n الدليل :**` , files:attachmentFiles})
      channel.send(`${lineLink}`);
      const a = attachmentFiles.join(`\n`)
      const roles = user.roles.cache;
      const roleNames = Array.from(roles.values()).map(role => role.name);
      const rolesUserHas = rolesToCheck.filter(role => roleNames.includes(role));
              user.roles.remove([""])//اسماء رتب البيع 

    }
      }
  }
});

//////////////// كود حدف جميع تكتات موجوده في سيرفر
client.on('messageCreate', async up7up => {
  if (up7up.author.bot) return;
  if (up7up.content.startsWith(prefix + 'delete-tickets')) {
    if (up7up.member.permissions.has('ADMINISTRATOR')) {
    const channels = up7up.guild.channels.cache.filter(c =>
      c.name.startsWith('ticket-') && c.type === 'GUILD_TEXT');
channels.forEach(channel => {
      channel.delete().catch(console.error);
    });
up7up.reply('**تم حذف جميع التكتات الموجوده ✅**');
  }
}
}); 

/////////////// كود اظهار معلومات سيرفر

client.on('messageCreate', async message => {
  if (message.content === prefix + 'server') {
    const verificationLevels = { NONE: '0', LOW: '1', MEDIUM: '2', HIGH: '3', VERY_HIGH: '4' };
    let on = message.guild.presences.cache.filter(e => e.status == 'online').size - 1 || 0;
    let idle = message.guild.presences.cache.filter(e => e.status == 'idle').size + 1 || 0;
    let dnd = message.guild.presences.cache.filter(e => e.status == 'dnd').size || 0;
    const owner = await message.guild.fetchOwner();

    var embed = new MessageEmbed()
      .addFields([
        {
          name: `🆔 Server ID: `,
          value: `**${message.guild.id}**`
        },
        {
          name: `📅 Created On: `,
          value: `**<t:${parseInt(message.guild.createdAt / 1000)}:R>**`
        },
        {
          name: `👑 Owned by: `,
          value: `**${owner}**`
        },
        {
          name: `👥 Members: (**${message.guild.memberCount}**)`,
          value: `**${Math.floor(on + idle + dnd)}** **Online \n${message.guild.premiumSubscriptionCount} Boosts ✨**`
        },
        {
          name: `💬 Channels: (${message.guild.channels.cache.size})`,
          value: `**${message.guild.channels.cache.filter(m => m.type === 'GUILD_TEXT').size}** **Text | ${message.guild.channels.cache.filter(m => m.type === 'GUILD_VOICE').size} Voice**`
        },
        {
          name: `🌍 Others: `,
          value: `**Verification Level: ${verificationLevels[message.guild.verificationLevel]}**`
        },
        {
          name: `🔐 Roles:(${message.guild.roles.cache.size})`,
          value: `**To see a list with all roles use ${prefix}roles**`
        }
      ])
      .setColor(`2f3136`)
      .setAuthor(`${message.guild.name}`, `${message.guild.iconURL({ dynamic: true })}`);
    message.reply({ embeds: [embed] });
  }
});

//////////////////////// كود رد تلقائي

client.on('messageCreate', message => {
if(message.content.startsWith("سلام عليكم")) { // رسالة 
message.reply("وعليكم سلام") // الرد 
}
});

//////////////////// كود عجلة حظ 

const options = ['لا شيء', '5k', '50k', '100l', 'nitro 1 month']; // الجائزة

client.on('messageCreate', async message => {
    if (message.content === prefix +'spin') {
        const result = options[Math.floor(Math.random() * options.length)];

        const embed = new MessageEmbed()
            .setTitle('Spin the Wheel')
            .setDescription(`You got **${result}**!`)
            .setColor('RANDOM');

        await message.reply({ embeds: [embed] });
    }
});

/////////////////// كود اقترحات 

let sug = ["1215661203096084500", "", ""]; // حط اي دي روم الاقتراحات
let linee = ""; // رابط الخط
client.on("messageCreate", function(message) {
  let args = message.content.split(",");
  if (message.author.bot) return;
  if (sug.includes(message.channel.id)) {
    message.delete()
    const embed = new MessageEmbed()
      .setAuthor({
        name: message.author.tag, iconURL:
          message.author.avatarURL({ dynamic: true })
      })
      .setColor(`BLUE`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(`> **${args}**`)
      .setTimestamp()
      .setFooter("Thanks for your suggestion")
    let attachm = message.attachments.first()
    if (attachm) {
      embed.setImage(attachm.proxyURL)}

    message.channel.send({ embeds: [embed] }).then(msg => {
      msg.react(`👍`).then(() => { // رياكشن 
        msg.react('👎') // رياكشن 
      })
      message.channel.send({ files: [linee] });

    })
      .catch(console.error)
  }
});

//////////////////// اظهار واخفاء جميع رومات 

client.on('messageCreate', message =>{
  if(message.content === prefix +"hide all"){
  if(message.author.bot || !message.guild) return;
  if(!message.member.permissions.has('MANAGE_CHANNELS')) 
  return message.reply(`**ليس لديك الصلاحية ! 🙄 **`);
  let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
      message.guild.channels.cache.forEach((channel) => {
          channel.permissionOverwrites.create(everyone, {VIEW_CHANNEL: false}).then(() => {
    });
  })
  message.channel.send(`تم اخفاء جميع الرومات`)
  }
});

client.on('messageCreate', message =>{
  if(message.content === prefix +"show all"){
  if(message.author.bot || !message.guild) return;
  if(!message.member.permissions.has('MANAGE_CHANNELS')) 
  return message.reply(`**ليس لديك الصلاحية ! 🙄 **`);
  let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
      message.guild.channels.cache.forEach((channel) => {
          channel.permissionOverwrites.create(everyone, {VIEW_CHANNEL: true}).then(() => {
    });
  })
  message.channel.send(`تم اظهار جميع الرومات`)
  }
}); 

////////////////// حدف رسائل 
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(" ");

  if (args[0].toLowerCase() === prefix + "مسح") {
                                      // ايدي رتبه تقدر تستعمل الامر
    if (!message.member.roles.cache.has(1247718931607720027) && !message.member.permissions.has("ADMINISTRATOR")) return;

    let numToDelete = parseInt(args[1]);

    if (!numToDelete || isNaN(numToDelete) || numToDelete <= 0) {
      numToDelete = 50; 
    } else if (numToDelete > 50) {
      return message.reply({ content: "لا يمكنك حذف أكثر من 50 رسالة." });
    }

    message.channel.bulkDelete(numToDelete + 1, true).then(() => {
      setTimeout(() => {
        message.channel
          .send(`\`\`\`css\n${numToDelete} تم حذف عدد من الرسايل.\`\`\``)
          .then((msg2) => {
            setTimeout(() => {
              msg2.delete();
            }, 2000);
          });
      }, 2000);
    });
  }

  if (args[0].toLowerCase() === prefix + "clear") {
                                       // ايدي رتبه تقدر تستعمل الامر
    if (!message.member.roles.cache.has(1247718931607720027) && !message.member.permissions.has("ADMINISTRATOR")) return;

    let numToDelete = parseInt(args[1]);

    if (!numToDelete || isNaN(numToDelete) || numToDelete <= 0) {
      numToDelete = 50; // عدد الرسائل الافتراضي إذا لم يتم تحديد عدد
    } else if (numToDelete > 50) {
      return message.reply({ content: "لا يمكنك حذف أكثر من 50 رسالة." });
    }

    message.channel.bulkDelete(numToDelete + 1, true).then(() => {
      setTimeout(() => {
        message.channel
          .send(`\`\`\`css\n${numToDelete} تم حذف عدد من الرسايل.\`\`\``)
          .then((msg2) => {
            setTimeout(() => {
              msg2.delete();
            }, 2000);
          });
      }, 2000);
    });
  }
});

////////////////////////////// كود حدف كلمات محدده

  client.on("messageCreate", Kros => {
  if(Kros.content.includes("بوست",'شراء')) // كلمات تقدر تضيف ماله نهايه
 Kros.delete().catch((err) => {
   console.log(err)
   });
})
//////////////////////// كود سلكت منيرو رول اشعارات
const {message1,message2,Title,Des,r1,r1_name,r1_emoji,r2,r2_name,r2_emoji,r3,r3_name,r3_emoji,r4,r4_name,r4_emoji,r5,r5_name,r5_emoji} = require("./config.json")
client.on("messageCreate", async (dude) => {
  if (dude.content == prefix +`send`) {
      const rw = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("r1")
          .setLabel(r1_emoji)
          .setEmoji(r1_emoji)
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("r2")
          .setLabel(r2_name)
          .setEmoji(r2_emoji)
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("r3")
          .setLabel(r3_name)
          .setEmoji(r3_emoji)
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("r4")
          .setLabel(r4_name)
          .setEmoji(r4_emoji)
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("r5")
          .setLabel(r5_name)
          .setEmoji(r5_emoji)
          .setStyle("SECONDARY"),
      );
      const roles = new MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(Title)
        .setDescription(Des);
      dude.channel.send({ embeds: [roles], components: [rw] });

  }
});
client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId == "r1") {
      if (interaction.member.roles.cache.some((role) => role.id == r1)) {
        interaction.reply({
          content: `<@&${r1}> ${message1}`,
          ephemeral: true,
        });
        interaction.member.roles.remove(r1);
      } else {
        interaction.member.roles.add(r1);
        await interaction.reply({
          content: `<@&${r1}> ${message2}`,
          ephemeral: true,
        });
      }
    } else if (interaction.customId == "r2") {
      if (interaction.member.roles.cache.some((role) => role.id == r2)) {
        interaction.reply({
          content: `<@&${r2}> ${message1}`,
          ephemeral: true,
        });
        interaction.member.roles.remove(r2);
      } else {
        interaction.member.roles.add(r2);
        await interaction.reply({
          content: `<@&${r2}> ${message2}`,
          ephemeral: true,
        });
      }
    } else if (interaction.customId == "r3") {
      if (interaction.member.roles.cache.some((role) => role.id == r3)) {
        interaction.reply({
          content: `<@&${r3}> ${message1}`,
          ephemeral: true,
        });
        interaction.member.roles.remove(r3);
      } else {
        interaction.member.roles.add(r3);
        await interaction.reply({
          content: `<@&${r3}> ${message2}`,
          ephemeral: true,
        });
      }
    } else if (interaction.customId == "r4") {
      if (interaction.member.roles.cache.some((role) => role.id == r4)) {
        interaction.reply({
          content: `<@&${r4}> ${message1}`,
          ephemeral: true,
        });
        interaction.member.roles.remove(r4);
      } else {
        interaction.member.roles.add(r4);
        await interaction.reply({
          content: `<@&${r4}> ${message2}`,
          ephemeral: true,
        });
      }
    } else if (interaction.customId == "r5") {
      if (interaction.member.roles.cache.some((role) => role.id == r5)) {
        interaction.reply({
          content: `<@&${r5}> ${message1}`,
          ephemeral: true,
        });
        interaction.member.roles.remove(r5);
      } else {
        interaction.member.roles.add(r5);
        await interaction.reply({
          content: `<@&${r5}> ${message2}`,
          ephemeral: true,
        });
      }
    }
  }
});
///////////////////////// كود سلكت منيو معلومات 

client.on(`messageCreate`, async message => {
  if(message.content.startsWith(prefix + "sendinfo")){

    let owner = client.config.ownerID // ايدي اونر في ملف كونفق
    if(!owner.includes(message.member.id)) return;

const menu_i = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
                    .setCustomId('menu_info')
                    .setPlaceholder('اختار من هنا')
          .setMinValues(1)
          .setMaxValues(1)
                    .addOptions(
                        {
                            label: `الرتب العامة`,
                          value: "1",

                        },
                        {
                            label: 'الرتب النادرة' ,
                            value: '2',
                        },
                      {
   label : "الرومات الخاصة",  
          value: "3",

                      },
                        {
label: 'الاعلانات' ,

                            value: '4',

                      },{
          label: 'المنشورات' ,

                            value: '5',
                      },{
                          label: 'الاضافات' ,

                            value: '6',

                      },

               ),
        );

  message.channel.send({
      embeds: [
        new MessageEmbed()
        .setTitle("System Shop")
        .setDescription(`- **الرتب العامة : لرؤية معلومات الرتب العامة**
- **الرتب النادرة : لرؤية معلومات الرتب النادرة**
- **الرومات الخاصة : لرؤية معلومات الرومات الخاصة**
- **الاعلانات : لرؤية معلومات الاعلانات**
- **المنشوات : لرؤية معلومات المنشوات المميزة**
- **الاضافات : لرؤية معلومات الاضافات **`)
        .setColor(colorE)
       .setImage('').
        setThumbnail(message.guild.iconURL({dynamic:true}))
      ], components: [menu_i]})


}
})

      client.on("interactionCreate", async interaction => {
    if (interaction.customId === "menu_info") {
          let vale = interaction.values[0];
      if(vale === "1"){
      interaction.reply({embeds:[
      new MessageEmbed()
      .setTitle(`__ Normal Roles Informations・ معلومات الرتب العامة  __`)

.setDescription(`\n- ** S **
[ Price : 131579]
\`Perms ' الخصائص\`
- إمكانية نشر بكل الرومات
- إمكانية المنشن بكل الرومات
- إمكانية نشر الصور بكل الرومات 

- **Perfect S **
[ Pirce : 121053]
\`Perms ' الخصائص\`
- إمكانية نشر بكل الرومات عدا [ برمجيات - تصاميم ] 
- إمكانية المنشن بكل الرومات 
- إمكانية نشر الصور بكل الرومات

- **Great S **
[ Pirce : 89474]
\`Perms ' الخصائص\`
- إمكانية النشر بكل الرومات عدا [ برمجيات - تصاميم ] 
- إمكانيه المنشن بكل الرومات 
- إمكانية نشر الصور برومات حسابات - ديس فقط

- **Excellent S **
[ Pirce : 78948]
\`Perms ' الخصائص\`
- إمكانية النشر بكل الرومات عدا [ برمجيات - تصاميم ] 
- إمكانية المنشن بكل الرومات 
- عدم إمكانية نشر الصور 

- **Good S **
[ Pirce : 63158]
\`Perms ' الخصائص\`
- إمكانية نشر بكل الرومات عدا [ برمجيات - تصاميم ] 
- عدم إمكانية المنشن 
- عدم إمكانية نشر الصور

- **Designer S **
[ Pirce : 26316]
\`Perms ' الخصائص\`
- إمكانية النشر بروم [ تصاميم ] فقط 
- إمكانية المنشن 
- إمكانية نشر صور 

- **Developer S **
[ Pirce : 26316]
\`Perms ' الخصائص\`
- إمكانية نشر بروم [ برمجيات ] فقط
- إمكانية المنشن 
- إمكانية نشر صور 

**ملاحظات :**
- لطلب رتبة يرجى التواصل مع : <#1157684350847025234>
- التحويل لـ : <@1157684350847025234>
- ان قمت بالتحويل لشخص غير الحساب المذكور اعلاه فلن يتم تسليمك الرتبة و لن نتحمل المسؤولية
`)
.setColor(colorE)
.setImage('')
      ],ephemeral:true
        })

                        }
    }
    if (interaction.customId === "menu_info") {
          let vale = interaction.values[0];
      if(vale === "2"){
      interaction.reply({embeds:[
      new MessageEmbed()
      .setTitle(`__ Rare Roles Informations・ معلومات الرتب النادرة  __`)

.setDescription(`\n- **Vip S **
[ Pirce : 77779 ]
\`Perms ' الخصائص\` 
- إمكانية النشر بكل الرومات
- إمكانيه نشر الصور بكل الرومات
- إمكانية المنشن هير بكل الرومات
- منشن ايفري مرة باليوم بروم <#1156713801933131836> 
- منشور مميز كل 5 ايام
- نشر كل ساعه بروم <#1156713801933131836>

- ** S **
[ Pirce : 7888888 ]
\`Perms ' الخصائص\`
- إمكانية النشر بكل الرومات
- إمكانية نشر الصور بكل الرومات
- إمكانية المنشن هير بكل الرومات
- منشن ايفري ون مرتين باليوم بروم <#1156713801933131836> 
- منشور مميز كل يومين
- خصم 50% على الاعلانات بدون قيف اواي
- نشر كل ساعة بروم <#1156713801933131836>

**ملاحظات :**
- لطلب رتبة يرجى التواصل مع : <#1156713855511183450>
- التحويل لـ : 5666666666
- ان قمت بالتحويل لشخص غير الحساب المذكور اعلاه فلن يتم تسليمك الرتبة و لن نتحمل المسؤولية`)
.setColor(colorE)
.setImage('')

      ],ephemeral:true
        })

                        }
    }

  if (interaction.customId === "menu_info") {
          let vale = interaction.values[0];
      if(vale === "3"){
      interaction.reply({embeds:[
      new MessageEmbed()
      .setTitle(`__ Privte  Rooms Informations・ معلومات الرومات الخاصة  __`)

.setDescription(`\n
- **Private S **
[ Pirce : 75000 ]
[ Renew Pirce : 15000 ]
- روم خاص باسمك 
- إمكانية المنشن 
- إمكانية نشر الصور
- إمكانية الطلب و البيع
- نشر كل 60 دقيقة مع منشن هير

**ملاحظات** :
- الصلاحيات دي مسموحة فقط في الروم ما تختلط مع رومات النشر
- لطلب روم يرجى التواصل مع : <#1215643056640888872>
- التحويل لـ : <@1157684350847025234>
- ان قمت بالتحويل لشخص غير الحساب المذكور اعلاه فلن يتم تسليمك الروم و لن نتحمل المسؤولية`)
.setColor(colorE)
.setImage('')     
      ],ephemeral:true

        })

                        }}
    if (interaction.customId === "menu_info") {
          let vale = interaction.values[0];
      if(vale === "4"){
      interaction.reply({embeds:[
      new MessageEmbed()
      .setTitle(`__ Ads Informations・ معلومات الاعلانات __`)

.setDescription(`\n
**بدون منشن | No Mention
- 40,000 Credit

منشن هير | Here
- 65,000 Credit

منشن للكل | Everyone
- 100,000 Credit

هدايا الاعلانات | Ads Gifts 
- 200,000 Credit

روم خاص بدون قيف اواي | Private Room
- 300,000 Credit

روم خاص مع قيف اواي | Private Room
- 500,000 Credit **

**قوانين الاعلانات :

- في حال اعلانك 18+ سيتم مسح اعلانك
- مسموح نسوي reroll في حال لم يطبق الشروط كل الفائزين ، تنويه : reroll مره واحدة
- لا يوجد ضمان دخول اعضاء
- في حال وصلنا بلاغين نصب عن سيرفرك مع الدلائل سيتم مسح اعلانك بدون تعويض
- اعلانات الرومات الخاصة مع منشن افري ون و لمدة ثلاث ايام 
- اي اعلان يخص الكريدت ممنوع | بيع و شراء
- اي اعلان  يخص نظام الريوارد ممنوع
- اي اعلان فيه رابط بوت ممنوع**

**ملاحظات : **
- لطلب اعلان يرجى التواصل مع : <#1215643056640888872>
- التحويل لـ : <@1157684350847025234>
- ان قمت بالتحويل لشخص غير الحساب المذكور اعلاه فلن يتم عمل الاعلان و لن نتحمل المسؤولية**`)
.setColor(colorE)
.setImage('')
      ],ephemeral:true
        })

                        }}
            if (interaction.customId === "menu_info") {
          let vale = interaction.values[0];
      if(vale === "5"){
      interaction.reply({embeds:[
      new MessageEmbed()
      .setTitle(`__ Special Posts Informations・ معلومات المنشورات المميزة __`)

.setDescription(`\n

**Mention Here | منشن هير
السعر : 3222

Mention Everyone | منشن ايفريون
السعر : 3433333

**ملاحظات :**
لطلب منشور يرجى التواصل مع : <#1215643056640888872>
- التحويل لـ : <@1157684350847025234>
- اذا قمت بالتحويل لشخص غير الحساب المذكور أعلاه فلن يتم عمل المنشور و لن نتحمل المسؤولية
`)
.setColor(colorE)
.setImage('')
      ],ephemeral:true
        })

                        }}
                    if (interaction.customId === "menu_info") {
          let vale = interaction.values[0];
      if(vale === "6"){
      interaction.reply({embeds:[
      new MessageEmbed()
      .setTitle(`__ Special Posts Informations・ معلومات المنشورات المميزة __`)
.setDescription(`**تست **`)
.setColor(colorE)
  .setImage('')
      ],ephemeral:true
        })

                        }}
      })

///////////////// كود تشفير الكلمات

replace = [
  {
    word: "ديسكورد",
    replace: "ديـ-ـكورد"
  },
   {
    word: "متجر",
    replace: "مـ-ـجر"
  }, 
    {
    word: "شوب",
    replace: "شـ-ـب"
  },  
  {
      word: "متوفر",
      replace: "مـ-ـوفر"
  },
{
    word: "بوست",
    replace: "بو-ـت"
  },
{
    word: "نيترو",
    replace: "نيـ-ـرو"
  },
{
    word: "حساب",
    replace: "حـ-ـاب"
  },
{
    word: "سيرفر",
    replace: "سـ-ـرفر"
  },
{
    word: "سعر",
    replace: "سـ-ـر"
  },
   {
    word: "شراء",
    replace: "شـ-اء"
  },
   {
     word: "نصاب",
    replace: "نـ-ـاب"
   },
   {
    word: "بيع",
    replace: "بـ-ـع"
  },
   {
         word: "الديسكورد",
    replace: "الديـ-ـكورد"
  },
  {
    word: "المتجر",
    replace: "المـ-ـجر"
  }, 
  {
    word: "الشوب",
    replace: "الشـ-ـب"
  },  
  {
      word: "المتوفر",
      replace: "المـ-ـوفر"
  },
{
    word: "البوست",
    replace: "البو-ـت"
  },
{
    word: "النيترو",
    replace: "النيـ-ـرو"
  },
{
    word: "الحساب",
    replace: "الحـ-ـاب"
  },
{
    word: "السيرفر",
    replace: "السـ-ـرفر"
  },
{
    word: "السعر",
    replace: "السـ-ـر"
  },
   {
    word: "الشراء",
    replace: "الشـ-اء"
  },
   {
     word: "النصاب",
    replace: "النـ-ـاب"
   },
   {
    word: "البيع",
    replace: "البـ-ـع"
  },
]

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "encryption")) {
  if(!message.member.permissions.has("ADMINISTRATOR")) return;
    const embed = new MessageEmbed()
    .setTitle("System Shop")
    .setDescription(`** لتشفير منشورك  : 
   يرجى الضغط على زر تشفير**`)
    .setThumbnail(message.guild.iconURL())
 .setColor(colorE)   

      const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("SECONDARY")
            .setLabel("تشفير")
            .setCustomId('replace')

        )

    message.channel.send({embeds: [embed], components: [row]})
  }
})


client.on("interactionCreate", async i => {
  if (!i.isButton()) return;
  if (i.customId == "replace") {
            const modal = new Modal()
            .setTitle('تشفير منشور')
            .setCustomId('rep')

   const replacer = new TextInputComponent()
            .setCustomId('replacetext')
            .setLabel(`المنشور`)
     .setPlaceholder(`ضع المنشور الخاص بك هنا`)
            .setMaxLength(4000)
            .setRequired(true)
            .setStyle("PARAGRAPH")

       const rows = [replacer].map(
                (component) => new MessageActionRow().addComponents(component)
            )
            modal.addComponents(...rows);
            i.showModal(modal);

  }

})

client.on("interactionCreate", async i => {
  if (!i.isModalSubmit()) return;
  if (i.customId == "rep") {
let text = i.fields.getTextInputValue('replacetext');
let rep = i.fields.getTextInputValue('replacetext');
    let replaced = false;

    replace.forEach(t => {
      const regex = new RegExp(t.word, 'g');
      if (regex.test(text)) {
        text = text.replace(regex, t.replace);
        replaced = true;
      }
    });


    if (replaced) {
i.reply({content: `- __ تم تشفير منشورك __\n\n${text}`,ephemeral: true})
let log = client.channels.cache.get("1254018504093466645") // ايدي روم الوق
  if(log) log.send({embeds: [
    new MessageEmbed()
    .setTitle(`تشفير منشور جديد`)
    .addField(`المنشور قبل التشفير :`,`${rep}`)
   .addField(`المنشور بعد التشفير :`,`${text}`)
    .addField(`الشخص :`,`<@${i.member.id}>`)

    .setColor(colorE)
.setThumbnail(i.guild.iconURL({dynamic:true}))
    .setTimestamp()

  ]})
log.send({files:[line]})

    } else {
      i.reply({content: "> ** منشورك زي الفل يسطا مش محتاج تشفير**", ephemeral: true})
    }
  }

})

///////////////////// كود فتح روم 

client.on('messageCreate', message => {
    if (message.content === prefix + 'unlock') {
        if (!message.guild) return message.reply('**This command is only for servers ❌**');

        if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('**You don\'t have `MANAGE_CHANNELS` permission**');

        message.channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: true
        }).then(() => {
            message.reply('**✅ | Chat has been unlocked**');
        }).catch(error => {
            console.error('Error unlocking channel:', error);
        });
    }
});

////////////////// كود قفل روم 

client.on('messageCreate', message => {
  if (message.content === prefix + 'lock') {
    if (!message.guild) return message.reply('**This command is only for servers ❌**');

    if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('**You don\'t have `MANAGE_CHANNELS` permission**');

    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.reply('**✅ | Chat has been locked **');
    });
  }
});

///////////////// كود مسح سب و روابط سيرفرات مع ميوت ساعه

client.on("messageCreate" , async message => {
 let words = ["test","discord.com","discord.gg/"]
 for (let s = 0;s < words.length;s++) {
   if(message.content.includes(words[s])) {
   if(!message.member.permissions.has("ADMINISTRATOR")) {  
   let member = message.member;
   let embed = new MessageEmbed()
   .setAuthor(message.author.username , message.author.displayAvatarURL())
   .setTitle("**You Are Muted !**")
   .setDescription(`**You are muted in \`${message.guild.name}\` server for a 1 hour**\n**For sharing a bad words or links in the chat !**\n**Your message : \`${message.content}\`**`)
   .setThumbnail(message.guild.iconURL())
   .setFooter(message.guild.name , message.guild.iconURL())
   message.delete()
   await message.channel.send(`${message.member} **It's Not allowed to share a bad words or links !**`)
   await member.timeout(3600000 , "idk")
   await message.member.send({embeds:[embed]})
   }}
 }
});

///////////////// كود اتبث نفسك

let role = "1210299899674103889"//ايدي الرول يلي تنعطى للشخص

client.on("messageCreate" , message => {
  if(message.content ==  prefix+ "setups") {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
      .setEmoji("✅")
      .setCustomId("prove")
      .setStyle("SECONDARY")
    )
    let embed = new MessageEmbed()
    .setDescription(`**لظهار جميع الرومات يجب عليك ضغظ الزر بالاسفل ✅**`)
    .setColor("GREEN")
    message.delete()
    message.channel.send({embeds:[embed] , components:[row]})
  }
});

client.on("interactionCreate" , interaction => {
  if(interaction.isButton()) {
    if(interaction.customId == "prove") {
      let role2 = interaction.guild.roles.cache.find(r=>r.id == role)
      if(!interaction.member.roles.cache.some(r=>r.id == role2.id)) {
        interaction.member.roles.add([role2])
        interaction.reply({content:`**Done Added The Prove Role ✅**` , ephemeral:true})
      }
      if(interaction.member.roles.cache.some(r=>r.id == role2.id)) {
        interaction.member.roles.remove([role2])
        interaction.reply({content:`**Done Removed The Prove Role ⛔**` , ephemeral:true})
      }
    }
 }
}); 

//////////////////////////// كود فتح و غلق رومات 

client.on('messageCreate', async mesg => {
if(mesg.content == `-close`) {

  let row = new MessageActionRow()
    .addComponents(   new MessageButton()
        .setCustomId(`close-rooms`)
        .setLabel("8:00")
        .setEmoji("🕙")
        .setStyle('SECONDARY')
      );

if(!mesg.member.roles.cache.find((role) => role.id=== '1247718931607720027')) //ايدي رول الي يقدر يتحكم
return mesg.reply({embeds:[permissions]})
let men = mesg.guild.roles.cache.find(role => role.id === '1210299899674103889'); //ايدي رول الممبر
if(!men) return;
let C1 = client.channels.cache.get(`1254013706526920800`); //Vip
let C2 = client.channels.cache.get(`1254013810000527371`); //acc
let C3 = client.channels.cache.get(`1254014105602228326`);  //dis
let C4 = client.channels.cache.get(`1254014067467878481`); //des 
let C5 = client.channels.cache.get(`1254013857396031499`); 
//dev
let C6 = client.channels.cache.get(`1254013899217309766`); 
//trq
let C7 = client.channels.cache.get(`1254013989696966776`); 
//coins
let C8 = client.channels.cache.get(``);
//gim
let C9 = client.channels.cache.get(``);
//other
//let C10 = client.channels.cache.get(`1145081577026637834`)
C1.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C2.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C3.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C4.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C5.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C6.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C7.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C8.permissionOverwrites.create(men,{'VIEW_CHANNEL': false}); C9.permissionOverwrites.create(men,{'VIEW_CHANNEL': false}); 
//C10.permissionOverwrites.create(men,{'VIEW_CHANNEL': false}); 
C1.bulkDelete(100, true)
C2.bulkDelete(100, true)
C3.bulkDelete(100, true)
C4.bulkDelete(100, true)
C5.bulkDelete(100, true)
C6.bulkDelete(100, true)
C7.bulkDelete(100, true)
C8.bulkDelete(100, true)
C9.bulkDelete(100, true)
//C10.bulkDelete(100, true)
mesg.reply({ content : `__**Closed**__ ⛔️`});
let news = client.channels.cache.get(`1254019714309427240`);// ايدي الروم الي ينشر فيه حالة النشر
news.bulkDelete(100, true)
await news.send({content : `تم غلق الرومات`})
await news.send({files:(`${lineLink}`),components: [row]})   // رابط الخط
}})


client.on('messageCreate', async mesg => {
if(mesg.content == `-open`) {

  let row = new MessageActionRow()
    .addComponents(   new MessageButton()
        .setCustomId(`open-rooms`)
        .setLabel("23:00")
        .setEmoji("🕝")
        .setStyle('SECONDARY')
      );

if(!mesg.member.roles.cache.find((role) => role.id=== '1247717614193737779')) //ايدي رول الي يقدر يتحكم
return mesg.reply({embeds:[permissions]})
let men = mesg.guild.roles.cache.find(role => role.id === '1210299899674103889'); //ايدي رول الممبر
if(!men) return;
let C1 = client.channels.cache.get(`1254013706526920800`); //Vip
let C2 = client.channels.cache.get(`1254013810000527371`); //acc
let C3 = client.channels.cache.get(`1254014105602228326`);  //dis
let C4 = client.channels.cache.get(`1254014067467878481`); //des 
let C5 = client.channels.cache.get(`1254013857396031499`); 
//dev
let C6 = client.channels.cache.get(`1254013899217309766`); 
//trq
let C7 = client.channels.cache.get(`1254013989696966776`); 
//coins
let C8 = client.channels.cache.get(``);
//gim
let C9 = client.channels.cache.get(``);
//other
//let C10 = client.channels.cache.get(`1145081577026637834`) 
C1.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C2.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C3.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C4.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C5.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C6.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C7.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C8.permissionOverwrites.create(men,{'VIEW_CHANNEL': true}); C9.permissionOverwrites.create(men,{'VIEW_CHANNEL': true}); 
//C10.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C1.bulkDelete(100, true)
C2.bulkDelete(100, true)
C3.bulkDelete(100, true)
C4.bulkDelete(100, true)
C5.bulkDelete(100, true)
C6.bulkDelete(100, true)
C7.bulkDelete(100, true)
C8.bulkDelete(100, true)
C9.bulkDelete(100, true)
//C10.bulkDelete(100, true)
mesg.reply({ content : `**Rooms is Back**`});
let news = client.channels.cache.get(`1254019714309427240`);// ايدي الروم الي ينشر فيه حالة النشر
news.bulkDelete(100, true)
await news.send({content : `تم اظهار الرومات @here`})
await news.send({files:(`${lineLink}`),components: [row] })   // رابط الخط
}})

const timestamp = require('discord-timestamp');
const moment = require('moment')

/////////////////////// كود طلبات 

let mn = '1247712444944748574';/// ايدي رول الي تتمنشن في روم المنتجات

let br = '1247712444944748574';/// ايدي رول الي تتمنشن في روم البرمجيات

let ta = '1247712444944748574'; /// ايدي رول الي تتمنشن في روم التصاميم

const targetRoleId = '1247712444944748574'; /// ايدي الرول الي تحذف الطلبات
const logChannelId = '1254018504093466645'; /// لوق حذف التصاميم
const brmjeatID = '1254018504093466645'; /// لوق حذف برمجيات
const logmntgatID = '1254018504093466645'; /// لوق حذف منتجات


client.on('messageCreate', async (message) => {
  if (message.content === prefix +'sendEmbed') {
    const embed = new MessageEmbed()
    .setTitle(`الطلبات`)
      .setDescription(
`**يرجى اختيار المكان المناسب لطلبك عبر الازرار في الأسفل

منتجات :                                        
- مثل : نيترو , حسابات , بوستات , عملات الخ ..

تصاميم : 
- مثل صورة , بنر , صورة بروفايل الخ ..

برمجيات : 
- مثل : بوت , كود , بروجكت الخ ..

- يرجى مراجعة القوانين في <#1254013371402027101> قبل الطلب لتجنب المخالفة

- عقوبة المخالفة ميوت 1 ساعه**`)
      .setColor(`${colorE}`) 
      .setThumbnail(message.guild.iconURL())
      //.setImage(``)

   const button = new MessageButton()
  .setEmoji('🎨')
  .setCustomId('myButton')
  .setLabel('تصاميم')
  .setStyle('SECONDARY');


const button1 = new MessageButton()
  .setEmoji('💻')
  .setCustomId('myButton1')
  .setLabel('برمجيات')
  .setStyle('SECONDARY');

const button2 = new MessageButton()
  .setEmoji('🎮')
  .setCustomId('myButton2')
  .setLabel('منتجات')
  .setStyle('SECONDARY'); 

    const row = new MessageActionRow().addComponents(button2 , button , button1  );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const customId = interaction.customId;

  if (customId === 'myButton') {
    const addOwnerModal = new Modal()
      .setCustomId('myButton')
      .setTitle('اضف طلبك');
    const ownerIdInput = new TextInputComponent()
      .setCustomId('myButton')
      .setLabel('الطلب اكتبه هنا')
      .setMaxLength(4000)
      .setStyle(`PARAGRAPH`)
      .setRequired(true);

    const modalRow = new MessageActionRow().addComponents(ownerIdInput);

    addOwnerModal.addComponents(modalRow);

    await interaction.showModal(addOwnerModal);
  } else if (customId === 'deleteButton') {
    if (interaction.member.roles.cache.has(targetRoleId)) {
      await interaction.message.delete();
       const logChannel = interaction.guild.channels.cache.get(logChannelId);
      if (logChannel) {
        const deletedBy = interaction.user.toString();
        const embed = new MessageEmbed()
          .setTitle('تصاميم')
          .setDescription(`الرسالة تم حذفها بواسطة: ${deletedBy}`)
          .setTimestamp();
        await logChannel.send({ embeds: [embed] });
      }
    } else {
      await interaction.reply({ content: '**لا يمكنك حذف الطلب بسبب انت لا تملك الرتبه**', ephemeral: true });
    }
  }
});
client.on('interactionCreate', async (i) => {
  if (!i.isModalSubmit()) return;
  if (i.customId === 'myButton') {
    const myButton = i.fields.getTextInputValue('myButton'); 
    const user = i.user;

    let er = db.get('er') || 0;
    er++;
    db.set('er', er);

    const mention = user.toString();

    const sl = `<@&${ta}> - ${mention}`;
    const channel = await client.channels.fetch('1254014067467878481'); // روم تصاميم

    const embed = new MessageEmbed()
      .setTitle('> **طلب جديد :**')
      .setDescription(`**${myButton}**`)
      .setColor(`${colorE}`) 
      .setThumbnail(i.guild.iconURL())
      .setTimestamp()
      .setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })
      .setAuthor({ name: `${i.member.user.username}`, iconURL: i.member.displayAvatarURL() })
    const deleteButton = new MessageButton()
      .setCustomId('deleteButton')
      .setLabel('Delete')
      .setStyle('DANGER');

    await channel.send({ content: `${sl}\n`, embeds: [embed], components: [new MessageActionRow().addComponents(deleteButton)] });
   await channel.send({ content: `https://cdn.discordapp.com/attachments/1005558964102103130/1253806724150726676/20240224_074121.jpg?ex=66773201&is=6675e081&hm=c986c9415b00a1470abb0605cda79695f33322ed447f9df952df0a2416477145&` });/////خط

    await i.reply({ content: 'تم ارسال الطلب', ephemeral: true });
  }
});


client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const customId = interaction.customId;

  if (customId === 'myButton1') {
    const addOwnerModal = new Modal()
      .setCustomId('myButton1')
      .setTitle('اضف طلبك');
    const ownerIdInput = new TextInputComponent()
      .setCustomId('myButton1')
      .setLabel('الطلب اكتبه هنا')
      .setMaxLength(4000)
      .setStyle(`PARAGRAPH`)
      .setRequired(true);

    const modalRow = new MessageActionRow().addComponents(ownerIdInput);

    addOwnerModal.addComponents(modalRow);

    await interaction.showModal(addOwnerModal);
  } else if (customId === 'del') {
    if (interaction.member.roles.cache.has(targetRoleId)) {
      await interaction.message.delete();
       const brmjeat = interaction.guild.channels.cache.get(brmjeatID);
      if (brmjeat) {
        const deletedBy = interaction.user.toString();
        const embed = new MessageEmbed()
          .setTitle('برمجيات')
          .setDescription(`الرسالة تم حذفها بواسطة: ${deletedBy}`)
          .setTimestamp();
        await brmjeat.send({ embeds: [embed] });
      }
    } else {
      await interaction.reply({ content: '**لا يمكنك حذف الطلب بسبب انت لا تملك الرتبه**', ephemeral: true });
    }
  }
});
client.on('interactionCreate', async (i) => {
  if (!i.isModalSubmit()) return;
  if (i.customId === 'myButton1') {
    const myButton1 = i.fields.getTextInputValue('myButton1'); 
    const user = i.user;

    let or = db.get("or") || 0;
    or++;
    db.set("or", or);

    const mention = user.toString();

    const kl = `<@&${br}>- ${mention}`;
    const channel = await client.channels.fetch('1254013857396031499');///////ايدي روم البرمجيات

    const embed = new MessageEmbed()
      .setTitle('> **طلب جديد :**')
      .setDescription(`**${myButton1}**`)
      .setColor(`${colorE}`) 
      .setThumbnail(i.guild.iconURL())
      .setTimestamp()
      .setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })
      .setAuthor({ name: `${i.member.user.username}`, iconURL: i.member.displayAvatarURL() })
    const del = new MessageButton()
      .setCustomId('del')
      .setLabel('Delete')
      .setStyle('DANGER');

    await channel.send({ content: `${kl}\n`, embeds: [embed], components: [new MessageActionRow().addComponents(del)] });
    await channel.send({ content: `https://cdn.discordapp.com/attachments/1005558964102103130/1253806724150726676/20240224_074121.jpg?ex=66773201&is=6675e081&hm=c986c9415b00a1470abb0605cda79695f33322ed447f9df952df0a2416477145&` });/////خط

    await i.reply({ content: 'تم ارسال الطلب', ephemeral: true });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const customId = interaction.customId;

  if (customId === 'myButton2') {
    const addOwnerModal = new Modal()
      .setCustomId('myButton2')
      .setTitle('اضف طلبك');
    const ownerIdInput = new TextInputComponent()
      .setCustomId('myButton2')
      .setLabel('الطلب اكتبه هنا')
      .setMaxLength(4000)
      .setStyle(`PARAGRAPH`)
      .setRequired(true);

    const modalRow = new MessageActionRow().addComponents(ownerIdInput);

    addOwnerModal.addComponents(modalRow);

    await interaction.showModal(addOwnerModal);
  }else if (customId === 'delt') {
    if (interaction.member.roles.cache.has(targetRoleId)) {
      await interaction.message.delete();
       const logmntgat = interaction.guild.channels.cache.get(logmntgatID);
      if (logmntgat) {
        const deletedBy = interaction.user.toString();
        const embed = new MessageEmbed()
          .setTitle('منتجات')
          .setDescription(`الرسالة تم حذفها بواسطة: ${deletedBy}`)
          .setTimestamp();
        await logmntgat.send({ embeds: [embed] });
      }
    } else {
      await interaction.reply({ content: '**لا يمكنك حذف الطلب بسبب انت لا تملك الرتبه**', ephemeral: true });
    }
  }
});

client.on('interactionCreate', async (i) => {
  if (!i.isModalSubmit()) return;
  if (i.customId === 'myButton2') {
    const myButton2 = i.fields.getTextInputValue('myButton2'); 
    const user = i.user;

    let orderNumber = db.get("orderNumber") || 0;
    orderNumber++;
    db.set("orderNumber", orderNumber);

    const mention = user.toString();

    const additionalMessage = `**<@&${mn}> \n صاحب الطلب : ${mention}**`;
    const channel = await client.channels.fetch('1247840266665197638');/// روم منتجات

    const embed = new MessageEmbed()
      .setTitle('> **طلب جديد :**')
      .setDescription(`**${myButton2}**`)
      .setColor(`${colorE}`) 
      .setThumbnail(i.guild.iconURL())
      .setTimestamp()
      .setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })
      .setAuthor({ name: `${i.member.user.username}`, iconURL: i.member.displayAvatarURL() })
    const delt = new MessageButton()
      .setCustomId('delt')
      .setLabel('Delete')
      .setStyle('DANGER');

    await channel.send({ content: `${additionalMessage}\n`, embeds: [embed], components: [new MessageActionRow().addComponents(delt)] });
    await channel.send({ content: `https://cdn.discordapp.com/attachments/1005558964102103130/1253806724150726676/20240224_074121.jpg?ex=66773201&is=6675e081&hm=c986c9415b00a1470abb0605cda79695f33322ed447f9df952df0a2416477145&` });/////خط

    await i.reply({ content: 'تم ارسال الطلب', ephemeral: true });
  }
});

///////////////// كود اشعارات بائعين 

const roleButtonMap = [
  {
    label: "Prince",
    emoji: "<:emoji_31:1253738186451062964>", //اموجي
    roleID: "1254014605689360415",//ايدي رتبة
  },
  {
    label: "Perfect S",
    emoji: "<:emoji_31:1253738186451062964>", //اموجي
    roleID: "1254014697322319872", // ايدي رتبة
  },
  {
    label: "Excellent S",
    emoji: "<:emoji_31:1253738186451062964>", //اموجي
    roleID: "1254014806458109972", // ايدي رتبة
  },
];

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === prefix +"roleh") {
    const buttonRow = new MessageActionRow();

    for (const { label, emoji } of roleButtonMap) {
      const button = new MessageButton()
        .setCustomId(emoji)
        .setLabel(label)
        .setEmoji(emoji)
        .setStyle("SECONDARY");

      buttonRow.addComponents(button);
    }

    const embed = new MessageEmbed()
      .setTitle(
        "**<:emoji_31:1253738186451062964> System S Seller Notification・إشعارات البائعين**" 
      )
      .setColor(`${colorE}`)
      .setDescription( 
        "> **<:emoji_31:1253738186451062964> لإستقبال منشن طلبات المنتجات إضغط : <:emoji_31:1253738186451062964> **\n> **<:emoji_31:1253738186451062964> لإستقبال منشن طلبات التصاميم إضغط : <:emoji_31:1253738186451062964> **\n> **<:emoji_31:1253738186451062964> لإستقبال منشن طلبات البرمجيات إضغط : <:emoji_31:1253738186451062964>**"
      ); 

    const sentMessage = await message.channel.send({
      embeds: [embed],
      components: [buttonRow],
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.user.bot) return;

  const { customId } = interaction;

  const role = roleButtonMap.find((button) => button.emoji === customId);

  if (role) {
    const { roleID } = role;
    const member = await interaction.guild.members.fetch(interaction.user.id);

    try {
      await member.roles.add(roleID);
      console.log(`تم إضافة الرتبة ${roleID} ل ${interaction.user.tag}`);
      await interaction.reply({ content: `تم إضافة الرتبة`, ephemeral: true });
    } catch (error) {
      console.error(
        `Failed to add role ${roleID} to ${interaction.user.tag}: ${error}`
      );
      await interaction.reply({
        content: "حدث خطأ أثناء إضافة الرتبة",
        ephemeral: true,
      });
    }
  }
});



client.login(process.env.token);
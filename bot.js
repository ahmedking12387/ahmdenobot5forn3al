const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '+'

client.on('ready', () => {
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});

client.on('message', async message => {
  let args = message.content.split(" ");
  if(message.content.startsWith(prefix + "tempmute")) {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('**أنت لا تملك الخصائص اللازمة . يجب توفر خاصية `Manage Roles`**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply('**أنا لا املك الخصائص الكافية . يلزم خصائص `Manage Roles` للقيام بهذا الامر**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    let mention = message.mentions.members.first();
    if(!mention) return message.reply('**منشن عضو لأسكاته ( لأعطائة ميوت ) كتابي**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    if(mention.highestRole.position >= message.guild.member(message.author).highestRole.positon) return message.reply('**لا يمكنك اعطاء لميوت شخص رتبته اعلى منك**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
    if(mention.highestRole.positon >= message.guild.member(client.user).highestRole.positon) return message.reply('**لا يمكنني اعطاء ميوت لشخص رتبته اعلى مني**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
    if(mention.id === message.author.id) return message.reply('**لا يمكنك اعطاء ميوت  لنفسك**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    let duration = args[2];
    if(!duration) return message.reply('**حدد وقت زمني لفك الميوت عن الشخص**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    if(isNaN(duration)) return message.reply('**(حدد وقت زمني صحيح (الوقت بالدقائق**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    let reason = message.content.split(" ").slice(3).join(" ");
    if(!reason) reason = "غير محدد";

    let thisEmbed = new Discord.RichEmbed()
    .setAuthor(mention.user.username, mention.user.avatarURL)
    .setTitle('تم اعطائك ميوت بسيرفر')
    .setThumbnail(mention.user.avatarURL)
    .addField('# - السيرفر',message.guild.name,true)
    .addField('# - تم اعطائك ميوت بواسطة',message.author,true)
    .addField('# - السبب',reason)

    let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
    if(!role) try {
      message.guild.createRole({
        name: "Muted",
        permissions: 0
      }).then(r => {
        message.guild.channels.forEach(c => {
          c.overwritePermissions(r , {
            SEND_MESSAGES: false,
            SPEAK: false,
	    MUTE_MEMBERS: true,  
            READ_MESSAGES_HISTORY: false,
            ADD_REACTIONS: false
          });
        });
      });
    } catch(e) {
      console.log(e.stack);
    }
    mention.addRole(role).then(() => {
      mention.send(thisEmbed);
      message.channel.send(`**:white_check_mark: ${mention.user.username} muted in the server ! :zipper_mouth:  **  `);
      mention.setMute(true);
    });
    setTimeout(() => {
      if(duration === 0) return;
      mention.setMute(false);
      mention.removeRole(role);
      message.channel.send(`**:white_check_mark: ${mention.user.username} unmuted in the server ! :neutral_face:  **  `);
    },duration * 60000);
  } else if(message.content.startsWith(prefix + "untempmute")) {
    let mention = message.mentions.members.first();
    let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('**أنت لا تملك الخصائص اللازمة . يجب توفر خاصية `Manage Roles`**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply('**أنا لا املك الخصائص الكافية . يلزم خصائص `Manage Roles` للقيام بهذا الامر**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    if(!mention) return message.reply('**منشن الشخص لفك الميوت عنه**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

      mention.removeRole(role);
      mention.setMute(false);
      message.channel.send(`**:white_check_mark: ${mention.user.username} unmuted in the server ! :neutral_face:  **  `);
  }
});

client.on('message', function(message) {
	const myID = "279194403564814336";
    let args = message.content.split(" ").slice(1).join(" ");
    if(message.content.startsWith(prefix + "setname")) {
		        if(message.author.id !== myID) return;
            if(!args) return message.reply('اكتب الاسم الذي تريده.');
        client.user.setUsername(args);
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "stream")) {
		        if(message.author.id !== myID) return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        client.user.setGame(args , 'https://twitch.tv/LOP');
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "offstatus")) {
                if(message.author.id !== myID) return;
client.user.setGame(args , '');
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "play")) {
				        if(message.author.id !== myID) return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        client.user.setGame(args);
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "listen")) {
				        if(message.author.id !== myID) return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        client.user.setActivity(args, {type:'LISTENING'});
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "watch")) {
				        if(message.author.id !== myID) return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        client.user.setActivity(args, {type:'WATCHING'});
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "setavatar")) {
				        if(message.author.id !== myID) return;
        client.user.setAvatar(args);
        message.channel.send(':white_check_mark: Done!').then(msg => {
                if(!args) return message.reply('اكتب رابط الصوره التي تريدها.');
           msg.delete(5000);
          message.delete(5000);
        });
    }
});

client.on('message', function(message) {
	const myID = "302354407864139777";
    let args = message.content.split(" ").slice(1).join(" ");
    if(message.content.startsWith(prefix + "setname")) {
		        if(message.author.id !== myID) return;
            if(!args) return message.reply('اكتب الاسم الذي تريده.');
        client.user.setUsername(args);
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "stream")) {
		        if(message.author.id !== myID) return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        client.user.setGame(args , 'https://twitch.tv/LOP');
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "offstatus")) {
                if(message.author.id !== myID) return;
client.user.setGame(args , '');
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "play")) {
				        if(message.author.id !== myID) return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        client.user.setGame(args);
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "listen")) {
				        if(message.author.id !== myID) return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        client.user.setActivity(args, {type:'LISTENING'});
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "watch")) {
				        if(message.author.id !== myID) return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        client.user.setActivity(args, {type:'WATCHING'});
        message.channel.send(':white_check_mark: Done!').then(msg => {
           msg.delete(5000);
          message.delete(5000);
        });
    } else if(message.content.startsWith(prefix + "setavatar")) {
				        if(message.author.id !== myID) return;
        client.user.setAvatar(args);
        message.channel.send(':white_check_mark: Done!').then(msg => {
                if(!args) return message.reply('اكتب رابط الصوره التي تريدها.');
           msg.delete(5000);
          message.delete(5000);
        });
    }
});
client.on('message', message => {
	               if(!message.channel.guild) return message.reply('');
if (message.author.bot) return;
    if (message.content === "اقفل الشات") {
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' انت لاتمتلك الصلاحبات الازمة لهذا الامر');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("تم قفل الشات بنجاح  ✅ ")
           });
             }
if (message.content === "افتح الشات") {
    if(!message.channel.guild) return message.reply(' This command only for servers');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('انت لاتمتلك الصلاحبات الازمة لهذا الامر');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               message.reply("تم فتح الشات بنجاح✅")
           });
             }



});


client.on('message', message => {
if(!message.channel.guild) return message.reply('');
  if(message.author.bot) return;

	
  if(message.channel.id == '475999824525656064') return;
  if(message.channel.id == '476877117452320778') return;
  if(message.channel.id == '477358506648010752') return;
  if(message.channel.id == '477358582397009921') return;
  if(message.channel.id == '482123244602654721') return;
  if(message.channel.id == '477093131263672320') return;
  if(message.channel.id == '477340217188155392') return;
  if(message.channel.id == '476876831241535488') return;
  if(message.channel.id == '476876876519047169') return;
  if(message.channel.id == '489881423860203540') return;
  if(message.channel.id == '489881395850641408') return;
  if(message.channel.id == '490468086672261131') return;
  if(message.channel.id == '489882490987872266') return;
  if(message.channel.id == '490942592301662218') return;  
  if(message.channel.id == '491218114437185536') return;
  if(message.channel.id == '492825067701665823') return;
	            
if (message.author.bot) return;
    if (message.content === "اقفل جميع الشاتات") {
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' انت لاتمتلك الصلاحبات الازمة لهذا الامر');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("تم قفل الشات بنجاح  ✅ ")
           });
             }
if (message.content === "افتح جميع الشاتات") {

if(!message.channel.guild) return message.reply('');
  if(message.author.bot) return;

	
  if(message.channel.id == '475999824525656064') return;
  if(message.channel.id == '476877117452320778') return;
  if(message.channel.id == '477358506648010752') return;
  if(message.channel.id == '477358582397009921') return;
  if(message.channel.id == '482123244602654721') return;
  if(message.channel.id == '477093131263672320') return;
  if(message.channel.id == '477340217188155392') return;
  if(message.channel.id == '476876831241535488') return;
  if(message.channel.id == '476876876519047169') return;
  if(message.channel.id == '489881423860203540') return;
  if(message.channel.id == '489881395850641408') return;
  if(message.channel.id == '490468086672261131') return;
  if(message.channel.id == '489882490987872266') return;
  if(message.channel.id == '490942592301662218') return;  
  if(message.channel.id == '491218114437185536') return;
  if(message.channel.id == '492825067701665823') return;
   
 if(!message.channel.guild) return message.reply(' This command only for servers');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('انت لاتمتلك الصلاحبات الازمة لهذا الامر');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               message.reply("تم فتح الشات بنجاح✅")
           });
             }



});



client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let prefix = "+";
    let messageArray = message.content.split(" ");
    let command = messageArray[0];

if (command === `${prefix}join`) {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('**أنت لا تملك الخصائص اللازمة . يجب توفر خاصية `Manage Roles`**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
        message.member.voiceChannel.join()
    message.channel.send('Okey, joined your voice channel.')
};

});



  client.on('message', async message => {
if(message.author.bot) return;
if (message.channel.guild) {
    if(message.content.startsWith(prefix + "help")) {
message.author.send(``).catch(RebeL =>{console.log('`Error`: ' + RebeL);
message.channel.send("**للأسف , لديك اعدادات خصوصية لاتسمح لي بأرسال رسائل خاصة لك **")
});
}}});


client.on('message', message => {
if (message.content.startsWith(prefix + 'help')) { /// This is The DMS Code Send The Help In DMS // Code By NotGucci
    let pages = [`

:earth_africa: **الاوامر العامة** :earth_africa:

1-  +id     | ل اضهار معلوماتك في السيرفر
2-  +stats  | ل اضهار حالت البوت
3-  +invites| لمعرفة عدد دعواتك بالسيرفر
-4  لأخذ قائمة الالوان |  الوان
-5  لتفير لونك بالسيرفر  |   الون
6- +server | معلومات السيرفر

اذا تبي رابط اكتب ب الشات
(رابط)

اذا نشرت اي رابط دسكورد رح تاخذ ميوت تلقائي



▶ ل التوجة الى أوامر الادارة اضغط
   `
,`

 :spy::skin-tone-1:  آوامر الادارة :spy::skin-tone-1:


1-  لمسح الشات |           مسح
2-    لقفل الشات | اقفل الشات
3-  لحظر العضو من السيرفر |           بان
4-  +bc            |  لارسال رسالة جماعية لجميع الاعضاء
5-  لسحب جميع الاعضاء |     سحب الكل
6-  ل اسكات العضو |         اسكت
-7 ل اعطاء العضو رتبه , ملاحظة :لازم تكتب اسم الرتبه صح|         صلاحية
2-    لفتح الشات | افتح الشات


▶ ل التوجة الى أوامر الاغاني اضغط
   `,`

**:notes: آوامر بوتات الاغاني  :notes:**

1play ⇏ لتشغيل أغنية برآبط أو بأسم
1skip ⇏ لتجآوز الأغنية الحآلية
1pause ⇏ إيقآف الأغنية مؤقتا
1resume ⇏ لموآصلة الإغنية بعد إيقآفهآ مؤقتا
1vol ⇏ لتغيير درجة الصوت 50 - 0
1stop ⇏ لإخرآج البوت من الروم
1np ⇏ لمعرفة الأغنية المشغلة حآليا
1queue ⇏ لمعرفة قآئمة التشغيل


طبعا كل بوت له علامه علامات البوتات من 1 الى 8

   `]
    let page = 1;

    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setFooter(`Page ${page} of ${pages.length}`)
    .setDescription(pages[page-1])

    message.author.sendEmbed(embed).then(msg => {

        msg.react('◀').then( r => {
            msg.react('▶')


        const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;


        const backwards = msg.createReactionCollector(backwardsFilter, { time: 2000000});
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 2000000});



        backwards.on('collect', r => {
            if (page === 1) return;
            page--;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        forwards.on('collect', r => {
            if (page === pages.length) return;
            page++;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        })
    })
    }
});

client.on('message', message => {
if (message.content.startsWith(prefix + 'Help')) { /// This is The DMS Code Send The Help In DMS // Code By NotGucci
    let pages = [`

:earth_africa: **الاوامر العامة** :earth_africa:

1-  +id     | ل اضهار معلوماتك في السيرفر
2-  +stats  | ل اضهار حالت البوت
3-  +invites| لمعرفة عدد دعواتك بالسيرفر
-4  لأخذ قائمة الالوان |  الوان
-5  لتفير لونك بالسيرفر  |   الون
6- +server | معلومات السيرفر

اذا تبي رابط اكتب ب الشات
(رابط)

اذا نشرت اي رابط دسكورد رح تاخذ ميوت تلقائي



▶ ل التوجة الى أوامر الادارة اضغط
   `
,`

 :spy::skin-tone-1:  آوامر الادارة :spy::skin-tone-1:


1-  لمسح الشات |           مسح
2-    لقفل الشات | اقفل الشات
3-  لحظر العضو من السيرفر |           بان
4-  +bc            |  لارسال رسالة جماعية لجميع الاعضاء
5-  لسحب جميع الاعضاء |     سحب الكل
6-  ل اسكات العضو |         اسكت
-7 ل اعطاء العضو رتبه , ملاحظة :لازم تكتب اسم الرتبه صح|         صلاحية
2-    لفتح الشات | افتح الشات


▶ ل التوجة الى أوامر الاغاني اضغط
   `,`

**:notes: آوامر بوتات الاغاني  :notes:**

1play ⇏ لتشغيل أغنية برآبط أو بأسم
1skip ⇏ لتجآوز الأغنية الحآلية
1pause ⇏ إيقآف الأغنية مؤقتا
1resume ⇏ لموآصلة الإغنية بعد إيقآفهآ مؤقتا
1vol ⇏ لتغيير درجة الصوت 50 - 0
1stop ⇏ لإخرآج البوت من الروم
1np ⇏ لمعرفة الأغنية المشغلة حآليا
1queue ⇏ لمعرفة قآئمة التشغيل


طبعا كل بوت له علامه علامات البوتات من 1 الى 8

   `]
    let page = 1;

    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setFooter(`Page ${page} of ${pages.length}`)
    .setDescription(pages[page-1])

    message.author.sendEmbed(embed).then(msg => {

        msg.react('◀').then( r => {
            msg.react('▶')


        const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;


        const backwards = msg.createReactionCollector(backwardsFilter, { time: 2000000});
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 2000000});



        backwards.on('collect', r => {
            if (page === 1) return;
            page--;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        forwards.on('collect', r => {
            if (page === pages.length) return;
            page++;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        })
    })
    }
});




client.on('message', function(message) {
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        var stewart = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('``رساله جديده في خاص البوت``')
            .setThumbnail(`${message.author.avatarURL}`)
            .setDescription(`\n\n\`\`\`${message.content}\`\`\``)
            .setFooter(`من (@${message.author.tag})  |  (${message.author.id})`)
        client.channels.get("490942592301662218").send({ embed: stewart });
    }
});


client.login(process.env.BOT_TOKEN);

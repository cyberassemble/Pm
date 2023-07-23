import { Bot } from "https://deno.land/x/grammy@v1.17.2/mod.ts";
import { run } from "https://deno.land/x/grammy_runner@v2.0.3/mod.ts";
import {
  FileFlavor,
  hydrateFiles,
} from "https://deno.land/x/grammy_files@v1.0.4/mod.ts";

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot("6231415811:AAE89prLuANEw-PufsYUk8RX40nAhpLPbFU"); // <-- put your bot token between the ""
const own_id = (5136746907);
// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

bot.api.config.use(hydrateFiles(bot.token));
bot.use(session());

bot.command('start', async ctx => {
    return await ctx.reply('After Complete Your Payment, Send Me A Screenshot of Payment and Transaction ID. This Bot Only For Verify Payment And Contact.');
});

// Construct a keyboard.
const inlineKeyboard = new InlineKeyboard().text("click", "click-payload");

// Send a keyboard along with a message.
bot.command("done", async (ctx) => {
  await ctx.reply("I Have Complete payment ", { reply_markup: inlineKeyboard });
});

// Wait for click events with specific callback data.
bot.callbackQuery("click-payload", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "Please Wait 30 Minutes For Response",
  });
});

bot.hears("ping", async (ctx) => {
  // `reply` is an alias for `sendMessage` in the same chat (see next section).
  await ctx.reply("pong", {
    // `reply_to_message_id` specifies the actual reply feature.
    reply_to_message_id: ctx.msg.message_id,
  });
});

bot.command("help", (ctx) => ctx.reply("Help text"));

bot.on(":text", (ctx) => ctx.reply("Text!")); // (*)
bot.on(":photo", (ctx) => ctx.reply("Photo!"));

bot.on("message:voice", async (ctx) => {
  const voice = ctx.msg.voice;

  const duration = voice.duration; // in seconds
  await ctx.reply(`Your voice message is ${duration} seconds long.`);

  const fileId = voice.file_id;
  await ctx.reply("The file identifier of your voice message is: " + fileId);

  const file = await ctx.getFile(); // valid for at least 1 hour
  const path = file.file_path; // file path on Bot API server
  await ctx.reply("Download your own file again: " + path);
});

bot.on('message', async ctx => {
    const from_id = ctx.msg.from.id;
    if (from_id == own_id){
        ;
    } else {
        const msg_id = ctx.msg.message_id;
        await ctx.api.forwardMessage(own_id, from_id, msg_id);
    }
    const reply_msg = ctx.update.message.reply_to_message
    const reply_msg_user_id = reply_msg.forward_from.id
    const own_msg = ctx.update.message.text
    if (reply_msg){
        await ctx.api.sendMessage(reply_msg_user_id, own_msg)
    }
})

bot.start();

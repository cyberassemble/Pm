import { Bot } from "https://deno.land/x/grammy@v1.17.2/mod.ts";

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot("6231415811:AAE89prLuANEw-PufsYUk8RX40nAhpLPbFU"); // <-- put your bot token between the ""
const own_id = (5136746907);
// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

bot.command('start', async ctx => {
    return await ctx.reply('After Complete Your Payment, Send Me A Screenshot of Payment and Transaction ID. This Bot Only For Verify Payment And Contact.');
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

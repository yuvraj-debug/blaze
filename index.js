require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    if (message.content.startsWith("!dm ")) {
        const args = message.content.split(" ");
        const roleName = args[1]; // Role name
        const customMessage = args.slice(2).join(" "); // Message to send

        const role = message.guild.roles.cache.find((r) => r.name === roleName);
        if (!role) {
            return message.reply(`Role "${roleName}" not found.`);
        }

        const members = role.members;
        if (members.size === 0) {
            return message.reply(`No members found in the "${roleName}" role.`);
        }

        message.reply(
            `Sending DM to ${members.size} members in "${roleName}"...`,
        );

        members.forEach((member) => {
            if (!member.user.bot) {
                member.send(customMessage).catch(() => {});
            }
        });
    }
});

client.login(process.env.DISCORD_TOKEN);

// Simple web server to keep Replit alive
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(3000, () => console.log("Web server running on port 3000"));

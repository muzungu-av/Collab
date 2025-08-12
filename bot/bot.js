require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_TOKEN;
const webAppUrl = process.env.WEBAPP_URL;

if (!webAppUrl) {
  console.error("❌ WEBAPP_URL не задан");
  process.exit(1);
}

const timestamp = Date.now();
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Открой Web App:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть приложение",
            web_app: { url: `${webAppUrl}?_=${timestamp}` },
          },
        ],
      ],
    },
  });
});

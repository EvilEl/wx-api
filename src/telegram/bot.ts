import { query } from "express";
import TelegramBot from "node-telegram-bot-api";
console.log(process.env.TOKEN);

const userStates = {};

// Шаги "формы"
const formSteps = [
  "What is your name?",
  "How old are you?",
  "What is your favorite color?",
];

function createBot() {
  if (!process.env.TOKEN) {
    throw new Error("not found token");
  }
  const bot = new TelegramBot(process.env.TOKEN, { polling: true });

  bot.setMyCommands([
    {
      command: "tovar",
      description: "Получение всех товаров",
    },
  ]);

  bot.on("message", (message) => {
    const chatId = message.chat.id;
    bot.sendMessage(chatId, "Выберите товар", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "dasdas", callback_data: "option_1" },
            { text: "dddd", callback_data: "option_1" },
            { text: "dasdas", callback_data: "option_1" },
          ],
        ],
        // resize_keyboard: true,
        // one_time_keyboard: true,
      },
    });

    // if (message.text === "Диффузоры") {
    //   console.log(message);
    // }
  });

  bot.on("callback_query", (query) => {
    const chatId = query.message?.chat?.id;

    if (!chatId) {
      return;
    }

    console.log("callback_query query:", query);
    bot.sendMessage(chatId, "Выберите товар", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "dasdas", callback_data: "option_1" },
            { text: "dddd", callback_data: "option_1" },
            { text: "dasdas", callback_data: "option_1" },
          ],
        ],
        // resize_keyboard: true,
        // one_time_keyboard: true,
      },
    });
  });
}

export default { createBot };

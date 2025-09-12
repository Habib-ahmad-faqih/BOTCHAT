const TelegramBot = require("node-telegram-bot-api")
require ("dotenv").config() 

const token = process.env.TELEGRAM_TOKEN
console.log(token)

const bot = new TelegramBot(token, { polling: true})



bot.onText(/\/start/,(msg) => {
bot.sendMessage(msg.chat.id, "halo aku bot buatan Habib ketik /help untuk melihat menu")
});

bot.onText(/\/(menu|help)/, (msg) => {
    bot.sendMessage(msg.chat.id, `
    - /start untuk mulai bot
    - /menu untuk lihat menu
    - /about untik info bot
    - /cuaca untuk info cuaca
     
    `);
});

bot.onText(/\/about/, (msg, match) => {
    bot.sendMessage(msg.chat.id, "Saya adalah bot buatan habib yang diprogram mengunakan Node.js")
});

bot.onText(/\/cuaca/, async (msg, match) => {
    const axios = require("axios");
    const apiKey = process.env.WEATHER_TOKEN

    const city = match[1];
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_TOKEN}&units=metric&lang=id`;


 try {
    const res = await axios.get(url);
    const data = res.data;
    bot.sendMessage(msg.chat.id, `
    Cuaca di ${data.name}: ${data.weather[0].description} suhu ${data.main.temp}°C`);
 } catch (err) {
    bot.sendMessage(msg.chat.id, "gagal medapatkan data cuaca")
 }
});


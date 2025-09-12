const TelegramBot = require("node-telegram-bot-api")
const fetch = require("node-fetch")
require ("dotenv").config()

const token = process.env.TELEGRAM2_TOKEN
console.log(token)

const bot = new TelegramBot(token, { polling: true})



bot.on("message", async (data) => {
     const botProfile = await bot.getMe()
     console.log(botProfile);
     if(data.text == "halo")
       bot.sendMessage(data.from.id, `halo juga perkenalkan saya adalah ${botProfile.first_name}!\n ada yang bisa saya bantu?`)
    

})

bot.on("sticker", (data) => {
    console.log(data);
    bot.sendMessage(data.from.id, data.sticker.emoji)
})

bot.onText(/^!follow(.+)/, (data, after) => {
    console.log(after)
    bot.sendMessage(data.from.id, `okeyyyy ${after[1]}`)
})

bot.on("message", async (data) => {
    if(data.text == "siapa dev kamu")
    bot.sendMessage(data.from.id, "dev atau pembuat saya adalah habib")
})

bot.onText(/^!quote$/, async (data) => {
    const quoteEndpoint =  "https://api.kanye.rest/"
    try{

    const apiCall = await fetch(quoteEndpoint)
    const { quote } = await apiCall.json()

    bot.sendMessage(data.from.id, `Quotes hari ini buat kamu: ${quote}`)
    }catch (err) {
        console.error(error)
       bot.sendMessage(data.from.id, "maaf ulangi lagi")
    }

})


bot.onText(/^!news/, async(data) =>{
    const newEndpoint = "https://jakpost.vercel.app/api/category/indonesia"
    try{
        const apiCall = await fetch(newEndpoint)
        const response = await apiCall.json()
        // console.log(response);
    for (let i = 1; i < 2; i++) {
        const news = response.posts[i]
        const {title, image, headline } = news
        bot.sendPhoto(data.from.id, image, { caption: `Judul: ${title}\n\nHeadline ${headline}`})
    }
        // bot.sendMessage(data.from.id, "isi berita.....")
    } catch(error) {


    }
})

const ytdl = require("ytdl-core");
const telegram = require("node-telegram-bot-api");
const axios = require("axios");
let handelYoutubeVideoLink = async (req, res) => {
  try {
    let url = req.body.url;
    let video = await ytdl.getInfo(url);
    let title = video.videoDetails.title;
    let thumbnails = video.videoDetails.thumbnails;
    let thumbnailUrl = thumbnails[thumbnails.length - 1].url;
    let data = [];
    video.formats.map((item) => {
      if (item.hasAudio) {
        if (item.container == "mp4")
          data.push({
            title: title,
            quality: item.qualityLabel,
            url: item.url,
            thumbnailUrl,
          });
      }
    });
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

//Telegram bot code

let sybot = async (url) => {
  let video = await ytdl.getInfo(url);
  let title = video.videoDetails.title; // getting video title

  let data = [];
  video.formats.map((item) => {
    if (item.hasAudio) {
      if (item.container == "mp4")
        data.push({
          quality: item.qualityLabel,
          url: item.url,
          title,
        });
    }
  });
  return data;
};

let handelTelegramBot = async () => {
  let token = process.env.Telegram_Token;

  let bot = new telegram(token, { polling: true });

  bot.on("message", async (message) => {
    let chat_id = message.from.id;
    bot.sendMessage(chat_id, `Generating link`);
    let userName = message.chat.username; //Username of telegram user who is using bot
    let response = await sybot(message.text);
    response.map(async (item) => {
      let { data } = await axios.post(
        `https://linkshortner-pjcs.onrender.com/api/shortid/tg`,
        {
          user: userName,
          url: item.url,
        }
      ); //This will genarate short likn for big link of download link
      let shortURl = data;
      bot.sendMessage(
        //This will send the link to the user
        chat_id,
        `${item.quality ? item.quality : "audio"}:${shortURl}`
      );
    });
    //sending response to bot user

    console.log("Bot is active");
  });
};

handelTelegramBot();
module.exports = { handelYoutubeVideoLink };

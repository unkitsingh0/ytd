const ytdl = require("ytdl-core");

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

module.exports = { handelYoutubeVideoLink };

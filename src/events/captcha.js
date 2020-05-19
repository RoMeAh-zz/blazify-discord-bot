const Jimp = require("jimp");

class createCaptcha {
  constructor(client) {
    this.client = client;
  }
 async run(client, reaction, user) {
  const captcha = Math.random().toString(36).slice(2, 8);
  const image = new Jimp(175, 50, "white");
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  const textWidth = Jimp.measureText(font, captcha);
  const textHeight = Jimp.measureTextHeight(font, captcha);
  image.print(font, w / 2 - textWidth / 2, h / 2 - textHeight / 2, captcha);
  image.write(
    `C:/Users/Romeah but no gaming/Documents/captchas/${captcha}.png`
);
  return captcha;
};
}
module.exports =  createCaptcha;
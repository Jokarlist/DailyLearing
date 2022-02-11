const axios = require("axios");
const cheerio = require("cheerio");

/**
 * 获取所有小说的HTML字符串
 */
async function getNovelsHTML(url) {
  const res = await axios.get(url);

  return res.data;
}

/**
 * 获取所有小说数据
 */
async function getNovelsData() {
  const url = "https://book.douban.com/latest?subcat=%E5%85%A8%E9%83%A8&p=";
  let html = "";

  for (let i = 1; i <= 5; i++) {
     html += await getNovelsHTML(url + i);
  }

  const $ = cheerio.load(html);
  const lis = $("li.media");
  const novels = [];

  for (const li of lis) {
    const novel = getNovel($(li));

    novels.push(novel);
  }

  return novels;
}

/**
 * 将传入的li的cheerio对象中解析出单本小说的信息
 * @param {cheerio} li
 */
function getNovel(li) {
  const imgSrc = li.find("img").attr("src"); // 获取小说封面图片的地址
  const title = li.find("h2 a").text();
  const detail = li
    .find("h2+p")
    .text()
    .replace(/(^\s*)|(\s*$)/g, "");

  return {
    title,
    detail,
    imgSrc,
  };
}

module.exports = getNovelsData;

const axios = require("axios");
const gis = require("g-i-s");
const dotenv = require("dotenv");
const jimp = require("jimp");
const cheerio = require("cheerio");
const fs = require("fs");
const chalk = import("chalk");
const FormData = require("form-data");
const { G4F } = require("g4f");
const g4f = new G4F();
const { tiktokdl } = require("tiktokdl");
const { URL_REGEX } = require("@whiskeysockets/baileys");
const { Pixiv } = require("@ibaraki-douji/pixivts");
const pixiv = new Pixiv();

//Refresh
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.green(`FILE UPDATED => ${__filename}`));
  delete require.cache[file];
  require(file);
});

exports.pinterest = (query) => {
  return new Promise((resolve, reject) => {
    let err = { status: 404, message: "Terjadi kesalahan" };
    gis({ searchTerm: query + " site:id.pinterest.com" }, (er, res) => {
      if (er) return err;
      let hasil = {
        status: 200,
        creator: "FarelHanafi",
        result: [],
      };
      res.forEach((x) => hasil.result.push(x.url));
      resolve(hasil);
    });
  });
};

exports.Khodam = (nama) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`https://khodam.vercel.app/v2?nama=${nama}`)
      .then(({ data }) => {
        const $ = cheerio.load(data);

        const khodam = $(
          "span.__className_cad559.text-3xl.font-bold.text-rose-600"
        )
          .text()
          .trim();
        const caption = $(
          "div.mb-5.sm\\:mb-10.px-8.text-center.text-white\\/90"
        )
          .text()
          .trim();
        const result = {
          nama,
          khodam,
          caption,
        };
        resolve(result);
      })
      .catch(reject);
  });
};

exports.GPT4 = (prompt) => {
  const messages = [
    {
      role: "system",
      content:
        "Kamu Adalah Bernama Masha-MD Yang Berfungsi membantu dan menolong sesuatu dari users, sifat kamu itu kalem dingin pendiem tapi pintar, nama owner kamu adalah Farel Hanafi, Jawab menggunakan bahasa indonesia",
    },
    { role: "user", content: prompt },
  ];
  let res = g4f.chatCompletion(messages);
  return res;
};

exports.ttslide = (url) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: "https://tikvideo.app/api/ajaxSearch",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
      data: {
        q: url,
        lang: "id",
      },
    })
      .then((res) => {
        var result = [];
        if (res.data.status === "ok") {
          let $ = cheerio.load(res.data.data);
          $("img").each((index, element) => {
            const a = $(element).attr("src");
            if (!a.includes(".webp")) {
              result.push(a);
            }
          });
        }
        if (result.length > 0) {
          resolve(result);
        } else {
          reject(null);
        }
      })
      .catch((e) => {
        console.error(e);
        reject(null);
      });
  });
};

exports.tiktokdl = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!url.match(/tiktok/gi)) {
        reject(new Error("Berikan URL dari TikTok!"));
      } else {
        const response = await tiktokdl(url);
        const { video } = response;
        resolve(video);
      }
    } catch (e) {
      reject(new Error(`Error: ${e.message}`));
    }
  });
};

exports.remini = async (imageBuffer) => {
  mode = "enhance";

  const formData = new FormData();
  formData.append("mode", mode);
  formData.append("image", imageBuffer, {
    filename: "image.jpg",
    contentType: "image/jpeg",
  });

  try {
    const response = await axios.post(
      `https://inferenceengine.vyro.ai/${mode}`,
      formData,
      {
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip, deflate, br",
          ...formData.getHeaders(), // Add headers from formData
        },
        responseType: "arraybuffer", // Ensure the response is in arraybuffer format
      }
    );

    return Buffer.from(response.data); // Convert arraybuffer to Buffer
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
};

exports.ssweb = (url, device = "desktop") => {
  return new Promise((resolve, reject) => {
    const base = "https://www.screenshotmachine.com";
    const param = {
      url: url,
      device: device,
      cacheLimit: 0,
    };
    axios({
      url: base + "/capture.php",
      method: "POST",
      data: new URLSearchParams(Object.entries(param)),
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    })
      .then((data) => {
        const cookies = data.headers["set-cookie"];
        if (data.data.status == "success") {
          axios
            .get(base + "/" + data.data.link, {
              headers: {
                cookie: cookies.join(""),
              },
              responseType: "arraybuffer",
            })
            .then(({ data }) => {
              result = {
                status: 200,
                result: data,
              };
              resolve(result);
            });
        } else {
          reject({ status: 404, statuses: `Link Error`, message: data.data });
        }
      })
      .catch(reject);
  });
};

exports.wikisearch = async (query) => {
  const res = await axios.get(
    `https://id.m.wikipedia.org/w/index.php?search=${query}`
  );
  const $ = cheerio.load(res.data);
  const hasil = [];
  let wiki = $("#mf-section-0").find("p").text();
  let thumb = $("#mf-section-0").find("div > div > a > img").attr("src");
  thumb = thumb ? thumb : "//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png";
  thumb = "https:" + thumb;
  let judul = $("h1#section_0").text();
  hasil.push({
    wiki,
    thumb,
    judul,
  });
  return hasil;
};

exports.artinama = (query) => {
  return new Promise((resolve, reject) => {
    const queryy = query.replace(/ /g, "+");
    axios
      .get(
        "https://www.primbon.com/arti_nama.php?nama1=" +
          queryy +
          "&proses=+Submit%21+"
      )
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = $("#body").text();
        const cleanedResult = result
          .replace(/^\n+|\n+$/g, "")
          .replace(
            /\(adsbygoogle = window\.adsbygoogle \|\| \[\]\)\.push\(\{\}\);/g,
            ""
          )
          .replace(/\s{2,}/g, " ")
          .replace(/\n+/g, " ")
          .trim();
        const resultParts = cleanedResult.split("ARTI NAMA")[1]?.split(".\n\n");
        const finalResult = resultParts
          ? resultParts[0] + "\n" + (resultParts[1] || "")
          : "";
        resolve(finalResult);
      })
      .catch(reject);
  });
};

exports.githubstalk = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.github.com/users/${user}`)
      .then(({ data }) => {
        const hasil = {
          username: data.login,
          nickname: data.name,
          bio: data.bio,
          id: data.id,
          nodeId: data.node_id,
          profile_pic: data.avatar_url,
          url: data.html_url,
          type: data.type,
          admin: data.site_admin,
          company: data.company,
          blog: data.blog,
          location: data.location,
          email: data.email,
          public_repo: data.public_repos,
          public_gists: data.public_gists,
          followers: data.followers,
          following: data.following,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
        resolve(hasil);
      })
      .catch(reject);
  });
};

exports.igstalk = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let api = await fetch(
        `https://tools.betabotz.eu.org/tools/stalk-ig?q=${name}`
      );
      let response = await api.json();
      let {
        profile_pic_url,
        posts,
        followers,
        following,
        biography,
        full_name,
        username,
        is_verified,
        is_private,
      } = response.result.user_info;
      resolve({
        username: username,
        fullName: full_name,
        photoUrl: profile_pic_url,
        postsCount: posts,
        followers: followers,
        following: following,
        bio: biography,
        is_private: is_private,
        is_verified: is_verified,
      });
    } catch (e) {
      reject(new Error(`Error: ${e.message}`));
    }
  });
};

exports.aio = async (url) => {
  try {
    const response = await axios.post(
      "https://aiovd.com/wp-json/aio-dl/video-data",
      {
        url: url,
      },
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );

    const res = response.data;
    const result = {
      data: res.medias,
    };

    return result;
  } catch (e) {
    throw e;
  }
};

exports.ringtone = (title) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://meloboom.com/en/search/" + title)
      .then((get) => {
        let $ = cheerio.load(get.data);
        let hasil = [];
        $(
          "#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li"
        ).each(function (a, b) {
          hasil.push({
            title: $(b).find("h4").text(),
            source: "https://meloboom.com/" + $(b).find("a").attr("href"),
            audio: $(b).find("audio").attr("src"),
          });
        });
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.styletext = (teks) => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://qaz.wtf/u/convert.cgi?text=" + teks)
      .then(({ data }) => {
        let $ = cheerio.load(data);
        let hasil = [];
        $("table > tbody > tr").each(function (a, b) {
          hasil.push({
            name: $(b).find("td:nth-child(1) > span").text(),
            result: $(b).find("td:nth-child(2)").text().trim(),
          });
        });
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.test = async function (jid, message) {
  try {
    const response = await axios.post(
      "http://basic-1.alstore.space:25720/send-message",
      {
        jid,
        message,
      }
    );

    if (response.data.success) {
      return "Message sent successfully";
    } else {
      return `Failed to send message: ${response.data.error}`;
    }
  } catch (error) {
    return `Error sending message:, ${error.message}`;
  }
};

exports.nhentai = async function (q) {
  try {
    const response = await axios.get(`https://nhentai.net/g/${q}/`);
    const html = response.data;
    const $ = cheerio.load(html);
    const pages = $(".thumb-container img").length; // Mendapatkan jumlah halaman
    const imgSrcList = [];

    for (let i = 1; i <= pages; i++) {
      const pageResponse = await axios.get(`https://nhentai.net/g/${q}/${i}/`);
      const pageHtml = pageResponse.data;
      const page$ = cheerio.load(pageHtml);
      const imgSrc = page$("#image-container img").attr("src");
      if (imgSrc) {
        imgSrcList.push(imgSrc);
      }
    }

    return imgSrcList;
  } catch (error) {
    console.error(error);
  }
};

exports.simi = async function (text) {
  try {
    const response = await axios.post(
      "https://api.simsimi.vn/v1/simtalk",
      new URLSearchParams({
        text: text,
        lc: "id",
        key: "",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const simi = response.data;
    return simi.message;
  } catch (error) {
    console.error("errror wak", error);
  }
};

exports.pixivdl = async function (query) {
  if (query.match(URL_REGEX)) {
    if (!/https:\/\/www.pixiv.net\/en\/artworks\/[0-9]+/i.test(query))
      throw "Invalid Pixiv Url";
    query = query.replace(/\D/g, "");
    let res = await pixiv.getIllustByID(query).catch(() => null);
    if (!res) throw `ID "${query}" not found :/`;
    let media = [];
    for (let x = 0; x < res.urls.length; x++)
      media.push(await pixiv.download(new URL(res.urls[x].original)));
    return {
      artist: res.user.name,
      caption: res.title,
      tags: res.tags.tags.map((v) => v.tag),
      media,
    };
  } else {
    let res = await pixiv.getIllustsByTag(query);
    if (!res.length) throw `Tag's "${query}" not found :/`;
    res = res[~~(Math.random() * res.length)].id;
    res = await pixiv.getIllustByID(res);
    let media = [];
    for (let x = 0; x < res.urls.length; x++)
      media.push(await pixiv.download(new URL(res.urls[x].original)));
    return {
      artist: res.user.name,
      caption: res.title,
      tags: res.tags.tags.map((v) => v.tag),
      media,
    };
  }
};

exports.quotesAnime = function () {
  return new Promise((resolve, reject) => {
    const page = Math.floor(Math.random() * 184);
    axios
      .get("https://otakotaku.com/quote/feed/" + page)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];
        $("div.kotodama-list").each(function (l, h) {
          hasil.push({
            link: $(h).find("a").attr("href"),
            gambar: $(h).find("img").attr("data-src"),
            karakter: $(h).find("div.char-name").text().trim(),
            anime: $(h).find("div.anime-title").text().trim(),
            episode: $(h).find("div.meta").text(),
            up_at: $(h).find("small.meta").text(),
            quotes: $(h).find("div.quote").text().trim(),
          });
        });
        resolve(hasil);
      })
      .catch(reject);
  });
};

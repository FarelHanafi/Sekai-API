const express = require("express");
const secure = require("ssl-express-www");
const cors = require("cors");
const cheerio = require("cheerio");
const CFonts = require("cfonts");
const path = require("path");
const os = require("os");
const fs = require("fs");
const masha = require("./function/index");
const axios = require("axios");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");

creator = "Farel Hanafi";

var app = express();
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "/public/logo.png")));
const port = 3000;

// Api Main
app.get("/stats", (req, res) => {
  const stats = {
    platform: os.platform(),
    architecture: os.arch(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime(),
    cpuModel: os.cpus()[0].model,
    numCores: os.cpus().length,
    loadAverage: os.loadavg(),
    hostname: os.hostname(),
    networkInterfaces: os.networkInterfaces(),
    processId: process.pid,
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage(),
  };
  res.json(stats);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/docs.html"));
});

app.get("/whatsapp", async (req, res) => {
  let q = req.query.q;
  let type = req.query.type;
  let msg = req.query.msg;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let data = await masha.test(q, type, msg);
  res.status(200).json({
    status: 200,
    creator: "Farel Hanafi",
    data: { data },
  });
});
// ACCOUNT

// SEARCH FEATURES
app.get("/api/pins", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.pins(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/pinterest", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.pinterest(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/quotesAnime", async (req, res) => {
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.quotesAnime();
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/pixivdl", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.pixivdl(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/simi", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.simi(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/nhentai", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.nhentai(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/styletext", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.styletext(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/ringtone", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.ringtone(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/tiktokdl", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.tiktokdl(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/tiktokdl", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.tiktokdl(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/remini", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.remini(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/igstalk", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.igstalk(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/Khodam", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.Khodam(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/GPT4", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.GPT4(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/ttslide", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.ttslide(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/ssweb", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.ssweb(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/wikisearch", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.wikisearch(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/artinama", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.artinama(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/githubstalk", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.githubstalk(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/degreeGuru", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.degreeGuru(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/ragBot", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.ragBot(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/smartContract", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.smartContract(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});
app.get("/api/blackboxAIChat", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.blackboxAIChat(q);
  res.json({
    status: 200,
    creator: "Farel Hanafi",
    data: result,
  });
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "/views/error/404.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, "/views/error/500.html"));
});

CFonts.say("Rell API", {
  font: "block",
  align: "center",
  gradient: ["red", "magenta"],
});

CFonts.say(`Recode By Rell`, {
  font: "console",
  align: "center",
  gradient: ["blue", "yellow"],
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

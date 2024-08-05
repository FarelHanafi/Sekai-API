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
const favicon = require('serve-favicon');
const bodyParser = require("body-parser");

creator = "Farel Hanafi";

var app = express();
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`[ ${req.method} ] From: ${req.ip} In ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname,'/public/logo.png')))
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
  let msg = req.query.msg;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let data = await masha.test(q, msg);
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
  const results = await masha.pinterest(q);
  try {
    res.json({
      status: true,
      creator: "Farel Hanafi",
      data: results,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "error" });
  }
});

app.get("/api/soundcloud", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.soundcloud(q);
  try {
    res.json({
      status: 200,
      creator: "Farel Hanafi",
      data: { result },
    });
  } catch (err) {
    console.log(err);
    res.json(loghandler.error);
  }
});

app.get("/api/Wikipedia", async (req, res) => {
  let q = req.query.q;
  if (!q)
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "[!] masukan parameter q",
    });
  let result = await masha.Wikipedia(q);
  try {
    res.json({
      status: 200,
      creator: "Farel Hanafi",
      data: { result },
    });
  } catch (err) {
    console.log(err);
    res.json(loghandler.error);
  }
});

// AI FEATURES
app.get("/api/ragbot", async (req, res) => {
  try {
    let q = req.query.q;
    if (!q)
      return res.json({
        status: false,
        creator: `${creator}`,
        message: "[!] masukan parameter q",
      });
      const response = await masha.ragBot(q);
      res.status(200).json({
        status: 200,
        creator: "Farel Hanafi",
        data: { response },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    });
    
    app.get("/api/degreeguru", async (req, res) => {
    try {
      let q = req.query.q;
      if (!q)
        return res.json({
          status: false,
          creator: `${creator}`,
          message: "[!] masukan parameter q",
        });
      const response = await masha.degreeGuru(q);
      res.status(200).json({
        status: 200,
        creator: "Farel Hanafi",
        response,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    });
    
    app.get("/api/smartcontract", async (req, res) => {
    try {
      let q = req.query.q;
      if (!q)
        return res.json({
          status: false,
          creator: `${creator}`,
          message: "[!] masukan parameter q",
        });
      const response = await masha.smartContract(q);
      res.status(200).json({
        status: 200,
        creator: "Farel Hanafi",
        data: { response },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    });
    
    app.get("/api/blackboxAIChat", async (req, res) => {
    try {
      let q = req.query.q;
      if (!q)
        return res.json({
          status: false,
          creator: `${creator}`,
          message: "[!] masukan parameter q",
        });
      const response = await masha.blackboxAIChat(q);
      res.status(200).json({
        status: 200,
        creator: "Farel Hanafi",
        data: { response },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    });
    
    app.get("/api/gpt", async (req, res) => {
    let q = req.query.q;
    if (!q)
      return res.json({
        status: false,
        creator: `${creator}`,
        message: "[!] masukan parameter q",
      });
    let data = await masha.GPT4(q);
    res.status(200).json({
      status: 200,
      creator: "Farel Hanafi",
      data,
    });
    });
    
    // STALK FEATURES
    app.get("/api/githubstalk", async (req, res) => {
    let q = req.query.q;
    if (!q)
      return res.json({
        status: false,
        creator: `${creator}`,
        message: "[!] masukan parameter q",
      });
    let data = await masha.githubstalk(q);
    res.status(200).json({
      status: 200,
      creator: "Farel Hanafi",
      data,
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
    let data = await masha.igstalk(q);
    res.status(200).json({
      status: 200,
      creator: "Farel Hanafi",
      data: { data },
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
    let data = await masha.remini(q);
    res.status(200).json({
      status: 200,
      creator: "Farel Hanafi",
      data: { data },
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
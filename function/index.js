
const { test, githubstalk, tiktokdl, artinama, wikisearch, ssweb, remini, ttslide, GPT4, Khodam, pinterest, igstalk, pixivdl, quotesAnime } = require('./scraper/masha')


module.exports = {
	blackboxAIChat: require('./scraper/blackboxAIChat'),
	smartContract: require('./scraper/smartContract'),
	ragBot: require('./scraper/ragBot'),
	degreeGuru: require('./scraper/degreeGuru'),
	githubstalk,
	artinama,
	wikisearch,
	ssweb,
	ttslide,
	GPT4,
	Khodam,
	igstalk,
	remini,
	tiktokdl,
	test,
	ringtone: require('./scraper/masha'),
	styletext: require('./scraper/masha'),
	nhentai: require('./scraper/masha'),
	simi: require('./scraper/masha'),
	pixivdl: require('./scraper/masha'),
	quotesAnime: require('./scraper/masha'),
	pinterest
  };

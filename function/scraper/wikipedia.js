//<!---Scraper Wikipedia--->

let cheerio = require('cheerio')


async function Wikipedia(query) {
    const response = await fetch(`https://id.m.wikipedia.org/w/index.php?search=${query}`);
    const html = await response.text();
    const $ = cheerio.load(html);

    const contentArray = [];
    $('div.mw-parser-output p').each((index, element) => {
        contentArray.push($(element).text().trim());
    });

    const infoTable = [];
    $('table.infobox tr').each((index, element) => {
        const label = $(element).find('th.infobox-label').text().trim();
        const value = $(element).find('td.infobox-data').text().trim() || $(element).find('td.infobox-data a').text().trim();
        if (label && value) {
            infoTable.push(`${label}: ${value}`);
        }
    });

    const data = {
        title: $('title').text().trim(),
        content: contentArray.join('\n'),
        image: 'https:' + ($('#mw-content-text img').attr('src') || '//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png'),
        infoTable: infoTable.join('\n')
    };

    return data;
};

module.exports =  Wikipedia
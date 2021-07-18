// implement typescript
// implement Pipe function

import R from 'ramda';

import { scrapeWebsite, scrape2Html, writeInCSVFile, readFromCSVFile } from "./Scraper.js";

const url = "https://m.imdb.com/title/tt5071886/?ref_=fn_al_tt_0";

const headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
};

const contentType = "gzip";

const extractDataFromScrapedHTML = ($) => {
    let imdbData = [];
    let title = $("div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > h1").text();
    let rating = $("span.AggregateRatingButton__RatingScore-sc-1ll29m0-1").text();
    let summary = $("p.GenresAndPlot__Plot-cum89p-6 > span").text();
    console.log("title:", title);
    imdbData.push({
        title, rating, summary 
    });
    return imdbData;
}

(async () => {
    const response = await scrapeWebsite(headers)(contentType)(url);
    R.pipe(
        scrape2Html,
        extractDataFromScrapedHTML,
        writeInCSVFile("./imdbdata.csv")
    )(response);
    readFromCSVFile("./imdbdata.csv");
})()

//========================================================================================================================================================================================
// const movie = "https://www.mxplayer.in/movie-videos/tamil-movies";
// (async () => {
//     let imdbData = [];
//     const response = await request(
//         {
//             uri: movie,
//             headers: {
//                 "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//                 "accept-encoding": "gzip, deflate, br",
//                 "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
//             },
//             gzip: true
//         });
//     let $ = cheerio.load(response);
//     let title = $('div[class="browse-headings-wrapper"] > h1').text();
//     let summary = $('div[class="browse-headings-wrapper"] > div[class="browse-sub-heading"]').text();
//     console.log("title:", title);
//     imdbData.push({
//         title: title, summary : summary
//     });
//     let j2cp = new json2Csv();
//     let csv = j2cp.parse(imdbData);
//     fs.writeFileSync("./imdbData.csv", csv, 'utf-8');
// }
// )();
//========================================================================================================================================================================================

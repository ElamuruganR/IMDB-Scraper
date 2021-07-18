// implement typescript
// implement Pipe function
// seperate into modules

import R from 'ramda';

import { scrapeFromWebsite, getHTMLFromScrape, writeInCSVFile, readFromCSVFile } from "./Scraper.js";

const url = "https://m.imdb.com/title/tt5071886/?ref_=fn_al_tt_0";

const headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
};

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
        const response = await scrapeFromWebsite(url, headers, "gzip");
        // y(response);
        const $ = getHTMLFromScrape(response);
        const imdbData = extractDataFromScrapedHTML($);
        writeInCSVFile("./imdbdata2.csv")(imdbData);
        readFromCSVFile("./imdbdata2.csv");
}
)();
// const x = R.pipe(
//                 extractDataFromResponse,
//                 writeInCSVFile("./imdbdataasync.csv"),
//                 readFromCSVFile("./imdbdataasync.csv")
//             );
//             (async () => {
//                 x(await scrapeFromWebsite(url, headers, "gzip"));
//             })()

// const x = R.pipe(
//   getHTMLFromResponse,
//   extractDataFromHTML,
//   writeInCSVFile("./imdbdataasync5.csv")
// );
// const y = R.pipe(
//     x,
//     readFromCSVFile("./imdbdataasync5.csv")
// );






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

const fs = require("fs");
const request = require("request-promise");
const fluture = require("fluture");
const cheerio = require("cheerio");

const url ="https://m.imdb.com/title/tt5071886/?ref_=fn_al_tt_0";

const fluturePromise = fluture.encaseP(request);

const getValuesFromCheerio = (html) => {
  let $ = cheerio.load(html);
  let imdbData = [];
    let title = $("div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > h1").text();
    let rating = $("span.AggregateRatingButton__RatingScore-sc-1ll29m0-1").text();
    let summary = $("p.GenresAndPlot__Plot-cum89p-6 > span").text();
    // console.log("title:", title);
    imdbData.push({
        title, rating, summary 
    });
    const imdbMovie = JSON.stringify(imdbData);
    writeFileContent(imdbMovie);
  
};

const writeFileContent = (content) => {
  fs.writeFile("./output.json", content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Output JSON generated");
  });
};

fluturePromise(url).pipe(
  fluture.fork(
      (err) => console.log("Error", err))
      ((resp) =>getValuesFromCheerio(resp)
  )
);
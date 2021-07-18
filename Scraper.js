import request from "request-promise";
import cheerio from "cheerio";
import fs from "fs";
import {Parser as json2Csv} from "json2csv";
import csvP from "csv-parser";

// Pure functions:
const scrapeFromWebsite = async (uri, headers={}, contentType="json") => {
    const response = await request(
        {
            uri: uri,
            headers: headers,
            [contentType]: true
        });
        return response;
}

const getHTMLFromScrape = (response) => {
    let $ = cheerio.load(response);
    return $;
}

const writeInCSVFile = (file) => {
    return (data) => {
        let j2cp = new json2Csv();
        let csv = j2cp.parse(data);
        // fs.writeFileSync(file, csv, 'utf-8');
        fs.writeFile(file , csv, "utf-8", err => { if (err) console.log("err:", err) })
    }
}

const readFromCSVFile = (file) => {
    fs.createReadStream(file)
        .pipe(csvP())
        .on("data", data => console.log(data))
}

export { scrapeFromWebsite, getHTMLFromScrape, writeInCSVFile, readFromCSVFile }
import request from "request-promise";
import cheerio from "cheerio";
import fs from "fs";
import {Parser as json2CsvParser} from "json2csv";
import csvParser from "csv-parser";

// Pure functions:
// const scrapeWebsite = async (uri, headers={}, contentType="json") => {
//             const response = await request(
//                 {
//                     uri: uri,
//                     headers: headers,
//                     [contentType]: true
//                 });
//             return response;
// }

const scrapeWebsite = (headers={}) => {
    return  (contentType="json") => {
        return async (uri) => {
            const response = await request(
                {
                    uri: uri,
                    headers: headers,
                    [contentType]: true
                });
            return response;
        }
    }
}

const scrape2Html = (scrapedCode) => {
    let $ = cheerio.load(scrapedCode);
    return $;
}

const writeInCSVFile = (filePath, charEncoding="utf-8") => {
    return (data) => {
        let j2cp = new json2CsvParser();
        let csvData = j2cp.parse(data);
        // fs.writeFileSync(filePath, csv, charEncoding);
        fs.writeFile(
            filePath , 
            csvData, 
            charEncoding, 
            err => { 
                if (err) console.log("err:", err) 
                else console.log("CSV file is Written successfully")
            }
        )
    }
}

const readFromCSVFile = (file) => {
    fs.createReadStream(file)
        .pipe(csvParser())
        .on("data", data => console.log(data))
}

export { scrapeWebsite, scrape2Html, writeInCSVFile, readFromCSVFile }
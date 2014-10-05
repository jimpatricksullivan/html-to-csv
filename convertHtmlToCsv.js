var _ = require('underscore');
var cheerio = require('cheerio');
var json2csv = require('nice-json2csv');

/**
 * @param html An html string
 * @param converter This is an object in the following format:
 *        {
 *            rowSelector: '.ProfileTweet',
 *            cells: [
 *                {name: 'text', selector: '.ProfileTweet-text'},
 *                {name: 'date', selector: '[data-time]'},
 *                {name: 'retweets', selector: '$('.ProfileTweet-action--retweet .ProfileTweet-actionCountForPresentation')'
 *            ]
 *        }
 * @returns csv string
 */
module.exports = function (html, converter) {
    var rowsData = [];

    // get rows from html
    var $html = cheerio.load(html);
    var rows = $html(converter.rowSelector);

    // for each row, push an object containing its cell values
    rows.each(function(index, rowObject) {
        var $row = cheerio.load(rowObject);
        var rowData = {};
        _.each(converter.cells, function(cellConverter) {
            rowData[cellConverter.name] = $row(cellConverter.selector).text();
        });
        rowsData.push(rowData);
    });

    // convert the array of row objects to csv
    return json2csv.convert(rowsData);
};
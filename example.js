var convert = require('./convertHtmlToCsv')

var html =
    '<div data-line><span class="message">guess what</span><div class="author">jim</div></div>' +
    '<div data-line><span class="message">what</span><div class="author">keren</div></div>' +
    '<div data-line><span class="message">that\'s what</span><div class="author">jim</div></div>';

var converter = {
    rowSelector: '[data-line]',
    cells: [
        {name: 'message', selector: '.message'},
        {name: 'person', selector: '.author'}
    ]
};

var csv = convert(html, converter);
console.log(csv);
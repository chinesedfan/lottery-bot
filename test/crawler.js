const args = process.argv.slice(2)
const crawler = require('../src/crawler/' + args[0])

crawler().then(console.log)

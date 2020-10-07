const args = process.argv.slice(2)
const crawler = require('../src/crawler/' + args[0])
const name = args[1]

crawler(name).then(console.log)

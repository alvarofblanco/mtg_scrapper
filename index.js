const axios = require('axios');
const cheerio = require('cheerio');
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers');

(async () => {
	const argv = yargs(hideBin(process.argv)).argv
	const cardName = argv.name

	if (!cardName) {
		console.log('No cardname provided - terminating program')
		return
	}
	console.log('cardName', cardName)
	const url = `https://www.cardkingdom.com/catalog/search?search=header&filter%5Bname%5D=${encodeURIComponent(cardName)}`
	try {
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);
		const mainList = $('.productCardWrapper')

		let arr = []

		mainList.find('.itemContentWrapper').each((i, e) => {
			let priceString = $(e).find('.stylePrice').text().split(' ')

			let card = {
				name: $(e).find('.productDetailTitle').children().text(),
				set: $(e).find('.productDetailSet').children().text().slice(1, -1),
				NM: priceString[1],
				EX: priceString[3],
				VG: priceString[5],
				G: priceString[7]
			}

			arr.push(card)
		})

		console.table(arr)
	} catch (e) {
		console.error(`Error while fetching rental properties from ${postCode} - ${e.message}`)
	}
})()
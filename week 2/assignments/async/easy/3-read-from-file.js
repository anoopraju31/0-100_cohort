const fs = require('fs')

fs.readFile('a.txt', 'utf-8', function (error, data) {
	if (error) {
		console.error(error.message)
		return
	}

	let sum = 0
	for (let i = 0; i < 10000000000; i++) {
		sum += i
	}

	console.log(sum)
	console.log(data)
})

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password, name and phone number as arguments: node mongo.js <password> <name> <phone_number>')
    process.exit(1)
}

const password = process.argv[2]
const url =
    `mongodb+srv://fullstack:${password}@cluster0.1jjjm.mongodb.net/phonebook-db?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const entry = new Entry({
        name: name,
        number: number,
    })

    entry.save().then(result => {
        console.log('entry saved!')
        mongoose.connection.close()
    })
} else {
    console.log("phonebook:")
    Entry.find({}).then(result => {
        result.forEach(e => {
            console.log(`${e.name} ${e.number}`)
        })
        mongoose.connection.close()
    })
}




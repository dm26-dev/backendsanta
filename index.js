const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
let corsOptions = {
    "origin": "*",
}
app.use(cors(corsOptions))

// DATABASE
let usersNames = [
    'David', 'Papa David', 'Mama David',
    'Ruddy', 'Papa Ruddy', 'Mama Ruddy', 'Daniel',
    'Diana', 'Alfredo', 'Nana', 'Pipe Hijo Diana',
    'Fanny', 'Sebas', 'Pipe Hijo Fanny',
    'Ricardo', 'Novio Ricardo'
]

let pendientes = [
    'David', 'Papa David', 'Mama David',
    'Ruddy', 'Papa Ruddy', 'Mama Ruddy', 'Daniel',
    'Diana', 'Alfredo', 'Nana', 'Pipe Hijo Diana',
    'Fanny', 'Sebas', 'Pipe Hijo Fanny',
    'Ricardo', 'Novio Ricardo'
]

let usersDB = [
    { name: 'David', enabled: true, secretSanta: '' },
    { name: 'Papa David', enabled: true, secretSanta: '' },
    { name: 'Mama David', enabled: true, secretSanta: '' },
    { name: 'Ruddy', enabled: true, secretSanta: '' },
    { name: 'Papa Ruddy', enabled: true, secretSanta: '' },
    { name: 'Mama Ruddy', enabled: true, secretSanta: '' },
    { name: 'Daniel', enabled: true, secretSanta: '' },
    { name: 'Diana', enabled: true, secretSanta: '' },
    { name: 'Alfredo', enabled: true, secretSanta: '' },
    { name: 'Nana', enabled: true, secretSanta: '' },
    { name: 'Pipe Hijo Diana', enabled: true, secretSanta: '' },
    { name: 'Fanny', enabled: true, secretSanta: '' },
    { name: 'Sebas', enabled: true, secretSanta: '' },
    { name: 'Pipe Hijo Fanny', enabled: true, secretSanta: '' },
    { name: 'Ricardo', enabled: true, secretSanta: '' },
    { name: 'Novio Ricardo', enabled: true, secretSanta: '' }
]

app.get('/', (req, res) => {
    res.send('Welcome to the app')
})

app.get('/names', (req, res) => {
    res.json({usersNames,cantidad: usersNames.length})
})

app.get('/pendientes', (req, res) => {
    res.json({ pendientes, cantidad: pendientes.length })
})

app.get('/users', (req, res) => {
    res.json(usersDB)
})

app.post('/users', (req, res) => {

    const newUser = req.body
    const userHide = newUser.name

    const userHidePendiente = newUser.secretSanta

    console.log(userHide)

    // CHANGE VALUE
    const captureIndex = usersDB.findIndex(user => user.name === newUser.name)
    usersDB[captureIndex] = newUser

    // DELETE USER ARRAY

    usersNames = usersNames.filter(user => user !== userHide)
    pendientes = pendientes.filter(user => user !== userHidePendiente)

    res.json(usersDB)

})


app.get('/clear', (req, res) => {
    usersDB = usersNames.map(user => ({ name: user, enabled: true, secretSanta: '' }))
    res.json({ res: "Limpieza exitosa" })
})

app.listen(3001, () => {
    console.log("Servidor corriendo puerto 3001")
})
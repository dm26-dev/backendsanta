const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
let corsOptions = {
    "origin": "*",
}
app.use(cors(corsOptions))

// NO TOCAR
let namesDB = [
    'David', 'Papa David', 'Mama David',
    'Ruddy', 'Papa Ruddy', 'Mama Ruddy', 'Daniel',
    'Diana', 'Alfredo', 'Nana', 'Pipe Hijo Diana',
    'Fanny', 'Sebas', 'Pipe Hijo Fanny',
    'Ricardo', 'Novio Ricardo'
]

// NO TOCAR
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

// PERSONAS QUE YA UTILIZARON LA APP
let pendingNamesforChoose = [
    'David', 'Papa David', 'Mama David',
    'Ruddy', 'Papa Ruddy', 'Mama Ruddy', 'Daniel',
    'Diana', 'Alfredo', 'Nana', 'Pipe Hijo Diana',
    'Fanny', 'Sebas', 'Pipe Hijo Fanny',
    'Ricardo', 'Novio Ricardo'
]

//FALTAN POR SER SELECCIONADOS
let selectedNames = [
    'David', 'Papa David', 'Mama David',
    'Ruddy', 'Papa Ruddy', 'Mama Ruddy', 'Daniel',
    'Diana', 'Alfredo', 'Nana', 'Pipe Hijo Diana',
    'Fanny', 'Sebas', 'Pipe Hijo Fanny',
    'Ricardo', 'Novio Ricardo'
]

app.get('/', (req, res) => {
    res.send('Welcome to the app secret')
})

app.get('/names', (req, res) => {
    res.json({ pendingNamesforChoose, cantidad: pendingNamesforChoose.length })
})

app.get('/pendientes', (req, res) => {
    res.json({ selectedNames, cantidad: selectedNames.length })
})

app.get('/users', (req, res) => {
    res.json(usersDB)
})

app.post('/usersdb', (req, res) => {

    const newUser = req.body

    const userHide = newUser.name
    const userHidePendiente = newUser.secretSanta

    // CHANGE VALUE
    const captureIndex = usersDB.findIndex(user => user.name === newUser.name)
    usersDB[captureIndex] = newUser

    // SACAR NAME DEL ARRAY USER
    pendingNamesforChoose = pendingNamesforChoose.filter(user => user !== userHide)
    
    // SACAR DE LOS ESCOJIDOS
    selectedNames = selectedNames.filter(user => user !== userHidePendiente)
    
    res.json({usersDB,pendingNamesforChoose,selectedNames})

})

app.get('/clear', (req, res) => {
    usersDB = namesDB.map(user => ({ name: user, enabled: true, secretSanta: '' }))
    pendingNamesforChoose = namesDB
    selectedNames = namesDB
    res.json({ res: "Limpieza exitosa", pendingNamesforChoose, selectedNames })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log("Servidor corriendo puerto 3001")
})
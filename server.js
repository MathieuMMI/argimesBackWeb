const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser'); // Importez body-parser

const app = express();
const port = 9000;
const dbPath = './argimes.db';

app.use(cors());
app.use(bodyParser.json()); // Utilisez body-parser pour parser les données JSON

// Créer une nouvelle instance de base de données SQLite
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données :', err.message);
    } else {
        console.log('Connexion à la base de données SQLite réussie');
    }
});



// Endpoint pour gérer l'inscription d'un nouvel utilisateur
app.post('/signup', (req, res) => {
    const { name, age, email } = req.body;

    // Vérifier si tous les champs requis sont présents
    if (!name || !age || !email) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    // Insérer les informations de l'utilisateur dans la base de données
    const query = 'INSERT INTO users (name, age, email) VALUES (?, ?, ?)';
    db.run(query, [name, age, email], (err) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données :', err.message);
            return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
        }
        res.status(201).json({ message: 'Inscription réussie' });
    });
});

// Démarrer le serveur HTTP
app.listen(port, () => {
    console.log(`Serveur HTTP démarré sur http://localhost:${port}`);
});

const { Sequelize, DataTypes } = require('sequelize');
// const connection = require("../db");
// const db = {connection};
const User = require("../db").User;
require('dotenv').config({ path: '.env.local', override: true });


const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DOMAIN_NAME,
    dialect: 'postgres',
    logging: false,
});

async function remplirBaseDeDonnees() {
    try {
        // Synchronisez la base de données, force: true supprimera toutes les tables existantes
        await connection.sync({ force: true });

        // Tableau de données utilisateur à insérer dans la base de données
        const utilisateurs = [
            { name: 'Doe', password: '$2b$10$Ev4rfncbRs0JP3P4weaCr.uaXSnAFmefqFFiO2bziyJrA2PV3H8QW', email: 'john.doe@email.com' },
            { name: 'Smith', password: '$2b$10$Ev4rfncbRs0JP3P4weaCr.uaXSnAFmefqFFiO2bziyJrA2PV3H8QW', email: 'jane.smith@email.com' },
            // Ajoutez d'autres utilisateurs selon vos besoins
        ];

        // Insérez les utilisateurs dans la base de données en utilisant bulkCreate
        await User.bulkCreate(utilisateurs);

        console.log('Base de données remplie avec succès.');
    } catch (erreur) {
        console.error('Erreur lors du remplissage de la base de données :', erreur);
    } finally {
        // Fermez la connexion à la base de données après l'opération
        await connection.close();
    }
}

// Appelez la fonction pour remplir la base de données
remplirBaseDeDonnees();

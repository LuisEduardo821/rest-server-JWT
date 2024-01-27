const express = require('express');
const { dbConnection } = require('../database/config');
const bodyParser = require('body-parser');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {

        await dbConnection();
    }

    middlewares() {
        this.app.set('view engine', 'ejs');
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Restserver corriendo en el puerto ${this.port}`);
        });
    };

}

module.exports = Server;
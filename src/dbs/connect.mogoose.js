'use strict';

const mongoose = require('mongoose');


// const { db: { host, name, port } } = require('../configs/config.mongodb');

// const connectString = `mongodb://${host}:${port}/${name}`;
const connectString = `mongodb+srv://vanhuybuivips:SK3ABmPU8tZ8rrhq@cluster0.qj73u8a.mongodb.net/`
console.log(connectString, "connect String");
class Database {
    constructor() {
        this.connect()
    }
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }
        mongoose.connect(connectString,
            { maxPoolSize: 50 })
            .then(_ => { console.log("Connect Mongoose Success Vipp") })
            .catch(err => { console.log("Error Connect!"); })
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
const express = require('express');
const { default: helmet } = require('helmet');
const compression = require('compression');
const app = express();
const YAML = require('yaml');
const fs = require('fs')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
require('dotenv').config()
const morgan = require('morgan');
const cors = require("cors");

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

// // init db
require('./dbs/connect.mogoose');


// // init swagger
const file = fs.readFileSync(path.resolve('swagger.yaml'), 'utf8')
const swaggerDoc = YAML.parse(file);
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Project management',
            version: '1.0.0'
        },
        servers: [
            {
                url: "http://localhost:6060/api",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }

            }

        }
    },
    apis: ['./src/routes/*/*.js'], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))





app.use('/api', require('./routes/index'));

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error'
    })
})
app.listen(6060, () => {
    console.log("Connect to server successfully...");
})

// module.exports = app
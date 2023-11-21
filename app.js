const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const databaseMiddleware = require("./db");
const fetchRouter = require('./routes/fetch');
const sendRouter = require('./routes/send');
const updateRouter = require("./routes/update");
const eraseRouter = require("./routes/erase");
const connectRouter = require('./routes/connect');

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Global Educom API',
      version: '1.0.0',
      description: 'The API for Global Educom',
    },
  },
  apis: ['./routes/*.js'], 
};

app.use(databaseMiddleware);

const specs = swaggerJsdoc(options);

// Routes
app.use('/', fetchRouter);
app.use('/docs', sendRouter);
app.use("/docs", updateRouter);
app.use("/docs", eraseRouter);
app.use('/connect', connectRouter);


app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



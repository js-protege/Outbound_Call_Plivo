require('module-alias/register')

const cors = require('cors');
const app = require('@plugins/express');
const logger = require('@plugins/logger');

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.options('*', cors())

app.use(cors(corsOptions));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node-Express." });
});

const port = process.env.PORT || 8080;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
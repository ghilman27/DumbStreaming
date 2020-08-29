const { CategoriesEndpoint, VideosEndpoint } = require('./routes');
express = require('express');
path = require('path');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

db = require('./config/database.js');
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(error => console.log(error))

app.get('/', (req, res) => res.send('Welcome to Dumb Streaming API!'));
app.use('/categories', CategoriesEndpoint);
app.use('/videos', VideosEndpoint);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
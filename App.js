const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const sync = require('./models/sync.js');
sync();

const port = process.env.PORT || 8080;
const app = express();

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const save_router = require('./routes/save_router.js');
const section_router = require('./routes/section_router.js');
const auth_router = require('./routes/auth_router.js');

app.use('/save', save_router);
app.use('/section', section_router);
app.use('/auth', auth_router);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

const User = require('./User.js');
const Section = require('./Section.js');
const Channel = require('./Channel.js');
const Video = require('./Video.js');

db.User = User;
db.Section = Section;
db.Channel = Channel;
db.Video = Video;

User.init(sequelize);
Section.init(sequelize);
Channel.init(sequelize);
Video.init(sequelize);

User.associate(db);
Section.associate(db);
Channel.associate(db);
Video.associate(db);

db.sequelize = sequelize;

module.exports = db;

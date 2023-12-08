const Sequelize = require('sequelize');

class Channel extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				id: {
					type: Sequelize.INTEGER(10),
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
					unique: true,
				},
				channel_id: {
					type: Sequelize.STRING(100),
					allowNull: false,
				},
				title: {
					type: Sequelize.STRING(200),
					allowNull: false,
				},
				section_id: {
					type: Sequelize.INTEGER(10),
					allowNull: false,
				},
			},
			{
				sequelize,
				timestamps: true,
				underscored: true,
				modelName: 'Channel',
				tableName: 'Channel',
				paranoid: true,
				charset: 'utf8',
				collate: 'utf8_general_ci',
			}
		);
	}
	static associate(db) {
		db.Channel.belongsTo(db.Section, {
			foreignKey: 'section_id',
			targetKey: 'id',
		});
	}
}

module.exports = Channel;

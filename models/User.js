const Sequelize = require('sequelize');

class User extends Sequelize.Model {
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
				email: {
					type: Sequelize.STRING(30),
					allowNull: false,
					unique: true,
				},
				password: {
					type: Sequelize.STRING(100),
					allowNull: false,
				},
				name: {
					type: Sequelize.STRING(10),
					allowNull: false,
				},
				nickname: {
					type: Sequelize.STRING(10),
					allowNull: false,
				},
			},
			{
				sequelize,
				timestamps: true,
				underscored: true,
				modelName: 'User',
				tableName: 'User',
				paranoid: true,
				charset: 'utf8',
				collate: 'utf8_general_ci',
			},
		);
	}
	static associate(db) {
		db.User.hasMany(db.Section, { foreignKey: 'user_id', sourceKey: 'id' });
	}
}

module.exports = User;

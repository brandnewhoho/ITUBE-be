const Sequelize = require('sequelize');

class Section extends Sequelize.Model {
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
				title: {
					type: Sequelize.STRING(30),
					allowNull: false,
				},
				type: {
					type: Sequelize.INTEGER(1),
					allowNull: false,
				},
				user_id: {
					type: Sequelize.INTEGER(10),
					allowNull: false,
				},
			},
			{
				sequelize,
				timestamps: true,
				underscored: true,
				modelName: 'Section',
				tableName: 'Section',
				paranoid: true,
				charset: 'utf8',
				collate: 'utf8_general_ci',
			},
		);
	}
	static associate(db) {
        db.Section.hasMany(db.Channel, { foreignKey: 'section_id', sourceKey: 'id' });
        db.Section.hasMany(db.Video, { foreignKey: 'section_id', sourceKey: 'id' });
		db.Section.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
	}
}


module.exports = Section;
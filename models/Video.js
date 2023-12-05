const Sequelize = require('sequelize');

class Video extends Sequelize.Model {
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
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				video_id: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				thumbnail_url: {
					type: Sequelize.STRING(100),
					allowNull: false,
				},
                channel_title: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				channel_id: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				description: {
					type: Sequelize.STRING(1000),
					allowNull: false,
				},
                publishedAt: {
					type: Sequelize.DATE,
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
				modelName: 'Video',
				tableName: 'Video',
				paranoid: true,
				charset: 'utf8',
				collate: 'utf8_general_ci',
			},
		);
	}
	static associate(db) {
		db.Video.belongsTo(db.Section, { foreignKey: 'section_id', targetKey: 'id' });
	}
}


module.exports = Video;
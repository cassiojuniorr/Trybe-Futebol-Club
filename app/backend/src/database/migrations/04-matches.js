module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('matches', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            home_team: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'teams',
                }
            },
            home_team_goals: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            away_team: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'teams',
                }
            },
            away_team_goals: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            in_progress: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('matches');
    },
}
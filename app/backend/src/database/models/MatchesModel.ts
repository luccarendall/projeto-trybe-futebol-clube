import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamTable from './TeamsModel';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
  teamHome!: TeamTable;
  teamAway!: TeamTable;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  homeTeam: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },

  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },

  awayTeam: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },

  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

// Create an association between this (the source) and the provided target. The foreign key is added on the source.
Matches.belongsTo(TeamTable, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(TeamTable, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;

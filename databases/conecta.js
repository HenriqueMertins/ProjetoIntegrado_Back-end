import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "training_calendar", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});

import { DB_NAME } from "config/dbName";
import { sequelize } from "infra/sequelize";
import {
  DataTypes,
  Model,
  Optional } from "sequelize";


interface TitleAttr {
  id: number;
  name: string;
}

type CreateTitleAttr = Optional<TitleAttr, "id">

export class TitleModel
  extends Model<TitleAttr, CreateTitleAttr>
  implements TitleAttr {

  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TitleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: DB_NAME.TITLE,
    sequelize: sequelize, // passing the `sequelize` instance is required
  }
);

TitleModel.sync({
  alter: true,
  force: false,
});

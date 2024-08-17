import { Model, DataTypes } from "sequelize";
import ConnectionDB from "../../core/services/db/db.service";

class Catalog extends Model {
    public id!: number;
    public type!: string;
    public value!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}
const sequelize = ConnectionDB.getConnection();

Catalog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "catalogs",
        timestamps: true,
        underscored: true,
    }
);


export default Catalog;


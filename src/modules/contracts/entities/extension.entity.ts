import { Model, DataTypes, Sequelize } from "sequelize";
import ConnectionDB from "../../core/services/db/db.service";
import Contract from "./contract.entity";

class Extension extends Model {
    public extension_id!: number;
    public contract_id!: number;
    public extension_number!: number;
    public additional_value!: number;
    public extension_duration!: string;
    public extension_start_date!: Date;
    public extension_end_date!: Date;
}

const sequelize: Sequelize = ConnectionDB.getConnection();

Extension.init(
    {
        extension_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        contract_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Contract, // Hace referencia al modelo 'Contract'
                key: 'contract_id',
            },
        },
        extension_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        additional_value: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        extension_duration: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        extension_start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        extension_end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "extensions",
        timestamps: false,
        underscored: true
    }
);

Extension.belongsTo(Contract, { foreignKey: 'contract_id' });

export default Extension;

import { Model, DataTypes, Sequelize } from "sequelize";
import ConnectionDB from "../../core/services/db/db.service";

class Provider extends Model {
    public provider_id!: number;
    public document_type!: string;
    public document_number!: string;
    public full_name!: string;
    public email!: string;
    public phone!: string | null;
    public registration_date!: Date;
}

const sequelize: Sequelize = ConnectionDB.getConnection();

Provider.init(
    {
        provider_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        document_type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        document_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        full_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        registration_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "providers",
        timestamps: false, // No hay campos automáticos de timestamps
        underscored: true, // Utiliza nombres con guiones bajos en lugar de camelCase
    }
);


export default Provider;

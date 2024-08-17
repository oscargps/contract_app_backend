import { Model, DataTypes, Sequelize } from "sequelize";
import ConnectionDB from "../../core/services/db/db.service";
import Provider from "./providers.entity";

class OTP extends Model {
    public otp_id!: number;
    public provider_id!: number;
    public otp_code!: string;
    public created_at!: Date;
    public expires_at!: Date;
    public status!: number;
}

const sequelize: Sequelize = ConnectionDB.getConnection();

OTP.init(
    {
        otp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        provider_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Provider,  // Hace referencia al modelo 'Provider'
                key: 'provider_id',
            },
        },
        otp_code: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,  // Valor por defecto 0
        },
    },
    {
        sequelize,
        tableName: "otp",
        timestamps: false,  // Se manejan manualmente los campos created_at y expires_at
        underscored: true,  // Para usar nombres de columnas con guiones bajos en lugar de camelCase
    }
);

// Relación con Provider
OTP.belongsTo(Provider, { foreignKey: 'provider_id' });


export default OTP;

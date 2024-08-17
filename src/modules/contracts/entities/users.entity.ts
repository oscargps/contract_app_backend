import { Model, DataTypes, Sequelize } from "sequelize";
import ConnectionDB from "../../core/services/db/db.service";

export interface IUser {
    user_id: number;
    full_name: string;
    email: string;
    password_hash: string;
    role: string;
    status: number;
    created_at: Date;
    updated_at: Date;
}

class User extends Model<IUser> {
    public user_id!: number;
    public full_name!: string;
    public email!: string;
    public password_hash!: string;
    public role!: string;
    public status!: number;
    public created_at!: Date;
    public updated_at!: Date;
}

const sequelize: Sequelize = ConnectionDB.getConnection();

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,  // Valor por defecto 1
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: false,  // Se manejan manualmente los campos created_at y updated_at
        underscored: true,  // Para usar nombres de columnas con guiones bajos en lugar de camelCase
    }
);


export default User;

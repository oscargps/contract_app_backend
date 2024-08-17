import { Model, DataTypes, Sequelize } from "sequelize";
import ConnectionDB from "../../core/services/db/db.service";
import User from "./users.entity";

export interface ISession {
    session_id: number;
    user_id: number;
    jwt_token: string;
    created_at: Date;
    expires_at: Date;
}

class Session extends Model<ISession> {
    public session_id!: number;
    public user_id!: number;
    public jwt_token!: string;
    public created_at!: Date;
    public expires_at!: Date;
}

const sequelize: Sequelize = ConnectionDB.getConnection();

Session.init(
    {
        session_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,  // Hace referencia al modelo 'User'
                key: 'user_id',
            },
        },
        jwt_token: {
            type: DataTypes.TEXT,
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
    },
    {
        sequelize,
        tableName: "sessions",
        timestamps: false,  // Se manejan manualmente los campos created_at y expires_at
        underscored: true,  // Para usar nombres de columnas con guiones bajos en lugar de camelCase
    }
);

// Relación con User
Session.belongsTo(User, { foreignKey: 'user_id' });


export default Session;

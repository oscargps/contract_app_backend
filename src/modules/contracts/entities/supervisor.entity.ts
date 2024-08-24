import { Model, DataTypes } from "sequelize";
import ConnectionDB from "../../core/services/db/db.service";

export interface ISupervisor {
    supervisor_id: number;
    full_name: string;
    email: string;
    phone: string | null;
    position: string | null;
    department: string | null;
    status: number;
    registration_date: Date;
    updated_at: Date;
}
class Supervisor extends Model {
    public supervisor_id!: number;
    public full_name!: string;
    public email!: string;
    public phone!: string | null;
    public position!: string | null;
    public department!: string | null;
    public status!: number;
    public registration_date!: Date;
    public updated_at!: Date;
}
const sequelize = ConnectionDB.getConnection();

Supervisor.init(
    {
        supervisor_id: {
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
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        position: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        department: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,  // Valor por defecto 1
        },
        registration_date: {
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
        tableName: "supervisors",
        timestamps: false,
        underscored: true,
    }
);

export default Supervisor;
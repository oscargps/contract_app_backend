import { Model, DataTypes, Sequelize } from "sequelize";
import ConnectionDB from "../../core/services/db/db.service";
import Supervisor from "./supervisor.entity";
import Provider from "./providers.entity";

export interface IContract {
    contract_id: number;
    provider_id: number;
    contract_number: string;
    purpose: string;
    contractual_obligations: string;
    total_value: number;
    monthly_value: number;
    duration: string;
    start_date: Date;
    end_date: Date;
    status: string;
    early_termination_date?: Date | null; // Opcional, ya que puede ser nulo
    supervisor_id: number;
    created_at: Date;
    updated_at: Date;
}

class Contract extends Model<IContract> {
    public contract_id!: number;
    public provider_id!: number;
    public contract_number!: string;
    public purpose!: string;
    public contractual_obligations!: string;
    public total_value!: number;
    public monthly_value!: number;
    public duration!: string;
    public start_date!: Date;
    public end_date!: Date;
    public status!: string;
    public early_termination_date!: Date | null;
    public supervisor_id!: number;
    public created_at!: Date;
    public updated_at!: Date;

    public readonly provider!: typeof Provider;
    public readonly supervisor!: typeof Supervisor;

}

const sequelize: Sequelize = ConnectionDB.getConnection();

Contract.init(
    {
        contract_id: {
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
        contract_number: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        purpose: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        contractual_obligations: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        total_value: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        monthly_value: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        early_termination_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        supervisor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Supervisor,  // Hace referencia al modelo 'Supervisor'
                key: 'supervisor_id',
            },
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "contracts",
        timestamps: true,  // Ya se gestionan manualmente los campos de fecha
        underscored: true,  // Para utilizar nombres de columnas con guiones bajos en lugar de camelCase
    }
);

// Definición de relaciones
Contract.belongsTo(Provider, { foreignKey: 'provider_id', as: 'provider'});
Contract.belongsTo(Supervisor, { foreignKey: 'supervisor_id', as: 'supervisor'});


export default Contract;

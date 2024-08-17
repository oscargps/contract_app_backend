import Contract, { IContract } from "../entities/contract.entity";
import Provider from "../entities/providers.entity";
import Supervisor from "../entities/supervisor.entity";

var debug = require('debug')('contractApp:catalogService');


class ContractService {

    public async getAllContracts() {
        try {
            debug('GETING CONTRACTS');
            return await Contract.findAll({
                limit: 10,
                include: [
                    {
                        model: Provider,
                        as: 'provider',
                    },
                    {
                        model: Supervisor,
                        as: 'supervisor',
                    }
                ],
            });
        } catch (error: any) {
            debug("FAIL TO GET CONTRACTS, ERROR:", error)
        }
    }

    public async createContract(dataContract: IContract): Promise<any> {
        try {
            await Contract.create(dataContract);
        } catch (error: any) {
            debug("FAIL TO CREATE CONTRACT, ERROR:", error)
            throw new Error(error)
        }
    }
}

export default ContractService;

import Contract, { IContract } from "../entities/contract.entity";

var debug = require('debug')('contractApp:catalogService');


class ContractService {
    public async createContract(dataContract: IContract): Promise<any> {
        try {
            await  Contract.create(dataContract);
        } catch (error: any) {
            debug("FAIL TO CREATE CONTRACT, ERROR:", error)
            throw new Error(error)
        }
    }
}

export default ContractService;

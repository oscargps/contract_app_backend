import Contract, { IContract } from "../entities/contract.entity";
import Provider from "../entities/providers.entity";
import Supervisor from "../entities/supervisor.entity";

var debug = require('debug')('contractApp:contractService');


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
            throw new Error(error);
        }
    }
    public async getContractByNumber(contractNumber: string) {
        try {
            debug('GETING CONTRACT BY NUMBER');
            return await Contract.findAll({
                where: {
                    contract_number: contractNumber
                },
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
            throw new Error(error);
        }
    }
    public async getContractByProvider(provider_identification: string) {
        try {
            debug('GETING CONTRACT BY PROVIDER');
            const provider = await Provider.findOne({ where: { document_number: provider_identification } })
            if (provider) {

                return await Contract.findAll({
                    where: {
                        provider_id: provider?.provider_id
                    },
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
            } else {
                throw new Error("Provider doesn't exist");

            }
        } catch (error: any) {
            debug("FAIL TO GET CONTRACTS, ERROR:", error)
            throw new Error(error.message);
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

import httpStatus from "http-status";
import { Request, Response } from "express";
import ContractService from "../services/contract.service";
import { IContract } from "../entities/contract.entity";
import ProviderService from "../services/provider.service";
import SupervisorService from "../services/supervisor.service";
import catalogServiceInstance from "../services/catalog.service";
var debug = require('debug')('contractApp:contractController');

class ContractController {

    public contractService: ContractService;
    public providerService: ProviderService;
    public supervisorService: SupervisorService;

    constructor() {
        this.contractService = new ContractService();
        this.providerService = new ProviderService();
        this.supervisorService = new SupervisorService();
    }

    public async getAll(req: Request, res: Response, next: any) {
        try {
            const contracts = await contractControllerInstance.contractService.getAllContracts()
            debug("CATALOGS RESPONSE %o", contracts);
            res.status(httpStatus.OK).json(contracts);
        } catch (error: any) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ result: "FAIL TO GET CATALOGS" });
        }
    }
    public async getLists(req: Request, res: Response, next: any) {
        try {
            debug("GETTING LISTS FOR CREATE CONTRACTS");
            const catalogs = await catalogServiceInstance.getCatalogs()
            const providers = await contractControllerInstance.providerService.getAllProviders()
            const supervisors = await contractControllerInstance.supervisorService.getAllSupervisors()
            res.status(httpStatus.OK).json({ catalogs, providers, supervisors });
        } catch (error: any) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ result: "FAIL TO GET CATALOGS" });
        }

    }

    public async createContract(req: Request, res: Response, next: any) {
        const dataContract = req.body.data as IContract
        debug("CREATING NEW CONTRACT %o", dataContract);
        try {
            await contractControllerInstance.contractService.createContract(dataContract)
            res.status(httpStatus.OK).json({ result: "contract created" });
        } catch (error: any) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ result: "FAIL TO CREATE CONRACT" });
        }
    }
}

const contractControllerInstance = new ContractController();
export default contractControllerInstance;

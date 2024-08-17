import httpStatus from "http-status";
import { Request, Response } from "express";
import ContractService from "../services/contract.service";
import { IContract } from "../entities/contract.entity";
var debug = require('debug')('contractApp:contractController');

class ContractController {

    public contractService: ContractService;

    constructor(){
        this.contractService = new ContractService();
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

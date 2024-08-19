import httpStatus from "http-status";
import { Request, Response } from "express";
import ProviderService from "../services/provider.service";
import { IProvider } from "../entities/providers.entity";
var debug = require('debug')('contractApp:providerController');

class ProviderController {

    public providerService: ProviderService;

    constructor(){
        this.providerService = new ProviderService();
    }

    public async getAll(req: Request, res: Response, next: any) {
        try {
            const providers = await providerControllerInstance.providerService.getAllProviders()
            debug("PROVIDER RESPONSE %o", providers);
            res.status(httpStatus.OK).json(providers);
        } catch (error: any) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ result: "FAIL TO GET PROVIDERS" });
        }
    }

    public async createProvider(req: Request, res: Response, next: any) {
        const data = req.body.data as IProvider
        debug("CREATING NEW PROVIDER %o", data);
        try {
            await providerControllerInstance.providerService.createProvider(data)
            res.status(httpStatus.OK).json({ result: "provider created" });
        } catch (error: any) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ result: "FAIL TO CREATE PROVIDER" });
        }
    }
}

const providerControllerInstance = new ProviderController();
export default providerControllerInstance;

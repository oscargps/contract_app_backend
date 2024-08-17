import httpStatus from "http-status";
import { Request, Response } from "express";
import catalogServiceInstance from "../services/catalog.service";
var debug = require('debug')('contractApp:catalogController');

class CatalogController {


    public async getCatalogs(req: Request, res: Response, next: any) {
        try {
            const catalogs = await catalogServiceInstance.getCatalogs()
            debug("CATALOGS RESPONSE %o", catalogs);
            res.status(httpStatus.OK).json(catalogs);
        } catch (error: any) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ result: "FAIL TO GET CATALOGS" });
        }
    }
}

const catalogControllerInstance = new CatalogController();
export default catalogControllerInstance;

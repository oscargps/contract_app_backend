import httpStatus from "http-status";
import { Request, Response } from "express";
import SupervisorService from "../services/supervisor.service";
var debug = require('debug')('contractApp:supervisorController');

class SupervisorController {

    public supervisorService: SupervisorService;

    constructor(){
        this.supervisorService = new SupervisorService();
    }

    public async getAll(req: Request, res: Response, next: any) {
        try {
            const supervisors = await supervisorControllerInstance.supervisorService.getAllSupervisors()
            debug("SUPERVISOR RESPONSE %o", supervisors);
            res.status(httpStatus.OK).json(supervisors);
        } catch (error: any) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ result: "FAIL TO GET SUPERVISORS" });
        }
    }

    public async createSupervisor(req: Request, res: Response, next: any) {
        const data = req.body.data
        debug("CREATING NEW SUPERVISOR %o", data);
        try {
            await supervisorControllerInstance.supervisorService.createSupervisor(data)
            res.status(httpStatus.OK).json({ result: "SUPERVISOR created" });
        } catch (error: any) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ result: "FAIL TO CREATE SUPERVISOR" });
        }
    }
}

const supervisorControllerInstance = new SupervisorController();
export default supervisorControllerInstance;

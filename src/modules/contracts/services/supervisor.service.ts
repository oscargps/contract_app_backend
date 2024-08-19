import Supervisor from "../entities/supervisor.entity";

var debug = require('debug')('contractApp:supervisorService');


class SupervisorService {

    public async getAllSupervisors(){
        try {
            debug('GETING ALL SUPERVISORS');
            return await Supervisor.findAll();
        } catch (error: any) {
            debug("FAIL TO GET SUPERVISORS, ERROR:", error)
            throw new Error(error);
        }
    }

    public async createSupervisor(dataSupervisor: any): Promise<any> {
        try {
            await Supervisor.create(dataSupervisor);
        } catch (error: any) {
            debug("FAIL TO CREATE SUPERVISOR, ERROR:", error)
            throw new Error(error)
        }
    }
}

export default SupervisorService;

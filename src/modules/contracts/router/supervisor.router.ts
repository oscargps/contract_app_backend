import { Router } from "express";
import supervisorControllerInstance from "../controllers/supervisor.controller";
class ProviderRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config() {
    this.router.post("/create", supervisorControllerInstance.createSupervisor);
    this.router.get("/all", supervisorControllerInstance.getAll);
  }
}

const providerRouter = new ProviderRouter();
export default providerRouter.router;

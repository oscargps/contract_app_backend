import { Router } from "express";
import contractControllerInstance from "../controllers/contract.controller";
class ContractRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config() {
    this.router.post("/create", contractControllerInstance.createContract);
  }
}

const contractRouter = new ContractRouter();
export default contractRouter.router;

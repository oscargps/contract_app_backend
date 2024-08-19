import { Router } from "express";
import contractControllerInstance from "../controllers/contract.controller";
class ContractRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config() {
    this.router.post("/create", contractControllerInstance.createContract);
    this.router.get("/all", contractControllerInstance.getAll);
    this.router.get("/get-lists", contractControllerInstance.getLists);
  }
}

const contractRouter = new ContractRouter();
export default contractRouter.router;

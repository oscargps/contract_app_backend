import { Router } from "express";
import providerControllerInstance from "../controllers/provider.controller";
class ProviderRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config() {
    this.router.post("/create", providerControllerInstance.createProvider);
    this.router.get("/all", providerControllerInstance.getAll);
  }
}

const providerRouter = new ProviderRouter();
export default providerRouter.router;

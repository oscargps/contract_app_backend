import { Router } from "express";
import healthController from "../controllers/health.controller";
class HealthRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config() {
    this.router.get("/", healthController.Health);

  }
}

const healthRouter = new HealthRouter();
export default healthRouter.router;

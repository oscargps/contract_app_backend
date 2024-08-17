import { Router } from "express";
import catalogControllerInstance from "../controllers/catalog.controller";
class CatalogRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config() {
    this.router.get("/", catalogControllerInstance.getCatalogs);
  }
}

const catalogRouter = new CatalogRouter();
export default catalogRouter.router;

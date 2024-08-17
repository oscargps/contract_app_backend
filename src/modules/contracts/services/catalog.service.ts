import Catalog from "../entities/catalog.entity";

var debug = require('debug')('contractApp:catalogService');


class CatalogService {
    public async getCatalogs() {
        try {
            debug('GETING CATALOGS');
            return await Catalog.findAll();
        } catch (error: any) {
            debug("FAIL TO GET CATALOGS, ERROR:", error)
        }
    }
}

const catalogServiceInstance = new CatalogService();
export default catalogServiceInstance;

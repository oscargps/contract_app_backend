import Provider, { IProvider } from "../entities/providers.entity";

var debug = require('debug')('contractApp:providerService');


class ProviderService {

    public async getAllProviders(){
        try {
            debug('GETING ALL PROVIDERS');
            return await Provider.findAll();
        } catch (error: any) {
            debug("FAIL TO GET PROVIDERS, ERROR:", error)
            throw new Error(error);
        }
    }

    public async createProvider(dataProvider: IProvider): Promise<any> {
        try {
            await Provider.create(dataProvider);
        } catch (error: any) {
            debug("FAIL TO CREATE PROVIDER, ERROR:", error)
            throw new Error(error)
        }
    }
}

export default ProviderService;

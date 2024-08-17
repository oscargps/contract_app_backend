
import { Request, Response } from 'express';

class HealthController {
  public Health(rq: Request, rs: Response) {
    rs.status(200);
    rs.send('SERVER OK');
  }
}

const healthController = new HealthController();
export default healthController;

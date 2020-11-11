import { Request } from 'express';
export default interface IRequest extends Request {
    body: any;
    query: any;
    params: any;
    userData: any;
}

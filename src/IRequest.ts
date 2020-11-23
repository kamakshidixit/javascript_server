import { Request } from 'express';
export default interface IRequest extends Request {
    user: any;
    body: any;
    query: any;
    params: any;
    userData: any;
}

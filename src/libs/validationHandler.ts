import { NextFunction, Request, Response } from 'express';
export const validationHandler = ( config ) => ( req: Request, res: Response, next: NextFunction  ) => {
    const error = [];
    Object.keys(config).forEach((keys) => {
        const inObject = config[keys];
        inObject.in.forEach(inside => {
            let value = req[inside][keys];
            const a = {
                key : '',
                location: '',
                errorMessage: ''
            };
            if ((inObject.required) && !(value)) {
                a.key = keys;
                a.location = inside;
                a.errorMessage = inObject.errorMessage || `${keys} is required`;
                error.push(a);
                return;
            }
            value = value || inObject.default;
            if (!value) {
                return;
            }
            if ((inObject.number) && !(Number.isInteger(Number(value)))) {
                a.key = keys;
                a.location = inside;
                a.errorMessage = inObject.errorMessage || `${keys}'s type is not number`;
                error.push(a);
                return;
            }
            if ((inObject.string) && !(typeof value === 'string')) {
                a.key = keys;
                a.location = inside;
                a.errorMessage = inObject.errorMessage || `${keys}'s type is not string`;
                error.push(a);
                return;
            }
            const regex = inObject.regex;
            if ((regex) && !regex.test(value)) {
                a.key = keys;
                a.location = inside;
                a.errorMessage = inObject.errorMessage || `${keys} is invalid`;
                error.push(a);
                return;
            }
            if (inObject.isObject && (!(typeof value === 'object') || !(Object.entries(value).length))) {
                a.key = keys;
                a.location = inside;
                a.errorMessage = `${keys} is invalid`;
                error.push(a);
                return;
            }
        });
    });
    if (error.length) {
        return res.status(400).send(error);
    }
    next ();
  };

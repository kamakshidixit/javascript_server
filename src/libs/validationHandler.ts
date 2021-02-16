// import { NextFunction, Request, Response } from 'express';

// export default ( config ) => ( req: Request, res: Response, next: NextFunction  ) => {
//     const errors = [];
//     console.log( req.body );
//     console.log( req.query );
//     const keys = Object.keys( config );

//     keys.forEach((key) => {
//         const obj = config[key];
//         const values = obj.in.map( ( val ) => {
//             return req[ val ][ key ];
//         });

//         if (Object.keys( req[obj.in] ).length === 0) {
//             errors.push({
//                 message: obj.errorMessage,
//                 location: obj.in,
//                 status: 400
//             });
//         }

//         if (obj.required) {
//             if (isNull(values[0])) {
//                 errors.push({
//                     message: obj.errorMessage,
//                     location: obj.in,
//                     status: 400
//                 });
//             }
//         }

//         if (obj.string) {
//             if ( !( typeof ( values[0] ) === 'string' ) ) {
//                 errors.push({
//                     message: obj.errorMessage,
//                     location: obj.in,
//                     status: 400
//                 });
//             }
//         }

//         if (obj.isObject) {
//             if ( ! ( typeof ( values ) === 'object' ) ) {
//                 errors.push({
//                     message: obj.errorMessage,
//                     location: obj.in,
//                     status: 400
//                 });
//             }
//         }

//         if (obj.regex) {
//             const regex = obj.regex;
//             if (!regex.test(values[0])) {
//                 errors.push({
//                     message: obj.errorMessage ,
//                     location: obj.in,
//                     status: 400,
//                 });
//             }
//         }

//         if (obj.number) {
//             if (isNaN(values[0]) || values[0] === undefined) {
//                 errors.push({
//                     message: obj.errorMessage ,
//                     location: obj.in,
//                     status: 400,
//                 });
//             }
//         }
//     });

//     if (errors.length > 0) {
//         res.status(400).send({ errors});
//     }
//     else {
//         next();
//     }
// };

// function isNull( obj ) {
//     const a = ( obj === undefined || obj === null );
//     return a;
// }

import { NextFunction, Request, Response } from 'express';
export const validationHandler = ( config ) => ( req: Request, res: Response, next: NextFunction  ) => {
    const errors = [];
    Object.keys(config).forEach((key) => {
        const i = 0;
        const keys = config[key];
        const locations = keys.in[i];
        let request = req[locations][key];
        const regex = keys.regex;
        if ((keys.required) && !(request)) {
            const err = {
                key: `${key}`,
                location: `${keys.in}`,
                errorMessage: `${keys.errorMessage || 'required'}`
            };
            errors.push(err);

        }
        if ((!keys.required) && !(request)) {
            return request = keys.default;
        }
        if (
            (((keys.number) && !(Number.isInteger(Number(request)))) ||
                ((keys.string) && !(typeof request === 'string')))
        ) {
            const err = {
                key: `${key}`,
                location: `${keys.in}`,
                errorMessage: `${keys.errorMessage || 'incorrect Type'}`
            };
            errors.push(err);
        }
        if ((keys.isObject) && !(typeof (request) === 'object')) {
            const err = {
                key: `${key}`,
                location: `${keys.in}`,
                errorMessage: `${keys.errorMessage || 'not an Object'}`
            };
            errors.push(err);
        }
        if ((regex) && (!regex.test(request))) {
            const err = {
                key: `${key}`,
                location: `${keys.in}`,
                errorMessage: `${request} is not valid`
            };
            errors.push(err);
        }
    });
    console.log('1----', errors);
    if (errors.length !== 0) {
        return res.status(400).send(errors);
    }
    next();
};

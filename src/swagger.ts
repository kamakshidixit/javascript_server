import *as swaggerdocs from 'swagger-jsdoc';
import swagger from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            openapi: '3.0.0',
            description: 'An express app performing CRUD operation after authentication',
            version: '1.0.0',
            title: 'first express app',
            properties: {
                email: 'sweta.sharma@successive.tech'
            },
            server: ['https://localhost:9001/']
        },
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'headers'
            }
        },
        components: {},
        basePath: '/api'
    },
    apis: ['dist/**/*.js']
};
export default swaggerdocs(swaggerOptions);

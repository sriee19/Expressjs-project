module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger API Documentation',
            version: '1.0.0',
            description: 'API for managing contacts in a contact manager application',
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    scheme: 'bearer',
                    in: 'header',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./routes/users.js', './routes/contacts.js'],
};

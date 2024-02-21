const express =  require(`express`);
const bodyParser = require(`body-parser`);
const swaggerUi = require(`swagger-ui-express`);
const swaggerJsdoc = require(`swagger-jsdoc`);

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

const options = {
    definition :{
        openapi: `3.0.0`,
        info: {
            title: `Swagger api Documentation`,
            version: `1.0.0`,
            description: `API for managing contacts in a contact manager application`,

        },
    },
    apis:["./routes/userRoutes.js","./routes/contactRoutes.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(`/users`,require(`./routes/users`));
app.use(`/contacts`, require(`./routes/contacts`));

app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`);

});

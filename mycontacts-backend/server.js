const express = require('express');
const errorHandler = require("../mycontacts-backend/middleware/errorHandler");
const connectDb = require("../mycontacts-backend/config/dbConnection");
const dotenv = require("dotenv").config();


connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("../mycontacts-backend/routes/contactRoutes") );
app.use("/api/user", require("../mycontacts-backend/routes/userRoutes") );
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

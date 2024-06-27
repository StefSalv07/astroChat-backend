const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();

// Basic Swagger definitions
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "A description of your API",
    },
    servers: [
      {
        url: "http://localhost:6000", // Replace with your server URL
      },
    ],
  },
  // Path to the API docs
  apis: ["./routes/*.js"], // Files containing annotations as above
};

const specs = swaggerJsdoc(options);

// Use Swagger UI with the generated swagger specs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Example route
app.get("/example", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:6000");
  console.log("Swagger docs available at http://localhost:6000/api-docs");
});

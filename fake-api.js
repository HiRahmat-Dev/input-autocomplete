const express = require("express");
const fs = require("fs");
const app = express();
const port = 666;

const rawCountries = fs.readFileSync("./country.json");
const countries = JSON.parse(rawCountries);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to fake api!");
});

app.get("/countries", (req, res) => {
  const { search } = req?.query ?? { search: "" };
  let data = [];
  if (search) {
    data = countries.filter(country =>
      country.name.toLowerCase().includes(`${search}`.toLowerCase())
    );
  } else data = countries;
  res.json(data);
});

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});

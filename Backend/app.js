const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database.js");
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
let bar = {
  "0-100": 0,
  "101-200": 0,
  "201-300": 0,
  "301-400": 0,
  "401-500": 0,
  "501-600": 0,
  "601-700": 0,
  "701-800": 0,
  "801-900": 0,
  "901+": 0,
};
function calcRange(price) {
  if (price >= 0 && price <= 100) {
    bar["0-100"] += 1;
  } else if (price >= 101 && price <= 200) {
    bar["101-200"] += 1;
  } else if (price >= 201 && price <= 300) {
    bar["201-300"] += 1;
  } else if (price >= 301 && price <= 400) {
    bar["301-400"] += 1;
  } else if (price >= 401 && price <= 500) {
    bar["401-500"] += 1;
  } else if (price >= 501 && price <= 600) {
    bar["501-600"] += 1;
  } else if (price >= 601 && price <= 700) {
    bar["601-700"] += 1;
  } else if (price >= 701 && price <= 800) {
    bar["701-800"] += 1;
  } else if (price >= 801 && price <= 900) {
    bar["801-900"] += 1;
  } else if (price >= 901) {
    bar["901+"] += 1;
  }
  return bar;
}

app.get("/alldata", async (req, res) => {
  let collection = await db.collection("analysis_data");
  let data = await collection.find().project({ _id: 0 });
  let pageN = req.query.page;
  let pageS = req.query.pageSize;
  let lastInd = pageN * pageS;
  let firstInd = lastInd - pageS;
  let response = [];
  for await (let key of data) {
    resjson = {};
    resjson.id = key.id;
    resjson.title = key.title;
    resjson.price = key.price;
    resjson.desc = key.description;
    resjson.category = key.category;
    resjson.imgUrl = key.image;
    resjson.sold = key.sold;
    resjson.datetime = key.dateOfSale;
    response.push(resjson);
  }
  res.json(response.slice(firstInd, lastInd));
});
app.get("/statistics/tsale", async (req, res) => {
  const { month } = req.query;
  let collection = await db.collection("analysis_data");
  let re = new RegExp(`-(${month}+)-`);
  let data = await collection
    .find({ dateOfSale: { $regex: re }, sold: true })
    .project({ price: 1, _id: 0 });

  let prices = [];
  for await (let dat of data) {
    prices.push(dat.price);
  }
  prices = prices.reduce((i, j) => {
    return i + j;
  });
  res.json({ TotalSaleAmt: prices });
});

app.get("/statistics/tsitems", async (req, res) => {
  const { month } = req.query;
  let collection = await db.collection("analysis_data");
  let re = new RegExp(`-(${month}+)-`);
  let data = await collection
    .find({ dateOfSale: { $regex: re }, sold: true })
    .project({ price: 1, _id: 0 });
  let count = 0;
  for await (let dat of data) {
    count++;
  }
  res.json({ totalNoOfItemsSold: count });
});
app.get("/statistics/tnsitems", async (req, res) => {
  const { month } = req.query;
  let collection = await db.collection("analysis_data");
  let re = new RegExp(`-(${month}+)-`);
  let data = await collection
    .find({ dateOfSale: { $regex: re }, sold: false })
    .project({ price: 1, _id: 0 });
  let count = 0;
  for await (let dat of data) {
    count++;
  }
  res.json({ totalNoOfItemsNotSold: count });
});

app.get("/bar", async (req, res) => {
  const { month } = req.query;
  for (let key in bar) {
    bar[key] = 0;
  }
  let collection = await db.collection("analysis_data");
  let re = new RegExp(`-(${month}+)-`);
  let data = await collection
    .find({ dateOfSale: { $regex: re } })
    .project({ price: 1, _id: 0 });

  for await (let dat of data) {
    calcRange(dat.price);
  }
  res.json({ barChart: bar });
});
app.get("/pie", async (req, res) => {
  const { month } = req.query;
  let collection = await db.collection("analysis_data");
  let re = new RegExp(`-(${month}+)-`);
  let data = await collection
    .find({ dateOfSale: { $regex: re } })
    .project({ category: 1, _id: 0 });
  let hashMap = {};
  for await (let key of data) {
    if (key.category in hashMap) {
      hashMap[key.category] += 1;
    } else {
      hashMap[key.category] = 1;
    }
  }
  res.json({ pieChartData: hashMap });
});

app.listen(PORT, () => {
  console.log("listening on port");
});

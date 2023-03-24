const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test-01",
});
connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  let sql;
  if (req.query.product) {
    sql = `SELECT * FROM products WHERE productID = ${req.query.product}`;
  } else {
    sql = `SELECT * FROM products`;
  }

  connection.query(sql, (error, products) => {
    const QuantitySum = products.reduce((accumulator, object) => {
      return accumulator + object.productQuantity;
    }, 0);
    console.log(QuantitySum);

    res.send({
      status: "success",
      QuantitySum,
      products: products,
    });
  });
});

app.post("/addProduct", (req, res) => {
  console.log(req.body.productPrice);
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productQuantity = req.body.productQuantity;
  let sql;

  sql = `INSERT INTO products (productName,productPrice,productQuantity) VALUES ('${productName}',${productPrice},${productQuantity})`;

  connection.query(
    sql,
    [productName, productPrice, productQuantity],
    (error, products) => {
      res.send({
        status: "success",
        products: products,
      });
    }
  );
});

app.delete("/deleteProduct/:productId", (req, res) => {
  const deleteProduct = req.params.productId;
  let sql;
  sql = "DELETE FROM products WHERE productId =?";

  connection.query(sql, deleteProduct, (error, products) => {
    res.send(products);
  });
});

app.listen(3030, console.log("Listening to 3030"));

const app = require("./app.js");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatabase = require("./config/database.js");
app.use(cors());

// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
//Config

dotenv.config({ path: "backend/config/config.env" });

//connecting database
connectDatabase();

const server = app.listen(4000, () => {
  console.log(`Server is working on port 4000 `);
});

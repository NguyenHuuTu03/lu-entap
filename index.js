const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const clientRouter = require("./routes/client/index.router");
const connectDatabase = require("./config/database");
const adminRouter = require("./routes/admin/index.router");
const systemConfig = require("./config/system");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');


connectDatabase.connect();
app.use(express.static(`${__dirname}/public`));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded());
app.use(cookieParser('keyboard cat'));
app.use(session({
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash());
app.locals.prefixAdmin = systemConfig.pathAdmin;
clientRouter(app);
adminRouter(app);



app.listen(port, () => {
  console.log(`Hãy truy cập vào linh: http://localhost:${port}`);
});
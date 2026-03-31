const dashboardRouter = require("./dashboard.router");
const systemConfig = require("../../config/system");
const productRouter = require("./product.router");

module.exports = (app) => {
  let path = systemConfig.pathAdmin;
  app.use(`${path}/dashboard`, dashboardRouter);
  app.use(`${path}/products`, productRouter);
}
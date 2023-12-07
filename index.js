const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const config = require("./config/config");
// const pgClient = require('./pg-config');

// create application/json parser
const jsonParser = bodyParser.json();
const { notfound } = require("./middlewares/notFound.middleware");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const purchasesRouter = require("./routes/purchase.routes");
const ratingRouter = require("./routes/rating.routes");
const userRouter = require("./routes/users.routes");
const itemRoutes = require("./routes/items.routes");
const cartRoutes = require("./routes/cart.routes");
const favsRoutes = require("./routes/favs.routes");
app.use(jsonParser);
app.use(urlencodedParser);

// app.post('/save-user', async function (req, res) {
//     const usersCreate = await models.users.create({
//         name: req.body.name
//     });

//     res.json({
//         usersCreate
//     });
// });

// app.patch('/update-user', async function (req, res) {
//     const usersUpdate = await models.users.update({
//         name: req.body.name
//     }, {
//         where: {
//             uuid: req.body.userid
//         },
//         returning: true
//     });

//     res.json({
//         usersUpdate
//     });
// });

// app.get('/', async function (req, res) {
//     try {
//         const usersFind = await models.users.findAndCountAll({
//             attributes: ['name'],
//             where: {
//                 name: {
//                     [Op.iLike]: `%${req.query.name}`
//                 }
//             },
//             logging: true,
//             include: [
//                 {
//                     model: models.posts,
//                     as: 'posts',
//                     required: false,
//                     where: {
//                         content: {
//                             [Op.not]: null
//                         }
//                     }
//                 }
//             ]
//         });
//         return res.json({
//             usersFind
//         });

//     } catch (error) {
//         console.log('\n error...', error);
//         return res.send(error);
//     }
// });
app.use("/", userRouter);
app.use("/", itemRoutes);
app.use("/", ratingRouter);
app.use("/", cartRoutes);
app.use("/", purchasesRouter);
app.use("/", favsRoutes);
app.use(notfound);
app.use(errorHandler);
app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}/`);
});

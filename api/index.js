//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {getDiet}=require('./src/controllers/callApi')

const PORT = process.env.PORT || 3001;


// Syncing all the models at once.
conn.sync({ force: true}).then(() => {
<<<<<<< HEAD
  server.listen(3001, () => {
=======
  server.listen(process.env.PORT , () => {
>>>>>>> 12e2762982d42e0d61db85ca5994adc503efea39
    getDiet();
    console.log('%s listening at 3001'); // eslint-disable-line no-console

  });
});



// Asynchronous
const crypto = require('crypto').randomBytes(256).toString('hex');
module.exports = {
   // uri: 'mongodb://localhost:27017/mean-angular-2',
    uri: 'mongodb://pauwinho:_Pauwinho_@ds157233.mlab.com:57233/angular-2-app',
    secret:crypto,
    db:'angular-2-app'
};
const crypto = require('crypto')
 
function md5(secret){
    return crypto.createHmac('sha256', secret).update('I love cupcakes').digest('hex');
}

const pwd='123456'
console.log(md5(md5(pwd).substr(7,11)+md5(pwd)));

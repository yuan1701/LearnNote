//读cookies
var obj={};
document.cookie.split('; ').forEach(d=> obj[d.split('=')[0]]=d.split('=')[1])
console.log(obj);

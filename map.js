const {readFileSync} = require('fs')
let ph = ()=>{
let cities = JSON.parse(readFileSync('cities.json'));
return cities


}
console.log(ph)

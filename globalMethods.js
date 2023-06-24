module.exports.commandParse = function(str){
    return str.split('map ')[1];
}

/*
if(.includes(map))
    split 'map'
elif(.includes(weapon))
    split 'weapon'
etc.
*/

// fs.writeFile('response.json', JSON.stringify(response.data), function (err) {
//     console.log(err);
// });

// export function secondFun() {
//     console.log('second function called!!')
// }
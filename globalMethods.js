module.exports.commandParse = function(str){
    if(str.includes('%u map'))
        return str.split('map ')[1];
    else if(str.includes('%u stats'))
        return str.split('stats ')[1];
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
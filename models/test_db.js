'use strict';

const Album = require("./albums");

// Album.find({'title':'Nao Para Nao'}, (err, items) => {
//   if (err) return next(err);
//   console.log("find ==>");
//   console.log(items);
//   // other code here
// }); 


Album.find({'title':'111'}, (err, items) => {
    if (err) return next(err);
    console.log(items);
    // other code here
   });
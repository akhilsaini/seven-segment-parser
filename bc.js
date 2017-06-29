let siege = require('siege');
var async = require('async');

// function basicLoad() {
// 	siege().on(8081).for(10).times.get('/api/service/marco-polo?from=1&to=28').attack();
// }

//basicLoad();

// function defaultLoad() {
// 	siege().on(8081).for(10).times.get('/api/service/marco-polo').attack();
// }

// defaultLoad();

// function basicLoad() {
// 	siege().on(8081).for(10).times.get('/api/service/marco-polo?from=1&to=1000000').attack();
// }


async.series([
                function (callback) {
                    try {
                        siege().on(8081).for(10).times.get('/api/service/marco-polo?from=1&to=28').attack();
                        callback(null);
                    } catch (err) {
                    	console.log('in err : ',err);
                        callback(err);
                    }
                }
            ],
            function (err, results) {
                if (err) {
                    console.log('err : ',err);
                    return;
                }

                console.log('results : ',results);
            });
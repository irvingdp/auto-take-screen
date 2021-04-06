const main = require('./main');
const schedule = require('node-schedule');

//  */1 * * * *  //every 1 minute
//  01 * * * *   //every hour at 1 minutes
schedule.scheduleJob('*/1 * * * *', async function(){ //every hours run one time
    console.log("start sync ngrok");
    main();
    console.log("complete sync ngrok");
});


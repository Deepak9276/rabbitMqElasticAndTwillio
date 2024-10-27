// const createClient  = require('ioredis');

// var client = new createClient()

// exports.saveDataInRedis  =  async(key, data) => {
//     console.log(key," data", data);
//     await client.set(key, data);
//     //await client.disconnect();
// }
// exports.getDataFromRedis = async (key) => {
//     return await client.get(key);
// }

// const Redis = require('ioredis');

// async function ioredisDemo() {
//   try {
//     const client = new Redis();

//     await client.set('mykey', 'Hello from io-redis!');
//     const myKeyValue = await client.get('mykey');
//     console.log(myKeyValue);

//     const numAdded = await client.zadd('vehicles', 4, 'car', 2, 'bike');
//     console.log(`Added ${numAdded} items.`);

//     const stream = client.zscanStream('vehicles');

//     stream.on('data', (items) => {
//       // items = array of value, score, value, score...
//       for (let n = 0; n < items.length; n += 2) {
//         console.log(`${items[n]} -> ${items[n + 1]}`);
//       }
//     });

//     stream.on('end', async () => {
//       await client.quit();
//     });
//   } catch (e) {
//     console.error(e);
//   }
// }

// ioredisDemo();

/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/



const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

// Add data to levelDB with key/value pair
function addLevelDBData(key,value) {
    
    return new Promise(function(resolve,reject){
        
         db.put(key, value, function(err) {
    if (err) {reject(err);
    }
             resolve(key);
             
   //console.log('Block ' + key + ' submission failed', err);
           
    });
    
 
  });
}

// Get data from levelDB with key
 exports.func2= function getLevelDBData(key){
    
return new Promise(function(resolve,reject){
        
           
  db.get(key, function(err, value) {
    if (err) {reject(err);}
    resolve(value); 
 
    
  });
     
    });
 
}

// Add data to levelDB with value
exports.func3= function addDataToLevelDB(value){
  let i = 0;
    return new Promise(function(resolve,reject){
        
    db.createReadStream().on('data', function(data) {
          i++;
        }).on('error', function(err) {
           // return console.log('Unable to read data stream!', err)
           reject(err);
        }).on('close', function() {
          addLevelDBData(i, value).then(function(returnedKey){
            resolve(returnedKey+1);
          
          });
        
        });
});
           
}

//get Block by hash
exports.func4= function getBlockByHsah(hash){
    let Block=null;
    let returnedBlock=null;
    return new Promise(function(resolve,reject){
        
    db.createReadStream().on('data', function(data) {
      
      Block=JSON.parse(data.value)
      if(Block.hash==hash){
        
       returnedBlock=Block;


      }
      
          
        }).on('error', function(err) {

           
           reject(err);
        }).on('close', function() {
            resolve(returnedBlock);
        
        });
});
           
}


exports.func5= function getBlockByAddress(address){
  let Block=null;
  let returnedBlock=[];
  return new Promise(function(resolve,reject){
      
  db.createReadStream().on('data', function(data) {
    
    Block=JSON.parse(data.value);
    console.log("This Block"+Block);
    if(Block.body.address==address){
      
     returnedBlock.push(Block);

    }

    
        
      }).on('error', function(err) {
         reject(err);
      }).on('close', function() {
          resolve(returnedBlock);
      
      });
});
         
}

exports.func6= function getBlockByHsah(height){
  let Block=null;
  let returnedBlock=null;
  return new Promise(function(resolve,reject){
      
  db.createReadStream().on('data', function(data) {
    
    Block=JSON.parse(data.value)
    if(Block.height==height){
      
     returnedBlock=Block;


    }
    
        
      }).on('error', function(err) {

         
         reject(err);
      }).on('close', function() {
          resolve(returnedBlock);
      
      });
});
         
}




/* ===== Testing ==============================================================|
|  - Self-invoking function to add blocks to chain                             |
|  - Learn more:                                                               |
|   https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/  |
|                                                                              |
|  * 100 Milliseconds loop = 36,000 blocks per hour                            |
|     (13.89 hours for 500,000 blocks)                                         |
|    Bitcoin blockchain adds 8640 blocks per day                               |
|     ( new block every 10 minutes )                                           |
|  ===========================================================================*/


//(function theLoop (i) {
  //setTimeout(function () {
    //addDataToLevelDB('Testing data');
    //if (--i) theLoop(i);
  //}, 100);
//})(10);

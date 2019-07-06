/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/




/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/
 let chainH=0;
 let PostedBlock="";
 let previousB="";
 const SHA256 = require('crypto-js/sha256');
 const LEVELSANDBOX= require('./levelSandbox.js');
 const BlockClass = require('./Block.js');
 const BlockAPI=require('./BlockAPI.js');
 const Request=require('./requestObject.js');
 



class Blockchain{
  constructor(){
    
   
    this.addBlock(new BlockClass.Block("First block in the chain - Genesis block")); 
    this.mempool = [];
    this.mempoolValid=[];
    this.timeoutRequests = [];
    
   

    
  }
  // Add new block
  async addBlock(newBlock){
    // Block height
      newBlock.height =chainH;
  
      // UTC timestamp
      newBlock.time = new Date().getTime().toString().slice(0,-3);


      // previous block hash
      if(chainH>0){
       
        previousB=await this.getBlock(chainH-1);
       newBlock.previousBlockHash =previousB.hash; 
      
      }
  
      // Block hash with SHA256 using newBlock and converting to a string
         // Adding block object to chain
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
         newBlock=JSON.stringify(newBlock);
         chainH=await LEVELSANDBOX.func3(newBlock) 
         return chainH;
       
  }

  // Get block height
    getBlockHeight(){

     // return this.chain.length-1;
     return chainH;
    }

    // get block
   async getBlock(blockHeight){


      // return object as a single string
       let returendBlock= await LEVELSANDBOX.func2(blockHeight);
       return  JSON.parse(returendBlock); 
    }
      
      // add request to mempool
     addRequest(newRequest){
     
      newRequest.requestTimeStamp=new Date().getTime().toString().slice(0,-3);
      newRequest.message= newRequest.walletAddress+":"+newRequest.requestTimeStamp+":"+"starRegistry";
      const TimeoutRequestsWindowTime =5*60*1000;
      let timeElapse = (new Date().getTime().toString().slice(0,-3)) - newRequest.requestTimeStamp;
      let timeLeft = (TimeoutRequestsWindowTime/1000) - timeElapse;
      newRequest.validationWindow =timeLeft;
      this.mempool.push(newRequest);

     
    }
    //validate Request
    checkRequest(address){
      this.updateValidationWindow();
      for(var i=0;i<this.mempool.length;i++){

        

        if(address==this.mempool[i].walletAddress){
          return  true;
          
        }
          return false;
  
      }

    }

    getRequest(requestedaddress){
    
      for(var i=0;i<this.mempool.length;i++){
        if(requestedaddress==this.mempool[i].walletAddress){
          return this.mempool[i];
        }

  
      }

    }

    updateValidationWindow(){
     
      for(var i=0;i<this.mempool.length;i++){
        const TimeoutRequestsWindowTime = 5*60*1000;
        let timeElapse = (new Date().getTime().toString().slice(0,-3)) - this.mempool[i].requestTimeStamp;
        let timeLeft = (TimeoutRequestsWindowTime/1000) - timeElapse;
        if(timeLeft<0){

          this.mempool.splice(i,1);
        }

        else{
       
          this.mempool[i].validationWindow=timeLeft;

        }

      

      }


    }

    
      // add valid request to mempoolValid
      addValidRequest(newValidRequest){

        newValidRequest.registerStar="true";
        newValidRequest.status.messageSignature="true";
          this.mempoolValid.push(newValidRequest);
        
    
         
          
        }

   
    validateRequest(requestedaddress){
      
      this.updateValidationWindow();
      for(var i=0;i<this.mempoolValid.length;i++){

        if(requestedaddress==this.mempoolValid[i].status.address){
          return  true;
          
        }
        else{return false;}
          
  
      }

    }


    getValidRequest(requestedaddress){
     
      for(var i=0;i<this.mempoolValid.length;i++){
        if(requestedaddress==this.mempoolValid[i].status.address){
          return this.mempoolValid[i];
        }

  
      }

     
    }


   



}

//let blockchain=new Blockchain();
module.exports.Blockchain= Blockchain;
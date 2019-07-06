//Importing Express.js module
const express = require("express");
//Importing BodyParser.js module
const bodyParser = require("body-parser");
const bitcoinMessage = require('bitcoinjs-message');
const Blockchain=require('./apps.js');
const Request=require('./requestObject.js');
const validRequest=require('./validRequest.js');
const status=require('./status.js');
const Star=require('./Star.js');
const BlockBody=require('./BlockBody.js');
const LEVELSANDBOX= require('./levelSandbox.js');
const StarStoryDecoded =require('./StarStoryDecoded.js');

let blockchain="";
let isValid="";


/**
 * Class Definition for the REST API
 */
class BlockAPI {

    /**
     * Constructor that allows initialize the class 
     */
    constructor() {
	 
		this.app = express();
		this.initExpress();
		this.initExpressMiddleWare();
    //	this.initControllers();
		this.start();
		this.getBlockByIndex();
		this.postNewBlock();
		this.postNewRequest();
		this.postValidatedReuest();
		this.getBlockByHash();
		this.getBlockByAddress();
		
	}

    /**
     * Initilization of the Express framework
     */
	initExpress() {
		this.app.set("port", 8000);
	}

    /**
     * Initialization of the middleware modules
     */
	initExpressMiddleWare() {
		this.app.use(bodyParser.urlencoded({extended:true}));
		this.app.use(bodyParser.json());
	}

    /**
     * Initilization of all the controllers
     */
	//initControllers() {
	//	require("./BlockController.js")(this.app);
	//}

    /**
     * Starting the REST Api application
     */
	start() {
		let self = this;
		this.app.listen(this.app.get("port"), () => {
			console.log(`Server Listening for port: ${self.app.get("port")}`);
		});

     blockchain=	new Blockchain.Blockchain();
	}


	 //GET Response
	 getBlockByIndex() {


		this.app.get("/block/:index", async (req, res) =>  {


			if (req.params.index === "" || req.params.index === undefined) {
				return res.status(400).send("Please add data");
			 }
			 else{


				let getAPIblock= await blockchain.getBlock(req.params.index).catch(function(err){

					res.status(400).send("Block Does not exist");

				 });
				res.send(getAPIblock);  

			 }

				
			 
	 });

}



	 //GET The Block by Hash value
	async getBlockByHash() {


		this.app.get("/stars/hash/:hash", async (req, res) =>  {

      let decodedBlock="";
			if (req.params.hash=== "" || req.params.hash === undefined) {
				return res.status(400).send("Please add hash");
			 }
			 else{


				let getAPIblock= await LEVELSANDBOX.func4(req.params.hash).catch(function(err){
				
					res.status(400).send("err");

				 });

				 if(getAPIblock==null){

					res.status(400).send("Block does not exist");
				 }
				 else{
				 let currentDecodedStar=new StarStoryDecoded.StarStoryDecoded(getAPIblock.body.star.dec,getAPIblock.body.star.ra,getAPIblock.body.star.story);
					let currentBody=new BlockBody.BlockBody(getAPIblock.body.address,currentDecodedStar);
					decodedBlock=new BlockClass.Block(currentBody);
					decodedBlock.hash=getAPIblock.hash;
					decodedBlock.height=getAPIblock.height;
					decodedBlock.time=getAPIblock.time;
					decodedBlock.previousBlockHash=getAPIblock.previousBlockHash;

				res.send(decodedBlock);  
				 }

			 }

				
			 
	 });

}



 //GET The Block by Address
 async getBlockByAddress() {


	this.app.get("/address/:address", async (req, res) =>  {

		let decodedBlock="";
		let decodedBlockArray=[];
		if (req.params.address=== "" || req.params.address === undefined) {
			return res.status(400).send("Please add address");
		 }
		 

			let getAPIblock= await LEVELSANDBOX.func5(req.params.address).catch(function(err){

				res.status(400).send(err);
			 });

			 if(getAPIblock.length==0){

				res.status(400).send("block does not exist");
			 }
			 else{
			 let APIBlock=JSON.stringify(getAPIblock);
			 console.log("ARRAY: "+getAPIblock);
			 console.log("ARRAY1: "+APIBlock);
			 console.log("star: "+ getAPIblock[0].body.star.dec);

			
			

			 for(var i=0;i<getAPIblock.length;i++){
			  let currentDecodedStar=new StarStoryDecoded.StarStoryDecoded(getAPIblock[i].body.star.dec,getAPIblock[i].body.star.ra,getAPIblock[i].body.star.story)
				let currentBody=new BlockBody.BlockBody(getAPIblock[i].body.address,currentDecodedStar);
				decodedBlock=new BlockClass.Block(currentBody);
				decodedBlock.hash=getAPIblock[i].hash;
				decodedBlock.height=getAPIblock[i].height;
				decodedBlock.time=getAPIblock[i].time;
				decodedBlock.previousBlockHash=getAPIblock[i].previousBlockHash;
				decodedBlockArray.push(decodedBlock);
			
			 }
			res.send(decodedBlockArray);  
			}
		 

			
		 
 });

}


	 //GET The Block by Height
	 async getBlockByHeight() {


		this.app.get("/block/:height", async (req, res) =>  {

      let decodedBlock="";
			if (req.params.height=== "" || req.params.height === undefined) {
				return res.status(400).send("Please add height");
			 }
			 else{


				let getAPIblock= await LEVELSANDBOX.func6(req.params.height).catch(function(err){
				
					res.status(400).send("err");

				 });

				 if(getAPIblock==null){

					res.status(400).send("Block does not exist");
				 }
				 else{
				 let currentDecodedStar=new StarStoryDecoded.StarStoryDecoded(getAPIblock.body.star.dec,getAPIblock.body.star.ra,getAPIblock.body.star.story);
					let currentBody=new BlockBody.BlockBody(getAPIblock.body.address,currentDecodedStar);
					decodedBlock=new BlockClass.Block(currentBody);
					decodedBlock.hash=getAPIblock.hash;
					decodedBlock.height=getAPIblock.height;
					decodedBlock.time=getAPIblock.time;
					decodedBlock.previousBlockHash=getAPIblock.previousBlockHash;

				res.send(decodedBlock);  
				 }

			 }

				
			 
	 });

}




   //POST response
	 postNewBlock() {
  
		this.app.post("/block",async (req, res) => {
				
	 
	   
			
			if ((req.body.address === "" || req.body.address === undefined) && 
			(req.body.star.dec === "" || req.body.star.dec=== undefined) &&
			(req.body.star.ra === "" || req.body.star.ra=== undefined) &&
			(req.body.star.story === "" || req.star.story=== undefined) ) {
			 return res.status(400).send("Missing Address or star information");
			}

				else{
					let ValidRequestFlag=blockchain.validateRequest(req.body.address);
				if(ValidRequestFlag==false){

					return res.status(400).send("Address is not validated");

				}
				 else {

				try{ 
					req.body.star.story= new Buffer(req.body.star.story).toString('hex');
				let currentStar=new Star.Star(req.body.star.dec,req.body.star.ra,req.body.star.story);
				let currentBody=new BlockBody.BlockBody(req.body.address,currentStar);
				let blockpost=await blockchain.addBlock(new BlockClass.Block(currentBody));
					PostedBlock= await blockchain.getBlock(blockpost-1);
					res.send(PostedBlock);
				}
				catch(err){


				 console.log(err);
				}
			
				}
			}
		 
		});

	}

    //Post Response	
		postNewRequest() {

			this.app.post("/requestValidation",async (req, res) => {
				
				if (req.body.address === "" || req.body.address === undefined) {
				 return res.status(400).send("Please add address");
				}
	
				else{
	
				try{ 
				let requstFlag=	blockchain.checkRequest(req.body.address)
	
				if(requstFlag==true){
	
				let	RequestedAddress=blockchain.getRequest(req.body.address);
					
					res.send(RequestedAddress);
	
	
				}
	
				else {
	
				blockchain.addRequest(new Request.requestObject(req.body.address));
					
				let RequestedAddress=blockchain.getRequest(req.body.address);
					
				 res.send(RequestedAddress);
				
	
				}
			}
				catch(err){
				 console.log(err);
				}
			
				}
				 
		 
		});
	
	
	}	


 //Post validated Request
	postValidatedReuest() {

		this.app.post("/message-signature/validate",async (req, res) => {
		

			if ((req.body.address === "" || req.body.address === undefined) && 
			(req.body.signature === "" || req.body.signature === undefined) ) {
			 return res.status(400).send("Missing Address or Signature information");
			}

			else{

			try{ 
			let requstFlag=	blockchain.validateRequest(req.body.address)

			if(requstFlag==true){

			let	RequestedValidAddress=blockchain.getValidRequest(req.body.address);
				isValid = bitcoinMessage.verify(RequestedValidAddress.status.message,req.body.address,req.body.signature);
				if(isValid==false){
				
				return res.status(400).send("Address and signture dont match");
			
			 } 
			 
			 else

				res.send(RequestedValidAddress);


			}
			

		//	else  if(isValid==false){
				
		//		return res.status(400).send("Address and signture dont match");} 
			
			else {
			let RequestedAddress=blockchain.getRequest(req.body.address);
			isValid = bitcoinMessage.verify(RequestedAddress.message,req.body.address,req.body.signature);
				if(isValid==false){
				
				return res.status(400).send("Address and signture dont match");
			
			 } 

			 else{
			let statusObject=new status.status(RequestedAddress.walletAddress,RequestedAddress.requestTimeStamp,RequestedAddress.message,RequestedAddress.validationWindow,req.body.signature)
			blockchain.addValidRequest(new validRequest.validRequest(statusObject));
			let	RequestedValidAddress=blockchain.getValidRequest(req.body.address);
			res.send(RequestedValidAddress);
			 }
			

			}
		}
			catch(err){
			 console.log(err);
			}
		
			}
			 
	 
	});


}	
















}
		


 
    







new BlockAPI();

module.exports.BlockAPI = BlockAPI;

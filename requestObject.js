/* ===== Request Class ==============================
|  Class with a constructor for Request 			   |
|  ===============================================*/


class requestObject{
	constructor(address){
  
    this.walletAddress = address;
    this.requestTimeStamp = "";
    this.message= ""; 
    this.validationWindow=0;
    }
}

module.exports.requestObject = requestObject;
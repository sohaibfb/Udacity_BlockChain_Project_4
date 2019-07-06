/* ===== Request Class ==============================
|  Class with a constructor for valid request			   |
|  ===============================================*/



class status{
	constructor(Address,requestTimeStamp,message,validationWindow,messageSignature){
  
    this.address =Address;
    this.requestTimeStamp=requestTimeStamp;
    this.message=message; 
    this.validationWindow=validationWindow;
    this.messageSignature=messageSignature;
    }
}

module.exports.status = status;
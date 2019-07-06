/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/
const hex2ascii = require('hex2ascii')

class StarStoryDecoded{
	constructor(dec,ra,story){
     this.dec =dec;
     this.ra =ra;
     this.story = story;
     this.storyDecoded=hex2ascii(this.story);
   
    }
}

module.exports.StarStoryDecoded = StarStoryDecoded;
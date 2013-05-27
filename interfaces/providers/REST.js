var request=require('request');
var Rest=function(config){
	this.config=config;
}
Rest.prototype.get=function(url, callback){
	if(this.config!=null){

	}
	else{
		request(url, callback);
	}
}
module.exports=Rest;
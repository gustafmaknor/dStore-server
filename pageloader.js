var jade=require('jade');
var fs=require('fs');


var basePage=function(context){
	this.context=context;

}
basePage.prototype={
		render:function(){
			this.context.response.end(this.content);
		},
		write:function(content){
			if(this.content){
				this.content+=content;
			}
			else{
				this.content=content
			}
		},
		context:null,
		content:null,
		loaded:false
}


module.exports=function(context, path){
	var pageCore=require(path+".js");
	var template;
	var p=function(ctx){
		basePage.call(this, ctx);
	}
	p.prototype=Object.create(basePage.prototype, pageCore);
	var page=new p(context);
	//Load pageObject if nessisary
	if(page.init){
		page.init();
	}
	//load template and compile output
	//Kanske behövs här en closure för att få med jade och pageObject?
	fs.readFile(path+".html", (function(page){
		return function(err, data){
			if(!err){
				console.log("Creating template");
				var fn=jade.compile(data, {pretty:true});
				page.write(fn(page.locals));
				page.loaded=true;
				page.render();
			}
			else{
				console.log("unable to load template "+fileName);
			}	
		}
	})(page))
	return page;

}

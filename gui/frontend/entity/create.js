module.exports={
		locals:{
			value:{
					name:'gustaf',
					title:'DataBridge',
					enteties:null
				}
		},
		init:{
			value:function(){
				this.locals.enteties=["hej", "tjenare"];
				console.log("kör init");
			}
		}
}
var AWS = require('aws-sdk');
var Content=require('./Content/node.js');
var Rest=require('./interfaces/providers/REST.js');
var url=require('url');
var fs=require('fs');
var pageLoader=require('./pageloader.js');


/*request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
})*/


/*var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
	var R=new Rest(null);
	R.get('http://www.bluerange.se', function(error, response, body){
		res.end(body);
	})  
  //res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
*/

//Server part
var http = require('http');
http.createServer(function (req, res) {
  //res.writeHead(200, {'Content-Type': 'text/html'});
  //Create context for request
  var context=new Context(req, res);
  app.route(context);  
  //res.end('Hello World\n');
}).listen(1336, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1336/');


//Current request context
var Context=function(req, res){
	this.request=req;
	this.response=res;
	this.url=url.parse(req.url, true, true);
}
Context.prototype.getUrlPathPart=function(index){
	return this.url.pathname.split('/')[index];
}
Context.prototype.getUrlPathParts=function(start){
	return this.url.pathname.split('/').slice(start);
}


//The application
var app={
	mimeTypes:{
		'html':'text/html',
		'js':'application/javascript',
		'css':'text/css'
	},
	routingRules:{
		defaultRoute:function(context){
			context.response.end(context.getUrlPathPart(1));
		},
		routes:{
			'gui':{part:1, route:function(context){
					app.serveDynamic(context);
				}
			},
			'static':{part:1, route:function(context){
					app.serveStatic(context);
				}
			}
		}
	},
	serveData:function(context){

	},
	serveDynamic:function(context){
		var resInfo=app.getReponseInfo(context);
		context.response.writeHead(200, {'Content-Type': resInfo.mime});
		pageLoader(context, "./gui/frontend/"+resInfo.path);

	},
	serveStatic:function(context){
		var resInfo=app.getReponseInfo(context);
		context.response.writeHead(200, {'Content-Type': resInfo.mime});
		fs.readFile("./gui/static/"+resInfo.path, (function(context){
			return function(err, data){
				if(err){
					context.response.end("Unable to serve file "+path);	
				}
				else{
					context.response.end(data);
				}
			}
		})(context))
	},
	getReponseInfo:function(context){
		var p=context.getUrlPathParts(2).join('/');
		var m=app.mimeTypes[p.substring(p.lastIndexOf('.')+1)];
		return {mime:m, path:p};
	},
	route:function(context){		
		//Set routefunction
		var fn=app.routingRules.defaultRoute;
		var counter=1;
		for(var routeDefinition in app.routingRules.routes){
			if(routeDefinition==context.getUrlPathPart(counter)){
				fn=app.routingRules.routes[routeDefinition].route;
				break;
			}
		}
		fn(context);
	},
	
}

AWS.config.loadFromPath('./config.json');






var s3 = new AWS.S3();

/*s3.createBucket({Bucket: 'hoxen.test2'}, function() {
  var params = {Bucket: 'hoxen.test2', Key: 'myKey', Body: 'Hello!'};
  s3.putObject(params, function(err, data) {
    if (err)
      console.log(err)
    else
      console.log("Successfully uploaded data to myBucket/myKey");
  });
});*/

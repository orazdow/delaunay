
function Node(x, y){

	this.x = x;
	this.y = y;
	this.label = ++labels;

this.connect = function(node){   
edges.add(this, node);
}

this.disconnect = function(node){  
edges.remove(this, node);
}

this.getEdge = function(node){
return edges.get(this, node);	
}	
	
}


function Triangle(nodea, nodeb, nodec){
	this.a = nodea;
	this.b = nodeb;
	this.c = nodec;	

this.updateCenter = function(){
	var circ = circumCenter2(this);
	this.centerX = circ[0];
	this.centerY = circ[1];
	this.centerRad = circ[2];	
}
    this.updateCenter();

this.hasEdge = function(a, b){
	var rtn = false;	
	if(this.a === a || this.b === a || this.c === a){
		if(this.a === b || this.b === b || this.c === b){
			rtn = true;
		}
	}	return rtn;
}

this.getOppositePoint = function(a, b){
	if(this.a !== a && this.a !== b){
		return this.a;
	}
    else if(this.b !== a && this.b !== b){
		return this.b;
	}
	else if(this.c !== a && this.c !== b){
		return this.c;
	}
	else{ return null; }		
}

}



function EdgeTable(){

this.edges = {};

this.add = function(a, b){
 var key =  a.label <= b.label ? a.label+' '+b.label : b.label+' '+a.label;
 this.edges[key] = {a: a, b: b};
}

this.get = function(a, b){
 var key =  a.label <= b.label ? a.label+' '+b.label : b.label+' '+a.label;	
 return this.edges[key];
}

this.remove = function(a, b){
 var key =  a.label <= b.label ? a.label+' '+b.label : b.label+' '+a.label;
 delete this.edges[key];	
}

this.at = function(index){
 return this.edges[Object.keys(this.edges)[index]];	
}

this.length = function(){ 
 return Object.keys(this.edges).length;
}


}



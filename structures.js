
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
	this.boundary = false;
	var circ = circumCenter(this);
	this.center = {x: circ[0], y: circ[1], r: circ[2]};	

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

}

function edge_hashkey(a,b){
	return a > b ? a+'_'+b : b+'_'+a;
}

//can lookup triangles or pairs by edge
function TriangleTable(){
	this.triangles = {};
	this.edgetriangles = {};

	//hashes triangle and edges
	this.add = function(t){
		var key = t.a.label+'_'+t.b.label+'_'+t.c.label;   
		this.triangles[key] = t;

		var edgekeys = [
			edge_hashkey(t.a.label,t.b.label),
			edge_hashkey(t.b.label,t.c.label),
			edge_hashkey(t.c.label,t.a.label)
		];
	 
		for(var i = 0; i < edgekeys.length; i++){
			if(this.edgetriangles[edgekeys[i]] === undefined)
				this.edgetriangles[edgekeys[i]] = []; 	
		}
		for(var i = 0; i < edgekeys.length; i++){
		  	if(this.edgetriangles[edgekeys[i]].length < 2)
		  		this.edgetriangles[edgekeys[i]].push(t);
		}
	  
	}

	//returns triangle 
	this.get = function(t){
		var key = t.a.label+'_'+t.b.label+'_'+t.c.label;   
	 	return this.triangles[key];
	}

	// returns array
	this.getAtEdge = function(a, b){
	     return this.edgetriangles[edge_hashkey(a.label,b.label)];
	}

	//returns neighbor opposite ab   
	this.getNeighbor = function(t, a, b){
		var key = edge_hashkey(a.label,b.label)
		var a = this.edgetriangles[key];
		for (var i = a.length-1; i >= 0; i--) {
			if(a[i] !== t){
				return a[i];
			}
		}
	}

	//unhashes triangle
	this.remove = function(t){
		var key = t.a.label+'_'+t.b.label+'_'+t.c.label;   
		delete this.triangles[key];  

		var edgekeys = [
			edge_hashkey(t.a.label,t.b.label),
			edge_hashkey(t.b.label,t.c.label),
			edge_hashkey(t.c.label,t.a.label)
		];

		for (var i = 0; i < edgekeys.length; i++) {
			if(this.edgetriangles[edgekeys[i]])	
				for (var j = this.edgetriangles[edgekeys[i]].length; j >= 0; j--){
					if(this.edgetriangles[edgekeys[i]][j] === t){ 
						this.edgetriangles[edgekeys[i]].splice(j, 1); break;}	 
				}
		}
	}


}

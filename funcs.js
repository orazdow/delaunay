function addVertices(args){
var triangle = false;
if(arguments.length % 2 != 0){
   if(arguments.length == 7 && arguments[6] === 'TRIANGLE'){
    triangle = true;
   }else{
   	 return;
   }	
}

var n;

for (var i = 0; i < arguments.length-1; i+=2) { 
	n = new Node(arguments[i], arguments[i+1]);
	nodes.push(n); 
}
if(triangle){
 nodes[nodes.length-3].connect(nodes[nodes.length-2]);
 nodes[nodes.length-2].connect(nodes[nodes.length-1]);
 nodes[nodes.length-1].connect(nodes[nodes.length-3]);
 n = new Triangle(nodes[nodes.length-1], nodes[nodes.length-2], nodes[nodes.length-3]);
 triangles.push(n);
 }
 //returns last vertex in args list (meant for 1) or triangle obj
 return n;

}

function add_split(x, y){
	var t = null;
    var n = addVertices(x, y);
    var index = null;
    for (var i = triangles.length-1; i >= 0; i--) {
    	 if(isInTriangle(n, triangles[i])){
    	 	t = triangles[i]; index = i; break;
    	 }
    } 
    if(t){ 

	n.connect(t.a);
	n.connect(t.b);
	n.connect(t.c);

	var a = t.a; 
	var b = t.b; 
	var c = t.c;

    if(index > 0){ //dont delete supertriangle
	triangles.splice(index, 1); 
    }

	var ta = new Triangle(n, a, b);
	var tb = new Triangle(n, b, c);
	var tc = new Triangle(n, a, c);

	 triangles.push(ta);
	 triangles.push(tb);
	 triangles.push(tc);

   	 check(ta, a, b);
 	 check(tb, b, c);
	 check(tc, a, c);
    }
}



function check(triA, a, b){
var triB;
var d;
var p = triA.getOppositePoint(a, b);

	for (var i = triangles.length-1; i > 0; i--) {
		if(triangles[i].hasEdge(a, b) && triangles[i] !== triA){
			triB = triangles[i];
			 break;
		}  
	} 
	if(triB === undefined){return;}

	d = triB.getOppositePoint(a, b); 
   
	if(isDelaunay(triA, d)){ return; } 


  	for (var i = triangles.length; i >= 0; i--){
		if(triA === triangles[i]){ 
			triangles.splice(i, 1);  
			break;
		}
	}
	for (var i = triangles.length; i >= 0; i--){
		if(triB === triangles[i]){ 
			triangles.splice(i, 1); 
			break;
		}
	}	
     
	 var t1 = new Triangle(p, a, d);
	 var t2 = new Triangle(p, b, d);
	 triangles.push(t1);
	 triangles.push(t2);

	 	a.disconnect(b);
	 	p.connect(d);

	 	check(t1, a, d);
	 	check(t2, b, d);
    
}


function isInTriangle(point, triangle){
//from: http://totologic.blogspot.fr/2014/01/accurate-point-in-triangle-test.html
var a, b, c, x, y, x1, x2, x3, y1, y2, y3;

x = point.x;
y = point.y;
x1 = triangle.a.x; 
x2 = triangle.b.x; 
x3 = triangle.c.x;
y1 = triangle.a.y; 
y2 = triangle.b.y; 
y3 = triangle.c.y;

a = ((y2 - y3)*(x - x3) + (x3 - x2)*(y - y3)) / ((y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3));
b = ((y3 - y1)*(x - x3) + (x1 - x3)*(y - y3)) / ((y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3));
c = 1 - a - b;

return ( (0 <= a && a <= 1) && (0 <= b && b <= 1) && (0 <= c && c <= 1) );

}


function circumCenter(tri){
var a = createVector(tri.a.x, tri.a.y);
var b = createVector(tri.b.x, tri.b.y);
var c = createVector(tri.c.x, tri.c.y); 

var denom = 2*p5.Vector.cross(p5.Vector.sub(a,b), p5.Vector.sub(b,c)).magSq();

var asclr = p5.Vector.sub(b,c).magSq()*p5.Vector.dot(p5.Vector.sub(a,b),p5.Vector.sub(a,c)) / denom;

var bsclr = p5.Vector.sub(a,c).magSq()*p5.Vector.dot(p5.Vector.sub(b,a),p5.Vector.sub(b,c)) / denom;

var csclr = p5.Vector.sub(a,b).magSq()*p5.Vector.dot(p5.Vector.sub(c,a),p5.Vector.sub(c,b)) / denom;

var center = a.mult(asclr).add(b.mult(bsclr)).add(c.mult(csclr));

var r = dist(center.x, center.y, tri.a.x, tri.a.y);

return [center.x, center.y, r];
}

//2nd method check performance of both??
function circumCenter2(tri){
var a = tri.a; var b = tri.b; var c = tri.c;

var D = (a.x - c.x) * (b.y - c.y) - (b.x - c.x) * (a.y - c.y);

var pX = (((a.x - c.x) * (a.x + c.x) + (a.y - c.y) * (a.y + c.y)) / 2 * (b.y - c.y) 
     -  ((b.x - c.x) * (b.x + c.x) + (b.y - c.y) * (b.y + c.y)) / 2 * (a.y - c.y)) / D;


var pY = (((b.x - c.x) * (b.x + c.x) + (b.y - c.y) * (b.y + c.y)) / 2 * (a.x - c.x)
     -  ((a.x - c.x) * (a.x + c.x) + (a.y - c.y) * (a.y + c.y)) / 2 * (b.x - c.x)) / D;
    

var r = dist(pX, pY, a.x, a.y);

return [pX, pY, r];    
}


function isDelaunay(tri, point){
	return ((dist(tri.centerX, tri.centerY, point.x, point.y)-tri.centerRad) >= 0);
}

// function display(a){ //dont use in end, updateCenter called to much...
// 	background(100);
// 	noFill();
// 	stroke(255);
// 	for (var i = 0; i < nodes.length; i++) {
// 	 ellipse(nodes[i].x, nodes[i].y, nodeSize, nodeSize);
// 	}
// 	for (var i = 0; i < edges.length; i++) {
// 		line(edges[i].a.x, edges[i].a.y, edges[i].b.x, edges[i].b.y);
// 	}
// 	stroke(255,0,0);
// 	for (var i = 0; i < triangles.length; i++) {
// 	if(!a){	
// 	triangles[i].updateCenter();	
// 	ellipse(triangles[i].centerX, triangles[i].centerY, 10, 10);
// 	ellipse(triangles[i].centerX, triangles[i].centerY, triangles[i].centerRad*2, triangles[i].centerRad*2);	
// 	}	
// 	}
// 	highlightTriangle(highlight);
// }
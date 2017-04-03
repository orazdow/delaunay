function addVertices(args){
	var n;

	if(arguments.length == 2){
		n = new Node(arguments[0], arguments[1]);
		//nodes.push(n);
		return n;
	}
	if(arguments.length == 6){
		var a = new Node(arguments[0], arguments[1]);
		var b = new Node(arguments[2], arguments[3]);
		var c = new Node(arguments[4], arguments[5]);
		//nodes.push(a); nodes.push(b); nodes.push(c);
		//a.connect(b); b.connect(c); a.connect(c);
		n = new Triangle(a, b, c);
		//triangles.push(n);
		triangles.add(n);
		return n;
	}

}

function add_split(x, y){
	var t = null;
    var n = addVertices(x, y); 
    var index = null;
    for (var i = triangles.length()-1; i >= 0; i--) {
    	 if(isInTriangle(n, triangles.at(i))){
    	 	t = triangles.at(i); index = i; break;
    	 }
    } 

    if(t){ 

    var isboundary = isBoundary(t);
	 // n.connect(t.a);
	 // n.connect(t.b);
	 // n.connect(t.c);

	var a = t.a; 
	var b = t.b; 
	var c = t.c;

    if(index > 0){ //dont delete supertriangle
	triangles.remove(t); 
    }

	var ta = new Triangle(n, a, b); //console.log(isBoundary(ta))
	var tb = new Triangle(n, b, c); //console.log(isBoundary(tb))
	var tc = new Triangle(n, a, c); //console.log(isBoundary(tc))
   
	 triangles.add(ta);
	 triangles.add(tb);
	 triangles.add(tc);


   	 check(ta, a, b, isboundary);
 	 check(tb, b, c, isboundary);
	 check(tc, a, c, isboundary);
    }
}



function check(triA, a, b, isboundary){
// https://www.ti.inf.ethz.ch/ew/Lehre/CG13/lecture/Chapter%207.pdf	
var triB, p, d; 

	p = triA.getOppositePoint(a, b); 
	if(!p){return} 

//	if(isboundary){triA.boundary = isBoundary(triA); }

   // var t1 = performance.now();
   
    var aa = triangles.get(a, b); 
    for (var i = 0; i < aa.length; i++) {
    	if(aa[i] !== triA){ triB = aa[i]; break;}
    }

    // for (var i = triangles.length()-1; i >= 0; i--) {
    // 	if(triangles.at(i).hasEdge(a, b) && triangles.at(i) !== triA){
    // 		triB = triangles.at(i); break;
    // 	}
    // }

     // var t2 = performance.now();
     // console.log(t2-t1)

	if(!triB){return}

	d = triB.getOppositePoint(a, b); 
	if(!d){return}

	if(isDelaunay(triA, d)){ return } //setNeighbors(triA);
    // console.log('nope')
    
	// deleteTriangle(triA);
	// deleteTriangle(triB);
	 triangles.remove(triA);
	 triangles.remove(triB); 
    
	 var t1 = new Triangle(p, a, d);
	 var t2 = new Triangle(p, b, d);
	 // triangles.push(t1);
	 // triangles.push(t2);
	 triangles.add(t1);
	 triangles.add(t2);

	 	 // a.disconnect(b);
	 	 // p.connect(d);

	 	check(t1, a, d, isboundary);
	 	check(t2, b, d, isboundary);
    
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
// https://www.ics.uci.edu/~eppstein/junkyard/circumcenter.html
// https://en.wikipedia.org/wiki/Circumscribed_circle
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


function isBoundary(t){

	return t.a === s1 || t.b === s1 || t.c === s1 || t.a === s2 || t.b === s2 || t.c === s2 || t.a === s3 || t.b === s3 || t.c === s3;

}

function deleteTriangle(tri){
	for (var i = triangles.length; i >= 0; i--){
		if(tri === triangles[i]){ 
			triangles.splice(i, 1);  
			break;
		}
	}
}

function setNeighbors(t){



	
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
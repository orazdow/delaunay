
var nodes = [];
var edges = new EdgeTable();
var triangles = new TriangleTable();
var labels = 0;

var ww = 800;
var wh = 700;

var tsize = 3000;
var t, s1, s2, s3;

function setup(){

//frameRate(30);
noLoop();
createCanvas(ww, wh);
background(100);
stroke(255);
//t = addVertices(10, wh-10, ww-10, wh-10, ww/2, 10);
t = addVertices(-tsize, wh+tsize, ww/2, -tsize, ww+tsize, wh+tsize);
s1 = t.a; s2 = t.b; s3 = t.c;

// for (var i = 0; i < 300; i++) {
// 	add_split(random(ww-10), random(wh-10))
// }
// display();

}

function draw(){ 

}

function display(){ 
background(100);
noFill();
stroke(255);

for(key in triangles.triangles){
	var t = triangles.triangles[key]
	if(!t.boundary)
	triangle(t.a.x, t.a.y, t.b.x, t.b.y, t.c.x, t.c.y); 	
}

}

function mousePressed(){
//var t1 = performance.now();
add_split(mouseX, mouseY);
// var t2 = performance.now();
// console.log( t2-t1);
display();

}






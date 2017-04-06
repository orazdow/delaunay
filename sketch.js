//var nodes = [];
//var edges = new EdgeTable();
var triangles = new TriangleTable();
var labels = 0;

var ww = 800;
var wh = 700;
var view = 0;
var tsize = 3000;
var t, s1, s2, s3;

function setup(){

//frameRate(30);
noLoop();
createCanvas(ww, wh);
background(100);
stroke(255);
st = addVertices(-tsize, wh+tsize, ww/2, -tsize, ww+tsize, wh+tsize);
st.boundary = true;
s1 = st.a; s2 = st.b; s3 = st.c;

// for (var i = 0; i < 1000; i++) {
// 	add_split(random(ww-10), random(wh-10))
// }
// display();

}

function draw(){ 

}

function display(){ 
background(100);
noFill();

for(key in triangles.triangles){
	var t = triangles.triangles[key]
		 setNeighbors(t)
	if(!t.boundary){
		if(view === 0 || view === 2){
		stroke(255);
         triangle(t.a.x, t.a.y, t.b.x, t.b.y, t.c.x, t.c.y); 
         }
         if(view === 1 || view === 2){
		stroke(255, 0, 0);

		 line(t.center.x, t.center.y, t.vA.x, t.vA.y);
 		 line(t.center.x, t.center.y, t.vB.x, t.vB.y);
		 line(t.center.x, t.center.y, t.vC.x, t.vC.y);
		 }
	}
}

}
function keyPressed() {
  if (key === ' ') {
  view = ++view%3;
} display()
}

function mousePressed(){
add_split(mouseX, mouseY);

display();

}

// function mouseMoved(){
// 	display()

// // 	fill(255,0,0,50);
//  for(key in triangles.triangles){
//  	var tri = triangles.triangles[key];
//  	if(isInTriangle({x:mouseX, y: mouseY}, tri) && tri !== t){
// // 		triangle(tri.a.x, tri.a.y, tri.b.x, tri.b.y, tri.c.x, tri.c.y); 
//  		fill(0,255,0,50);

// 		 triangle(tri.neighborA.a.x, tri.neighborA.a.y, tri.neighborA.b.x, tri.neighborA.b.y, tri.neighborA.c.x, tri.neighborA.c.y); 
//  		 triangle(tri.neighborB.a.x, tri.neighborB.a.y, tri.neighborB.b.x, tri.neighborB.b.y, tri.neighborB.c.x, tri.neighborB.c.y); 
//  		 triangle(tri.neighborC.a.x, tri.neighborC.a.y, tri.neighborC.b.x, tri.neighborC.b.y, tri.neighborC.c.x, tri.neighborC.c.y); 


//  		}

//  	}

// }






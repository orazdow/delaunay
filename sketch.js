//var nodes = [];
//var edges = new EdgeTable();
var triangles = new TriangleTable();
var labels = 0;

var ww = 800;
var wh = 700;
var view = 0;
var tsize = 3000;
var t, s1, s2, s3;
var a = 0;
var b = 0;
function setup(){

//frameRate(30);
//noLoop();
createCanvas(ww, wh);
background(100);
stroke(255);
st = addVertices(-tsize, wh+tsize, ww/2, -tsize, ww+tsize, wh+tsize);
st.boundary = true;
s1 = st.a; s2 = st.b; s3 = st.c;

}

function draw(){ 
	background(100);
    triangles.triangles = [];
    triangles.edgetriangles = [];
 st = addVertices(-tsize, wh+tsize, ww/2, -tsize, ww+tsize, wh+tsize);
st.boundary = true;
s1 = st.a; s2 = st.b; s3 = st.c;   

a += 0.003;
for (var i = 0; i < 20; i++){

	add_split( noise(a, i)*ww, noise(i, a)*ww)
   }

display();
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
		 ellipse(t.a.x, t.a.y, 6,6); ellipse(t.b.x, t.b.y, 6,6); ellipse(t.c.x, t.c.y, 6,6);
		// ellipse(t.center.x, t.center.y, t.center.r*2, t.center.r*2)
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


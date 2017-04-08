var triangles = new TriangleTable();
var labels = 0;
var ww = 800;
var wh = 700;
var view = 1;
var st, s1, s2, s3;
var a = 0;
var b = 0;

function setup(){
pixelDensity(1);
noiseDetail(5, 0.3);
createCanvas(ww, wh);
}

function draw(){ 
reset();
a += 0.002; //b+=0.0002;
for (var i = 0; i < 30; i++){
	b+=0.00001;
 	add_split(noise(i+b, a)*ww*1.3,noise(2000+i+b, 2000+a+b)*wh*1.3);
}
display();
}

function display(){ 
background(95);
noFill();
for(key in triangles.triangles){
var t = triangles.triangles[key]
 setNeighbors(t)
if(!t.boundary){
	if(view === 0 || view === 2){
	stroke(255);
	 fill(t.center.r)
     triangle(t.a.x, t.a.y, t.b.x, t.b.y, t.c.x, t.c.y); 
     }
     if(view === 1 || view === 2){
	stroke(255, 50, 50);
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
} //display();
}

function mousePressed(){
add_split(mouseX, mouseY);
display();
}

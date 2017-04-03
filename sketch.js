
var nodes = [];
var edges = new EdgeTable();
var triangles = new TriangleTable();
var labels = 0;

var ww = 800;
var wh = 700;

var t, s1, s2, s3;

function setup(){

//frameRate(30);
noLoop();
createCanvas(ww, wh);
background(100);
stroke(255);
t = addVertices(10, wh-10, ww-10, wh-10, ww/2, 10);
s1 = t.a; s2 = t.b; s3 = t.c;
display();

}

function draw(){ 

}

function display(){ 
background(100);
noFill();
 stroke(255);
  for (var i = 0; i <triangles.length(); i++) {
 // 	line(edges.at(i).a.x, edges.at(i).a.y, edges.at(i).b.x, edges.at(i).b.y); 
    // if(!triangles.at(i).boundary)
  	triangle(triangles.at(i).a.x, triangles.at(i).a.y, triangles.at(i).b.x, triangles.at(i).b.y, triangles.at(i).c.x, triangles.at(i).c.y);
  }   
// for (var i = 0; i < triangles.length; i++) {
//  	stroke(255);
//    if(!triangles[i].boundary){
//  	triangle(triangles[i].a.x, triangles[i].a.y, triangles[i].b.x, triangles[i].b.y, triangles[i].c.x, triangles[i].c.y);
//  	}
 	//console.log(triangles[i].boundary)
 	// stroke(255, 0, 0);
 	// ellipse(triangles[i].centerX, triangles[i].centerY, triangles[i].centerRad*2, triangles[i].centerRad*2); 
//}
 

}

function mousePressed(){
  add_split(mouseX, mouseY);
  display();
}






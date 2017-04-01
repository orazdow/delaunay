
var nodes = [];
var edges = new EdgeTable();
var triangles = [];
var labels = 0;

var ww = 800;
var wh = 700;

function setup(){

	frameRate(30);
	createCanvas(ww, wh);
	background(100);
	stroke(255);
	addVertices(10, wh-10, ww-10, wh-10, ww/2, 10);
    display();


}

function draw(){ 

}

function display(){ 
background(100);
noFill();
stroke(255);
 for (var i = 0; i < edges.length(); i++) {
 	 line(edges.at(i).a.x, edges.at(i).a.y, edges.at(i).b.x, edges.at(i).b.y); 
 }   
}

function mousePressed(){
  add_split(mouseX, mouseY);
  display();
}




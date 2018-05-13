var triangles = new TriangleTable();
var labels = 0;
var ww = 800;
var wh = 700;
var view = 1;
var st, s1, s2, s3;
var a = 0;
var b = 0;
var selected;
var add = true;
var nodes = [];
var p, p2;

function setup(){
if(window.devicePixelRatio > 1){
ww = 600; wh = 525;
}
pixelDensity(1);
noiseDetail(5, 0.3);
createCanvas(ww, wh);
p = document.createElement('p');
document.querySelector('body').appendChild(p);
p.innerHTML =  'press space to change view';
p.style["userSelect"] = 'none';
p2 = document.createElement('p');
p2.innerHTML = '(click to add points or drag to move)';
p2.style["userSelect"] = 'none';
document.title = 'delaunay';
// p.onclick = function(){
// view = ++view%8;
// if(view == 0){ loop(); document.querySelector('body').removeChild(p2);}
// if(view == 4){ nodes = []; add = true; document.querySelector('body').appendChild(p2); }
// if(view > 3){noLoop(); display();}	
// }
//p2.onclick = function(){nodes = []; add = true; reset(); display();}
}

function draw(){ 
reset();
if(view < 4){
a += 0.002; 
  for (var i = 0; i <30; i++){
	b+=0.00001;
    add_split(noise(i+b, a)*ww*1.3,noise(2000+i+b, 2000+a+b)*wh*1.3);
  }
}
display();
}

function display(){ 	
background(92);
noFill();
for(key in triangles.triangles){
var t = triangles.triangles[key]

setNeighbors(t)
	if(!t.boundary){     //if(true){
		//triangle display
	  if(view !=1 && view != 5){
		 stroke(255);
		 if(view == 0 ){fill(t.center.r);} 
	     triangle(t.a.x, t.a.y, t.b.x, t.b.y, t.c.x, t.c.y); 
	   }
       // circle display
	  if(view == 3 || view == 7){ 
	 	 stroke(255, 40, 60);	
	 	 ellipse(t.center.x, t.center.y, t.center.r*2, t.center.r*2);
	   }

	 } //helper dots
	 else if(view == 4 || view == 7){
	   	stroke(255);
 	     if(nodes.length == 1 ){
	     	ellipse(nodes[0].x, nodes[0].y, 3, 3); 
	     }else if(nodes.length == 2){
	     	ellipse(nodes[0].x, nodes[0].y, 3,3); ellipse(nodes[1].x, nodes[1].y, 3,3); 

	     } 
	 }
      // voronoi display
	 if(view == 1 || view == 2 || view == 5 || view == 6 ){
	 stroke(255, 40, 60);
	 ellipse(t.a.x, t.a.y, 6,6); ellipse(t.b.x, t.b.y, 6,6); ellipse(t.c.x, t.c.y, 6,6);
	 if(t.vA){
  	  line(t.center.x, t.center.y, t.vA.x, t.vA.y);
	  line(t.center.x, t.center.y, t.vB.x, t.vB.y);
	  line(t.center.x, t.center.y, t.vC.x, t.vC.y);
	 }
	 }   

   }
}

function keyPressed() {
if (key === ' ') { 
view = ++view%8;
if(view == 0){ loop(); document.querySelector('body').removeChild(p2);}
if(view == 4){ nodes = []; add = true; document.querySelector('body').appendChild(p2); }
if(view > 3){noLoop(); display();}	
} 
}

function mousePressed(){

  if(view > 3 && mouseY <= wh){
	for (var i = 0; i < nodes.length; i++) {
		 if(dist(mouseX, mouseY, nodes[i].x, nodes[i].y) <= 8){
		 	add = false; selected = nodes[i]; break;
		 }else{  add = true; }
	}
	if(add){
	nodes.push({x: mouseX, y: mouseY});	
	reset();
	  for (var i = 0; i < nodes.length; i++) {
	  	add_split(nodes[i].x, nodes[i].y);
	  }
	   display();	
	}	
 }
}	

function mouseDragged(){
  if(view > 3){
	  if(!add){
	  selected.x = mouseX; selected.y = mouseY;
	    reset();
	  for (var i = 0; i < nodes.length; i++) {
	  	add_split(nodes[i].x, nodes[i].y);
	  }
	   display();	
	}
  }
}

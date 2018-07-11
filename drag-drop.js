let rectX = 50;
let rectY = 50;
let rectWidth = 50;
let rectHeight = 50;

const fontSize = 20;

const texts = [];
const answerContainers = [];


let elDragged = false;

function preload(){
    font = loadFont('https://storage.googleapis.com/emspmg/style/OpenSans-Regular.ttf'); 
}

function setup(){
    const canvas = createCanvas(500,370);
    canvas.parent('canvas-container');

    const answerContainer1 = {x:20, y:150, w:220, h:200, r:5};
    const answerContainer2 = {x:260, y:150, w:220, h:200, r:5};
    answerContainers.push(answerContainer1,answerContainer2);

    const text1 = new Text(
        25,
        30,
        font.textBounds("Dog",0,0,fontSize).w,
        font.textBounds("Dog",0,0,fontSize).h,
        "Dog",
        answerContainer1
    );
    const text2 = new Text(
        25,
        60,
        font.textBounds("Chicken",0,0,fontSize).w,
        font.textBounds("Chicken",0,0,fontSize).h,
        "Chicken",
        answerContainer2
    );
    const text3 = new Text(
        25,
        90,
        font.textBounds("Horse",0,0,fontSize).w,
        font.textBounds("Horse",0,0,fontSize).h,
        "Horse",
        answerContainer1
    );
    texts.push(text1,text2,text3);
}

function draw(){
    
    background(255);
    fill(255);
    cursor(ARROW);

    //create text boxes
    answerContainers.forEach(container=>{
        rect(container.x, container.y, container.w, container.h, container.r);
    })

    // Titles for answer boxes
    fill(0);
    textSize(32);
    textFont(font);
    textAlign(CENTER);
    text('4 Legs', answerContainers[0].x+answerContainers[0].w/2, answerContainers[0].y+30);
    text('2 Legs', answerContainers[1].x+answerContainers[1].w/2, answerContainers[1].y+30);

    // Answer choices
    textSize(20);
    texts.forEach(t=>{
        fill(t.color);
        text(t.text,t.x,t.y,t.w,t.y);
    })

    // Change cursor to hand if answer choice hovered
    texts.forEach((text)=>{
        text.hovered(mouseX, mouseY);
    })
}

function mousePressed(){
    texts.forEach((text)=>{
        if(mouseX>text.x && mouseX< text.x+text.w && mouseY>text.y && mouseY<text.y+text.h){
            text.over = true;
        }
    })
    return false;
}

function mouseDragged(){
    texts.forEach((text)=>{
        text.dragged(mouseX, mouseY);
    })
    //console.log(texts);
    return false;
}

function mouseReleased(){
    texts.forEach((text)=>{
        text.released(mouseX, mouseY);
    })
    return false;
}

class Text{
    constructor(x,y,w,h,text,target){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.target = target;
        this.original = {x,y};
        this.over = false;
        this.color = color(55,61,63);
    }

    hovered(x,y){
        //console.log(this.x);
        if(x>this.x && x<this.x+this.w && y>this.y && y<this.y+this.h){
            cursor(HAND);
        }
    }

    dragged(x,y){
        if(this.over){
            this.x = x-this.w/2;
            this.y = y-this.h/2-5; 
        }
    }

    released(x,y){
        if(this.over && x>this.target.x && x<this.target.x+this.target.w && y>this.target.y && y<this.target.y+this.target.h){
            this.color = color(121,133,38);
            this.original.x = this.x;
            this.original.y = this.y;
        }else if(this.over){
            this.color = color(190,26,24);
            this.x = this.original.x;
            this.y = this.original.y;
        }
        this.over = false;
    }
}
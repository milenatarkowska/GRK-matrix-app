var imgA;
var imgB;

function setup() {
    createCanvas(512,512);
    background(255);
    imgA = createImage(512,512);
    imgB = createImage(512,512);
    imgA.loadPixels();
    imgB.loadPixels();
    var d = pixelDensity();
    for(var i=0; i<512*512*4*d; i+=4) {
        imgA.pixels[i]=240;
        imgA.pixels[i+1]=250;
        imgA.pixels[i+2]=240;
        imgA.pixels[i+3]=255;
        imgB.pixels[i]=240;
        imgB.pixels[i+1]=240;
        imgB.pixels[i+2]=250;
        imgB.pixels[i+3]=255;
    }
    imgA.updatePixels();
    imgB.updatePixels();
}
function draw() {
    if (!keyIsDown(32)) {
        image(imgA,0,0);
        text('Image A',10,20);
    } else {
        image(imgB,0,0);
        text('Image B',10,20);
    }
}
// zadanie 1
// tworzy wektor w 2d
function makeVector(x, y){
    return [x, y, 1];
}

// argument img - imgA lub imgB (to gdzie rysujemy), vec - wektor do rysowania
function drawVector(img, vec){
    img.loadPixels();
    img.set(vec[0], vec[1], 0);
    img.updatePixels();
}

function mouseDragged(){
    let vec = makeVector(mouseX, mouseY);
    drawVector(imgA, vec);
    //drawVector(imgB, transformMatrix(makeIdentity(), vec));
    //drawVector(imgB, transformMatrix(makeShift(0, -25), vec));
    //drawVector(imgB, transformMatrix(makeScale(0.5, 0.5), vec));
    //drawVector(imgB, transformMatrix(makeRotate(0.25 * Math.PI), vec));
    //drawVector(imgB, transformMatrix(makeShear(0.4, 0.2), vec));
    drawVector(imgB, transformMatrix(multiplyMatrix(makeShift(20, 30), makeScale(0.7, 0.3)), vec));

}

//funkcje tworzące macierze - zadanie 2

//macierz jednostkowa
function makeIdentity() {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}

//macierz przesunicia/translacji
function makeShift(tx, ty) {
    return [[1, 0, tx], [0, 1, ty], [0, 0, 1]];
}

//macierz skalowania
function makeScale(sx, sy) {
    return [[sx, 0, 0], [0, sy, 0], [0, 0, 1]];
}

//macierz obrotu
function makeRotate(fi) {
    return [[Math.cos(fi), -Math.sin(fi), 0], [Math.sin(fi), -Math.cos(fi), 0], [0, 0, 1]];
}

//macierz pochylenia
function makeShear(shx, shy) {
    return [[1, shx, 0], [shy, 1, 0], [0, 0, 1]];
}

//zadanie 3 - transformacja (mnożenie) macierzy
function transformMatrix(matrix, vector){
    let value = [0,0,0];
    for(let i = 0; i < 3 ; ++i){
        for(let j = 0 ; j < 3 ; ++j){
            value[i] += matrix[i][j] * vector[j];
        }
    }
    return value;
}

//zadanie 4 - łączenie przekształceń

function multiplyMatrix(matrix1, matrix2){
    value = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (i = 0; i < 3; ++i) {
        for (j = 0; j < 3; ++j) {
            value[i][j] = matrix1[i][j] * matrix2[i][j];
        }
    }
    return value;
}

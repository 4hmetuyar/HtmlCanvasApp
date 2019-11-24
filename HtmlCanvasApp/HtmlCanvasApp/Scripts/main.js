var ctx, fillStyle = '', DrawingTypes = '', canvas, rect = {}, strokeStyle = '', lineWidth = 1;

$(document).ready(function () {
    canvas = document.getElementById("the-canvas");
    ctx = canvas.getContext("2d");
});

$('body').on('keydown',
    function (e) {
        clear();
        switch (e.which) {
            case 83:
                //Kare
                drawSquare();
                break;
            case 84:
                //Ucgen
                drawTriangle();
                break;
            case 67:
                //Daire
                drawCircle();
                break;
            case 69:
                //Elips
                drawOval();
                break;
        }
        draw();
        saveImage();
    });


function clear() {
    canvas.width = canvas.width;
}

function draw() {
    ctx.beginPath();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;

    switch (DrawingTypes) {
        case "FillRect":
            ctx.rect(rect.startX, rect.startY, rect.w, rect.h);
            break;
        case "FillCircle":
            ctx.arc(rect.startX, rect.startY, rect.radiusNew, rect.w, rect.h, false);

            break;
        case "FillEllipse":
            ctx.ellipse(rect.startX, rect.startY, rect.rx, rect.ry, 0, 0, Math.PI * 2);
            ctx.restore();
        case "FreeDraw":
            break;
    }
    ctx.fill();
    ctx.stroke();
}

function drawCircle() {
    //Daire
    DrawingTypes = "FillCircle";
    rect = {
        startX: canvas.width/2,
        startY: canvas.height / 2,
        radiusNew: 70,
        w: 0,
        h: (2 * Math.PI)
    };
    fillStyle = 'orange';
    strokeStyle = 'green';
    lineWidth = 5;
}

function drawSquare() {
    //Kare,
    DrawingTypes = "FillRect";

    rect = {
        startX: 5,
        startY: 5,
        w: 50,
        h: 50
    };
    fillStyle = 'white';
    strokeStyle = 'green';
}

function drawOval() {
    //Elips
    DrawingTypes = "FillEllipse";

    rect = {
        startX: 100,
        startY: 100,
        rx: 50,
        ry: 75
    };
    fillStyle = 'green';
    strokeStyle = 'red';
}


function drawTriangle() {
    ////Ucgen
    DrawingTypes = "FreeDraw";
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 0);
    ctx.lineTo(100, 200);
    ctx.fill();
}

function saveImage() {

    var imageNew = document.getElementById("the-canvas").toDataURL("image/png");
    imageNew = imageNew.replace('data:image/png;base64,', '');

    $.ajax({
        type: 'POST',
        url: '/home/SaveImage',
        data: '{ "imageData" : "' + imageNew + '" }',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            console.log(msg);
        }
    });


}
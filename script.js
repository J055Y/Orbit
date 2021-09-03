const
    canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

function drawLine(p0, p1) {
    console.log("Drawing Line");
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.lineWidth = 2;
    context.stroke();
}

function drawWeb(p0, pA, num) {
    // requestAnimationFrame(drawWeb);
    if (num > 0) {
        let pB = {
            x: Math.random() * width,
            y: Math.random() * height
        };
        drawWeb(p0, pA, num - 1);
        drawWeb(pA, pB, num - 1);
    } else {
        drawLine(p0, pA);
    }
}

function rec1(p0) {
    requestAnimationFrame(rec1);
    // context.translate(width/2, height/2)
    let p1 = {
        x: Math.random() * width,
        y: Math.random() * height
    }
    let lineColour = "#" + Math.floor(Math.random() * 16777215).toString(16);
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.lineWidth = 2;
    context.strokeStyle = lineColour;
    context.stroke();
}

function test(p) {
    for (let i = 0; i < 360; i++) {
        context.beginPath();
        context.moveTo(p.x, p.y);
        context.lineTo(
            Math.atan2(p.x * width^i, p.y * height^i) * 180^(i * 360) / Math.PI,
            Math.atan2(p.x * width^i, p.y * height^i) * 180^(i * 360) / Math.PI
        );
        context.lineWidth = 2;
        context.stroke();
    }
}

function test2(p) {
    let r = (height / 2) - (height / 16);

    for (let i = 0; i < 36; i++) {
        let theta = i;
        context.moveTo(p.x, p.y);
        context.lineTo(
            p.x + (r/i) * Math.cos(theta),
            p.y + (r/i) * Math.sin(theta + (i / 2))
        );
        context.stroke();
    }
}

let p = {
    x: width / 2,
    y: height / 2
};
let r = (height / 2) - (height / 16);
function rec2(i) {
    requestAnimationFrame(rec2);
    let theta = i;
    context.moveTo(p.x, p.y);
    context.lineTo(
        p.x + r * Math.cos(theta),
        p.y + r * Math.sin(theta)
    );
    context.stroke();
}

const r2 = height / 8;
const r3 = height / 64;
const points = [];
function makePoints(pointNum) {
    // divide circle pi by number of points (pointNum)
    for (let i = 0; i < pointNum; i++) {
        points.push({
            x: r + r2 * Math.cos(i),
            y: r + r2 * Math.sin(i)
        });
    }
}

let i = 0;
function rec3() {
    requestAnimationFrame(rec3);
    context.clearRect(0, 0, width, height);

    // let p = {
    //     x: (width / 2) + r2 * Math.cos(Math.random() * width),
    //     y: (height / 2) + r2 * Math.sin(Math.random() * height)
    // };
    // points.push(p);

    let p = {
        x: (width / 2) + r2 * Math.cos(i/360),
        y: (height / 2) + r2 * Math.sin(i/360)
    };

    // for (let j = 0; j < points.length; j++) {
    //     context.beginPath()
    //     context.arc(
    //         points[j].x,
    //         points[j].y,
    //         r2,
    //         0,
    //         2 * Math.PI,
    //         false
    //     );
    //     context.fillStyle = "#ff6600";
    //     context.fill();
    // }

    context.beginPath();
    context.arc(
        (width / 2),
        (height / 2),
        r2,
        0,
        2 * Math.PI,
        false
    );
    context.strokeStyle = "#000";
    context.stroke();

    context.beginPath();
    context.arc(
        (width / 2),
        (height / 2),
        (width / 128),
        0,
        2 * Math.PI,
        false
    );

    context.strokeStyle = "#ccc";
    context.stroke();

    context.beginPath()
    context.arc(
        p.x,
        p.y,
        r3,
        0,
        2 * Math.PI,
        false
    );
    context.fillStyle = "#ff6600";
    context.fill();

    i = i + 1;

    // let theta = i;
    // context.moveTo(p.x, p.y);
    // context.lineTo(
    //     p.x + r * Math.cos(theta),
    //     p.y + r * Math.sin(theta)
    // );
    // context.stroke();
}

window.onload = () => {
    let p0 = {
        x: width / 2,
        y: height / 2
    };
    let pA = {
        x: Math.random() * width,
        y: Math.random() * height
    };
    // drawWeb(p0, pA, 3);
    // test(p0);
    // test2(p0);
    // rec1(p0);
    // rec2(1);
    // makePoints(3);
    // rec3();
    // requestAnimationFrame(rec3);
}
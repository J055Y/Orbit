class StarCanvas {
    constructor(numberOfCircles, velocity) {
        this.numberOfCircles = numberOfCircles;
        this.velocity = velocity;
        this.circles = [];

        this.init = function () {
            for (let i = 0; i < this.numberOfCircles; i++) {
                let circle = this.createCircle();
                this.circles.push(circle);
            }
        };

        this.createCircle = function () {
            let dx;
            let dy;
            let r = 3;
            let x = Math.random() * (innerWidth - r * 2) + r;
            let y = Math.random() * (innerHeight - r * 2) + r;

            if (typeof this.velocity !== "number") {
                console.log("Invalid velocity value, defaulting to multiplier of 2");
                dx = (Math.random() - 0.5) * 2;
                dy = (Math.random() - 0.5) * 2;
            }
            else {
                dx = (Math.random() - 0.5) * this.velocity;
                dy = (Math.random() - 0.5) * this.velocity;
            }

            return new Star(x, y, dx, dy, r);
        };

        this.animate = function () {
            // requestAnimationFrame(this.animate.bind(this)); // This doesn't work...
            // context.clearRect(0, 0, innerWidth, innerHeight);

            context.fillStyle = "#000000";
            context.fillRect(0, 0, canvas.width, canvas.height, );

            for (let i = 0; i < this.circles.length; i++) {
                const circle1 = this.circles[i];
                if ((circle1.x > 0 && circle1.x < innerWidth) &&
                    (circle1.y > 0 && circle1.y < innerHeight)) {
                    circle1.update();
                }
                else {
                    this.circles.splice(i, 1);
                    let circle = this.createCircle();
                    this.circles.push(circle);
                }

                // const DistanceBetweenMouse = Math.sqrt((this.mouseX - circle1.x) * (this.mouseX - circle1.x) + (this.mouseY - circle1.y) * (this.mouseY - circle1.y));
                // if (DistanceBetweenMouse < circle1.r * 16) {
                //     circle1.x = circle1.x + (this.movementX - circle1.r);
                //     circle1.y = circle1.y + (this.movementY - circle1.r);
                // }
                //
                // for (let j = 0; j < this.circles.length; j++) {
                //     const circle2 = this.circles[j];
                //     const circles = Math.sqrt((circle2.x - circle1.x) * (circle2.x - circle1.x) + (circle2.y - circle1.y) * (circle2.y - circle1.y));
                //     if (circles < circle1.r * 16) {
                //         context.beginPath();
                //         context.moveTo(circle1.x, circle1.y);
                //         context.lineTo(circle2.x, circle2.y);
                //         context.strokeStyle = getStrokeStyle(circles, circle1.r);
                //         context.stroke();
                //     }
                // }
            }
        };
    }
}

class Star {
    constructor(x, y, dx, dy, r) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;

        this.draw = function () {
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, 360, false);
            context.fillStyle = "#ffffff";
            context.fill();
        };

        this.update = function () {
            if (this.x + this.r > innerWidth || this.x - this.r < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.r > innerHeight || this.y - this.r < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        };
    }
}
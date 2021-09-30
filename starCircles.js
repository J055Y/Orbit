class StarCanvas {
    /**
     * 
     * @param {Number} numberOfCircles 
     * @param {Number} velocity 
     */
    constructor(numberOfCircles, velocity) {
        this.numberOfCircles = numberOfCircles;
        this.velocity = velocity;
        this.stars = [];

        this.init = function () {
            for (let i = 0; i < this.numberOfCircles; i++) {
                let circle = this.createCircle();
                this.stars.push(circle);
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

            for (let i = 0; i < this.stars.length; i++) {
                const star1 = this.stars[i];
                if ((star1.x > 0 && star1.x < innerWidth) &&
                    (star1.y > 0 && star1.y < innerHeight)) {
                    star1.update();
                }
                else {
                    this.stars.splice(i, 1);
                    let circle = this.createCircle();
                    this.stars.push(circle);
                }

                // const DistanceBetweenMouse = Math.sqrt((this.mouseX - star1.x) * (this.mouseX - star1.x) + (this.mouseY - star1.y) * (this.mouseY - star1.y));
                // if (DistanceBetweenMouse < star1.r * 16) {
                //     star1.x = star1.x + (this.movementX - star1.r);
                //     star1.y = star1.y + (this.movementY - star1.r);
                // }
                //
                // for (let j = 0; j < this.stars.length; j++) {
                //     const star2 = this.stars[j];
                //     const stars = Math.sqrt((star2.x - star1.x) * (star2.x - star1.x) + (star2.y - star1.y) * (star2.y - star1.y));
                //     if (stars < star1.r * 16) {
                //         context.beginPath();
                //         context.moveTo(star1.x, star1.y);
                //         context.lineTo(star2.x, star2.y);
                //         context.strokeStyle = getStrokeStyle(stars, star1.r);
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
class OrbitCanvas {
    /**
     *
     * @param orbitArray Array of JSON Objects
     *
     */
    constructor(orbitArray) {
        this.orbitArray = orbitArray;
        this.sunRadius = Math.max.apply(Math, this.orbitArray.map(o => {return o.circleRadius})) + (0.1 * (height / 2));
        this.starCanvas = new StarCanvas(30, 5);

        this.starCanvas.init();

        this.orbitArray.forEach(o => {
            o.orbitTick = Math.random() * 2 * (Math.PI * o.orbitRadius);
        });

        this.animate = () => {
            requestAnimationFrame(this.animate.bind(this));
            context.clearRect(0, 0, width, height);

            this.starCanvas.animate();

            context.arc(
                (width / 2),
                (height / 2),
                this.sunRadius,
                0,
                2 * Math.PI,
                false
            );
            context.fillStyle = "#fff200";
            context.fill();

            for (let i = 0; i < this.orbitArray.length; i++) {
                let orbit = this.orbitArray[i];
                let p = {
                    x: (width / 2) + orbit.orbitRadius * Math.cos((orbit.orbitTick*orbit.speed)/360),
                    y: (height / 2) + orbit.orbitRadius * Math.sin((orbit.orbitTick*orbit.speed)/360)
                };

                context.beginPath();
                context.arc(
                    (width / 2),
                    (height / 2),
                    orbit.orbitRadius,
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
                    orbit.circleRadius,
                    0,
                    2 * Math.PI,
                    false
                );
                context.fillStyle = orbit.colour;
                context.fill();

                orbit.orbitTick += 1;

            }
        }
    }
}

window.onload = () => {
    let or = [
        {
            orbitRadius: 250,
            circleRadius: 20,
            speed: 10,
            colour: "#ff6600"
        },
        {
            orbitRadius: 150,
            circleRadius: 10,
            speed: 20,
            colour: "#ff00f2"
        },
        {
            orbitRadius: 200,
            circleRadius: 15,
            speed: 25,
            colour: "#50ff10"
        },
        {
            orbitRadius: 300,
            circleRadius: 5,
            speed: 5,
            colour: "#ff0000"
        }
    ];
    let orbitCanvas = new OrbitCanvas(or);
    orbitCanvas.animate();
}
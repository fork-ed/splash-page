var d3 = require("d3");

var color = d3.scale.ordinal()
    .range(["#99a", "#66a"]);

var figureWidth = 200,
    figureHeight = 200;

function forkFigure() {
    var fork = d3.select("figure.fork")
        .append("svg");

    fork
        .attr("width", figureWidth)
        .attr("height", figureHeight);

    var courses = [0, 0]; 
    var course = fork.selectAll(".course")
        .data(courses);

    course.enter()
        .append("circle")
            .attr("fill", color)
            .attr("cy", figureHeight/2)
            .attr("cx", function(d) { return figureWidth/2 *d + figureWidth/4; })
            .attr("r", 20);

    fork
        .append("text")
            .text("Fork!")
            .attr("x", figureWidth/2)
            .attr("y", figureHeight/2)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "central");

    function animateFork() {
        var update;
        if (courses[1] == 0) {
            courses[1] = 1;
            course.data(courses);
            update = course
                .transition()
                .duration(1500)
        } else {
            courses[1] = 0;
            update = course;
        }

        course.data(courses);
        update
            .attr("fill", color)
            .attr("cx", function(d) { return figureWidth/2 *d + figureWidth/4; });
    }

    setInterval(animateFork, 2500);
}

forkFigure();

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

let p0 = {
        x: width/2,
        y: height-20
    },
    p1 = {
        x: width/2,
        y: 20,
    },
    branchAngle =  0,
    trunkRatio = randomRange(0.2, 0.7);

function randomRange(min, max){
    return Math.random()*(max-min) + min;
}

function tree(p0,p1,limit){
    let dx = p1.x - p0.x,
        dy = p1.y - p0.y,
        dist = Math.sqrt(dx*dx + dy*dy),
        angle =  Math.atan2(dy,dx),
        branchLength = dist*(1-trunkRatio),

        pA = {
            x: p0.x + dx*trunkRatio,
            y: p0.y + dy*trunkRatio
        },
        pB = {
            x: pA.x + branchLength * Math.cos(angle-branchAngle),
            y: pA.y + branchLength * Math.sin(angle-branchAngle)
        },
        pC = {
            x: pA.x + branchLength * Math.cos(angle+branchAngle),
            y: pA.y + branchLength * Math.sin(angle+branchAngle)
        };
    
    ctx.strokeStyle = "brown";

    ctx.beginPath();
    ctx.moveTo(p0.x,p0.y);
    ctx.lineTo(pA.x, pA.y);
    ctx.stroke();
    ctx.closePath();

    if(limit > 0){
        tree(pA, pC, limit-1);
        tree(pA, pB, limit-1);
    }else{
        ctx.beginPath();
        ctx.moveTo(pB.x, pB.y);
        ctx.lineTo(pA.x, pA.y);
        ctx.lineTo(pC.x, pC.y);
        ctx.stroke();
        ctx.closePath();

    }
    // branchAngle += 0.01;
}

render();

function render(){
    ctx.clearRect(0,0, width, height);
    tree(p0, p1, 8);
    branchAngle += 0.005;
    requestAnimationFrame(render);
}
function gebi(id) {
  return document.getElementById(id);
}

const ball = gebi("ball");
let ballRight=ball.getBoundingClientRect().right
const box = gebi("box")
const boxBounds = box.getBoundingClientRect();
const up = gebi("up");
const down = gebi("down");

const score = gebi("score");

let x = true;
let y = true;
let frameid;


function moveUp() {
    let bt = ball.getBoundingClientRect().top;
    if (bt-5 > boxBounds.top) {
        ball.style.top = bt - 6 + 'px';
    } 
    frameid = requestAnimationFrame(moveUp);
}

function moveDown() {
    let ballC = ball.getBoundingClientRect();
    let bb=ballC.bottom;
    let bt=ballC.top;
    if (bb+5 <= boxBounds.bottom) {
        ball.style.top = bt + 4 + 'px';
    } 
    frameid = requestAnimationFrame(moveDown);
}

frameid = requestAnimationFrame(moveDown);

up.addEventListener("touchstart", () =>{
  cancelAnimationFrame(frameid);
  frameid = requestAnimationFrame(moveUp);
})

down.addEventListener("touchstart", () =>{
  frameid = requestAnimationFrame(moveDown);
})

up.addEventListener("touchend", () => {
  dFrame = requestAnimationFrame(moveDown);
  cancelAnimationFrame(frameid);
})

down.addEventListener("touchend", () => {
  cancelAnimationFrame(frameid);
})


function moveBall() {
  let ballCords=ball.getBoundingClientRect();
  let ballLeft = ballCords.left;
  let ballRight = ballCords.right;
  
  if(ballLeft <= boxBounds.left || ballRight >= boxBounds.right) {
      x = !x;
  }
  
  ball.style.left = x ? ballLeft+3+"px" : ballLeft-3+"px";
    
    requestAnimationFrame(moveBall);
}
//requestAnimationFrame(moveBall);

const obs1 = gebi("obs1");
const obs2 = gebi("obs2");
let cFrame;

function configObs() {
  obs1.style.height=(38*Math.random())+"dvh";
  obs2.style.height=(38*Math.random())+"dvh";
}

function moveObs(obs, t) {
  obsBounds = obs.getBoundingClientRect();
  obsLeft = obsBounds.left;
  obsRight = obsBounds.right;
  
  if(checkCol(obs, obsBounds, t)) {
    alert("Game Over!");
    return;
  }
  
  if(obsLeft <= boxBounds.left-40) {
    cancelAnimationFrame(cFrame);
    t = !t;
    let scoreValue = Number(score.innerHTML);
    score.innerHTML = scoreValue+1;
    obs.style.left = boxBounds.right + "px";
    configObs();
  } else {
    obs.style.left = ((obsLeft) - 4.5) + "px";
  }
  
  let xObs;
  if(t) xObs = obs1;
  else xObs = obs2;
  
  const cbfn = () => moveObs(xObs, t);
  cFrame = requestAnimationFrame(cbfn);
}

const cbfn = () => moveObs(obs1, false);
cFrame = requestAnimationFrame(cbfn);
//requestAnimationFrame(()=>moveObs(obs2,0));

function checkCol(obs, oCords, obsType) {
  const bCords = ball.getBoundingClientRect();
  const bb = bCords.bottom;
  const bt = bCords.top;
  const br = bCords.right;
  const or = oCords.right;
  const ob = oCords.bottom;
  const ot = oCords.top;
  const ol = oCords.left;
  if(obsType) {
    if(bt<=ob && ballRight>=ol && br < or) return true;
    else return false;
  } else {
    if(bb>=ot && ballRight>=ol) return true;
    else return false;
  }
}

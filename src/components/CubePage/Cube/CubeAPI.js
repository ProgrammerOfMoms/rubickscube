export const getCube = (cube) => {
    let res = ""
    for (let i = 0; i < cube.sides.length; i++) {
        res += cube.sides[i].cells.join("");
    }
    return res;
}

export const getStep = (move) => {
    let step = {
      "side": move[0],
      "clockwise": true,
      "count": 0
    }
    if (move.length === 1) {
      step.clockwise = true;
      step.count = 1;
    }
    else if (move.length === 2 && move[1] === "'") {
      step.clockwise = false;
      step.count = 1;
    } else if (move.length === 2 && move[1] !== "'") {
      step.clockwise = true;
      step.count = parseInt(move[1]);
    }
    else if (move.length === 3) {
      step.clockwise = false;
      step.count = parseInt(move[2]);
    }
    else return false;
    return step;
}

export const getSteps = (strMoves) => {
    let steps = [];
    let moves = strMoves.split(" ");
    let step = {};
    for (let i = 0; i<moves.length; i++){
        debugger;
        step = getStep(moves[i]);
        if (!step) {
            return false;
        } else steps.push(step);
    }
    return steps;
}


const SHUFFLE = "SHUFFLE";
const SOLVE = "SOLVE";
const STEP = "STEP";
const UPDATE_INPUT = "UPDATE_INPUT";
const UPDATE = "UPDATE";

const getStep = (move) => {
    let step = {
      "side": move[0],
      "clockwise": true,
      "count": 0
    }
    if (move.length == 1) {
      step.clockwise = true;
      step.count = 1;
    }
    else if (move.length == 2 && move[1] == "'") {
      step.clockwise = false;
      step.count = 1;
    } else if (move.length == 2 && move[1] != "'") {
      step.clockwise = true;
      step.count = parseInt(move[1]);
    }
    else if (move.length == 3) {
      step.clockwise = false;
      step.count = parseInt(move[2]);
    }
    else return false;
    return step;
}

const setStep = (step, index, state) =>{
    let cube = ""
    for (let i = 0; i < state.cube.sides.length; i++) {
      cube += state.cube.sides[i].cells.join("");
    }
    let obj = {
      "cube_state": cube,
      "step":
      {
        "side": step.side,
        "clockwise": step.clockwise,
        "count": step.count
      }
    }
    let response = fetch('/cube/step/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(commits => {
        state.commandsBar.activeStep = index;
        state.cube.sides = commits.cube.sides;
        return state;
      });
    return state;
}


export const shuffleActionCreator = () => ({type: SHUFFLE})
export const solveActionCreator = () => ({type: SOLVE})
export const stepActionCreator = () => ({type: STEP})
export const updateInputActionCreator = (text) => ({
    type: UPDATE_INPUT,
    text: text
}) 
export const updateActionCreator = () => ({type: UPDATE})

let initialState = {
        cube: {
          sides:
            [
              { name: "top", cells: ["y", "y", "y", "y", "y", "y", "y", "y", "y"] },
              { name: "left", cells: ["b", "b", "b", "b", "b", "b", "b", "b", "b"] },
              { name: "front", cells: ["r", "r", "r", "r", "r", "r", "r", "r", "r"] },
              { name: "right", cells: ["g", "g", "g", "g", "g", "g", "g", "g", "g",] },
              { name: "back", cells: ["o", "o", "o", "o", "o", "o", "o", "o", "o"] },
              { name: "bottom", cells: ["w", "w", "w", "w", "w", "w", "w", "w", "w"] },
            ],
        },
        commandsBar: {
          inputState: "",
          commands: [],
          solve: [],
          activeStep: 0,
          stepBtn: false,
          disabledBtns: {
            shuffle: false,
            solve: false,
            step: false
          }
        }
};

const cubeReducer = (state=initialState, action) => {
  // create new state. It's might be easier
    let newState = {...state};
    newState.commandsBar = {...state.commandsBar};
    newState.commandsBar.disabledBtns = {...state.commandsBar.disabledBtns};
    newState.commandsBar.solve = [...state.commandsBar.solve];
    newState.cube = {...state.cube};
    newState.cube.sides = [...state.cube.sides];
    for(let i = 0; i< newState.cube.sides.length; i++){
      newState.cube.sides[i] = {...state.cube.sides[i]};
      newState.cube.sides[i].cells = [...state.cube.sides[i].cells];
    }

  // end
    switch(action.type){
        case SHUFFLE:
            // state.commandsBar.disabledBtns.shuffle = true;
            
            if (newState.commandsBar.inputState == "") {
                return newState;
            } else {
                let cube = ""
                for (let i = 0; i < newState.cube.sides.length; i++) {
                    cube += newState.cube.sides[i].cells.join("");
                }
                let obj = {
                            "cube_state": cube,
                            "moves": []
                            };
                let steps = [];
                let moves = newState.commandsBar.inputState.split(" ");
                let step = {};
                for (let i = 0; i<moves.length; i++)
                {
                    step = getStep(moves[i]);
                    if (!step) {
                    alert("Неверно записаны повороты граней!");
                    newState.commandsBar.disabledBtns.shuffle = false;
                    return;
                    } else steps.push(step);
                }
                obj.moves = steps;
                let response = fetch('/cube/take_moves/', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(obj)
                })
                    .then(res => res.json())
                    .then(commits => {
                        newState.cube.sides = commits.cube.sides;
                        newState.commandsBar.activeStep = -1;
                        newState.commandsBar.disabledBtns.shuffle = false;
                        newState.commandsBar.inputState = "";
                        return newState;
                    })
                    .catch(err => {
                        newState.commandsBar.disabledBtns.shuffle = false;
                        alert("Неверно записаны повороты граней!");
                        return newState;
                    });
            }
            return newState;
        case SOLVE:
            newState.commandsBar.disabledBtns.solve = true;
            let data = "";
            for (let i = 0; i < newState.cube.sides.length; i++)
                data += newState.cube.sides[i].cells.join("");
            let obj = {
                "cube_state": data,
                "alg": "Kociemba"
            }
            let response = fetch('/cube/solve/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(obj)
            })
            .then(res => res.json())
            .then(commits => {
                newState.commandsBar.solve = commits.solve.split(',');
                newState.commandsBar.activeStep = -1;
                newState.commandsBar.disabledBtns.step = false;
                newState.commandsBar.disabledBtns.solve = false;
            });
            return newState;
        case STEP:
            let index = newState.commandsBar.activeStep + 1;
            if (index >= newState.commandsBar.solve.length) {
                newState.commandsBar.activeStep = 0;
                index = 0;
                newState.commandsBar.disabledBtns.step = true;
            }
            else {
                let move = newState.commandsBar.solve[index];
                let step = getStep(move);
                newState = setStep(step, index, newState);
            }
            return newState;
        case UPDATE_INPUT:
            newState.commandsBar.inputState = action.text;
            return newState;
        case UPDATE:
            return newState;
        default:
            return newState;
    }
}

export default cubeReducer;
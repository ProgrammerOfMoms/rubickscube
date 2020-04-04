import {getCube, getStep, getSteps} from '../../components/CubePage/Cube/CubeAPI';

const SHUFFLE = "SHUFFLE";
const SOLVE = "SOLVE";
const STEP = "STEP";
const UPDATE_INPUT = "UPDATE_INPUT";
const IS_FETCHING = "IS_FETCHING";
const SET_STEP_INDEX = "SET_STEP_INDEX"

// const getStep = (move) => {
//     let step = {
//       "side": move[0],
//       "clockwise": true,
//       "count": 0
//     }
//     if (move.length == 1) {
//       step.clockwise = true;
//       step.count = 1;
//     }
//     else if (move.length == 2 && move[1] == "'") {
//       step.clockwise = false;
//       step.count = 1;
//     } else if (move.length == 2 && move[1] != "'") {
//       step.clockwise = true;
//       step.count = parseInt(move[1]);
//     }
//     else if (move.length == 3) {
//       step.clockwise = false;
//       step.count = parseInt(move[2]);
//     }
//     else return false;
//     return step;
// }

// const setStep = (step, index, state) =>{
//     let cube = ""
//     for (let i = 0; i < state.cube.sides.length; i++) {
//       cube += state.cube.sides[i].cells.join("");
//     }
//     let obj = {
//       "cube_state": cube,
//       "step":
//       {
//         "side": step.side,
//         "clockwise": step.clockwise,
//         "count": step.count
//       }
//     }
//     let response = fetch('/cube/step/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify(obj)
//     })
//       .then(res => res.json())
//       .then(commits => {
//         state.commandsBar.activeStep = index;
//         state.cube.sides = commits.cube.sides;
//         return state;
//       });
//     return state;
// }


export const shuffleSuccess = (cube) => ({type: SHUFFLE, cube: cube})
export const solveSuccess = (solve) => ({type: SOLVE, solve: solve})
export const stepSuccess = (cube) => ({type: STEP, cube: cube})
export const updateInputSuccess = (text) => ({type: UPDATE_INPUT, text: text})
export const toggleIsFetching = (btn, modifier) => ({type: IS_FETCHING, btn: btn, value: modifier})
export const setStepIndex = (index) => ({type: SET_STEP_INDEX, index: index})


export const shuffle = (inputState, cube) => {
    if (inputState === ""){
        let count = Math.floor(Math.random() * (30 - 1 + 1) + 1);
        return (dispatch) => {
            dispatch(toggleIsFetching("shuffle", true));
            fetch('/cube/shuffle/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({"count": count})
            })
            .then(res => res.json())
            .then(commits => {
                dispatch(shuffleSuccess(commits.cube));
                dispatch(toggleIsFetching("shuffle", false));
                dispatch(toggleIsFetching("step", false));
            });
        }
    } else {
        let strCube = getCube(cube);
        let moves = getSteps(inputState);
        if (!moves) return (dispatch) => {alert("Неверная формула"); dispatch(updateInputSuccess(""))}
        return (dispatch) => {
            dispatch(toggleIsFetching("shuffle", true));
            dispatch(updateInputSuccess(""));
            fetch('/cube/take_moves/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({"cube_state": strCube, "moves": moves})
            })
            .then(res => res.json())
            .then(commits => {
                dispatch(shuffleSuccess(commits.cube));
                dispatch(toggleIsFetching("shuffle", false));
            });
            
        }
    }        
}

export const solve = (cube) => {
    let strCube = getCube(cube);
    return (dispatch) => {
        dispatch(toggleIsFetching("solve", true));
        fetch('/cube/solve/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({cube_state: strCube, alg: "Kociemba"})
        })
        .then(res => res.json())
        .then(commits => {
            dispatch(solveSuccess(commits.solve.split(",")));
            dispatch(toggleIsFetching("solve", false));
            dispatch(toggleIsFetching("step", false))
        });
    }
}

export const step = (stepIndex, cube, solve) => {
    let index = stepIndex+1;
    if (index >= solve.length){
        return (dispatch) => {
            dispatch(toggleIsFetching("step", true));
            dispatch(setStepIndex(-1));
        }
    }
    else {
        let strCube = getCube(cube);
        let step = getStep(solve[index]);
        let obj = {
            cube_state: strCube,
            step: {
                side: step.side,
                clockwise: step.clockwise,
                count: step.count
            }
        }
        return (dispatch) => {
            dispatch(toggleIsFetching("step", true));
            fetch('/cube/step/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(obj)
            })
            .then(res => res.json())
            .then(commits => {
                dispatch(stepSuccess(commits.cube, stepIndex));
                dispatch(setStepIndex(index));
                dispatch(toggleIsFetching("step", false));
                if(stepIndex+1 >= solve.size){
                    dispatch(toggleIsFetching("step", true));
                    dispatch(setStepIndex(-1));
                }
            });
        }
    }
}


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

const cubePageReducer = (state=initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case SHUFFLE:
            newState.cube = action.cube;
            return newState;
        case SOLVE:
            newState.commandsBar.solve = action.solve;
            newState.commandsBar.activeStep = -1;
            return newState;
        case STEP:
            newState.cube = action.cube;
            return newState;
        case SET_STEP_INDEX:
            newState.commandsBar.activeStep = action.index;
            return newState;
        case IS_FETCHING:
            newState.commandsBar.disabledBtns = {...state.commandsBar.disabledBtns};
            newState.commandsBar.disabledBtns[action.btn] = action.value;
            return newState;
        case UPDATE_INPUT:
            newState.commandsBar.inputState = action.text;
            return newState;

        default:
            return state;
    }
}

export default cubePageReducer;
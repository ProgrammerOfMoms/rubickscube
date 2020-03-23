import { render } from './render'

export const changeInput = (e) => {
  defaultData.commandsBar.inputState = e.target.value;
}

const shuffleButtonClick = (e) => {
  console.log("123");
  defaultData.commandsBar.disabledBtns.shuffle = true;
  render(defaultData)
  console.log(defaultData.commandsBar.inputState);
  if (defaultData.commandsBar.inputState == "") {
    console.log('here');
    const rand = (min, max) => {
      return min + Math.floor((max - min) * Math.random());
    }
    let obj = { "count": rand(1, 30) }
    let response = fetch('/cube/shuffle/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(commits => {
        defaultData.cube.sides = commits.cube.sides;
        defaultData.commandsBar.activeStep = -1;
        defaultData.commandsBar.disabledBtns.shuffle = false;
        defaultData.commandsBar.inputState = "";
        render(defaultData);
      });
  } else {

    let cube = ""
    for (let i = 0; i < defaultData.cube.sides.length; i++) {
      cube += defaultData.cube.sides[i].cells.join("");
    }
    let obj = {
                "cube_state": cube,
                "moves": []
              };
    let steps = [];
    let moves = defaultData.commandsBar.inputState.split(" ");
    let step = {};
    for (let i = 0; i<moves.length; i++)
    {
      step = getStep(moves[i]);
      if (!step) {
        alert("Неверно записаны повороты граней!");
        defaultData.commandsBar.disabledBtns.shuffle = false;
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
        defaultData.cube.sides = commits.cube.sides;
        defaultData.commandsBar.activeStep = -1;
        defaultData.commandsBar.disabledBtns.shuffle = false;
        defaultData.commandsBar.inputState = "";
        document.querySelector("#root > div > div.Command_container__DhWpP > input").value = "";
        render(defaultData);
      })
      .catch(err => {
        defaultData.commandsBar.disabledBtns.shuffle = false;
        render(defaultData);
        alert("Неверно записаны повороты граней!");
      });
  }
}

const setStep = (step, index) => {
  let cube = ""
  for (let i = 0; i < defaultData.cube.sides.length; i++) {
    cube += defaultData.cube.sides[i].cells.join("");
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
      defaultData.commandsBar.activeStep = index;
      defaultData.cube.sides = commits.cube.sides;
      render(defaultData);
    });
}

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

const solveButtonClick = (e) => {
  // let btn = document.querySelector("#root > div > div.Command_container__DhWpP > button:nth-child(3)");
  defaultData.commandsBar.disabledBtns.step = false;
  render(defaultData);
  let data = "";
  for (let i = 0; i < defaultData.cube.sides.length; i++)
    data += defaultData.cube.sides[i].cells.join("");
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
      defaultData.commandsBar.solve = commits.solve.split(',');
      defaultData.commandsBar.activeStep = -1;
      defaultData.commandsBar.disabledBtns.step = false;
      render(defaultData);
    });
}

const stepButtonClick = (e) => {
  let index = defaultData.commandsBar.activeStep + 1;
  if (index >= defaultData.commandsBar.solve.length) {
    defaultData.commandsBar.activeStep = 0;
    index = 0;
    defaultData.commandsBar.stepBtn = true;
    render(defaultData);
  }
  else {
    let move = defaultData.commandsBar.solve[index];
    let step = getStep(move);
    setStep(step, index);
  }
}

let defaultData = {
  "cube": {
    "sides":
      [
        { "name": "top", "cells": ["y", "y", "y", "y", "y", "y", "y", "y", "y"] },
        { "name": "left", "cells": ["b", "b", "b", "b", "b", "b", "b", "b", "b"] },
        { "name": "front", "cells": ["r", "r", "r", "r", "r", "r", "r", "r", "r"] },
        { "name": "right", "cells": ["g", "g", "g", "g", "g", "g", "g", "g", "g",] },
        { "name": "back", "cells": ["o", "o", "o", "o", "o", "o", "o", "o", "o"] },
        { "name": "bottom", "cells": ["w", "w", "w", "w", "w", "w", "w", "w", "w"] },
      ],
  },
  "commandsBar": {
    "callbacks": {
      "onChangeInput": changeInput,
      "onShuffleButtonClick": shuffleButtonClick,
      "onSolveButtonClick": solveButtonClick,
      "onStepButtonClick": stepButtonClick,
    },
    "inputState": "",
    "commands": [],
    "solve": [],
    "activeStep": 0,
    "stepBtn": false,
    "disabledBtns": {
      "shuffle": false,
      "solve": false,
      "step": false
    }
  }
}

export default defaultData;
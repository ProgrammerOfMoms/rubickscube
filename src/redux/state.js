let store = {
  _state: {
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
  },
  getState(){
    return this._state;
  },
  shuffleButtonClick(e) {
    this._state.commandsBar.disabledBtns.shuffle = true;
    this._call_subscriber(this._state);
    if (this._state.commandsBar.inputState == "") {
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
          this._state.cube.sides = commits.cube.sides;
          this._state.commandsBar.activeStep = -1;
          this._state.commandsBar.disabledBtns.shuffle = false;
          this._state.commandsBar.inputState = "";
          this._call_subscriber(this._state);
        });
    } else {
  
      let cube = ""
      for (let i = 0; i < this._state.cube.sides.length; i++) {
        cube += this._state.cube.sides[i].cells.join("");
      }
      let obj = {
                  "cube_state": cube,
                  "moves": []
                };
      let steps = [];
      let moves = this._state.commandsBar.inputState.split(" ");
      let step = {};
      for (let i = 0; i<moves.length; i++)
      {
        step = this.getStep(moves[i]);
        if (!step) {
          alert("Неверно записаны повороты граней!");
          this._state.commandsBar.disabledBtns.shuffle = false;
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
          this._state.cube.sides = commits.cube.sides;
          this._state.commandsBar.activeStep = -1;
          this._state.commandsBar.disabledBtns.shuffle = false;
          this._state.commandsBar.inputState = "";
          this._call_subscriber(this._state);
        })
        .catch(err => {
          this._state.commandsBar.disabledBtns.shuffle = false;
          this._call_subscriber(this._state);
          alert("Неверно записаны повороты граней!");
        });
    }
  },
  changeInput(e) {
    this._state.commandsBar.inputState = e.target.value;
    this._call_subscriber(this._state)
  },
  setStep(step, index){
    let cube = ""
    for (let i = 0; i < this._state.cube.sides.length; i++) {
      cube += this._state.cube.sides[i].cells.join("");
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
        this._state.commandsBar.activeStep = index;
        this._state.cube.sides = commits.cube.sides;
        this._call_subscriber(this._state);
      });
  },
  getStep(move) {
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
  },
  solveButtonClick(e) {
    this._state.commandsBar.disabledBtns.solve = true;
    this._call_subscriber(this._state);
    let data = "";
    for (let i = 0; i < this._state.cube.sides.length; i++)
      data += this._state.cube.sides[i].cells.join("");
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
        this._state.commandsBar.solve = commits.solve.split(',');
        this._state.commandsBar.activeStep = -1;
        this._state.commandsBar.disabledBtns.step = false;
        this._state.commandsBar.disabledBtns.solve = false;
        this._call_subscriber(this._state);
      });
  },
  stepButtonClick(e) {
    let index = this._state.commandsBar.activeStep + 1;
    if (index >= this._state.commandsBar.solve.length) {
      this._state.commandsBar.activeStep = 0;
      index = 0;
      this._state.commandsBar.disabledBtns.step = true;
      this._call_subscriber(this._state);
    }
    else {
      let move = this._state.commandsBar.solve[index];
      let step = this.getStep(move);
      this.setStep(step, index);
    }
  },
  subscribe(observer){
    this._call_subscriber = observer;
  },
  _call_subscriber(state){}
}





export default store;
window.store = store;
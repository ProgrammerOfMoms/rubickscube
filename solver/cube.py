import numpy as np
import random as rd

class Cube():
    def __init__(self):
        self.history = []
        self.front = np.array([['r']*3]*3)
        self.back = np.array([['o']*3]*3)
        self.left = np.array([['b']*3]*3)
        self.right = np.array([['g']*3]*3)
        self.top = np.array([['y']*3]*3)
        self.bottom = np.array([['w']*3]*3)

    def startPos(self):
        self.history = []
        self.front = np.array([['r']*3]*3)
        self.back = np.array([['o']*3]*3)
        self.left = np.array([['b']*3]*3)
        self.right = np.array([['g']*3]*3)
        self.top = np.array([['y']*3]*3)
        self.bottom = np.array([['w']*3]*3)
    
    
    def set_state(self, state):
        sides = []
        for i in range(6):
            sides.append([])
            for j in range(3):
                sides[i].append([])
                line = state[i*9+j*3:  i*9+j*3+3]
                for k in line:
                    sides[i][j].append(k)
        self.history = []
        self.top = np.array(sides[0])
        self.left = np.array(sides[1])
        self.front = np.array(sides[2])
        self.right = np.array(sides[3])
        self.back = np.array(sides[4])
        self.bottom = np.array(sides[5])
    
    def get_json(self):
        res = {
            "cube": {
                "sides": [
                    {"name": "top", "cells": []},
                    {"name": "left", "cells": []},
                    {"name": "front", "cells": []},
                    {"name": "right", "cells": []},
                    {"name": "back", "cells": []},
                    {"name": "bottom", "cells": []}
                ]
            }
        }
        res['cube']['sides'][0]["cells"] = [x for x in self.printSide(self.top)]
        res['cube']['sides'][1]["cells"] = [x for x in self.printSide(self.left)]
        res['cube']['sides'][2]["cells"] = [x for x in self.printSide(self.front)]
        res['cube']['sides'][3]["cells"] = [x for x in self.printSide(self.right)]
        res['cube']['sides'][4]["cells"] = [x for x in self.printSide(self.back)]
        res['cube']['sides'][5]["cells"] = [x for x in self.printSide(self.bottom)]

        return res
   
    
    def step(self, step):
        if step["side"]== "R":
            self.rotate_right(step["clockwise"], step["count"]) 
        elif step["side"] == "L":
            self.rotate_left(step["clockwise"], step["count"]) 
        elif step["side"]== "D":
            self.rotate_bottom(step["clockwise"], step["count"]) 
        elif step["side"] == "U":
            self.rotate_top(step["clockwise"], step["count"]) 
        elif step["side"] == "F":
            self.rotate_front(step["clockwise"], step["count"])
        elif step["side"] == "B":
            self.rotate_back(step["clockwise"], step["count"])


    def normalView(self):
         return "\nFRONT:\n" + str(self.front) \
                + "\n\nBACK:\n" + str(self.back) \
                + "\n\nLEFT:\n" + str(self.left) \
                + "\n\nRIGHT:\n" + str(self.right) \
                + "\n\nTOP:\n" + str(self.top) \
                + "\n\nBOTTOM:\n" + str(self.bottom)

    def printSide(self, side):
        res = ""
        for i in range(3):
            for j in range(3):
                res += side[i][j]
        return res

    def __str__(self):
        res = ""
        res += self.printSide(self.top)
        res += self.printSide(self.left)
        res += self.printSide(self.front)
        res += self.printSide(self.right)
        res += self.printSide(self.back)
        res += self.printSide(self.bottom)
        return res

    def rotate_front(self, clockwise = True, k = 1):
        if clockwise:
            for i in range(k):
                #Запоминаем сторону
                temp = self.right.copy()

                #Поворот передней стороны
                self.front = np.rot90(self.front.copy(),k=-1)

                #top -> right
                right = np.rot90(self.right.copy(),k=1)
                right[2] = self.top.copy()[2]
                self.right = np.rot90(right,k=-1)

                #left -> top
                self.top[2] = np.rot90(self.left.copy(),k=-1)[2]

                #bottom -> left
                left = np.rot90(self.left.copy(),k=1)
                left[0] = self.bottom.copy()[0]
                self.left = np.rot90(left,k=-1)

                #right -> bottom
                self.bottom[0] = np.rot90(temp,k=-1)[0]

        else:
            for i in range(k):
                #Запоминаем сторону
                temp = self.right.copy()

                #Поворот передней стороны
                self.front = np.rot90(self.front.copy(),k=1)

                #bottom -> right
                right = np.rot90(self.right.copy(),k=-1)
                right[0] = self.bottom.copy()[0]
                self.right = np.rot90(right,k=1)

                #left -> bottom
                self.bottom[0] = np.rot90(self.left.copy(),k=1)[0]

                #top -> left
                left = np.rot90(self.left.copy(),k=-1)
                left[2] = self.top.copy()[2]
                self.left = np.rot90(left,k=1)

                #right -> top
                self.top[2] = np.rot90(temp,k=1)[2]
        if k == 1:
            if clockwise == True:
                self.history.append("F")
            else:
                self.history.append("F'") 
        elif k == 2:
            self.history.append("F2")


    def rotate_back(self, clockwise = True, k = 1):
        if clockwise:
            for i in range(k):
                #Запоминаем сторону
                temp = self.right.copy()

                #Поворот задней стороны
                self.back = np.rot90(self.back.copy(),k=-1)

                #bottom -> right
                right = np.rot90(self.right.copy(),k=-1)
                right[2] = self.bottom.copy()[2]
                self.right = np.rot90(right,k=1)

                #left -> bottom
                self.bottom[2] = np.rot90(self.left.copy(),k=1)[2]

                #top -> left
                left = np.rot90(self.left.copy(),k=-1)
                left[0] = self.top.copy()[0]
                self.left = np.rot90(left,k=1)

                #right -> top
                self.top[0] = np.rot90(temp,k=1)[0]
        else:
            for i in range(k):
                #Запоминаем сторону
                temp = self.right.copy()

                #Поворот задней стороны
                self.back = np.rot90(self.back.copy(),k=1)

                #top -> right
                right = np.rot90(self.right.copy(),k=1)
                right[0] = self.top.copy()[0]
                self.right = np.rot90(right,k=-1)

                #left -> top
                self.top[0] = np.rot90(self.left.copy(),k=-1)[0]

                #bottom -> left
                left = np.rot90(self.left.copy(),k=1)
                left[2] = self.bottom.copy()[2]
                self.left = np.rot90(left,k=-1)

                #right -> bottom
                self.bottom[2] = np.rot90(temp,k=-1)[2]
        if k == 1:
            if clockwise == True:
                self.history.append("B")
            else:
                self.history.append("B'") 
        elif k == 2:
            self.history.append("B2")


    def rotate_left(self, clockwise = True, k = 1):
        if clockwise:
            for i in range(k):
                #Запоминаем сторону
                temp = self.front.copy()
                
                #Поворот левой стороны
                self.left = np.rot90(self.left.copy(),k=-1)
                
                #top -> front
                front = np.rot90(self.front.copy(),k=1)
                front[2] = np.rot90(self.top.copy(),k=1)[2]
                self.front = np.rot90(front.copy(),k=-1)
                
                #back -> top
                top = np.rot90(self.top.copy(),k=1)
                top[2] = np.rot90(self.back.copy(),k=-1)[2]
                self.top = np.rot90(top.copy(),k=-1)

                #bottom -> back
                back = np.rot90(self.back.copy(),k=-1)
                back[2] = np.rot90(self.bottom.copy(),k=1)[2]
                self.back = np.rot90(back.copy(),k=1)             

                #front -> bottom
                bottom = np.rot90(self.bottom.copy(),k=1)
                bottom[2] = np.rot90(temp.copy(),k=1)[2]
                self.bottom = np.rot90(bottom.copy(),k=-1) 
        else:
            for i in range(k):
                #Запоминаем сторону
                temp = self.front.copy()
                
                #Поворот левой стороны
                self.left = np.rot90(self.left.copy(),k=1)
                
                #bottom -> front
                front = np.rot90(self.front.copy(),k=1)
                front[2] = np.rot90(self.bottom.copy(),k=1)[2]
                self.front = np.rot90(front.copy(),k=-1)
                
                #back -> bottom
                bottom = np.rot90(self.bottom.copy(),k=1)
                bottom[2] = np.rot90(self.back.copy(),k=-1)[2]
                self.bottom = np.rot90(bottom.copy(),k=-1)

                #top -> back
                back = np.rot90(self.back.copy(),k=-1)
                back[2] = np.rot90(self.top.copy(),k=1)[2]
                self.back = np.rot90(back.copy(),k=1)             

                #front -> top
                top = np.rot90(self.top.copy(),k=1)
                top[2] = np.rot90(temp.copy(),k=1)[2]
                self.top = np.rot90(top.copy(),k=-1) 
        if k == 1:
            if clockwise == True:
                self.history.append("L")
            else:
                self.history.append("L'") 
        elif k == 2:
            self.history.append("L2")


    def rotate_right(self, clockwise = True, k = 1):
        if clockwise:
            for i in range(k):
                #Запоминаем сторону
                temp = self.front.copy()
                
                #Поворот правой стороны
                self.right = np.rot90(self.right.copy(),k=-1)
                
                #bottom -> front
                front = np.rot90(self.front.copy(),k=-1)
                front[2] = np.rot90(self.bottom.copy(),k=-1)[2]
                self.front = np.rot90(front.copy(),k=1)
                
                #back -> bottom
                bottom = np.rot90(self.bottom.copy(),k=-1)
                bottom[2] = np.rot90(self.back.copy(),k=1)[2]
                self.bottom = np.rot90(bottom.copy(),k=1)

                #top -> back
                back = np.rot90(self.back.copy(),k=1)
                back[2] = np.rot90(self.top.copy(),k=-1)[2]
                self.back = np.rot90(back.copy(),k=-1)             

                #front -> top
                top = np.rot90(self.top.copy(),k=-1)
                top[2] = np.rot90(temp.copy(),k=-1)[2]
                self.top = np.rot90(top.copy(),k=1) 
        else:
            for i in range(k):
                #Запоминаем сторону
                temp = self.front.copy()
                
                #Поворот правой стороны
                self.right = np.rot90(self.right.copy(),k=1)
                
                #top -> front
                front = np.rot90(self.front.copy(),k=-1)
                front[2] = np.rot90(self.top.copy(),k=-1)[2]
                self.front = np.rot90(front.copy(),k=1)
                
                #back -> top
                top = np.rot90(self.top.copy(),k=-1)
                top[2] = np.rot90(self.back.copy(),k=1)[2]
                self.top = np.rot90(top.copy(),k=1)

                #bottom -> back
                back = np.rot90(self.back.copy(),k=1)
                back[2] = np.rot90(self.bottom.copy(),k=-1)[2]
                self.back = np.rot90(back.copy(),k=-1)             

                #front -> bottom
                bottom = np.rot90(self.bottom.copy(),k=-1)
                bottom[2] = np.rot90(temp.copy(),k=-1)[2]
                self.bottom = np.rot90(bottom.copy(),k=1) 
        if k == 1:
            if clockwise == True:
                self.history.append("R")
            else:
                self.history.append("R'") 
        elif k == 2:
            self.history.append("R2")


    def rotate_top(self, clockwise = True, k = 1):
        if clockwise:
            for i in range(k):
                #Запоминаем сторону
                temp = self.front.copy()

                #Поворот правой стороны
                self.top = np.rot90(self.top.copy(),k=-1).copy()

                self.front[0] = self.right[0].copy()
                self.right[0] = self.back[0].copy()
                self.back[0] = self.left[0].copy()
                self.left[0] = temp[0].copy()
        else:
            for i in range(k):
                #Запоминаем сторону
                temp = self.front.copy()

                #Поворот правой стороны
                self.top = np.rot90(self.top.copy(),k=1).copy()

                self.front[0] = self.left[0].copy()
                self.left[0] = self.back[0].copy()
                self.back[0] = self.right[0].copy()
                self.right[0] = temp[0].copy()
        if k == 1:
            if clockwise == True:
                self.history.append("U")
            else:
                self.history.append("U'") 
        elif k == 2:
            self.history.append("U2")


    def rotate_bottom(self, clockwise = True, k = 1):
        if clockwise:
            for i in range(k):
                #Запоминаем сторону
                temp = self.front.copy()

                #Поворот правой стороны
                self.bottom = np.rot90(self.bottom.copy(),k=-1).copy()

                self.front[2] = self.left[2].copy()
                self.left[2] = self.back[2].copy()
                self.back[2] = self.right[2].copy()
                self.right[2] = temp[2].copy()
        else:
            for i in range(k):
                #Запоминаем сторону
                temp = self.front.copy()

                #Поворот правой стороны
                self.bottom = np.rot90(self.bottom.copy(),k=1).copy()

                self.front[2] = self.right[2].copy()
                self.right[2] = self.back[2].copy()
                self.back[2] = self.left[2].copy()
                self.left[2] = temp[2].copy()
        if k == 1:
            if clockwise == True:
                self.history.append("D")
            else:
                self.history.append("D'") 
        elif k == 2:
            self.history.append("D2")

    def getHistory(self):
        return self.history

    def setHistory(self, fileName):
        with open(fileName, 'r') as file:
            text = file.read();
            self.history = text.split(',')[:-1]
            
    def repeatHistory(self):
        history = self.history.copy()
        self.history = []
        for item in history:
            clockwise = True
            k = 1
            side = item
            if len(item) == 2:
                if item[1] == "'":
                    clockwise = False
                if item[1] == "2":
                    k = 2
                side = item[0]  
            if side == "F":
                self.rotate_front(clockwise = clockwise, k = k)
            elif side == "B":
                self.rotate_back(clockwise = clockwise, k = k)
            elif side == "L":
                self.rotate_left(clockwise = clockwise, k = k)
            elif side == "R":
                self.rotate_right(clockwise = clockwise, k = k)
            elif side == "U":
                self.rotate_top(clockwise = clockwise, k = k)
            elif side == "D":
                self.rotate_bottom(clockwise = clockwise, k = k)
                
    def printHistory(self, fileName):
        with open(fileName, 'w') as file:
            for item in self.history:
                file.write(item + ",")

    def shuffle(self, maxIter = 1):
        for i in range(maxIter):
            n = rd.randint(1,6)
            m = rd.randint(1,2)
            switch = rd.randint(0,1)
            if n == 1:
                self.rotate_front(clockwise = (switch == 0), k = m)
            elif n == 2:
                self.rotate_back(clockwise = (switch == 0), k = m)
            elif n == 3:
                self.rotate_left(clockwise = (switch == 0), k = m)
            elif n == 4:
                self.rotate_right(clockwise = (switch == 0), k = m)
            elif n == 5:
                self.rotate_top(clockwise = (switch == 0), k = m)
            elif n == 6:
                self.rotate_bottom(clockwise = (switch == 0), k = m)

    def isAssembled(self):
        return np.array_equal(self.front,np.array([['R']*3]*3)) and \
            np.array_equal(self.back, np.array([['O']*3]*3)) and \
            np.array_equal(self.left, np.array([['G']*3]*3)) and \
            np.array_equal(self.right, np.array([['B']*3]*3)) and \
            np.array_equal(self.top, np.array([['W']*3]*3)) and \
            np.array_equal(self.bottom, np.array([['Y']*3]*3))
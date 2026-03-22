"""
Questions to think about:

- What data structure should we use to represent the 
	connect4 board. 

|  |  |  |  |  |  |


🟡 CPU
🔴 PLAYER

User = 0
CPU = 1
"""
from utils import *

from MiniMax import AIThink
import os 



	
board = [ ["  ","  ","  ","  ","  ","  ","  "], 
				  ["  ","  ","  ","  ","  ","  ","  "], 
				  ["  ","  ","  ","  ","  ","  ","  "], 
				  ["  ","  ","  ","  ","  ","  ","  "], 
				  ["  ","  ","  ","  ","  ","  ","  "], 
				  ["  ","  ","  ","  ","  ","  ","  "]]

def getMove(board, mover):
		
	while True:
		col = input("Which column would you like to play at (1-7):")
		if col.isdigit() and int(col) in [1,2,3,4,5,6,7]:
			col = int(col)
			if playMove(mover,board,col): #If move was valid...
				return 
			else: #if move was invalid...
				print(f"Column {col} is full!")
				continue
		print("Error! Please give a valid move")


				

while True:
	#red
	os.system("clear")
	displayBoard(board)

	getMove(board,mover = "🔴")
	
	if isTie(board):
		print("Tie Game!")
		break

	if checkBoard(board) != False:
		print("winner:" +checkBoard(board))
		break
		
	#yellow
	os.system("clear")
	result = AIThink(board, depth=7, maxPlayer = True, move = None, alpha=float('-inf'), beta=float('inf'))
	col = result[1] +1
	# print("AI chose:",col, "with a score:", result[0])

	playMove(mover = "🟡", board = board, loc = col)
	# input("press enter to go back to player turn")
	displayBoard(board)

	if isTie(board):
		print("Tie Game!")
		break
		
	if checkBoard(board) != False:
		print("winner:" +checkBoard(board))
		break

displayBoard(board)
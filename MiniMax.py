from utils import *
from copy import deepcopy

"""
This function will return a numerical value that'll reflect the positivity of the board position for the computer
range -100 (TERRIABLE) to 100 (BEST)

		1  2  3  4  5  6  7
	|  |  |  |  |  |  |  |
	|  |  |  |  |  |  |  |
	|  |  |  |  |  |  |  |
	|  |  |🟡|  |  |  |  |
	|  |  |🔴|🔴|  |  |  |
	|  |  |🔴|🟡|🟡|  |  |

"""

"""
+ winning state of 4 in a row   + Max points
- opponenet in 4 in a row situation (losing state) - Max points
- fork attacks
+ 3 in a row with an open space
- 3 in a row with open space (must block)


+ 2 in a row with two open spaces (potential)
- 2 in a row with two open spaces for the OPPONENT


+ favor center column
# + favor lower rows

# + slightly favor central areas over edges?!
# - isolated pieces that cant help with future connections

+ moves that create multiple simultaneous threats
- boards where the opponent has multiple wins next turn (-oo)
+ blocking moves for immediate 3 in a row threats
+ force the opponent into defensive posture/moves

+ faster win scores higher (lower depth)
+ flexibility with the piece (more winning lines still open)
- positions where main columns are blocked for ones own pieces

- forced moves (one possible/viable move available --> boxing yourself?
+ diagonal threats rewarded for trickiness??
"""
#                                          -inf    inf
def AIThink(board, depth, maxPlayer, move, alpha , beta):
	# gameover or max search depth is reached
	if checkBoard(board) != False:
		return [evaluateBoard(board,move), move-1]
	
	if depth == 0 or isTie(board) == True:
		return [evaluateBoard(board,move), None]

	#maxplayer
	if maxPlayer:
		best_score = float('-inf') # maxNum = -inf
		best_move = None
		for col in getEmptyCols(board):
			copy_board = deepcopy(board)
			playMove("🟡", copy_board, loc = col+1 )
	
			result = AIThink(copy_board, depth-1, False, col+1, alpha, beta)
			sim_score = result[0]
			move = result[1]

			#update bestscore found
			if sim_score > best_score:
				best_score = sim_score
				best_move = col

			#update alpha
			if best_score > alpha:
				alpha = best_score
				
			# if condition met, break the search
			if beta <= alpha:
				break

		return [best_score,best_move]
		
	#minplayer
	if maxPlayer == False:
		best_score = float('inf') # maxNum = -inf
		best_move = None
		for col in getEmptyCols(board):
			copy_board = deepcopy(board)
			playMove("🔴", copy_board, loc = col+1 )
			#displayBoard(copy_board)
			result = AIThink(copy_board, depth-1, True,col +1,alpha,beta)
			sim_score = result[0]
			move = result[1]

			#update best score
			if sim_score < best_score:
				best_score = sim_score
				best_move = col

			#update beta value
			if best_score < beta:
				beta = best_score

			#if beta is less than max player's choice, then stop search
			if beta <= alpha:
				break
			

		return [best_score,best_move]
	

	#AIThink(modifiedboard,depth- 1, minplayer, pmove)
	
def evaluateBoard(board,pmove):
	"""
	if the board state or position is good for the computer then return a higher/positive score
	if the board state is good for the player then return a low/ negative score

	pmove = col

	lowest point should be roughly -100
	highest point might roughly be +100
	+-1000 represets GAME OVER

	0 1 2 3 4 5 6
	"""
	#print("EVULATING")
	score = 0
	
	#favor center moves
	# if pmove in [2,3,4]:
	# 	score += 5 #value to favor center moves by!
	

		#print("score:",score)
	if checkBoard(board) == "🔴":
		score += -2000
		#print("OPPONENT WINS!!",score)
		return score

	#check for definitive win/lose
	if checkBoard(board) == "🟡":
		#print("yellow wins!")
		score += 2000
		return score
		
	
	#checkForkAttacks returns either a positive or negative score depending on player
	score += checkForkAttacks(board, "🟡", 2000,50)
	score += checkForkAttacks(board, "🔴", 2000,50)
	if score > 500 or score < -500:
		return score
		

	score += countNeighbors(board, "🟡", 7,4)
	score += countNeighbors(board, "🔴", weightFor3 = 14, weightFor2= 8)

		
	return score
	




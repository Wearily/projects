def isTie(board): #check for a full board
	for row in board:
		if "  " in row:
			return False
	return True


def checkBoard(board):
	for player in range(2):
		if player == 0:
			mover = "🔴"
		elif player == 1:
			mover = "🟡"

		for y in range(6): #CHECK HORIZONTAL
			for x in range(4):
				if board[y][x] == mover and board[y][x+1] == mover and board[y][x+2] == mover and board[y][x+3] == mover: #horizontal
					return mover

		for y in range(3): #CHECK VERTICAL
			for x in range(7):
				if board[y][x] == mover and board[y+1][x] == mover and board[y+2][x] == mover and board[y+3][x] == mover: #vertical
					return mover

		for y in range(3): #CHECK DIAGONAL DESC
			for x in range(4):
				if board[y][x] == mover and board[y+1][x+1] == mover and board[y+2][x+2] == mover and board[y+3][x+3] == mover: # diagonal down
					return mover

		for y in range(3,6): #CHECK DIAGONAL ASC
			for x in range(4):
				# print("checking: ",y,x)
				if board[y][x] == mover and board[y-1][x+1] == mover and board[y-2][x+2] == mover and board[y-3][x+3] == mover: # diagonal up
					return mover
	return False

#heuristics ------

def checkForkAttacks(board, mover, win_weight, partial_weight):
	score = 0

	
	for y in range(6): #CHECK HORIZONTAL
		for x in range(3):
			if board[y][x] == "  " and board[y][x+1] == mover and board[y][x+2] == mover and board[y][x+3] == mover and board[y][x+4] == "  ": #horizontal
				if y+1 <= 5 and board[y+1][x] != "  " and board[y+1][x+4] != "  ":
					score += win_weight
				elif y == 5:
					score += win_weight
				else:
					score += partial_weight # for 3 in a row but not a fork
				
	for y in range(2): #CHECK DIAGONAL DESC
		for x in range(3):
			if board[y][x] == "  " and board[y+1][x+1] == mover and board[y+2][x+2] == mover and board[y+3][x+3] == mover and board[y+4][x+4] == "  ": # diagonal down
				if y+4 == 5 and board[y+1][x] != "  ":
					score += win_weight
				elif y == 0 and board[y+1][x] != "  "  and board[y+5][x+4] != "  " :
					score += win_weight
				else:
					score += partial_weight # for 3 in a row but not a fork


	for y in range(4,6): #CHECK DIAGONAL ASC
		for x in range(3):
			if board[y][x] == "  " and board[y-1][x+1] == mover and board[y-2][x+2] == mover and board[y-3][x+3] == mover and board[y-4][x+4] == "  ": # diagonal up
				if y == 5 and board[y-3][x+4] != "  ":
				  score += win_weight
				elif y == 4 and board[y-3][x+4] != "  " and board[y+1][x] != "  ":
					score += win_weight
				else:
					score += partial_weight # for 3 in a row but not a fork
					
	return score * -1 if mover == "🔴" else score


def check3inRow(board,mover, weight):
	score = 0
	for y in range(6): #CHECK HORIZONTAL
		for x in range(4):
			if board[y][x] == "  " and board[y][x+1] == mover and board[y][x+2] == mover and board[y][x+3] == mover: #empty at start
				score += weight
			elif board[y][x] == mover and board[y][x+1] == mover and board[y][x+2] == mover and board[y][x+3] == "  ": #empty at end
				score += weight

	for y in range(3): #CHECK VERTICAL
		for x in range(7):
			if board[y][x] == "  " and board[y+1][x] == mover and board[y+2][x] == mover and board[y+3][x] == mover: #empty at top
				score += weight

	for y in range(3): #CHECK DIAGONAL DESC
		for x in range(4):
			if board[y][x] == "  " and board[y+1][x+1] == mover and board[y+2][x+2] == mover and board[y+3][x+3] == mover: #empty at start
				score += weight
			if board[y][x] == mover and board[y+1][x+1] == mover and board[y+2][x+2] == mover and board[y+3][x+3] == "  ": #empty at end
				score += weight

	for y in range(3,6): #CHECK DIAGONAL ASC
		for x in range(4):
			# print("checking: ",y,x)
			if board[y][x] == "  " and board[y-1][x+1] == mover and board[y-2][x+2] == mover and board[y-3][x+3] == mover: #empty at start
				score += weight
			if board[y][x] == mover and board[y-1][x+1] == mover and board[y-2][x+2] == mover and board[y-3][x+3] == "  ": #empty at end
				score += weight
	
	return score * -1 if mover == "🔴" else score


def countNeighbors(board, mover, weightFor3, weightFor2):
	score = 0
	for y in range(6): #CHECK HORIZONTAL
		for x in range(4):
			nos = 0 #number of spots filled with 'mover'
			if board[y][x] == mover:
				nos += 1
			if board[y][x+1] == mover: 
				nos += 1
			if board[y][x+2] == mover: 
				nos += 1
			if board[y][x+3] == mover: #horizontal
				nos +=1

			if nos == 3:
				score += weightFor3
				
			elif nos == 2:
				score += weightFor2
				

	for y in range(3): #CHECK VERTICAL
		for x in range(7):
			nos = 0 #number of spots filled with 'mover'
			if board[y][x] == mover:
				nos += 1
			if board[y+1][x] == mover:
				nos += 1
			if board[y+2][x] == mover: 
				nos += 1
			if board[y+3][x] == mover: #vertical
				nos += 1
				
			if nos == 3:
				score += weightFor3
		
			elif nos == 2:
				score += weightFor2

	for y in range(3): #CHECK DIAGONAL DESC
		for x in range(4):
			nos = 0 #number of spots filled with 'mover'
			if board[y][x] == mover:
				nos +=1
			if board[y+1][x+1] == mover:
				nos +=1
			if board[y+2][x+2] == mover:
				nos +=1
			if board[y+3][x+3] == mover:
				nos +=1
				
			if nos == 3:
				score += weightFor3

			elif nos == 2:
				score += weightFor2
	
	for y in range(3,6): #CHECK DIAGONAL ASC
		for x in range(4):
			nos = 0 #number of spots filled with 'mover'

			if board[y][x] == mover:
				nos +=1
			if board[y-1][x+1] == mover:
				nos +=1
			if board[y-2][x+2] == mover:
				nos +=1
			if board[y-3][x+3] == mover:
				nos +=1

			if nos == 3:
				score += weightFor3

			elif nos == 2:
				score += weightFor2
				
	return score * -1 if mover == "🔴" else score


def playMove(mover,board,loc): #loc is an int between 1-7 (cols)
	"""
	mover : str
	board : 2D array
	loc : int (1 - 7)
	"""
	for y in range(5,-1,-1):
		# print("row:",y, "col:",loc)
		if board[y][loc-1] == "  ":
				board[y][loc-1] = mover
				return True
	return False


def getEmptyCols(board):
	"""
	returns a list of all column numbers that still has empty slot
	"""
	cols = []
	for x in range(7): #for every col
		for y in range(5,-1,-1): #for each row in that collumn, bottom up
			if board[y][x] == "  ":
				cols.append(x)
				break
	return cols

def displayBoard(board):
	print("  1  2  3  4  5  6  7")
	for y in range(6):
		print("|",end="")
		for x in range(7):
			print(board[y][x],end="")
			if x == 6:
				print("|",end="\n")
			else:
				print("|",end="")
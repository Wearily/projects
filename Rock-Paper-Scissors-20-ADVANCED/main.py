import random
import time as t
import ascii as a
import os

first_to = 20 #number of wins needed to for game to end
game = True #game is on!
games_played = 0

cpoints = 0 #cpu's points
ppoints = 0 #cpu's points

player_last = 0 #player's last move
cpu_last = 0 #computer's last move
last_outcome = 0 #last outcome


#player's move history...
history = {
  1 : {1:1,2:1,3:1}, #rock history
  2 : {1:1,2:1,3:1}, #paper history
  3 : {1:1,2:1,3:1} #scissor history
}

#STARTING SCREEN
print()
print("Rock Paper Scissors")
print()
t.sleep(0.5)
print(a.ascii) #print out the ascii image at the start of the game
t.sleep(3)

def AI1(cpu_prev_move, prev_outcome): #function to figure out cpu's move
  if prev_outcome == 1: # if the last outcome = 1 (win)
    if cpu_prev_move == 1: #if the cpu's last play = rock...
      computer_move = 2 #play paper
    elif cpu_prev_move == 2: #if the cpu's last play = paper...
      computer_move = 3 #play scissors
    elif cpu_prev_move == 3: #if the cpu's last move = scissors...
      computer_move = 1 #play rock
  else: #if cpu lost or drew last game,
    computer_move = random.randint(1,3) #pick a random move

  return computer_move #return the cpu's move

#AI2
def AI2(player_last):
	global history #import history
	total = history[player_last][1]+history[player_last][2]+history[player_last][3]
	rock_odds =  round(history[player_last][1]/total, 2)
	paper_odds = round(history[player_last][2]/total, 2)
	scissors_odds = round(history[player_last][3]/total, 2)
	
	choice = random.choices( [1,2,3], [scissors_odds,rock_odds, paper_odds] )[0] #choice = move that beats player's move
	return choice
  
while game == True:
	os.system("clear") #clear the screen
	#PRINT THE SCORE (if there is one)
	if cpoints or ppoints != 0: #if someone has points... display the score
		
		if cpoints > ppoints: #score if cpu is winning
			print(f"{cpoints}-{ppoints} Computer's Lead")
		elif ppoints > cpoints: #score if player is winning
			print(f"{ppoints}-{cpoints} Player's Lead")
		elif ppoints == cpoints: #score if game is tied
			print(f"The Game is Tied {ppoints}-{cpoints}")
		print()
	
	#CREATE CPU'S CHOICE
	if games_played < 4:
		c=AI1(cpu_last,last_outcome)
	else:
		c=AI2(player_last) #generate computer's choice
	
	#ASK FOR PLAYER'S CHOICE
	p = input("""Make your decision--
	1. Rock
	2. Paper
	3. Scissors
	
	""")
	print()
	
	#EVALUATE PLAYER'S CHOICE
	if player_last != 0: #if player has done a move (also add to dict)
		if p in ["rock","Rock","1","1.","R","r",1]:
			p = 1
			history[player_last][1] +=1
		elif p in ["paper","Paper","2","2.","P","p",2]:
			p = 2
			history[player_last][2] += 1
		elif p in ["scissors","Scissors","sisors","sissors","S","3","3.","s",3]:
			p = 3
			history[player_last][3] += 1
		else:
			#if player put an invalid input,
			continue
		player_last = p
	else: #player hasn't done a move (dont add to dict)
		if p in ["rock","Rock","1","1.","R","r",1]:
			p = 1
		elif p in ["paper","Paper","2","2.","P","p",2]:
			p = 2
		elif p in ["scissors","Scissors","sisors","sissors","S","3","3.","s",3]:
			p = 3
		else:
			#if player put an invalid input,
			continue
		player_last = p
	
	#print(history) #print odds
	
	#DISPLAY PLAYER'S AND COMPUTER'S CHOICES
	if p == 1:
		print("Player picked Rock")
	if p == 2:
		print("Player picked Paper")
	if p == 3:
		print("Player picked Scissors")
	t.sleep(1)
	if c == 1:
		print("Computer picked Rock")
	if c == 2:
		print("Computer picked Paper")
	if c == 3:
		print("Computer picked Scissors")
	print()
	
	#CHECK FOR VICTORY / ADD POINTS
	t.sleep(1)
	if c == p:
		print("Draw!")
		lo = 0
	elif c == 1 and p == 3:
		print("Computer Win!")
		lo = 1
		cpoints += 1
	elif c == 1 and p == 2:
		print("Player Win!")
		lo = 0
		ppoints += 1
	elif c == 2 and p == 1:
		print("Computer Wins!")
		lo = 1
		cpoints += 1
	elif c == 2 and p == 3:
		print("Player Win!")
		lo = 0
		ppoints += 1
	elif c == 3 and p == 1:
		print("Player Win!")
		lo = 0
		ppoints += 1
	elif c == 3 and p == 2:
		print("Computer Win!")
		lo = 1
		cpoints += 1
		
	#DISPLAY THE AMOUNT OF POINTS EACH PLAYER HAS
	t.sleep(1.5)
	print(f"""
	The Player has {ppoints} wins
	The Computer has {cpoints} wins""")
	print()
	t.sleep(1)
	games_played+=1
	
	#IS THE GAME OVER?
	if cpoints == first_to: #did the computer win?
		print("Computer Wins!")
		game = False #end the game
	if ppoints == first_to: #did the player win?
		print("Player Wins!")
		game = False #end the game
	input("Press Enter to Continue...")
		
		
		
	
	
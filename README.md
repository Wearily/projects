# Projects Repository

Welcome to my projects repository! This contains a collection of various interactive applications and games built with different technologies over course of many years. Below is a detailed breakdown of each project!

---

## 📁 Project Overview

### 0. **Queen Archive ("Keep Yourself Archive")** 👑
**Live Site:** [QueenArchive.com](https://queenarchive.com)  
**Source Code:** This project is **not included in this repository** because it has its own separate GitHub repository: [Wearily/queena](https://github.com/Wearily/queena)  
**Language:** JavaScript / TypeScript  
**Stack:** Web app project with a separate dedicated codebase

**What it does:**
Queen Archive is a fan-built archival website focused on the band Queen. It is designed to organize and present information about songs, albums, tours, performances, and related material in a structured and searchable way.

**How it works:**
- The site collects and organizes Queen-related archival information into a browsable web experience
- Content is grouped in a way that helps users explore relationships between releases, performances, and other historical details
- It is built as a standalone project with its own repository because it is larger and more complex than the smaller sample projects in this portfolio

**Why it is separate from this repo:**
This repository is mainly a collection of smaller projects and experiments. Queen Archive is a much larger long-term project, so I keep it in its own dedicated repository to make the codebase easier to manage and maintain.

**Features:**
- Live public website: [QueenArchive.com](https://queenarchive.com)
- Comprehensive archive focused on Queen’s history, discography, concerts, and legacy
- Dedicated concert entries with venue, date, and performance details
- Browsable sections covering albums, live performances, interviews, and related archival content
- Searchable, structured archive experience for exploring relationships across releases and performances
- Standalone long-term project with its own dedicated repository and codebase
### 1. **Chatroom** 💬
**Language:** Node.js (JavaScript)  
**Stack:** Express.js, Socket.io, EJS

**What it does:**
A real-time chat application that allows users to join different chat rooms and communicate with other users. Users can create or join rooms and send messages to everyone in that room.

**How it works:**
- Users register with a username and room name
- The server manages user connections using Socket.io (WebSocket library)
- Messages are broadcast to all users in the same room
- When users disconnect, they're removed from the room
- The app tracks active rooms and displays available rooms on the join page

**Features:**
- Real-time messaging
- Multiple chat rooms
- User presence tracking
- Join/leave notifications

---

### 2. **Connect-4** 🟡🔴
**Language:** Python  
**Dependencies:** Custom game utilities, MiniMax AI

**What it does:**
A Connect-4 game where you play against an AI opponent. The AI uses the MiniMax algorithm with alpha-beta pruning to make optimal moves.

**How it works:**
- The game board is represented as a 2D array (6 rows × 7 columns)
- Players drop pieces into columns, and they fall to the lowest available position
- The AI evaluates game states using the MiniMax algorithm at depth 7
- Game checks for winning conditions (4 in a row: horizontal, vertical, or diagonal)
- Game detects ties when the board is full
- Uses emoji (🔴 for player, 🟡 for CPU) for visual representation

**Features:**
- Intelligent AI opponent using MiniMax with alpha-beta pruning
- Full win detection (horizontal, vertical, diagonal)
- Tie game detection
- Command-line interface with board display

---

### 3. **Investment Game** 📈
**Language:** HTML/CSS/JavaScript  
**Features:** Canvas graphics, local storage for high scores

**What it does:**
An interactive stock market simulation game where you buy and sell stocks trying to maximize your profit. Your goal is to beat your personal high score.

**How it works:**
- A simulated stock price fluctuates randomly over time (drawn on HTML Canvas)
- You start with $300 and 2 shares at $250
- Press SPACEBAR to buy shares at the current price (if you have enough money)
- Press ENTER to sell shares at the current price
- Price is calculated inversely from the Y-position on the canvas chart
- The game lasts 500 time steps
- Your net gain/loss is displayed in real-time
- Your best score is saved to browser cookies (local high score)

**Features:**
- Real-time stock price visualization on Canvas
- Buy/sell mechanics with balance checking
- Average cost tracking
- Net gain/loss calculation
- Local high score persistence
- Game-over conditions (bankruptcy)

---

### 4. **Photo Gallery** 🖼️
**Language:** Node.js (JavaScript)  
**Stack:** Express.js, EJS templates

**What it does:**
A web-based photo gallery application that allows users to upload photos and browse them in a gallery interface.

**How it works:**
- Server serves static files and handles routes
- Users can upload photos to the `/uploads` folder
- Photos are displayed in a gallery view
- EJS templates render the HTML dynamically
- Express serves static assets (CSS, images, client scripts)

**Features:**
- Photo upload functionality
- Gallery view
- Server-side rendering with EJS

---

### 5. **Rock-Paper-Scissors** ✂️📄🪨
**Language:** Node.js (JavaScript)  
**Stack:** Express.js, Mongoose (MongoDB), Socket.io

**What it does:**
A multiplayer Rock-Paper-Scissors game with statistics tracking. All game results are saved to a MongoDB database for analysis.

**How it works:**
- Server connects to MongoDB to store game results
- Each game result includes: outcome (win/loss), player score, computer score, moves played, and timestamp
- Queries database to calculate win/loss statistics and move frequency
- Provides a `/data` endpoint that renders statistics with pie charts (wins vs losses) and bar charts (move frequency)
- Uses Express to serve the game interface
- Mongoose models define the game schema for MongoDB

**Features:**
- Game outcome tracking (wins/losses)
- Move statistics (Rock, Paper, Scissors frequency)
- Win percentage calculation
- MongoDB persistence
- Statistics visualization

---

### 6. **Rock-Paper-Scissors-20-ADVANCED** 🎮
**Language:** Python  
**Stack:** Poetry (dependency management)

**What it does:**
An advanced version of Rock-Paper-Scissors with enhanced features, ASCII art, and more sophisticated gameplay mechanics.

**How it works:**
- Main game loop in `main.py` handles game flow and user input
- `ascii.py` contains ASCII art rendering for visual display
- Game includes enhanced graphics and animations
- Uses Poetry for dependency management (`pyproject.toml`)
- More complex win conditions or gameplay mechanics compared to basic version

**Features:**
- ASCII art visualizations
- Advanced game mechanics
- Better user interface
- Poetry-based project structure

---

### 7. **Sorting-Algorithms-Visualized** 📊
**Language:** HTML/CSS/JavaScript  
**Features:** Canvas visualization, multiple sorting algorithms

**What it does:**
An interactive visualization tool that shows how different sorting algorithms work on an array of numbers. Watch the algorithms sort data in real-time with visual animations.

**How it works:**
- Generates random array of numbers
- Implements multiple sorting algorithms:
  - **Bubble Sort** (`bubble.js`)
  - **Bucket Sort** (`bucket.js`)
  - **Merge Sort** (`merge.js`)
  - **Merge Sort Non-Recursive** (`mergeNR.js`)
  - **Quicksort** (`quicksort.js`)
  - **Selection Sort** (`selectionSort.js`)
- Uses HTML Canvas to draw bars representing array values
- Algorithms animate step-by-step as they sort
- Color coding shows comparisons, swaps, and sorted elements
- Custom fonts (`ZurichBT.ttf`, `ZurichRegular.ttf`) for styling

**Features:**
- Real-time algorithm visualization
- Multiple sorting algorithms
- Step-by-step animation
- Performance comparison
- Canvas-based graphics

---

## 🚀 Getting Started

Each project has its own directory with all necessary files and dependencies. Refer to individual project folders for setup instructions and specific requirements.

### Node.js Projects (Chatroom, Photo Gallery, Rock-Paper-Scissors):
```bash
cd [project-folder]
npm install
npm start  # or check package.json for the exact start command
```

### Python Projects (Connect-4, Rock-Paper-Scissors-20-ADVANCED):
```bash
cd [project-folder]
python main.py  # or python3 main.py
```

### Browser-Based Projects (Investment Game, Sorting-Algorithms-Visualized):
Open the `index.html` file in your web browser.

---

## 📝 License

These projects are part of a learning and development portfolio.

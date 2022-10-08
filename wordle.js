export class Answer {
    constructor(word){
        this.word = word;
        this.key = {};
        this.createKey();
    }

    createKey() {
        for (let i = 0; i < this.word.length; i++){
            const letter = this.word[i];
            this.key[letter] = i;
        }
    }
}

export class Guess {
    constructor(board, guess, count, answer){
        this.board = board;
        this.guess = guess;
        this.count = count;
        this.answer = answer;
    }

    createTiles(){
        for (let i = 0; i < this.guess.length; i++){
            const letter = this.guess[i]
            const tile = new Tile(i, letter, answer)
            
            this.board[this.count].push(tile);
        }
        
    }
}

export class Tile {
    constructor(pos, letter, answer){
        this.pos = pos;
        this.letter = letter;
        this.answer = answer;

        this.correctLetter = false;
        this.correctPos = false;

        this.checkLetter();
        this.checkPos();
    }

    checkLetter() {
        if (this.letter in this.answer){
            this.correctLetter = true;
        };
    }

    checkPos() {
        if (this.answer[this.letter] === this.pos){
            this.correctPos = true;
        }
    }

    correct() {
        return this.correctLetter && this.correctPos;
    }
}

export class Board {
    constructor(answer) {
        this.answer = answer;
        this.grid = [];
        this.count = 0;
        this.generateBoard();
    }

    generateBoard() {
        for (let i = 0; i < 6; i++){
            this.grid.push([]);
        }
    }

    makeGuess(word) {
        const guess = new Guess(this, word, this.count, this.answer.key);
        guess.createTiles();

        if (!this.won(this.count)){
            if (this.count === 5){
                return 'You lose'
            } else {
                this.count++;
            }
        } else {
            return 'You win'
        }
    }

    won(row){
        const currentGuess = this.grid[row];
        for (let tile of currentGuess){
            if (!tile.correct()) return false;
        }

        return true;
    }

    lost(){
        return this.grid[5].length !== 0;
    }
}
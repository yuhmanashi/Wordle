export class Answer {
    constructor(word){
        this.word = word;
        this.key = {};
        this.createKey();
    }

    createKey() {
        for (let i = 0; i < this.word.length; i++){
            const letter = this.word[i];
            this.key[i] = letter;
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
            const tile = new Tile(i, letter, this.answer)
            this.board.grid[this.count][i].push(tile);
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

        this.correct = this.correct.bind(this);

        this.checkLetter();
        this.checkPos();
    }

    checkLetter() {
        if (Object.values(this.answer).includes(this.letter)){
            this.correctLetter = true;
        };
    }

    checkPos() {
        if (this.answer[this.pos] === this.letter){
            this.correctPos = true;
        }
    }

    correct() {
        return this.correctLetter && this.correctPos;
    }
}

export class Board {
    constructor(answer) {
        this.answer = new Answer(answer);
        this.grid = [];
        this.count = 0;

        this.makeGuess = this.makeGuess.bind(this);

        this.generateBoard();
    }

    generateBoard() {
        for (let i = 0; i < 6; i++){
            this.grid.push([]);
            for (let j = 0; j < 5; j++){
                this.grid[i].push([]);
            }
        }
    }

    makeGuess(word) {
        const guess = new Guess(this, word, this.count, this.answer.key);
        guess.createTiles();

        if (!this.won(this.count)){
            if (this.count === 5){
                console.log('L')
            } else {
                this.count++;
            }
        } else {
            console.log('W')
        }
    }

    won(row){
        const currentGuess = this.grid[row];
        console.log(currentGuess)
        for (let tile of currentGuess){
            if (!tile.correct) return false;
        }

        return true;
    }

    lost(){
        return this.grid[5].length !== 0;
    }
}
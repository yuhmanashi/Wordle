import { WORDS } from './components/words'

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

export class Tile {
    constructor(pos, letter, answer, count){
        this.count = count;
        this.pos = pos;
        this.letter = letter;
        this.answer = answer;

        this.correctLetter = false;
        this.correctPos = false;
        
        this.checkLetter();
        this.checkPos();

        this.correct = this.correct.bind(this);
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

        this.generateBoard();
    }

    generateBoard() {
        const row = ["", "", "", "", ""];
        for (let i = 0; i < 6; i++){
            this.grid.push(row);
            // for (let j = 0; j < 5; j++){
            //     this.grid[i].push("");
            // }
        }
    }

    updateRow(word){
        const count = this.count
        if (count > 5) return;
        const newRow = ["", "", "", "", ""];
        for (let i = 0; i < word.length; i++){
            const tile = new Tile(i, word[i], this.answer.key, count);
            newRow[i] = tile
        }

        this.grid[count] = newRow;
    }

    validWord(word){
        return WORDS.includes(word)
    }

    checkGuess(word) {
        if (!this.validWord(word)){
            console.log('Invalid Word')
            return false;
        } else {
            this.checkWin();
            return true;
        }
    }

    checkWin() {
        if (!this.win(this.count)){
            this.count++;
            if (this.count === 6){
                console.log('L')
            }
        } else {
            console.log('W')
        }
    }

    win(row){
        const currentGuess = this.grid[row];
        for (let tile of currentGuess){
            if (!tile.correct()) return false;
        }

        return true;
    }
}
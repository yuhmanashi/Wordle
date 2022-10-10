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
            if (letter in this.key){
                this.key[letter].push(i);
            } else {
                this.key[letter] = [i]
            }
        }
    }
}

export class Tile {
    constructor(pos, letter, answer, count, word){
        this.count = count;
        this.pos = pos;
        this.letter = letter;
        this.answer = answer;
        this.word = word;

        this.correctLetter = false;
        this.correctPos = false;
        
        this.checkLetter();
        this.checkPos();

        this.correct = this.correct.bind(this);
    }

    checkLetter() {
        if (this.letter in this.answer){
            this.correctLetter = true;
        };
    }

    checkPos() {
        if (this.answer[this.letter]){
            if(this.answer[this.letter].includes(this.pos)){
                this.correctPos = true;
            }
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
        this.guessCount = {};

        this.generateBoard();
    }

    checkLetterCount() {
        const count = this.letterCount();
    }

    letterCount() {
        const count = {};
        for (let letter of this.word){
            if (letter in count){
                count[letter] += 1;
            } else {
                count[letter] = 1;
            }
        }

        this.guessCount = count;
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
            const tile = new Tile(i, word[i], this.answer.key, count, word);
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
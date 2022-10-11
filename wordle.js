import { transformFileSync } from '@babel/core';
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
    constructor(pos, letter, answer, count){
        this.count = count;
        this.pos = pos;
        this.letter = letter;
        
        this.answer = answer;

        this.correctLetter = false;
        this.correctPos = false;
        
        this.checkPos();
        this.checkLetter();

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

export class Guess {
    constructor(guess, answer, count){
        this.guess = guess
        this.answer = answer
        this.count = count
    }

    guessCount() {
        const count = {};
        for (let letter of this.guess){
            if (letter in count){
                count[letter] += 1;
            } else {
                count[letter] = 1;
            }
        }

        return count;
    }

    guessCheck(){
        for (let i = 0; i < 5; i++){
            const guess = this.guess[i];
            const ans = this.answer[i];
            if (guess === ans){

            }
        }
    }

    createTiles(pos, word, ans, count){
        const tiles = [];
        for (let i = 0; i < word.length; i++){
            const tile = new Tile(pos, word[i], ans, count);
            tiles.push(tile)
        } 

        return tiles;
    }

    //ans is a key
    // ans[letter] = [positions]

    checkGuess(){
        // let guessCount = this.guessCount();
        // let correctLetters = Object.keys(guessCount); // returns all correct letters in answer
        // for (let letter of correctLetters){
        //      const correctPositions = this.answer[letter] // returns all positions where letter is correct
        //      const positions = guessCount[letter] // returns all positions of letter in guess
        //      if (positions.length > correctPositions.length){
        //          
        //      }
        //      look for mismatches
        // }
        // let incorrectPos = [];
        
        for (let i = 0; i < this.guess; i++){
            // const letter = this.guess[i]
            // const positions = this.answer[letter]
            // let correctLetter = positions === undefined ? false : true;
            // let correctPos = false;
            // if (correctLetter){
            //    correctPos = positions.includes(i) ? true : false
            // }
            
            // if (correctLetter && !correctPos)
        }
    }
}
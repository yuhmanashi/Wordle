import { WORDS } from './components/words'

export class Tile {
    constructor(pos, letter, attempt){
        this.pos = pos;
        this.letter = letter;
        this.attempt = attempt;

        this.correctLetter = false;
        this.correctPos = false;
    }

    toggleLetter(){
        this.correctLetter = true;
    }

    togglePos(){
        this.correctPos = true
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
        this.won = false;

        this.generateBoard();
    }

    generateBoard() {
        const row = ["", "", "", "", ""];
        for (let i = 0; i < 6; i++){
            this.grid.push(row);
        }
    }

    updateRow(word){
        const count = this.count
        
        if (count > 5) return;
        const guess = new Guess(word, this.answer, count);
        const tiles = guess.createTiles();

        const newRow = ["", "", "", "", ""];

        for (let i = 0; i < tiles.length; i++){
            newRow[i] = tiles[i];
        }

        this.grid[count] = newRow;
    }

    validWord(word){
        return WORDS.includes(word)
    }

    checkGuess(word) {
        this.updateRow(word);

        if (!this.validWord(word)){
            console.log('Invalid Word')
            return false;
        } else {
            this.checkWin()
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
            this.count++
            this.won = true;
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
    constructor(guess, answer, attempt){
        this.guess = guess
        this.answer = answer
        this.attempt = attempt
    }

    letterCount(word) {
        const count = {};
        for (let letter of word){
            if (letter in count){
                count[letter] += 1;
            } else {
                count[letter] = 1;
            }
        }

        return count;
    }

    checkLetter(tiles){
        const ansCount = this.letterCount(this.answer);
        const guessCount = {};

        for (let i = 0; i < tiles.length; i++){
            const guess = this.guess[i];
            if (!(guess in guessCount)){
                guessCount[guess] = 0;
            }

            if (tiles[i].correctPos){ 
                guessCount[guess]++;
            } 
        }

        for (let i = 0; i < tiles.length; i++){
            const guess = this.guess[i];
            
            if (guess in ansCount){
                if (!tiles[i].correctPos){
                    if (guessCount[guess] < ansCount[guess]){
                        tiles[i].toggleLetter();
                        guessCount[guess]++
                    }
                }
            }
        }
    }

    checkPos(tiles) {
        for (let i = 0; i < this.guess.length; i++){
            const guess = this.guess[i];
            const ans = this.answer[i];

            if (guess === ans){
                tiles[i].toggleLetter();
                tiles[i].togglePos();
            }
        }
    }

    createTiles(){
        const tiles = [];

        for (let i = 0; i < this.guess.length; i++){
            const tile = new Tile(i, this.guess[i], this.attempt);
            tiles.push(tile)
        }

        this.checkPos(tiles);
        this.checkLetter(tiles);
        return tiles;
    }
}
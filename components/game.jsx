import React from 'react';
import { WORDS } from './words';
import Board from './board';
// import GuessForm from './guess_form';
import GuessForm from './test';
import Keyboard from './keyboard';
import * as Wordle from '../wordle';

const answer = WORDS[Math.floor(Math.random() * (WORDS.length - 1))]
// const answer = 'tenth';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board: new Wordle.Board(answer),
            guess: ""
        }

        // this.updateBoard = this.updateBoard.bind(this);
        // this.updateGame = this.updateGame.bind(this);
    }



    // updateBoard() {
    //     this.setState({ board: this.state.board })
    // }

    // updateGame() {
    //     this.setState({ 
    //         board: this.state.board,
    //         guess: this.state.guess, 
    //     })
    // }
    
    render() {
        // console.log(this.state.board)
        return(
            <div id='main'>
                <h1>Wordle</h1>
                <div id="display"> 
                    {answer}
                </div>
                {/* <Board board={this.state.board} /> */}
                <br></br>
                <GuessForm board={this.state.board} />
            </div>
        )
    }
}
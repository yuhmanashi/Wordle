import React from 'react';
import { WORDS } from './words';
import Board from './board';
// import GuessForm from './guess_form';
import GuessForm from './test';
import * as Wordle from '../wordle';

const answer = WORDS[Math.floor(Math.random() * (WORDS.length - 1))]

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.answer = answer;
        this.state = {
            board: new Wordle.Board(this.answer),
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
                <div id="display"> 
                    {this.answer}
                </div>
                {/* <Board board={this.state.board} /> */}
                <br></br>
                <GuessForm board={this.state.board} />
            </div>
        )
    }
}
import React from 'react';
import { WORDS } from './words';
import Board from './board';
import GuessForm from './guess_form';
import * as Wordle from '../wordle';

const answer = WORDS[Math.floor(Math.random() * (WORDS.length - 1))]

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.answer = answer;
        this.state = {
            board: new Wordle.Board(this.answer),
        }
    }

    render() {
        return(
            <div id='main'>
                <div id="display"> 
                    {this.answer}
                </div>
                <Board board={this.state.board} />
                <GuessForm board={this.state.board} />
            </div>
        )
    }
}
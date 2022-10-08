import React from 'react';
import { WORDS } from './words';
import GuessForm from './guess_form';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.answer = "";
        this.guess = "";
    }

    generateWord() {
        return WORDS[Math.floor(Math.random() * WORDS.length - 1)]
    }

    render() {
        return(
            <div id='main'>
                <h1>Wordle</h1>
                <div id="display"> 
                    {this.generateWord()}
                </div>
                <GuessForm />
            </div>
        )
    }
}

export default Game;
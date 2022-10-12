import React from 'react';
import Board from './board';
import Keyboard from './keyboard';

export default class GuessForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board: this.props.board,
            guess: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.makeBoard = this.makeBoard.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    checkClick(){

    }

    handleClick(key){
        const e = {key: key}
        // if (key === 'enter' && guess.length === 5)
        this.handleKeydown(e)
    }

    handleKeydown(e){
        const key = e.key.toLowerCase();
        const guess = this.state.guess;
        const alphabet = new Set('abcdefghijklmnopqrustuvwxyz'.split(''));

        if (this.state.board.won === true) return;

        if (guess.length >= 5){
            if (key !== 'backspace' && key !== 'enter'){
                return;
            }
        } 

        if (key === 'enter' && guess.length === 5){
            this.handleSubmit();
        } else if (key === 'backspace'){
            this.setState({ guess: guess.slice(0, guess.length - 1)})
        } else if (alphabet.has(key)){
            const newGuess = guess + key
            this.setState({ guess: newGuess })
        }
    }

    componentDidMount(){
        document.addEventListener('keydown', this.handleKeydown, false)
    }

    handleSubmit(){
        if (this.props.board.checkGuess(this.state.guess)){
            this.setState({ guess: "" })
        };
    }

    makeBoard(){
        this.state.board.updateRow(this.state.guess);

        return (
            <Board board={this.state.board} />
        )
    }

    render(){
        return(
            <div className='display'>
                {this.makeBoard()}
                <br />
                <Keyboard handleClick={this.handleClick} board={this.state.board} />
            </div>
        )
    }
}
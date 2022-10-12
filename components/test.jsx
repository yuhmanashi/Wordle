import React from 'react';
import Board from './board';

export default class GuessForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board: this.props.board,
            guess: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.makeBoard = this.makeBoard.bind(this);
        this.input = this.input.bind(this);
    }

    update(){
        return e => this.setState({ guess: e.target.value })
    }
    
    handleSubmit(e){
        e.preventDefault();
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

    input(){
        return (
            <form id="form" onSubmit={this.handleSubmit}>
                <input type="text" 
                    maxLength="5"
                    className='input'
                    value={this.state.guess}
                    placeholder="Enter a guess"
                    onChange={this.update()}
                    />
                <input type="submit" />
            </form>
        )
    }

    render(){
        return(
            <div>
                {this.makeBoard()}
                <br />
                {this.input()}
                {/* <Keyboard guess={this.state.guess} updateGuess={this.updateGuess} /> */}
            </div>
        )
    }
}
import React from 'react';

export default class GuessForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            guess: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    update(){
        // console.log(this.state.guess)
        return e => this.setState({ 'guess': e.target.value })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.board.makeGuess(this.state.guess);
        this.setState({ guess: "" })
    }

    render(){
        return(
            <form id="form" onSubmit={this.handleSubmit}>
                <input type="text" 
                    className='input'
                    value={this.state.guess}
                    placeholder="Enter a guess"
                    onChange={this.update()}
                />
                <input type="submit" />
            </form>
        )
    }
}
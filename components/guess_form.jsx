import React from 'react';

class GuessForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            guess: "",
        }
    }

    update(){
        return e => this.setState({ 'guess': e.target.value })
    }

    handleSubmit(){
        e.preventDefault();
    }

    render(){
        <div>
            Hi
        </div>
    }
}

export default GuessForm;
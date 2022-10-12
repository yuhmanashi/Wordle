import React from 'react';

export default class Keyboard extends React.Component {    
    constructor(props){
        super(props);
        this.state = {
            colors: {}
        }
        
        this.createKeys = this.createKeys.bind(this);
        this.handleKeyClick = this.handleKeyClick.bind(this);
        this.handleActionClick = this.handleActionClick.bind(this);
        this.updateColors = this.updateColors.bind(this);
    }
    
    handleKeyClick(e) {
        const key = e.currentTarget.getAttribute('value');
        this.props.handleClick(key);
    }

    handleActionClick(e) {
        const action = e.currentTarget.getAttribute('value');
        const board = this.props.board;
        const count = board.count;

        this.props.handleClick(action);
        if (action === 'enter'){
            const newCount = board.count;
            this.updateColors(board, count, newCount);
        }
    }

    updateColors(board, count, newCount){
        if (count !== newCount){
            const row = board.grid[count];
            
            for (let tile of row){
                const { letter, correctLetter, correctPos } = tile;
                const colors = this.state.colors
                const upLetter = letter.toUpperCase();

                if (colors[upLetter] === '#E1C16E'){
                    if (correctPos) colors[upLetter] = '#93C572';
                }

                if (!(upLetter in colors)){
                    if (correctPos){
                        colors[upLetter] = '#93C572';
                    } else if (correctLetter){
                        colors[upLetter] = '#E1C16E';
                    } else {
                        colors[upLetter] = 'grey';
                    }
                }
            }
        }
    }

    createKeys(s){
        const keys = s.split('');

        return keys.map(key => {
            let bgColor = 'lightgrey';
            let color = 'black';

            const colors = this.state.colors;
            if (key in colors){
                bgColor = colors[key];
                color = 'white';
            }

            return <div className='keys' key={key} value={key} onClick={this.handleKeyClick} style={{ background: bgColor, borderColor: bgColor, color: color }}>
                {key}
            </div>
        })
    }
    
    render(){
        const keys1 = 'QWERTYUIOP'
        const keys2 = 'ASDFGHJKL'
        const keys3 = 'ZXCVBNM'

        return(
            <div className='keyboard'>
                <div className='key-row'>
                    {this.createKeys(keys1)}
                </div>
                <div className='key-row'>
                    {this.createKeys(keys2)}
                </div>
                <div className='key-row'>
                    <div className='keys2' onClick={this.handleActionClick} value='enter'>
                        ENTER
                    </div>
                    {this.createKeys(keys3)}
                    <div className='keys2' onClick={this.handleActionClick} value='backspace'>
                        DELETE
                    </div>
                </div>
            </div>
        )
    }
}
import React from 'react';
import Tile from './tile';

export default class Board extends React.Component {
    render(){
        console.log(this.props)
        return (
            <div id='board'>
                {this.props.board.grid.map((row, i) => {
                    return <div className='row' key={i}>{row.map((tile, i) => {
                        return <Tile tile={tile} key={i} className="tile" id={i} />
                    })}
                    </div>
                })}
            </div>
        )
    }
}
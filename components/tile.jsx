import React from 'react';

export default class Tile extends React.Component {
    render(){
        const tile = this.props.tile;
        const count = this.props.count;
        
        let letter = "";
        let bColor = 'lightgray';
        let bgColor = 'white';
        let fColor = 'black';
        
        if (tile !== ''){
            letter = tile.letter.toUpperCase();
            bColor = 'black';
            
            if (tile.attempt !== count){
                fColor = 'white';
                if (tile.correct()){
                    bColor = '#93C572'
                    bgColor = '#93C572'
                } else if (tile.correctLetter){
                    bColor = '#E1C16E'
                    bgColor = '#E1C16E'
                } else {
                    bColor = 'grey'
                    bgColor = 'grey'
                }
            }
        }

        return (
            <div className='tile' style={{ color: fColor, borderColor: bColor, backgroundColor: bgColor }}>
                {letter}
            </div>
        )
    }
};
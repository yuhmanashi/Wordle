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
            
            if (tile.count !== count){
                fColor = 'white';
                if (tile.correct()){
                    bColor = 'green'
                    bgColor = 'green'
                } else if (tile.correctLetter){
                    bColor = 'yellow'
                    bgColor = 'yellow'
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
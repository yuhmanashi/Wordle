import React from 'react';

export default class Tile extends React.Component {
    render(){
        let letter = "";
        let tile = 'hidden';
        
        tile = `${this.props.className} ${this.props.id}`
        return (
            <div className={tile}>
            </div>
        )
    }
};
import React from 'react';

export default class Keyboard extends React.Component {        
    constructor(props){
        super(props);
        this.handleKeydown = this.handleKeydown.bind(this);
    }
    
    handleKeydown(e){
        e.preventDefault();
        console.log(e.currentTarget.getAttribute('value'));
    }

    componentDidMount(){
        document.addEventListener('keydown', this.handleKeydown, false)
    }

    // componentWillUnmount(){
    //     document.removeEventListener('keydown', this.handleKeydown, false)
    // }

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
                    <div className='keys2' onClick={this.handleOtherClick} value='enter'>
                        ENTER
                    </div>
                    {this.createKeys(keys3)}
                    <div className='keys2' onClick={this.handleOtherClick} value='delete'>
                        DELETE
                    </div>
                </div>
            </div>
        )
    }
}
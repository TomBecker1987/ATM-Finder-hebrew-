import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

class Input extends Component {

    componentDidMount(){
        console.log('kakpoo')
    }

    render() {

        return (
            <>
                <input className="input" type="text" placeholder="הכנס עיר" value={this.props.searchValue} onChange={this.props.updateState}></input>
            </>
        )
    }
}

export default Input
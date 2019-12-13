import React, { Component } from 'react'
import { Input , Paper, Button, Typography, List, ListItem, ListItemTexty } from '@material-ui/core'
import Box from './Box'
import SearchIcon from '@material-ui/icons/Search'
  
const styles = {
    Input: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        overflowY: 'auto',
        overflowX: 'auto',
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'end'
    },
    Results: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        overflowY: 'auto',
        overflowX: 'auto',
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'end'
    }
}

class SideSearch extends Component {

    render(){

        let results = this.props.results

        return (
            <>
                <div className="search">
                    <Box mr={1}>
                        <Paper style={styles.Input}>
                            <Input value={this.props.input} onChange={this.props.updateInput}  placeholder="הקלד עיר"/>
                            <Button onClick={this.props.postRequest}>
                                <SearchIcon />
                            </Button>
                        </Paper>
                    </Box>
                </div>
                <div className="results" style={{height: '600px'}}>
                    <Box mr={1} height="600px">
                        <Paper style={styles.Results}>
                            <List component="ul" style={{height: '100%'}}>
                                {results.map( r => (
                                   <ListItem style={{display: 'inline-block', width: '100%', marginTop: 5}}>
                                        <Button style={{display: 'inline-block', width: '100%'}} onClick={() => this.props.updateLocation(19, r.Y_Coordinate, r.X_Coordinate)}>
                                            <Typography align="right" variant="body1">
                                                {`${r.Bank_Code}-${r.Bank_Name}`}
                                            </Typography>
                                            <Typography align="right" variant="body2" color="textSecondary">
                                                {`${r.ATM_Address} | ${r.ATM_Type}`}
                                            </Typography>
                                        </Button>
                                   </ListItem> 
                                ) )}
                            </List>
                        </Paper>
                    </Box>
                </div>
            </>
        )
    }
}

export default SideSearch
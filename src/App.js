import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Map from './components/Map'
import { Grid, Dialog, DialogContent, Typography } from '@material-ui/core'
import SideSearch from './components/SideSearch'


class App extends Component {

  state = {
    results: [],
    currentSearch: '',
    zoom: 7.7,
    coordinates: {
      lat: 31.346051,
      lng: 34.851612
    },
    dialogOpen: false
  }

  componentDidMount(){
    let search = this.state.currentSearch
    
  }

  updateSearchState = event => {
    this.setState({
      currentSearch: event.target.value
    })
  }

  postRequest = () => {
    let search = this.state.currentSearch
    axios.post(`https://data.gov.il/api/3/action/datastore_search?resource_id=${process.env.RESOURCE_ID}&q=${search}&limit=50`)
      .then(res => {
        console.log(res.data.result.records)
        if (res.data.result.records[0]) {
          const newCoordinates = {
            lat: res.data.result.records[1].Y_Coordinate,
            lng: res.data.result.records[1].X_Coordinate
          }
          this.setState({
            results: res.data.result.records,
            zoom: 14,
            coordinates: newCoordinates
          })
        } else {
          this.toggleDialog()
        }
      })
  }

  updateLocation = (zoom, lat, lng) => {

    const newCoordinates = {
      lat,
      lng
    }
    
    this.setState({
      zoom,
      coordinates: newCoordinates
    })
  }

  toggleDialog = () => {
    this.setState({
      dialogOpen: !this.state.dialogOpen
    })
  }

  render() {
    return (
      <>
        <Dialog open={this.state.dialogOpen} onClose={this.toggleDialog}>
          <DialogContent style={{padding: 30}}>
            <Typography variant="h4">אין תוצאות לחיפוש</Typography>
          </DialogContent>
        </Dialog>
        <Grid container spacing={2} sm={12}>
          <Grid item sm={3} spacing={8}>
            <SideSearch 
              input={this.state.currentSearch} 
              updateInput={this.updateSearchState}
              postRequest={this.postRequest}
              results={this.state.results}
              updateLocation={this.updateLocation}
            />
          </Grid>
          <Grid item sm={9} style={{height: '100vh', paddingTop:20}}> 
            <Map 
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{height: "100%"}}/>}
              containerElement={<div style={{height: "100%"}}/>}
              mapElement={<div style={{height: "100%"}}/>}
              currentSearch={this.state.currentSearch}
              results={this.state.results}
              zoom={this.state.zoom}
              coordinates={this.state.coordinates}
            >
              
            </Map>
          </Grid>
        </Grid>
      </>
    )
  }
}


export default App;

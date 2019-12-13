import React, { Component } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'


class Map extends Component {

    render(){

        const markers = null

        return (
            <GoogleMap zoom={this.props.zoom} center={this.props.coordinates}>
                {this.props.results.length === 0
                    ? null
                    : this.props.results.map( res => (
                        <Marker key={res._id} position={{lat:res.Y_Coordinate, lng:res.X_Coordinate}}/>
                    ) )
                }
            </GoogleMap>
        )
    }

}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap
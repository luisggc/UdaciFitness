import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { gray, white, blue, purple } from '../utils/colors'
import { connect } from 'react-redux'
import Foundation from '@expo/vector-icons/Foundation';
import { Location, Permissions } from 'expo'
import { calculateDirection } from './../utils/helpers';

class Live extends Component {

    state = {
        coords: null,
        status: null,
        direction: ''
    }

    componentDidMount = () => {
        console.log("mount\n\n")
        Permissions.getAsync(Permissions.LOCATION)
        .then(this.afterCheckPermission)
    }

    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)
        .then(this.afterCheckPermission)
    }

    setLocation = () => {
        Location.watchPositionAsync({
          enableHighAccuracy: true,
          timeInterval: 1,
          distanceInterval: 1,
        }, ({ coords }) => {
          const newDirection = calculateDirection(coords.heading)
          const { direction, bounceValue } = this.state
    
          this.setState(() => ({
            coords,
            status: 'granted',
            direction: newDirection,
          }))
        })
      }

    afterCheckPermission = ({ status }) => {
        if(status == 'granted'){
            return this.setLocation()
        }
        this.setState(() => { status })
        .catch((error) => {
            console.warn(error)
            this.setState(() => { status: 'undetermined' })
        })
    }


    render() {
        const { coords, direction, status } = this.state

        if (status === null) {
            return <ActivityIndicator style={{marginTop: 30}}/>
          }

        if (status === 'granted') {
            //GPS RETURNS NULL FOR ALTITUDE AND SPEED
            console.log(JSON.stringify(coords) + "\n" + direction + "\n")
            const { altitude, speed } = coords
            return(
            <View style={styles.item}>
                <View style={ styles.center }>
                    <Text style={{fontSize : 30 }} >You are heading</Text>
                    <Text style={{fontSize : 70, color: purple }} >{direction}</Text>
                </View>
                <View style={styles.metricsContainer}>

                    <View style={styles.metric} >
                        <Text style={{fontSize : 30, color: white }} >Altitude</Text> 
                        <Text style={{fontSize : 20, color: white }} >{Math.round(altitude)}m</Text>    
                    </View>

                    <View style={styles.metric} >
                        <Text style={{fontSize : 30, color: white }} >Speed</Text> 
                        <Text style={{fontSize : 20, color: white }} >{Math.round(speed)}km/h</Text> 
                    </View>

                </View>
            </View>
        )}
        
        if(status === null){
            return(
                <View style={ styles.center } >
                    <Foundation name='alert' size={50} />
                    <Text style={styles.message} >You need to enable location services on this app.</Text>
                    <TouchableOpacity style={ styles.btn } onPress={this.askPermission} >
                        <Text style={{color: white}} >Enable</Text>
                    </TouchableOpacity>
                </View>
        )}

        if(status === 'denied'){
            return(
            <View style={ styles.center } >
                <Foundation name='alert' size={50} />
                <Text style={styles.message} >
                    You denied your location. You can fix this by visiting your settings and
                    enabling location services for this app.
                </Text>
            </View>
        )}

    }
}

const styles = StyleSheet.create({
    message: {
        marginHorizontal: 25,
        marginVertical: 10,
        textAlign: 'center'
    },
    btn: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: purple,
        borderRadius: 2
    },
    center: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    metricsContainer:{
        flexDirection: 'row',
        backgroundColor: purple,
        justifyContent: 'space-around',
        paddingVertical: 20
    },
    metric: {
        backgroundColor: 'rgba(255,255,255,.1)',
        padding: 10,
        alignItems: 'center',
        width: 140,
    },
    item:{
        flex: 1,
        backgroundColor: white,
        justifyContent: 'space-between',
    },
})

export default Live



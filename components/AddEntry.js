import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminder,
  setLocalNotification,
  clearLocalNotification
} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { white, purple, blue } from '../utils/colors'
import {NavigationActions} from 'react-navigation';
  
function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={{fontSize: 20, color: white}} >Send</Text>
        </TouchableOpacity>
    )
}
class AddEntry extends Component {

  defaultState = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState((state) => {
      const count = state[metric] + step
      return {
        ...state,
        [metric]: count > max ? max : count,
      }
    })
  }

  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step
      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  submit = () => {
      const key = timeToString()
      const entry = this.state
      this.props.dispatch(addEntry({[key]:entry}))
      submitEntry({key,entry})
      this.setState(() => (this.defaultState))
      this.toHome()

      clearLocalNotification()
      .then(setLocalNotification)
  }

  reset = () => {
    const key = timeToString()
    this.setState(() => (this.defaultState))
      this.props.dispatch(addEntry({
        [key]:getDailyReminder()
      }))
      removeEntry(key)
      this.toHome()
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddEntry'
    }))
  }

  render() {
    if(this.props.alreadyLogged){
        return(
            <View style={styles.containerCenter} >
                <Ionicons name='ios-happy-outline' size={100}/>
                <Text style={{fontSize: 20 }} > You already logged</Text>
                <TextButton onPress={this.reset} >
                  Reset
                </TextButton>
            </View>
        )
    }
    const metaInfo = getMetricMetaInfo()
    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key} style={styles.row} >
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaciSteppers
                    value={value}
                    onIncrement={() => this.increment(key)}
                    onDecrement={() => this.decrement(key)}
                    {...rest}
                  />}
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  const key = timeToString()
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined' 
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  containerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 35,
    backgroundColor: purple
  }
})

export default connect(mapStateToProps)(AddEntry)
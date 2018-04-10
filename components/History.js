import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { fetchCalendarResults } from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import { timeToString, getDailyReminderValue  } from '../utils/helpers'
import DateHeader from './DateHeader'
import { white } from '../utils/colors'
import AddEntry from './AddEntry'
import MetricCard from './MetricCard'
import { AppLoading } from 'expo'

class History extends Component {

    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props
        fetchCalendarResults()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({ entries }) => {
               if (!entries[timeToString()]){
                    dispatch(addEntry({
                       [timeToString()]: getDailyReminderValue()
                    }))
                }
            })
            .then(() => this.setState(() => ({
                ready: true
            })))
    }

    renderItem = ({ today, ...metrics }, formattedDate, key) => (
        
        today
        ?   this.renderEmptyDate(formattedDate, today)
        :   <View style={styles.item}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'EntryDetails',
                { entryId: key }
            )}>
                    <MetricCard date={formattedDate} metrics={metrics} />
                </TouchableOpacity>
            </View>
      )

    renderEmptyDate(formattedDate, text="You didn't log any data on this day.") {
        return (
          <View style={styles.item}>
            <DateHeader date={formattedDate}/>
            <Text style={styles.noDataText}>
              {text}
            </Text>
          </View>
        )
      }

    render() {
        const { entries } = this.props

        return !this.state.ready ? <AppLoading /> :
        (
                <View style={{flex:1}}>
                <UdaciFitnessCalendar
                    items={ entries }
                    renderItem={ this.renderItem }
                    renderEmptyDate={ this.renderEmptyDate }
                />
                <Text style={{height:20}} >Made by Luis Coimbra for UdacityProject</Text>
                </View>
        )
    }
}

function mapStateToProps (entries) {
    return { entries }
}

const styles = StyleSheet.create({
    item:{
        borderRadius: 16,
        marginHorizontal: 20,
        marginTop: 10,
        padding:10,
        backgroundColor: white,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 4
        },
    },
    noDataText: {
        fontSize: 20,
        paddingVertical: 20
    }
})

export default connect(mapStateToProps)(History)
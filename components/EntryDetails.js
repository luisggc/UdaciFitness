import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MetricCard from './MetricCard'
import { gray, white } from '../utils/colors'
import { connect } from 'react-redux'
import { addEntry } from '../actions';
import { getDailyReminderValue, timeToString } from './../utils/helpers';
import TextButton from './TextButton';

class EntryDetails extends Component {
    static navigationOptions = ({ navigation }) => (
        {
            title: navigation.state.params.entryId
        }
    )

    shouldComponentUpdate (nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    reset = () => {
        const { remove, goBack, entryId } = this.props
        remove()
        goBack()
        addEntry(entryId)
    }

    render(){
        const { entryId, metrics } = this.props
        return(
            <View style={styles.item}>
                <MetricCard metrics={metrics} />  
                <TextButton onPress={this.reset} style={{margin : 20}} > 
                     Reset
                </TextButton>    
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
    console.log("\n\n\n\ndisptachhh log\n\n\n")
    const { entryId } = navigation.state.params
    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
        })),
        goBack: () => navigation.goBack()
    }
}

const mapStatetoProps = (state, { navigation }) => (
    {
        entryId: navigation.state.params.entryId,
        metrics: state[navigation.state.params.entryId]
    }
)

const styles = StyleSheet.create({
    item:{
        borderRadius: 16,
        marginHorizontal: 20,
        marginTop: 10,
        padding:10,
        backgroundColor: white,
        justifyContent: 'center'
    },
})

export default connect(mapStatetoProps, mapDispatchToProps)(EntryDetails)



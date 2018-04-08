import React, { Component } from 'react'
import { View, Text } from 'react-native'
// import DateHeader from './DateHeader'
// import { gray } from '../utils/colors';
// import { getMetricMetaInfo } from '../utils/helpers';


class EntryDetails extends Component {
    render(){
        return(
            <View style={{paddingBottom: 25}}>
                <Text  style={{fontSize: 23 }}>Olááá</Text> 
                <Text  style={{fontSize: 23 }}>{this.props.navigation.state.params.entryId}</Text>              
            </View>
        )
    }
}

export default EntryDetails



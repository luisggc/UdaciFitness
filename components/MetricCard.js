import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DateHeader from './DateHeader'
import { gray } from '../utils/colors';
import { getMetricMetaInfo } from '../utils/helpers';


function MetricCard ({date, metrics}) {
    return(
        <View style={{paddingBottom: 25}}>
            <DateHeader date={date}/>
            {Object.keys(metrics).map((metric) => {
                const {displayName, unit, getIcon } = getMetricMetaInfo(metric)
                return (
                    <View style={styles.containerEntry} key={metric} >
                       { getIcon()}
                        <View style={[styles.container, {marginLeft: 20}]}>
                            <Text  style={{fontSize: 23 }}>{displayName}</Text>
                            <View>
                                <Text style={{fontSize: 15, color: gray}}>{metrics[metric]} {unit}</Text>
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerEntry : {
        flex: 1,
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 10,
        alignItems: 'center'
    },
    noDataText: {
        fontSize: 20,
        paddingVertical: 20
    }
})

export default MetricCard



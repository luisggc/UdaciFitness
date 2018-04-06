import React from 'react'
import { View, Slider, Text, StyleSheet } from 'react-native'

const style = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerStack: {
        alignItems: 'center',
        flexDirection: 'column',
        width: 40,
    }
})

export default function UdaciSlider({ max, unit, step, value, onChange}) {
    return(
        <View style={style.container} >
            <Slider
                style={{flex: 1, marginHorizontal:10}}
                value={value}
                onValueChange={onChange}
                step={step}
                maximumValue={max}
                minimumValue={0}
            />
            <View style={style.containerStack} >
                <Text style={{fontSize:23}} >{value}</Text>
                <Text style={{fontSize:15}}>{unit}</Text>
            </View>
        </View>
    )
}
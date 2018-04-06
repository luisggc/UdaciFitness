import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { purple, red, blue, white } from '../utils/colors'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    containerStack: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    row:{
        flexDirection: 'row',
        marginHorizontal:10
    },
    btn:{
        borderColor: purple,
        backgroundColor: white,
        borderWidth: 1,
        borderRadius: 3,
        padding:5,
        paddingHorizontal: 25
    }
})

export default function UdaciSteppers({ max, unit, step, value, onIncrement, onDecrement}) {
    return(
        <View style={styles.container}>
            <View style={styles.row}>

                <TouchableOpacity style={[styles.btn,{ borderBottomRightRadius:0, borderTopRightRadius:0, borderRightWidth:0 }]} onPress={onDecrement}>
                    <FontAwesome name='minus' size={30} color={'black'} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn,{ borderBottomLeftRadius:0, borderTopLeftRadius:0}]} onPress={onIncrement}>
                    <FontAwesome name='plus' size={30} color={'black'} />
                </TouchableOpacity>

             </View>

            <View style={styles.containerStack} >
                <Text style={{fontSize:23}} >{value}</Text>
                <Text style={{fontSize:15}}>{unit}</Text>
            </View>
        </View>
    )
}
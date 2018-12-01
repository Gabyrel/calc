import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';


export default class Aua extends Component {
    _onPressButton() {
        Alert.alert('HUHU')
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ height: 65, backgroundColor: '#badc58', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 50, fontWeight: 'bold' }}>Rohrdurchmesser</Text>
                </View>
                <View style={{ alignItems: 'stretch', padding: 20, }}>
                    <TextInput placeholder="Volumenstrom in m³/h" autoCorrect={false} placeholderTextColor="black" keyboardType='numeric'
                        style={{ backgroundColor: '#badc58', height: 40, textAlign: 'center', marginBottom: 10, }}>
                    </TextInput>
                    <TextInput placeholder="Durchflussgeschwindigkeit in m/s" autoCorrect={false} placeholderTextColor="black" keyboardType='numeric'
                        style={{ backgroundColor: '#badc58', height: 40, textAlign: 'center' }}>
                    </TextInput>
                </View>
                <View style={{ height: 100, alignItems: 'stretch', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this._onPressButton} style={{ backgroundColor: '#badc58', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 50, fontWeight: 'bold' }}>Berechnen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
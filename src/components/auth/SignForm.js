import React from 'react';
import { ScrollView, View, StyleSheet, Button } from 'react-native';
import Input from '../../components/ui/Input';

const SignForm = ({ inputs, submit }) => {
    return (
        <View style={styles.formContainer}>
            <View style={styles.screen}>{ 
                inputs.map((field) => {
                    return (
                        <Input
                            {...field}
                        />
                    )
                })
            }</View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
    },
    screen: {
        marginBottom: 40
    },
    button: {
        width: '50%'
    }
});

export default SignForm;
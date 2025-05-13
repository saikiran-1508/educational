import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import colors from '../../colors/constant';

export default function Button({ text, type = 'fill', onPress, loading = false }) {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: type === 'fill' ? colors.PRIMARY : colors.WHITE,
          opacity: loading ? 0.6 : 1, // Reduce opacity when disabled
        }
      ]} 
      onPress={!loading ? onPress : null} // Prevent press when loading
      disabled={loading} // Ensure some click feedback when enabled
    >
      {loading ? (
        <ActivityIndicator color={type === 'fill' ? colors.WHITE : colors.PRIMARY} />
      ) : (
        <Text style={[styles.text, { color: type === 'fill' ? colors.WHITE : colors.PRIMARY }]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        borderRadius: 15,
        marginTop: 15,
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

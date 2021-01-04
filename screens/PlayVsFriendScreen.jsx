import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Board from '../components/board/Board';

export class PlayVsFriendScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Board/>
      </View>
    )
  }
}

export default PlayVsFriendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  }
})

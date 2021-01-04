import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {Text} from 'react-native-paper';


export class Square extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    canMoveHere: PropTypes.bool,
    showNotation: PropTypes.bool,
    columnIndex: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    columnName: PropTypes.number.isRequired,
    dimension: PropTypes.number.isRequired,
    selected: PropTypes.bool,
    reverseBoard: PropTypes.bool,
    inCheck: PropTypes.bool,
    lastMove: PropTypes.bool,
    onSelected: PropTypes.func,
  }

  onSelected = () => {
    const { position, onSelected } = this.props;
    onSelected(position);
  };

  renderNotations(isBlack) {
    const { showNotation, columnIndex, rowIndex, columnName, dimension, reverseBoard } = this.props;

    const notations = [];
    const transform = [
      {
        rotate: reverseBoard ? '180deg' : '0deg'
      },
    ];

    if (showNotation) {
      if (columnIndex + 1 === dimension) {
        notations.push(
          <Text
          style={[styles.notation, {
            color: isBlack ? '#B58863' : '#F0D9B5',
            top: 0,
            right: 0,
            transform,
          },
        ]}
          >
            {dimension - rowIndex}
          </Text>
        );
      }

      if (rowIndex + 1 === dimension) {
        notations.push(
          <Text
          style={[styles.notation, {
            color: isBlack ? '#B58863' : '#F0D9B5',
            top: 0,
            right: 0,
            transform,
          },
        ]}
          >
            {columnName}
          </Text>,
        );
      }
    }

    return notations;
  }

  renderMoveIndicator() {
    const {canMoveHere} = this.props;

    if (canMoveHere) {
      return <View style={styles.moveIndicator}/>
    }

    return null;
  }

  render() {
    const {
      size,
      rowIndex,
      columnIndex,
      canMoveHere,
      selected,
      lastMove,
      inCheck
    } = this.props;

    const isBlack = (rowIndex + columnIndex) % 2 === 0;
    let backgroundColor = isBlack ? '#F0D9B5' : '#B58863';

    if (selected) {
      backgroundColor = '#656E41';
    } else if  (lastMove) {
      backgroundColor = '#CDD26B';
    } else if (inCheck) {
      backgroundColor = '#C51B16';
    }

    return (
      <TouchableWithoutFeedback
      onPress={this.onSelected}
      disabled={!canMoveHere}>
        <View style={[styles.container, {backgroundColor, width: size, height: size,},]}>
          {this.renderMoveIndicator()}
          {this.renderNotations(isBlack)}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Square;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  moveIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#208530',
    opacity: 0.3,
  },
  notation: {
    position: 'absolute',
    fontSize: 11,
    fontWeight: 'bold',
  }
})
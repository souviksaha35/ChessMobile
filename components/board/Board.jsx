import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Square} from './Square';
import {Chess} from 'chess.js';
import {Piece} from './Piece';

const screenWidth = Dimensions.get('window').width;

const COLUMN_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const DIMENSIONS = 8;


export class Board extends Component {
  static propTypes = {
    fen: PropTypes.string,
    size: PropTypes.number.isRequired,
    color: PropTypes.oneOf(['w', 'b']),
    showNotation: PropTypes.bool,
    shouldSelectPiece: PropTypes.func,
  }

  static defaultProps = {
    size: screenWidth - 32,
    showNotation: true,
    color: 'w',
  }

  constructor(props) {
    super(props);

    const game = new Chess(props.fen);

    this.state = {
      game,
      board: this.createBoardData(game, props.fen),
    }
  }

  createBoardData(game, fen) {

    const board = game.board();
    const squares = [];
    board.forEach((row, rowIndex) => {
      console.log(row);
      console.log(rowIndex);

      row.forEach((square, columnIndex) => {
        console.log(square);
        console.log(columnIndex);

        const columnName = COLUMN_NAMES[columnIndex];
        const position = `${columnName}${DIMENSIONS - rowIndex}`;
        const type = square ? square.type : '';
        const color = square ? square.color : '';
        squares.push({
          ...square,
          position,
          columnIndex,
          rowIndex,
          columnName
        });
      });
    });

    return squares;
  }

  movePiece = (to, from) => {
    const {game, board} = this.state;
    const moveConfig = {
      to,
      from: from, 
    }
    const moveResule = game.move(moveConfig);
  }

  renderSquares(reverseBoard) {
    const {size,showNotation} = this.props;
    const {board} = this.state;
    const rowSquares = [];
    const squareSize = size / DIMENSIONS;

    board.forEach(square => {
      const {
        rowIndex,
        columnIndex,
        columnName,
        position,
        selected,
        canMoveHere,
        lastMove,
        inCheck,
      } = square;
      const squareView = (
        <Square
        size={squareSize}
        showNotation={showNotation}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        columnName={columnName}
        dimension={DIMENSIONS}
        selected={selected}
        position={position}
        lastMove={lastMove}
        inCheck={inCheck}
        canMoveHere={canMoveHere}
        onSelected={this.movePiece}
        />
      );

      if (!rowSquares[rowIndex]) {
        rowSquares[rowIndex] = [];
      }
      rowSquares[rowIndex].push(squareView);
    });

    return rowSquares;

  }

  selectPiece = position => {
    const { game, board } = this.state;
    const {shouldSelectPiece}
    const piece = board.find(b => b.position === position);


  }

  renderPieces(reverseBoard) {
    const {board} = this.state;

    return board.map(square => {
      const {
        type,
        color,
        rowIndex,
        columnIndex,
        position
      } = square;
      if (type) {
        return (
          <Piece
          key={`piece_${rowIndex}_${columnIndex}`}
          type={type}
          color={color}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          position={position}
          reverseBoard={reverseBoard}
          onSelected={}/>
        )
      }
    })
  }

  render() {
    const {color} = this.props;
    const reverseBoard = color === 'b';
    return (
      <View style={styles.container}>
        <View
        style={{transform: [
          {
            rotate: reverseBoard ? '180deg' : '0deg',
          },
        ],
        }}>
          {this.renderSquares(reverseBoard)}
        </View>
      </View>
    )
  }
}

export default Board;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  }
})
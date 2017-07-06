'use strict';

var len = readline();

var target = '111110111100 110000100000';

// Input
for (var i = 0; i < len; i++) {
	var chessboard = "";
	for (var j = 0; j < 5; j++) {
		chessboard += readline();
	}
	var moves = solve([chessboard], 0);

	if (moves === null || moves > 10) {
		putstr('Unsolvable in less than 11 move(s).\n');
	} else {
		putstr('Solvable in ' + moves + ' move(s).\n');
	}
}

function solve(boards, depth) {
	if (boards.some(function (b) {
		return b === target;
	})) return depth;
	if (depth >= 10) return null;

	var maxdist = 10 - depth;

	//All moves
	boards = boards.reduce(function (acc, b) {
		return acc.concat(expandMoves(b));
	}, []).filter(function (b) {
		return distance(b, target) <= maxdist;
	})
	//Remove duplicate
	.reduce(function (acc, b) {
		if (acc.some(function (s) {
			return s === b;
		})) return acc;else return acc.concat([b]);
	}, []);

	return solve(boards, depth + 1);
}

function distance(s, t) {
	var result = 25;
	for (var _i = 0; _i < 25; _i++) {
		if (s[_i] === t[_i]) result--;
	}

	return result;
}

// Returns array with all possible moves for @board
function expandMoves(board) {
	var blank = board.indexOf(' ');
	var blankRow = ~~(blank / 5);

	return [
	// [index offset, row offset]
	[-11 + blank, -2], [-9 + blank, -2], [-7 + blank, -1], [-3 + blank, -1], [3 + blank, 1], [7 + blank, 1], [9 + blank, 2], [11 + blank, 2]].filter(function (tup) {
		var movingPiece = tup[0];
		return movingPiece >= 0 && movingPiece <= 24 && blankRow + tup[1] === ~~(movingPiece / 5);
	}).map(function (tup) {
		var move = tup[0];
		if (blank > move) {
			return board.substring(0, move) + ' ' + board.substring(move + 1, blank) + board[move] + board.substring(blank + 1, board.length);
		} else {
			return board.substring(0, blank) + board[move] + board.substring(blank + 1, move) + ' ' + board.substring(move + 1, board.length);
		}
	});
}
var line;
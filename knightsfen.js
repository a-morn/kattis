'use strict';

var len = readline();

var target = '111110111100 110000100000';

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

	//All moves
	boards = boards.reduce(function (acc, b) {
		return acc.concat(expandMoves(b));
	}, []);

	// Remove duplicate
	boards = boards.reduce(function (acc, b) {
		if (acc.some(function (s) {
			return s === b;
		})) return acc;else return acc.concat([b]);
	}, []);

	// Prune
	var maxdist = 10 - depth;
	boards = boards.filter(function (b) {
		return distance(b, target) <= maxdist;
	});

	return solve(boards, depth + 1);
}

function distance(s, t) {
	var result = 25;
	for (var _i = 0; _i < 25; _i++) {
		if (s[_i] === t[_i]) result--;
	}

	return result;
}

function expandMoves(board) {
	var blank = board.indexOf(' ');
	var legitMoves = [
	// [index offset, row offset]
	[-11, -2], [-9, -2], [-7, -1], [-3, -1], [3, 1], [7, 1], [9, 2], [11, 2]].filter(function (tup) {
		var movingPiece = blank + tup[0];
		return movingPiece >= 0 && movingPiece <= 24 && Math.floor(blank / 5) + tup[1] === Math.floor(movingPiece / 5);
	}).map(function (tup) {
		return tup[0] + blank;
	});

	return legitMoves.map(function (move) {
		if (blank > move) {
			return board.substring(0, move) + ' ' + board.substring(move + 1, blank) + board[move] + board.substring(blank + 1, board.length);
		} else {
			return board.substring(0, blank) + board[move] + board.substring(blank + 1, move) + ' ' + board.substring(move + 1, board.length);
		}
	});
}

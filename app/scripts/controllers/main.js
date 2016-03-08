'use strict';

/**
 * @ngdoc function
 * @name localboardgamesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the localboardgamesApp
 */
angular.module('localboardgamesApp')
  .controller('MainCtrl', ['$scope', 'gameBoardService', function ($scope, gameBoardService) {

  	// Init values
	$scope.gameBoard = { Id:0, Name: '', Description: ''};
  	$scope.gameBoards = [];
  	$scope.action = 'add';
  	$scope.inputVisible = false;
  	$scope.addButtonVisible = true;
  	$scope.acceptButtonVisible = false;
  	$scope.cancelButtonVisbile = false;

	gameBoardService.getAllGameBoards().then(function(result) {
		$scope.gameBoards = result.data;
	});

	// Add a new game board
	$scope.addGameBoard = function() {
		$scope.action = 'add';
		showInput();
	};

	// Edit a game board
	$scope.editGameBoard = function(index) {
		$scope.gameBoard.Id = $scope.gameBoards[index].Id;
		$scope.gameBoard.Name = $scope.gameBoards[index].Name;
		$scope.gameBoard.Description = $scope.gameBoards[index].Description;
		$scope.action = 'update';
		showInput();
	};

	// Removes a game board
  	$scope.removeGameBoard = function(index) {
	  	var id = $scope.gameBoards[index].Id;
	  	gameBoardService.removeGameBoard(id).then(function(result) {
	  		gameBoardService.getAllGameBoards().then(function(result) {
				$scope.gameBoards = result.data;
			});
	  	});
	};

	// Confirms an add or an edit action
	$scope.accept = function() {
		if ($scope.action == 'add') { // Add
			gameBoardService.addGameBoard($scope.gameBoard).then(function(result){
				gameBoardService.getAllGameBoards().then(function(result) {
					$scope.gameBoards = result.data;
				});
				$scope.cancel();
			});
		}
		else { // Update
			gameBoardService.updateGameBoard($scope.gameBoard).then(function(result) {
				gameBoardService.getAllGameBoards().then(function(result) {
					$scope.gameBoards = result.data;
				});
				$scope.cancel();
			});
		}
	};

	// Cancel an add or edit action
	$scope.cancel = function() {
		resetInput();
	};

	// Shows the input
	var showInput = function(index) {
		$scope.inputVisible = true;
		$scope.addButtonVisible = false;
	};

	// Resets the input values
	var resetInput = function() {
		$scope.gameBoard.Id = 0;
		$scope.gameBoard.Name = '';
		$scope.gameBoard.Description = '';
		$scope.inputVisible = false;
		$scope.addButtonVisible = true;
	};
  }]);

'use strict';

angular.module('localboardgamesApp').factory('gameBoardService', ['$http', '$httpParamSerializer',
	function($http, $httpParamSerializer) {

	var url = 'http://localhost:49738/api/gameboard';

	var gameBoardService = [];

	var addGameBoard = function(gameBoard) {
		return $http({
            method: "post",
            url: url,
            data: $httpParamSerializer(gameBoard),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
	};

	var getAllGameBoards = function() {
		return $http.get(url).then(function(result) {
			return result;
		});
	};

	var removeGameBoard = function(id) {
		return $http.post(url + '/remove/' + id).then(function(result) {
			return result;
		});
	};

	var updateGameBoard = function(gameBoard) {
		return $http({
            method: "post",
            url: url + '/update/' + gameBoard.Id,
            data: $httpParamSerializer(gameBoard),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
	};

	gameBoardService.addGameBoard = addGameBoard;
	gameBoardService.getAllGameBoards = getAllGameBoards;
	gameBoardService.removeGameBoard = removeGameBoard;
	gameBoardService.updateGameBoard = updateGameBoard;

	return gameBoardService;
}]);
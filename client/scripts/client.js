var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'InfoService', function($scope, InfoService){
  $scope.getOMDB = InfoService.getOMDB;
}]);

myApp.controller('TwoController', ['$scope', 'InfoService', function($scope, InfoService){
    $scope.infoFromServer = InfoService.infoFromServer;

    $scope.movie = {};

    $scope.addToFav = function(){
      $scope.movie.Title = $scope.infoFromServer.response.data.Title;
      $scope.movie.Poster = $scope.infoFromServer.response.data.Poster;
      InfoService.addFavorite($scope.movie);
    };
}]);

myApp.controller('ThreeController', ['$scope', 'InfoService', function($scope, InfoService){
  $scope.favoriteList = InfoService.favoriteList;
}]);

myApp.factory('InfoService', ['$http', function($http){
  var infoFromServer = {};
  var favoriteList = [];

  //Public
  return {
    infoFromServer : infoFromServer,
    favoriteList : favoriteList,
    getRequest : function(){
      $http.get('/info').then(function(response){
        infoFromServer.response = response;
      });
    },
    getOMDB : function(movie){
      $http.get('http://www.omdbapi.com/?t=' + movie + '&y=&plot=full&r=json').then(function(response){
        infoFromServer.response = response;
        console.log(infoFromServer.response.data);
      });
    },
    addFavorite : function(movie){
      favoriteList.push(movie);
      console.log(favoriteList);
    }
  };
}]);

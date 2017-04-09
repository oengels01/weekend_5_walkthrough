var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'InfoService', function($scope, InfoService){
  $scope.getOMDB = InfoService.getOMDB;
}]);

myApp.controller('TwoController', ['$scope', 'InfoService', function($scope, InfoService){
    $scope.infoFromServer = InfoService.infoFromServer;
}]);

myApp.factory('InfoService', ['$http', function($http){
  var infoFromServer = {};

  //Public
  return {
    infoFromServer : infoFromServer,
    getRequest : function(){
      $http.get('/info').then(function(response){
        infoFromServer.response = response;
      });
    },
    getOMDB : function(movie){
      $http.get('http://www.omdbapi.com/?t=' + movie + '&y=&plot=full&r=json').then(function(response){
        console.log(response);
      });
    }
  };
}]);

angular.module('starter.controllers', [])

.controller('RequestsCtrl', function($scope, $location, Requests) {
  $scope.requests = Requests.all();
  $scope.word = '';
  $scope.go = function(request){
    path = 'tab/request/' + request.id;
    $location.path(path);
  };
  $scope.delete = function(index){
    $scope.requests.splice(index, 1);
    //TODO: send post request to server to remove request
  };
  $scope.accept = function(){
    console.log($scope.word);
  };
})

.controller('RequestDetailCtrl', function($scope, $stateParams, Requests) {
  $scope.request = Requests.get($stateParams.requestId);
})

.controller('ExistingOffersCtrl', function($scope, ExistingOffers) {
  $scope.existingOffers = ExistingOffers.all();
})

.controller('ExistingOfferDetailCtrl', function($scope, $stateParams, ExistingOffers) {
  $scope.existingOffer = ExistingOffers.get($stateParams.existingOfferId);
})

.controller('AcceptedOffersCtrl', function($scope, AcceptedOffers) {
  $scope.acceptedOffers = AcceptedOffers.all();
})

.controller('AcceptedOfferDetailCtrl', function($scope, $stateParams, AcceptedOffers) {
  $scope.acceptedOffer = AcceptedOffers.get($stateParams.acceptedOfferId);
});


angular.module('starter.controllers', ['LocalStorageModule'])

.controller('LoginCtrl', function($scope, Google, $window, $document, localStorageService, $state, $http) {
  var url = Google.authorize+'?client_id='+ Google.client_id + '&response_type=code' +
    '&redirect_uri='+Google.redirect_uri +'&scope=' + Google.scope;

  // console.log(url);
  // var url = Google.authorize + '?client_id=' Google.client_id + '&redirect_uri=' + Google.callback + '&client_id=' + Google.key
  var loginWindow;                                                                                
  $scope.login = function () {
    console.log('opening window')
    loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no');
    console.log('opened window')

    loginWindow.addEventListener('loadstart', function(e) {
    //$window.alert('listening for events');

    var url = e.url;
    var code = /\?code=(.+)$/.exec(url);
    var error = /\?error=(.+)$/.exec(url);
    //$window.alert(url);

    // console.log('in event');
    // if (code || error) {
    // window.alert('in code ' + code[1]);
    // loginWindow.close();
    // }

    if (code) {
      //window.alert('code' + code[1]);

      var eURL = 'code='+code[1]+'&client_id='+Google.client_id+'&client_secret='+
      Google.client_secret+'&redirect_uri='+Google.redirect_uri+'&grant_type=authorization_code';
      //loginWindow.close();
      //$state.transitionTo('tab.requests');

      $http ({
        method: 'POST', 
        url: 'https://accounts.google.com/o/oauth2/token',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'
        },
        data : eURL

      }).success(function(data, status){

        var temp = JSON.stringify(data);
        window.alert('http'+temp);
        window.alert(data.access_token);
        //$state.transitionTo('tab.request');
      }).error(function(data, status){
        var temp = JSON.stringify(data);
        window.alert('failed'+temp);

      });
    }

    // $scope.show = evt.url;
    // var parser = $window.document.createElement('a');
    // parser.href = evt.url;
    // var params = parser.search.split('?');
    // angular.forEach(params, function (param) {
    //   if(param.indexOf('Code') > -1) {
    //     var index = param.indexOf('=');
    //     var token = param.slice(index+1);
    //     $window.alert('that token though! : ' +token);
    //     localStorageService.set('token', token);
    //     loginWindow.close();
    //     $state.transitionTo('tab/request');
    //   }
    // })
    });

    $scope.showToken = function () {
    $scope.token = localStorageService.get('token');
    };
  };
})


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
})

.controller('RequestDetailCtrl', function($scope, $stateParams, $location, Requests) {
  $scope.request = Requests.get($stateParams.requestId);
  $scope.discount = '';
  $scope.accept = function(discount){
    console.log(discount);
    $location.path('/tab')
  };
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


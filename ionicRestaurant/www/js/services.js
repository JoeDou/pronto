angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('ExistingOffers', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var existingOffers = [
    { id: 0, name: 'Scruff McGruff', party: '5', time: '15'},
    { id: 1, name: 'G.I. Joe', party: '2', time: '30' },
    { id: 2, name: 'Miss Frizzle', party: '3', time: '15' },
    { id: 3, name: 'Ash Ketchum', party: '6', time: '45' }
  ];

  return {
    all: function() {
      return existingOffers;
    },
    get: function(existingOfferId) {
      // Simple index lookup
      return existingOffers[existingOfferId];
    }
  };
})

.factory('Requests', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var requests = [
    { id: 0, name: 'Scruff McGruff', party: '5', time: '15'},
    { id: 1, name: 'G.I. Joe', party: '2', time: '30' },
    { id: 2, name: 'Miss Frizzle', party: '3', time: '15' },
    { id: 3, name: 'Ash Ketchum', party: '6', time: '45' }
  ];

  return {
    all: function() {
      return requests;
    },
    get: function(requestId) {
      // Simple index lookup
      return requests[requestId];
    }
  };
})

.factory('AcceptedOffers', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var acceptedOffers = [
    { id: 0, name: 'Scruff McGruff', party: '5', time: '15'},
    { id: 1, name: 'G.I. Joe', party: '2', time: '30' },
    { id: 2, name: 'Miss Frizzle', party: '3', time: '15' },
    { id: 3, name: 'Ash Ketchum', party: '6', time: '45' }
  ];

  return {
    all: function() {
      return acceptedOffers;
    },
    get: function(acceptedOfferId) {
      // Simple index lookup
      return acceptedOffers[acceptedOfferId];
    }
  };
});

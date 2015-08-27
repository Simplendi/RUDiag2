var app = angular.module('app');

app.factory('metadataService', ['$http', function($http) {
    return {
        getMetadata: function(metadata_id) {
            return $http.get('/metadata/' + metadata_id);
        },
        saveMetadata: function(metadata) {
            return $http.post('/metadata/' + metadata.id, metadata);
        },
        addMetadata: function(metadata) {
            return $http.put('/metadata/', metadata);
        },
        deleteMetadata: function(metadata_id) {
            return $http.delete('/metadata/' + metadata_id);
        },
        listMetadata: function(filter) {
            return $http({
                url: '/metadata/',
                method: "GET",
                params: {filter: filter}
            });
        },

    }
}]);
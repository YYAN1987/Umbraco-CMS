(function () {
    'use strict';

    function usersHelperService(localizationService) {

        var userStates = [
            { "name": "All", "key": "All"} ,
            { "value": 0, "name": "Active", "key": "Active", "color": "success" },
            { "value": 1, "name": "Disabled", "key": "Disabled", "color": "danger" },
            { "value": 2, "name": "Locked out", "key": "LockedOut", "color": "danger" },
            { "value": 3, "name": "Invited", "key": "Invited", "color": "warning" }
        ];

        angular.forEach(userStates, function (userState) {
            var key = "user_state" + userState.key;
            localizationService.localize(key).then(function (value) {
                var reg = /^\[[\S\s]*]$/g;
                var result = reg.test(value);
                if (result === false) {
                    // Only translate if key exists
                    userState.name = value;
                }
            });
        });

        function getUserStateFromValue(value) {
            var foundUserState;
            angular.forEach(userStates, function (userState) {
                if(userState.value === value) {
                    foundUserState = userState;
                }
            });
            return foundUserState;
        }

        function getUserStateByKey(key) {
            var foundUserState;
            angular.forEach(userStates, function (userState) {
                if(userState.key === key) {
                    foundUserState = userState;
                }
            });
            return foundUserState;
        }

        function getUserStatesFilter(userStatesObject) {

            var userStatesFilter = [];

            for (var key in userStatesObject) {
                if (userStatesObject.hasOwnProperty(key)) {
                    var userState = getUserStateByKey(key);
                    if(userState) {
                        userState.count = userStatesObject[key];
                        userStatesFilter.push(userState);
                    }
                }
            }

            return userStatesFilter;

        }

        ////////////

        var service = {
            getUserStateFromValue: getUserStateFromValue,
            getUserStateByKey: getUserStateByKey,
            getUserStatesFilter: getUserStatesFilter
        };

        return service;

    }

    angular.module('umbraco.services').factory('usersHelper', usersHelperService);


})();

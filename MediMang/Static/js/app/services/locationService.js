angular.module('locationService', [])
    .service('locationService', ['$rootScope', 'growl', 'PicklistRepository', function ($rootScope, growl, picklistRepository) {

    var isValidLocation = function (locationName) {
        if (locationName === "country" || locationName === "political" || locationName === "locality" || locationName === "administrative_area_level_1" || locationName === "administrative_area_level_2" || locationName === "administrative_area_level_3" || locationName === "administrative_area_level_4" || locationName === "administrative_area_level_5" || locationName === "colloquial_area") {
            return false;
        }
        return true;
    };


    var populateAddress = function (location) {
        log($rootScope.States);

        var addressline1 = "";
        var addresscity = "";
        var addressstate = "";
        var addresscountry = "";
        var addresszip = "";

        var entity = {
            PrimaryAddress: {
                AddressLine1: "",
                AddressCity: "",
                AddressPostalCode: "",
                AddressCustomState: "",
                Latitude: null,
                Longitude: null
            },
            SelectedPrimaryCountry: {
                CountryId: null
            },
            PrimaryStates: [],
            SelectedPrimaryState: {
                StateId: null
            }
        }
        
        entity.PrimaryAddress.AddressLine1 = "";
        entity.PrimaryAddress.AddressCity = "";
        entity.PrimaryAddress.AddressPostalCode = "";
        entity.PrimaryAddress.AddressCustomState = "";

        entity.PrimaryAddress.Latitude = null;
        entity.PrimaryAddress.Longitude = null;

        entity.SelectedPrimaryCountry.CountryId = null;
        //entity.PrimaryStates = $scope.States;
        entity.SelectedPrimaryState.StateId = null;

        if (location != undefined) {
            if (location.geometry != undefined) {
                if (location.geometry.location != undefined) {
                    if (location.types != undefined) {
                        var locationName = location.types[0];
                        if (isValidLocation(locationName)) {
                            entity.PrimaryAddress.Latitude = location.geometry.location.lat();
                            entity.PrimaryAddress.Longitude = location.geometry.location.lng();
                        }
                    }
                }
            }
            if (location.address_components != undefined) {
                for (var i = 0; i < location.address_components.length; i++) {
                    switch (location.address_components[i].types[0]) {
                        case "locality":
                            addresscity = location.address_components[i].long_name;
                            break;
                        case "administrative_area_level_1":
                            addressstate = location.address_components[i].long_name;
                            break;
                        case "country":
                            addresscountry = location.address_components[i].long_name;
                            break;
                        case "postal_code":
                            addresszip = location.address_components[i].long_name;
                            break;
                        case "street_number":
                            addressline1 = location.address_components[i].long_name;
                            break;
                        case "route":
                        case "neighborhood":
                        case "sublocality_level_2":
                        case "sublocality_level_1":
                            if (addressline1.length > 0) {
                                addressline1 += " ";
                            }
                            addressline1 += location.address_components[i].long_name;
                            break;
                    }
                }
                entity.PrimaryAddress.AddressLine1 = addressline1;

                location = addressline1;
                entity.PrimaryAddress.AddressCity = addresscity;
                entity.PrimaryAddress.AddressPostalCode = addresszip;
                entity.SelectedPrimaryCountry.Country = addresscountry;

                // entity.updatePrimaryStates();
                entity.PrimaryAddress.AddressCustomState = addressstate;
            }
        } else {
            entity.PrimaryAddress.AddressLine1 = location;
        }

        return entity;

    }



    // return exposed functions
    return {
        isValidLocation: isValidLocation,
        populateAddress: populateAddress
        }
    }]);
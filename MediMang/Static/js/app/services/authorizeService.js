angular.module('authorizeService', [])
    .service('authorizeService', ['$rootScope', 'growl', function($rootScope, growl) {


        // helper method from http://stackoverflow.com/questions/30765844/64bit-bitmask-and-javascript
        // This will take 2 parts of a 64 bit number, join them and perform a bitwise operation with another 2 part number
        var bitMask = function () {
            this.bm = new Uint32Array(2);

            if (arguments.length === 0) {
                this.bm[0] = 0x0;
                this.bm[1] = 0x0;
            } else if (arguments.length === 2 && typeof arguments[0] === "number" && typeof arguments[1] === "number") {
                this.bm[0] = arguments[1];
                this.bm[1] = arguments[0];
            }

            this.bwAND = function (filter) {
                var result = new bitMask();
                result.bm[0] = this.bm[0] & filter.bm[0];
                result.bm[1] = this.bm[1] & filter.bm[1];
                return result;
            }

            this.bwOR = function (filter) {
                var result = new bitMask();
                result.bm[0] = this.bm[0] | filter.bm[0];
                result.bm[1] = this.bm[1] | filter.bm[1];
                return result;
            }

            this.bwXOR = function (filter) {
                var result = new bitMask();
                result.bm[0] = this.bm[0] ^ filter.bm[0];
                result.bm[1] = this.bm[1] ^ filter.bm[1];
                return result;
            }

            this.bwNOT = function () {
                var result = new bitMask();
                result.bm[0] = ~this.bm[0];
                result.bm[1] = ~this.bm[1];
                return result;
            }

            this.bwEQUALS = function (b) {
                return (this.bm[0] === b.bm[0]) && (this.bm[1] === b.bm[1]);
            }

            this.toString = function () {
                var zeroes = "00000000000000000000000000000000";
                var strH = this.bm[1].toString(2);
                var zerH = zeroes.substr(0, 32 - strH.length);
                var strL = this.bm[0].toString(2);
                var zerL = zeroes.substr(0, 32 - strL.length);
                return zerH + strH + zerL + strL;
            }

        };

    // test based on application and mask
    // see server-side equivalent: \dev\fs_crm\crm.web\bl\aattributes\crmpermissionattribute.cs
    var isAuthorized = function(crmAllow, crmAdminAllow) {
        var testMask = 0x0;
        var userMask = 0x0;

        if ($rootScope.CurrentUser == null)
            return false;

        if ($rootScope.CurrentUser.ApplicationType === 'CRM') {
            if ((crmAllow[0] === UserCrmRoles.None[0]) &&
                (crmAllow[1] === UserCrmRoles.None[1]))
                return true;

            testMask = new bitMask(crmAllow[1], crmAllow[0]);
            userMask = new bitMask($rootScope.CurrentUser.PermissionsMaskArray[0], $rootScope.CurrentUser.PermissionsMaskArray[1]);
           
        }
        if ($rootScope.CurrentUser.ApplicationType === 'VolunteerAdmin') {
            if ((crmAllow[0] === UserCrmRoles.None[0]) &&
                (crmAllow[1] === UserCrmRoles.None[1]))
                return true;

            testMask = new bitMask(crmAllow[1], crmAllow[0]);
            userMask = new bitMask($rootScope.CurrentUser.PermissionsMaskArray[0], $rootScope.CurrentUser.PermissionsMaskArray[1]);

        }
        if ($rootScope.CurrentUser.ApplicationType === 'CRMAdmin') {
            if ((crmAdminAllow[0] === UserCrmAdminRoles.None[0]) && 
                (crmAdminAllow[1] === UserCrmAdminRoles.None[1]))
                return true;
            testMask = new bitMask(crmAdminAllow[1], crmAdminAllow[0]);
            userMask = new bitMask($rootScope.CurrentUser.PermissionsMaskArray[0], $rootScope.CurrentUser.PermissionsMaskArray[1]);
        }

        var bitwiseResult = userMask.bwAND(testMask);
        if (bitwiseResult.bm[0] > 0 || bitwiseResult.bm[1] > 0)
            return true;
       
        return false;

    };

    var allowModule = function (moduleAllow) {
        var testMask = 0x0;
        var userMask = 0x0;

        if ($rootScope.CurrentUser == null)
            return false;

       
        if ((moduleAllow[0] === OrgModules.None[0]) &&
            (moduleAllow[1] === OrgModules.None[1]))
            return true;

        testMask = new bitMask(moduleAllow[1], moduleAllow[0]);
        userMask = new bitMask($rootScope.CurrentUser.ModulesMaskArray[0], $rootScope.CurrentUser.ModulesMaskArray[1]);
      
        var bitwiseResult = userMask.bwAND(testMask);
        if (bitwiseResult.bm[0] > 0 || bitwiseResult.bm[1] > 0)
            return true;

        return false;
    }

    var allowApplication = function (applicationAllow) {
        var testMask = 0x0;
        var userMask = 0x0;

        if ($rootScope.CurrentUser == null)
            return false;


        if ((applicationAllow[0] === OrgApplications.None[0]) &&
            (applicationAllow[1] === OrgApplications.None[1]))
            return true;

        testMask = new bitMask(applicationAllow[1], applicationAllow[0]);
        userMask = new bitMask($rootScope.CurrentUser.ApplicationsMaskArray[0], $rootScope.CurrentUser.ApplicationsMaskArray[1]);

        var bitwiseResult = userMask.bwAND(testMask);
        if (bitwiseResult.bm[0] > 0 || bitwiseResult.bm[1] > 0)
            return true;

        return false;
    }

    // test based on application and mask
    // see server-side equivalent: \dev\fs_crm\crm.web\bl\atributes\crmpermissionattribute.cs
    var authorizedSave = function(crmAllow, crmAdminAllow, saveMethod) {

        if ($rootScope.CurrentUser == null)
            return false;

        if ($rootScope.CurrentUser.ApplicationType === 'CRM') {
            if ((crmAllow[0] === UserCrmRoles.None[0]) &&
            (crmAllow[1] === UserCrmRoles.None[1])) {
                growl.error('You are not allowed to save changes.', { ttl: 10000, disableCountDown: true });
                return false;
            }

        }

        if ($rootScope.CurrentUser.ApplicationType === 'CRMAdmin') {
            if ((crmAdminAllow[0] === UserCrmAdminRoles.None[0]) &&
            (crmAdminAllow[1] === UserCrmAdminRoles.None[1])) {
                growl.error('You are not allowed to save changes.', { ttl: 10000, disableCountDown: true });
                return false;
            }
        }

        if (isAuthorized(crmAllow, crmAdminAllow))
            return saveMethod();

        growl.error('You are not allowed to save changes.', { ttl: 10000, disableCountDown: true });
        return false;

    };

    // permission related helper functions
    var is403 = function (status) {
        return (status === 403);
    }


        // return exposed functions
        return {
                isAuthorized: isAuthorized,
                authorizedSave: authorizedSave,
                allowModule: allowModule,
                is403: is403,
                allowApplication: allowApplication
            }
    }]);
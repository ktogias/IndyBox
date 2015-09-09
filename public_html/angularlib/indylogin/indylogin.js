/* global angular, indynet */
if (typeof indynet === 'undefined'){
    throw new Exception('Indynet object is not initialized!');
}
var indyLoginModule = angular.module('indyLogin', [])
.directive('indyLoginForm',function(){
    return {
        restrict: 'E',
        scope: {},
        templateUrl: indynet.buildIndyUrl('angularlib.indylogin/form.html'),
        replace: true,
        controllerAs:'indyLogin',
        controller: function() {
            var indyLogin = this;
            indyLogin.doLogin = function(){
                var indynetLogin = new Indynet.Login("lala.koko");
                var result = indynetLogin.doLogin(this.username, this.password);
                if (result === indynetLogin.possibleLoginResults.OK){
                    console.log("OK");
                }
                else if (result === indynetLogin.possibleLoginResults.USERNAME_NOT_FOUND){
                    console.log("User not found");
                }
                else if (result === indynetLogin.possibleLoginResults.PASSWORD_MISSMATCH){
                    console.log("Wrong password");
                }
            };
        }
    };
});


/* global angular, indynet */
if (typeof indynet === 'undefined'){
    throw new Exception('Indynet object is not initialized!');
}
//indynet.importJs('indy://jslib.angularjs/angular-validation-match.min.js', document.head);
var indySignupModule = angular.module('indySignup', ['validation.match'])
.directive('indySignupForm',function(){
    return {
        restrict: 'E',
        scope: {},
        templateUrl: indynet.buildIndyUrl('indy://angularlib.indysignup/form.html'),
        replace: true,
        controllerAs:'indySignup',
        controller: function() {
            var indySignup = this;
            indySignup.doSignup = function(){
                var signup = new Indynet.Signup("lala.koko");
                var usernameHash = null;
                var passwordHash = null;
                var result = signup.doSignup(usernameHash, passwordHash);
                if (result === signup.possibleSignupResults.OK){
                    console.log("OK");
                }
                else if (result === signup.possibleSignupResults.USERNAME_HASH_CONFLICT){
                    console.log("User not found");
                }
            };
        }
    };
});


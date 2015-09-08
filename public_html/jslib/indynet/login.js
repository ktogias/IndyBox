/* global indynet, Indynet */

if (typeof Indynet !== undefined){
    if (typeof Indynet.Login !== undefined){
        Indynet.Login = function(retrieveUrl){
            this.retrieveUrl = retrieveUrl;
            this.possibleLoginResults = {OK: 0, USERNAME_NOT_FOUND: 1, PASSWORD_MISSMATCH: 2};
            this.doLogin = function(usernameHash, passwordHash){
                 console.log(this.retrieveUrl);
                console.log(usernameHash);
                console.log(passwordHash);
                return this.possibleLoginResults.OK;
            };
        };
    }
    else {
        throw "Indynet.Login initialization error! Indynet.Login alread defined!";
    }
}
else {
    throw "Indynet.Login initialization error! Indynet not booted!";
}

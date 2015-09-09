/* global Indynet, CryptoJS, TwinBcrypt */

if (typeof Indynet !== undefined){
    if (typeof Indynet.Signup !== undefined){
        Indynet.Signup = function(insertUrl){
            this.insertUrl = insertUrl;
            this.possibleSignupResults = {OK: 0, USERNAME_HASH_CONFLICT: 1};
            this.doSignup = function(usernameHash, passwordHash){
                console.log(this.insertUrl);
                console.log(usernameHash);
                console.log(passwordHash);
                //var salt = CryptoJS.lib.WordArray.random(128/8);
                //console.log(JSON.stringify(salt));
                //var salt = JSON.parse('{"words":[-589592853,205637116,1186021495,-915550082],"sigBytes":16}');
                //var key = CryptoJS.PBKDF2("lalakokonini", salt, { keySize: 1024/32, iterations: 1000 });
                //console.log(key.toLocaleString(CryptoJS.enc.Base64));
                var salt = TwinBcrypt.genSalt();
                console.log(salt);
                TwinBcrypt.hash("lalakokonini1", salt, function(p){
                    console.log(p);
                }, function(hash){
                   console.log(hash) ;
                   TwinBcrypt.compare("lalakokonini", hash, function(p){
                       console.log(p);
                   }, function(result){
                       console.log("0: " + result);
                   });
                });
                
               TwinBcrypt.compare("lalakokonini", "$2y$10$aZxQZybpNglWPJrfhF9Shes8xEJubMSv06E6bbuCCLhJlUv6o0Ie6", function(p){
                   console.log(p);
               }, function(result){
                   console.log("1: " + result);
               });
                
                
                TwinBcrypt.compare("lalakokonini", "$2y$10$IhqsmTZyJQ3oDoc7wc8o5.RXqqkuo8Tp9CDAqZWYhfXAFw7OFVyBe", function(p){
                   console.log(p);
               }, function(result){
                   console.log("2: " + result);
               });
                //console.log(CryptoJS.SHA3("lala12345678", { outputLength: 512 }).toString(CryptoJS.enc.Base64));
                return this.possibleSignupResults.OK;
            };
        };
    }
    else {
        throw "Indynet.Signup initialization error! Indynet.Signup alread defined!";
    }
}
else {
    throw "Indynet.Signup initialization error! Indynet not booted!";
}

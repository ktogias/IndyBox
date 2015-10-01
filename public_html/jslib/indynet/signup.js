/* global Indynet, CryptoJS, TwinBcrypt, forge, sodium */

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
        
        forge.random.getBytes(128, function(err, salt){
            console.log(btoa(salt));
            var str_salt = "fP+mxClEge+XxBG/Whinwhzj1ePTHg0A/rg7ym57gDVWfaJmU87lrHcgpQjal1buCJgSzXD2ffcDevqUpYYDj7qwHYElgVuSY/Xt1PGEjCL2/7VPTbV6gbmG6nhXbZV5xNAzTN+UkP7kH/CK6FMBf8fLBA5UOnrEXW+ojYiY9IM=";
            forge.pkcs5.pbkdf2('password', atob(str_salt), 2000, 1024, 'sha256', function(err, key){
                console.log(btoa(key));
            });
            
        });
        
        var rsa = forge.pki.rsa;
        rsa.generateKeyPair({bits: 2048, workerScript: indynet.buildIndyUrl('jslib.forge/prime.worker.js'), e: 0x10001}, function(err, keypair){
           console.log(err);
           console.log(forge.pki.privateKeyToPem(keypair.privateKey));
           console.log(forge.pki.publicKeyToPem(keypair.publicKey));
        });
        
        //var key = forge.pkcs5.pbkdf2('password', 1000, 32);
        //console.log(key);
        
        
        
    }
    else {
        throw "Indynet.Signup initialization error! Indynet.Signup alread defined!";
    }
}
else {
    throw "Indynet.Signup initialization error! Indynet not booted!";
}

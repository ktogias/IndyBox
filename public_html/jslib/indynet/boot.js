/* global development_override */

function Indynet() {
    this.config = new Config();
    
    this.importJs = function(jsUrl, parentElement){
        var imported = document.createElement('script');
        imported.src = this.buildIndyUrl(jsUrl);
        parentElement.appendChild(imported);
    };

    this.buildIndyUrl = function(url){
        if (typeof development_override.indynet.serverAppBaseUrl !== 'undefined'){
            return url.replace(/\/[^\/]+\//, function(match){
                    return match.replace(".","/");
                }).replace("indy://", development_override.indynet.serverAppBaseUrl);
        }
        else {
            return "/"+url;
        }
    };

    function Config() {

        this.getFreenetHost = function () {
            if (typeof development_override.indynet.freenetHost !== 'undefined'){
                return development_override.indynet.freenetHost;
            }
            return window.location.hostname;
        };

        this.getFreenetPort = function () {
            if (typeof development_override.indynet.freenetPort !== 'undefined'){
                return development_override.indynet.freenetPort;
            }
            return window.location.port;
        };
        
        this.getIndynetBaseUrl = function() {
            return "http://"+this.freenetHost+":"+this.freenetPort+"/indy://";
        };
        
        this.getRestFreenetBaseUrl = function() {
            return "http://"+this.freenetHost+":"+this.freenetPort+"/rest/";
        };

        this.getWebSocketSupported = function () {
            return ("WebSocket" in window);
        };
        
        this.checkRestFreenetStatus = function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    indynet.config.restFreenetAvailable = true;
                }
            };
            xhr.open("GET", this.restFreenetBaseUrl+"status", true);
            xhr.send();
        };

        this.getWsFreenetStatus = function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var status = JSON.parse(xhr.responseText);
                    indynet.config.wsFreenetServerStarted = Boolean(status.serverStarted);
                    indynet.config.wsFreenetPort = status.serverPort;
                }
            };
            xhr.open("GET", this.restFreenetBaseUrl+"wsfreenetstatus", true);
            xhr.send();
        };

        this.freenetHost = this.getFreenetHost();
        this.freenetPort = this.getFreenetPort();
        this.webSocketSupported = this.getWebSocketSupported();
        this.indynetBaseUrl = this.getIndynetBaseUrl();
        this.restFreenetBaseUrl = this.getRestFreenetBaseUrl();
        this.restFreenetAvailable = false;
        this.wsFreenetPort = null;
        this.wsFreenetServerStarted = false;
        
        this.checkRestFreenetStatus();
        if (this.webSocketSupported) {
            this.getWsFreenetStatus();
        }
    }
}

var indynet = new Indynet();

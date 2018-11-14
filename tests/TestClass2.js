
class Test2 {

    constructor() {
        this.dependentOn = new Array();
        this.getUrl = null;
        this.postUrl = null;
        this.jsonBody = null;
        this.assertions = new Array();
        this.assertDefined = new Array();
        this.assertNotDefined = new Array();
        this.assertNot = new Array();
        this.responseObject = false;
    }

    
    setupTest() {

    };

    test() {

        this.setupTest();

        if(this.getUrl == null && (this.postUrl == null || this.jsonBody == null))
            logTest(false, this.constructor.name  + " Test not implemented");
        else {

            var that = this; 

            if(this.getUrl != null) {
                jQuery.get(this.getUrl, function(data) {
                    that.handleTestResult(data);
                });
            } else {
                jQuery.post(this.postUrl, this.jsonBody, function(data) {
                    that.handleTestResult(data);
                });
            }
        }
    };

    handleTestResult(data) {

        var response = jQuery.parseJSON( data );
        this.responseObject = response;

        var sucessTest = true;

        for(var i = 0; i < this.assertDefined.length; i++) {              
            if(response[this.assertDefined[i].propertyName] == undefined) {
                    logTest(false, this.constructor.name  + " assertion: " + this.assertDefined[i].propertyName + " is undefined");
                    sucessTest = false;
            } else {
                logTest(true, this.constructor.name  + " assertion: " + this.assertDefined[i].propertyName + " is set");
                
            }
        }

        for(var i = 0; i < this.assertNotDefined.length; i++) {              
            if(response[this.assertNotDefined[i].propertyName] != undefined) {
                    logTest(false, this.constructor.name  + " assertion: " + this.assertNotDefined[i].propertyName + " is defined");
                    sucessTest = false;
            } else {
                logTest(true, this.constructor.name  + " assertion: " + this.assertNotDefined[i].propertyName + " is not set");
                
            }
        }

        for(var i = 0; i < this.assertions.length; i++) {

            if(response[this.assertions[i].propertyName] == 
                this.assertions[i].propertyValue) {

                    logTest(true, this.constructor.name  + " assertion: " + this.assertions[i].assertionDesc);

            } else {
                sucessTest = false;
            }
        }

        for(var i = 0; i < this.assertNot.length; i++) {

            if(response[this.assertNot[i].propertyName] != 
                this.assertNot[i].propertyValue) {

                    logTest(true, this.constructor.name  + " assertion: " + this.assertNot[i].propertyName + " is not " + this.assertNot[i].propertyValue);

            } else {
                sucessTest = false;
            }
        }

        

        if(sucessTest)
            logTest(true, this.constructor.name  + " test finished " + data + "<br/>");
        else
            logTest(false, this.constructor.name  + " test finished " + data + "<br/>");   
    }


    addDependentOn(aTest) {
        this.dependentOn.push(aTest);
    };

    isReady() {

        if(this.dependentOn.length == 0)
            return true;

        var amIReady = true;

        for(var j = 0; j < this.dependentOn.length; j++)
            if(this.dependentOn[j].isFinished() == false)
                amIReady = false;

        return amIReady;
    };

    setPost(url, jsonBody) {
        this.postUrl = url;
        this.jsonBody = jsonBody;
    }

    setGet(url) {
        this.getUrl = url;
    }

    assert(assertionDesc, propertyName, propertyValue) {
        this.assertions.push({assertionDesc: assertionDesc, propertyName: propertyName, propertyValue: propertyValue});
    }

    assertDefined(propertyName) {
        this.assertDefined.push({propertyName: propertyName});
    }

    assertNotDefined(propertyName) {
        this.assertNotDefined.push({propertyName: propertyName});
    }

    assertNotEqual(propertyName, propertyValue) {
        this.assertNot.push({propertyName: propertyName, propertyValue: propertyValue});
    }

    isFinished() {        
        if(this.responseObject == false)
            return false;
        return true;
    };

    /**
     * A helper function
     */
    randomEmail() {
        return Math.floor(Math.random()*1000000) + "@" + Math.floor(Math.random()*1000000) + ".com";
    }
    
}
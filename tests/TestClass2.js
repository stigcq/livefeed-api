
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
        this.assertResultLength = false;

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
                }).error(function() {
                    logTest(false, this.constructor.name  + " connection failed, either demo aint running or test url is wrong");
                });
            } else {
                jQuery.post(this.postUrl, this.jsonBody, function(data) {
                    that.handleTestResult(data);
                }).error(function() {
                    logTest(false, this.constructor.name  + " connection failed, either demo aint running or test url is wrong");
                });
            }
        }
    };

    testAssertDefined(assertDefined, response) {

        var successTest = true;

        for(var i = 0; i < assertDefined.length; i++) {              
            if(response[assertDefined[i].propertyName] == undefined) {
                    logTest(false, this.constructor.name  + " assertDefined: " + assertDefined[i].propertyName + " is undefined");
                    successTest = false;
            } else {
                logTest(true, this.constructor.name  + " assertDefined: " + assertDefined[i].propertyName + " is set");
                
            }
        }

        return successTest;
    }

    testAssertNotDefined(assertNotDefined, response) {

        var successTest = true;

        for(var i = 0; i < this.assertNotDefined.length; i++) {              
            if(response[assertNotDefined[i].propertyName] != undefined) {
                    logTest(false, this.constructor.name  + " assertNotDef: " + assertNotDefined[i].propertyName + " is defined");
                    successTest = false;
            } else {
                logTest(true, this.constructor.name  + " assertNotDef: " + assertNotDefined[i].propertyName + " is not set");
                
            }
        }

        return successTest;
    }


    testAssertions(assertions, response) {

        var successTest = true;

        for(var i = 0; i < assertions.length; i++) {

            if(response[assertions[i].propertyName] == 
                assertions[i].propertyValue) {

                    logTest(true, this.constructor.name  + " assertion: " + assertions[i].assertionDesc + 
                        " " + assertions[i].propertyName + " equals " + assertions[i].propertyValue);

            } else {
                logTest(false, this.constructor.name  + " assertion: " + this.assertions[i].assertionDesc + 
                " " + assertions[i].propertyName + " dont equal " + assertions[i].propertyValue);

                successTest = false;
            }
        }

        return successTest;
    }

    
    testAssertNot(assertNot, response) {

        var successTest = true;

        for(var i = 0; i < assertNot.length; i++) {

            if(response[assertNot[i].propertyName] != 
                assertNot[i].propertyValue) {

                    logTest(true, this.constructor.name  + " assertNot: " + assertNot[i].propertyName + " is not " + this.assertNot[i].propertyValue);

            } else {
                sucessTest = false;
            }
        }
        return successTest;
    }

    testAssertResultLength() {
        
    }

    handleTestResult(data) {

        var response = jQuery.parseJSON( data );
        this.responseObject = response;

        var sucessTest = true;

        sucessTest = this.testAssertDefined(this.assertDefined, response);
        sucessTest = this.testAssertNotDefined(this.assertNotDefined, response);
        sucessTest = this.testAssertions(this.assertions, response);
        sucessTest = this.testAssertNot(this.assertNot, response);


        if(this.assertResultLength != false) {
            if(response.length != this.assertResultLength) {
                sucessTest = false;
                logTest(false, this.constructor.name  + " assertion resultlength: " +  response.length + " is not " + this.assertResultLength);
            } else {
                logTest(true, this.constructor.name  + " assertion resultlength: " +  response.length + " equals " + this.assertResultLength);
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

    assertResultLength(n) {
        this.assertResultLength = n;
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
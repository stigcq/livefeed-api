
class Test2 {

    constructor() {
        this.dependentOn = new Array();
        this.url = null;
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

        if(this.url == null || this.jsonBody == null)
            logTest(false, this.constructor.name  + " Test not implemented");
        else {

            var that = this; 
            
            jQuery.post(this.url, this.jsonBody, function(data) {

                var response = jQuery.parseJSON( data );
                that.responseObject = response;

                var sucessTest = true;

                for(var i = 0; i < that.assertDefined.length; i++) {              
                    if(response[that.assertDefined[i].propertyName] == undefined) {
                            logTest(false, that.constructor.name  + " assertion: " + that.assertDefined[i].propertyName + " is undefined");
                            sucessTest = false;
                    } else {
                        logTest(true, that.constructor.name  + " assertion: " + that.assertDefined[i].propertyName + " is set");
                        
                    }
                }

                for(var i = 0; i < that.assertNotDefined.length; i++) {              
                    if(response[that.assertNotDefined[i].propertyName] != undefined) {
                            logTest(false, that.constructor.name  + " assertion: " + that.assertNotDefined[i].propertyName + " is defined");
                            sucessTest = false;
                    } else {
                        logTest(true, that.constructor.name  + " assertion: " + that.assertNotDefined[i].propertyName + " is not set");
                        
                    }
                }
    
                for(var i = 0; i < that.assertions.length; i++) {

                    if(response[that.assertions[i].propertyName] == 
                        that.assertions[i].propertyValue) {

                            logTest(true, that.constructor.name  + " assertion: " + that.assertions[i].assertionDesc);

                    } else {
                        sucessTest = false;
                    }
                }

                for(var i = 0; i < that.assertNot.length; i++) {

                    if(response[that.assertNot[i].propertyName] != 
                        that.assertNot[i].propertyValue) {

                            logTest(true, that.constructor.name  + " assertion: " + that.assertNot[i].propertyName + " is not " + that.assertNot[i].propertyValue);

                    } else {
                        sucessTest = false;
                    }
                }

                

                if(sucessTest)
                    logTest(true, that.constructor.name  + " test finished " + data + "<br/>");
                else
                    logTest(false, that.constructor.name  + " test finished " + data);   
            });
        }
        

    };


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
        this.url = url;
        this.jsonBody = jsonBody;
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
class LoginTest extends Test {

    constructor(dependsOnTest) {
        super();
        this.dependsOnTest = dependsOnTest;
      }

    isReady() {
        return this.dependsOnTest.isFinished();
    }

    isFinished() {
        
        if(loggedInUserObject == false)
            return false;
        return true;
    }

    test() {

        var currentSessionToken = testUserObject.session_token;

        jQuery.post(testUrl + "login/", 
        { email: testUserObject.email, 
            md5password: testUserObject.password}, function(data) {

            console.log(testUserObject.email + " " + testUserObject.password);
            //data = jQuery.parseJSON( data );

            if(data.session_token != 1 && currentSessionToken != data.session_token) {
                logTest(true, "LoginTest: successfully logged in" + data);
                loggedInUserObject = jQuery.parseJSON(data);
            } else {
                logTest(false, "LoginTest: fail logged in" + data);
                
            }
        }).error(function() {
            logTest(false, "LoginTest: Error in connection");
        });
    }
}
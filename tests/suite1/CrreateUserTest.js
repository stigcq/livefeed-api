class CreateUserTest extends Test {

    constructor() {
        super();
      }

    isFinished() {        
        if(testUserObject == false)
            return false;
        return true;
    }

    test() {

        jQuery.post(testUrl + "create_user/", { 
            email: this.randomEmail(),
            display_name: Math.floor(Math.random()*1000000), 
            password: Math.floor(Math.random()*1000000) }, this.onTest).error(function() {
            logTest(false, "Error in connection");
        });
    }

    onTest(data) {

        console.log("create user test done");

        testUserObject = jQuery.parseJSON(data);

        if(testUserObject.error != undefined) {
            logTest(false, testUserObject.message);
            testUserObject = false;
        } else if(testUserObject.session_token != 1) {
            logTest(true, "CreateUserTest: user created " + data);
        }

    }


    isReady() {
        return true;
    }
    
}
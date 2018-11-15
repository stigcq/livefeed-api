class LoginTest extends Test2 {

    constructor(dependsOnTest) {
        super();
        this.addDependentOn(dependsOnTest);
        this.dependsOnTest = dependsOnTest;
      }

    setupTest() {

        this.setPost(testUrl + "login/", { 
            email: this.dependsOnTest.responseObject.email, 
            md5password: this.dependsOnTest.responseObject.password 
        });

        super.assertDefined("session_token");
        super.assertNotEqual("session_token", 1);
        super.assertNotEqual("session_token", this.dependsOnTest.responseObject.session_token);
    }    
}


class LoginTestNoUser extends Test2 {

    constructor() {
        super();
      }

    setupTest() {

        this.setPost(testUrl + "login/", { 
            email: this.randomEmail(), 
            md5password: "somepass" 
        });

        super.assertDefined("session_token");
        super.assertDefined("message");
        super.assert("", "session_token", 1);
        //super.assertDefined("error");

    }    
}
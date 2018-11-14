

class DeleteUserTest extends Test2 {

    constructor(createUserTest, loginTest, deleteFeedTest) {
        super();
        super.addDependentOn(loginTest);
        super.addDependentOn(deleteFeedTest);
        this.loginTest = loginTest;
        this.createUserTest = createUserTest;
    }

    setupTest() {

        this.setPost(testUrl + "delete_user/", { 
            md5_password: this.createUserTest.responseObject.password,
            session_token: this.loginTest.responseObject.session_token 
        });
  
        super.assertNotDefined("error");
        super.assert("", "n", 1);
        super.assert("", "ok", 1);
        
    }

      
}
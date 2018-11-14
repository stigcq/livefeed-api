

class DeleteMessageTest extends Test2 {

    constructor(loginTest, editTest) {
        super();
        super.addDependentOn(loginTest);
        super.addDependentOn(editTest);
        this.loginTest = loginTest;
        this.editTest = editTest;
    }

    setupTest() {

        this.setPost(testUrl + "delete_message/", { 
            message_id: this.editTest.responseObject.id,
            session_token: this.loginTest.responseObject.session_token 
        });
  
        super.assertNotDefined("error");
        super.assert("", "n", 1);
        super.assert("", "ok", 1);
        
    }
 
}
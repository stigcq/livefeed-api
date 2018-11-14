class EditMessageTest extends Test2 {

    constructor(loginTest, dependsOn) {
        super();
        super.addDependentOn(dependsOn);
        super.addDependentOn(loginTest);
        this.getMessageTest = dependsOn;
        this.loginTest = loginTest;
      }

    setupTest() {

        const editedContent = "Automated test message - Edited";
        this.setPost(testUrl + "submit_message/", { 
            message_id: this.getMessageTest.responseObject.id, 
            content: editedContent,
            session_token: this.loginTest.responseObject.session_token 
        });
  
        super.assertNotDefined("error");
        super.assert("", "id", this.getMessageTest.responseObject.id);
        super.assert("", "content", editedContent);
        super.assertDefined("id");
        
    }

}
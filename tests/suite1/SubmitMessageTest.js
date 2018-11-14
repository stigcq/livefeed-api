class SubmitMessageTest extends Test2 {

    constructor(loginTest, createFeedTest) {
        super();
        super.addDependentOn(loginTest);
        super.addDependentOn(createFeedTest);
        this.loginTest = loginTest;
        this.createFeedTest = createFeedTest;
      }


      setupTest() {

        this.setPost(testUrl + "submit_message/", { 
            feed_id: this.createFeedTest.responseObject.id, 
            content: "Automated test message",
            session_token: this.loginTest.responseObject.session_token 
        });
  
        super.assertNotDefined("error");
  
        super.assert("Message correct", "content", "Automated test message");
        super.assertDefined("id");
        
    }


}

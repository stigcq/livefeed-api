

class DeleteFeedTest extends Test2 {

    constructor(loginTest, deleteMesageTest, createFeedTest) {
        super();
        super.addDependentOn(loginTest);
        super.addDependentOn(deleteMesageTest);
        this.loginTest = loginTest;
        this.createFeedTest = createFeedTest;
    }

    setupTest() {

        this.setPost(testUrl + "delete_feed/", { 
            feed_id: this.createFeedTest.responseObject.id,
            session_token: this.loginTest.responseObject.session_token 
        });
  
        super.assertNotDefined("error");
        super.assert("", "n", 1);
        super.assert("", "ok", 1);
        
    }


}
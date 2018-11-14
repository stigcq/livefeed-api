class GetUserFeedsTest extends Test2 {

    
    constructor(assertFeedCount, loginTest, createFeedTest) {
        super();
        this.assertFeedCount = assertFeedCount;
        super.addDependentOn(loginTest);
        super.addDependentOn(createFeedTest);
        this.loginTest = loginTest;
      }

    
      setupTest() {

        this.setGet(testUrl + "get_user_feeds/" + this.loginTest.responseObject.id);
  
        super.assertNotDefined("error");
        super.assertResultLength(this.assertFeedCount);
  
    }


}
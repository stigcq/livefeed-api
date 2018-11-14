class GetUserFeedsTest extends Test2 {

    
    constructor(assertFeedCount, loginTest) {
        super();
        this.assertFeedCount = assertFeedCount;
        super.addDependentOn(loginTest);
        this.loginTest = loginTest;
      }

    
      setupTest() {

        this.setGet(testUrl + "get_user_feeds/" + this.loginTest.responseObject.id);
  
        //super.assert("Feedcount match", "length", this.assertFeedCount);
        super.assertDefined("id");
        super.assertNotDefined("error");
  
    }


}
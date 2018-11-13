
class CreateFeedTest2 extends Test2 {

    constructor(dependsOnTest) {
        super();
        this.addDependentOn(dependsOnTest);
        this.dependsOnTest = dependsOnTest; 
      }

  setupTest() {

      this.setPost(testUrl + "create_feed/", { 
          feed_title: "Test Feed", 
          session_token: this.dependsOnTest.responseObject.session_token 
      });

      super.assert("Feed title correct", "feed_title", "Test Feed");
      super.assertDefined("id");
      super.assertNotDefined("error");

  }

}
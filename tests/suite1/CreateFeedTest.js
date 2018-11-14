
class CreateFeedTest extends Test2 {

    constructor(dependentOnLogin) {
        super();
        this.addDependentOn(dependentOnLogin);
        this.dependentOnLogin = dependentOnLogin; 
      }

  setupTest() {

      this.setPost(testUrl + "create_feed/", { 
          feed_title: "Test Feed", 
          session_token: this.dependentOnLogin.responseObject.session_token 
      });

      super.assert("Feed title correct", "feed_title", "Test Feed");
      super.assertDefined("id");
      super.assertNotDefined("error");

  }

}
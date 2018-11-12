class CreateFeedTest extends Test {

    constructor(dependsOnTest) {
        super();
        this.addDependentOn(dependsOnTest);
      }


    isFinished() {
        
        if(feedObject == false)
            return false;
        return true;
    }

        test() {

            jQuery.post(testUrl + "create_feed/", { 
                feed_title: "Test Feed",
                session_token: loggedInUserObject.session_token }, function(result) {
        
                    feedObject = jQuery.parseJSON( result );
        
                    if(feedObject.error == 1) {
                        logTest(false, "CreateFeedTest: fail create feed" + result);
                    } else {
                        logTest(true, "CreateFeedTest: created a feed" + result);
                    }
            }).error(function() {
                logTest(false, "LoginTest: Error in connection");
            });
        }
}
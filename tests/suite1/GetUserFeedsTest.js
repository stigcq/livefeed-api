class GetUserFeedsTest extends Test {

    
    constructor(assertFeedCount, dependsOnTest) {
        super();
        this.assertFeedCount = assertFeedCount;
        super.addDependentOn(dependsOnTest);
      }

    /*isReady() {
        /*if(feedObject == false)
            return false;
        else return true;*/

     //   return this.dependsOnTest.isFinished();
    //}/
    


    test() {

        var assertFeedCountVar = this.assertFeedCount;
          
        jQuery.get(testUrl + "get_user_feeds/" + loggedInUserObject.id, {}, function(result) {
        
            var userFeeds = jQuery.parseJSON( result );
        
            if(userFeeds.error == 1) {
                logTest(false, "GetUserFeedsTest: failed get feeds" + result);
            } else {

                console.log("assertfeedcount", assertFeedCountVar);
                if(userFeeds.length == assertFeedCountVar)
                    logTest(true, "GetUserFeedsTest: fetched users feeds" + result);
                else
                    logTest(false, "GetUserFeedsTest: fetched users feeds count dont match" + result);
            }
            }).error(function() {
                logTest(false, "GetUserFeedsTest: Error in connection");
            });
        }
}
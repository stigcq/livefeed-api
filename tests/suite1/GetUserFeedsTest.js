class GetUserFeedsTest extends Test {

    constructor() {
        super();
      }

    isReady() {
        if(feedObject == false)
            return false;
        else return true;
    }

    test() {

        jQuery.get(testUrl + "get_user_feeds/" + loggedInUserObject._id, {}, function(result) {
        
            var userFeeds = jQuery.parseJSON( result );
        
            if(userFeeds.error == 1) {
                logTest(false, "GetUserFeedsTest: failed get feeds" + result);
            } else {

                if(userFeeds.length == 1)
                    logTest(true, "GetUserFeedsTest: fetched users feeds" + result);
                else
                    logTest(false, "GetUserFeedsTest: fetched users feeds count dont match" + result);
            }
            }).error(function() {
                logTest(false, "GetUserFeedsTest: Error in connection");
            });
        }
}
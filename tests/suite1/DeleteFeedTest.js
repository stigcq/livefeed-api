

class DeleteFeedTest extends Test {

    constructor(dependsOn) {
        super();
        super.addDependentOn(dependsOn);
    }

    
    isFinished() {
        
        if(feedObjectDeleted == false)
            return false;
        return true;
    }

        test() {

            jQuery.post(testUrl + "delete_feed/", 
            { feed_id: feedObject.id, 
                session_token: loggedInUserObject.session_token }, function(data) {
        
                feedObjectDeleted = jQuery.parseJSON( data );

                if(feedObjectDeleted.error != undefined)
                    logTest(false, "DeleteFeedTest: feed not deleted"+ data);    
                else if(feedObjectDeleted.n == 1 && feedObjectDeleted.ok == 1)
                    logTest(true, "DeleteFeedTest: feed deleted"+ data);    
                ekse
                    logTest(false, "DeleteFeedTest: feed not deleted"+ data);    
                
            }).error(function(conn, message, error) {
                feedObjectDeleted = true;
                logTest(false, "DeleteFeedTest: Error in connection <b>" + error + "</b>");
            });

        }
}
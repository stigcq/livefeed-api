class SubmitMessageTest extends Test {

    constructor(dependentOn) {
        super();
        super.addDependentOn(dependentOn);
      }


    isFinished() {
        
        if(messageObject == false)
            return false;
        return true;
    }

    test() {

        jQuery.post(testUrl + "submit_message/", 
            { feed_id: feedObject.feed_id, 
                content: "automated test message",
                session_token: loggedInUserObject.session_token
                }, function(data) {
                    
                 messageObject = jQuery.parseJSON( data );
        
            if(messageObject.error == 1) {
                logTest(false, "SubmitMessageTest: user has been logged out");        
            } else if(data.error == 2) {
                logTest(false, "SubmitMessageTest: user dont have perms for feed");        

            } else {
                logTest(true, "SubmitMessageTest: message added"+ data);    
            }
        }).error(function() {
                logTest(false, "SubmitMessageTest: Error in connection");
            });
        }
}

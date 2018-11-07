

class DeleteFeedTest extends Test {

    constructor() {
        super();
      }

      isReady() {
          if(messageObjectDeleted == false)
              return false;
          else return true;
        }

        test() {

            jQuery.post(testUrl + "delete_feed/", 
            { feed_id: feedObject._id, 
                session_token: loggedInUserObject.session_token }, function(data) {
        
                logTest(true, "DeleteFeedTest: feed deleted"+ data);    

            }).error(function() {
                logTest(false, "DeleteFeedTest: Error in connection");
            });

        }
}
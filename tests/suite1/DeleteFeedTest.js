

class DeleteFeedTest extends Test {

    constructor() {
        super();
      }

      isReady() {
          if(messageObjectDeleted == false)
              return false;
          else return true;
        }

        
        isFinished() {
        
            if(feedObjectDeleted == false)
                return false;
            return true;
        }

        test() {

            jQuery.post(testUrl + "delete_feed/", 
            { feed_id: feedObject._id, 
                session_token: loggedInUserObject.session_token }, function(data) {
        
                feedObjectDeleted = jQuery.parseJSON( data );


                logTest(true, "DeleteFeedTest: feed deleted"+ data);    

            }).error(function(conn, message, error) {
                feedObjectDeleted = true;
                logTest(false, "DeleteFeedTest: Error in connection <b>" + error + "</b>");
            });

        }
}
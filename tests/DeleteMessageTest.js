

class DeleteMessageTest extends Test {

    constructor() {
        super();
      }

      isReady() {
          if(messageObjectEdited == false)
              return false;
          else return true;
        }

        test() {

            jQuery.post(testUrl + "delete_message/", 
            { message_id: messageObject._id, 
                session_token: loggedInUserObject.session_token }, function(data) {
        
                logTest(true, "DeleteMessageTest: message deleted"+ data);    

            }).error(function() {
                logTest(false, "DeleteMessageTest: Error in connection");
            });

        }
}
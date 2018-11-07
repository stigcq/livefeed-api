class EditMessageTest extends Test {

    constructor() {
        super();
      }

      isReady() {
          if(messageObject == false)
              return false;
          else return true;
        }

        test() {

            jQuery.post(testUrl + "submit_message/", {
                message_id: messageObject._id, 
                content: "edited automated test message",
                session_token: loggedInUserObject.session_token }, function(data) {

                messageObjectEdited = jQuery.parseJSON( data );

                if(messageObjectEdited.content != "edited automated test message")
                logTest(false, "EditMessageTest: message edited but content different "+ data);    
                else
                logTest(true, "EditMessageTest: message edited"+ data);    

            }).error(function() {
                logTest(false, "EditMessageTest: Error in connection");
            });

        }
}


class DeleteMessageTest extends Test {

    constructor(dependsOn) {
        super();
        super.addDependentOn(dependsOn);
    }

    isFinished() {        
        if(messageObjectDeleted == false)
            return false;
        return true;
    }

  
    test() {

        jQuery.post(testUrl + "delete_message/", 
            { message_id: messageObject._id, 
                session_token: loggedInUserObject.session_token }, function(data) {
        
                messageObjectDeleted = jQuery.parseJSON( data );

                logTest(true, "DeleteMessageTest: message deleted"+ data);    

            }).error(function() {
                logTest(false, "DeleteMessageTest: Error in connection");
            });

        }
}
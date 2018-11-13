class EditMessageTest extends Test {

    constructor(dependsOn) {
        super();
        super.addDependentOn(dependsOn);
      }

     
    isFinished() {
        
        if(messageObjectEdited == false)
            return false;
        return true;
    }

    test() {

            jQuery.post(testUrl + "submit_message/", {
                message_id: messageObject.id, 
                content: "edited automated test message",
                session_token: loggedInUserObject.session_token }, function(data) {

                messageObjectEdited = jQuery.parseJSON( data );

                if(messageObjectEdited.content != "edited automated test message")
                    logTest(false, "EditMessageTest: message edited but content different "+ data);    
                else if(messageObjectEdited.id != messageObject.id)
                   logTest(false, "EditMessageTest: message  ids different "+ data);        
                else logTest(true, "EditMessageTest: message edited"+ data);    

            }).error(function() {
                logTest(false, "EditMessageTest: Error in connection");
            });

        }
}
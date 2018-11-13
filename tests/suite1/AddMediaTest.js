class AddMediaTest extends Test {

    constructor(dependsOnTest) {
        super();
        this.addDependentOn(dependsOnTest);
      }


    isFinished() {
        
        if(mediaObject == false)
            return false;
        return true;
    }

        test() {

            jQuery.post(testUrl + "add_media/", { 
                media_url: "http://itselskabet.nu/files/9237ccb4-59cc-4ed6-b4c2-b9857db57db0/1_21FF74FA-8FBD-0D53-1E3C-DDE6777224F920150806.jpg",
                session_token: loggedInUserObject.session_token }, function(result) {
        
                    mediaObject = jQuery.parseJSON( result );
        
                    if(feedObject.error != undefined) {
                        logTest(false, "AddMediaTest: fail create feed" + result);
                    } else {
                        logTest(true, "AddMediaTest: created a feed" + result);
                    }
            }).error(function() {
                logTest(false, "AddMediaTest: Error in connection");
            });
        }
}
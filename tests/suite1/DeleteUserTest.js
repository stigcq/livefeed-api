

class DeleteUserTest extends Test {

    constructor() {
        super();
      }

      isReady() {
          if(feedObjectDeleted == false)
              return false;
          else return true;
        }

        test() {

            jQuery.post(testUrl + "delete_user/", 
            { md5_password: loggedInUserObject.password, 
                session_token: loggedInUserObject.session_token }, function(data) {
        
                logTest(true, "DeleteUserTest: user deleted"+ data);    

            }).error(function(conn, message, error) {
                logTest(false, "DeleteUserTest: Error in connection <b>" + error + "</b>");
            });

        }
}
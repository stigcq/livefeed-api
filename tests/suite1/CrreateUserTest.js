class CreateUserTest extends Test2 {

    constructor() {
        super();
      }

    

    setupTest() {

        const displayName = Math.floor(Math.random()*1000000);
        const email = this.randomEmail();
        const pass = Math.floor(Math.random()*1000000);

        this.setPost(testUrl + "create_user/", { 
            email: email,
            display_name: displayName, 
            password:  pass});

        super.assert("Displayname correct", "display_name", displayName);
        super.assert("Email correct", "email", email);
        super.assert("Pass md5 correct", "password", md5("" + pass));
        super.assertDefined("id");
        super.assertDefined("session_token");
    }

    

    isReady() {
        return true;
    }
    
}
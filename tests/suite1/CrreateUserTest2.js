class CreateUserTest2 extends Test2 {

    constructor() {
        super();
      }

    

    setupTest() {

        const displayName = Math.floor(Math.random()*1000000);
        const email = this.randomEmail();

        this.setPost(testUrl + "create_user/", { 
            email: email,
            display_name: displayName, 
            password: Math.floor(Math.random()*1000000) });

        super.assert("Displayname correct", "display_name", displayName);
        super.assert("Email correct", "email", email);
        super.assertDefined("id");
        super.assertDefined("session_token");
    }

    

    isReady() {
        return true;
    }
    
}
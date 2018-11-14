
class GetMessageTest extends Test2 {

    constructor(submitMessage) {
        super();
        super.addDependentOn(submitMessage);
        this.submitMessage = submitMessage;
    }

    setupTest() {

        this.setGet(testUrl + "get_message/" + this.submitMessage.responseObject.id);
  
        super.assertNotDefined("error");
        super.assert("", "id", this.submitMessage.responseObject.id);
        super.assert("", "content", this.submitMessage.responseObject.content);
  
    }



}
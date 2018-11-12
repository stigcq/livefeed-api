
class Test {

    constructor() {
        this.subTests = new Array();
        this.result = false;
      }

    test() {
        logTest(false, this.constructor.name  + " Test not implemented");
    }

    isReady() {
        return false;
    }


    isFinished() {
        return false;
    }

    /**
     * A helper function
     */
    randomEmail() {

        return Math.floor(Math.random()*1000000) + "@" + Math.floor(Math.random()*1000000) + ".com";
    }
    
}
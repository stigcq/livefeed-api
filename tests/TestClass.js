
class Test {

    constructor() {
        this.dependentOn = new Array();

      }

    test() {
        logTest(false, this.constructor.name  + " Test not implemented");
    }

    addDependentOn(aTest) {
        this.dependentOn.push(aTest);
    }

    isReady() {
        if(this.dependentOn.length == 0)
            return true;

        amIReady = true;

        for(i = 0; i < this.dependentOn.length; i++)
            if(this.dependentOn[i].isFinished() == false)
                amIReady = false;

        return amIReady;
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
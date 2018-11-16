# Tests

This folder contains a homegrown test suite. Purpose, besides testing the API calls, is that tests is run as ordinary javascript loaded from a simple html file which can be opened by browser from a local folder or web and be run without any enviroment needed to be set up. 

Entry point is the test.html which basicly just loads the js needed. The test.js is the test runner. TestClass2 is a test class which all test (located in suite1) extends. To write a test one basicly
just need to set the url and parameters for the call, and define some assertions. And then add the test in the test.js class. 

As such the tests also works as good documentation/examples on using the API. 

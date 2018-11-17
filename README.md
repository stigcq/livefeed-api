# livefeed-api

This is an implementation of my livefeed api made with node.js, express and mongodb. 

The livefeed api is a messaging system made for livefeeds, that is,
a feed of messages that updates regularly, f.x. a journalist covering a sport event.

This API implementation with js/jquery frontend can be seen here:
<a href="http://3.121.5.61/example/">Live feed example API usage</a>

Purpose of this implementation is to seperate backend from frontend and
make it a genuine JAMStack app. 

## In progress

The project is new, in progress. To test it: 

1. checkout the code
2. run npm install
3. create an .env file (see sample.env) for your mongodb settings
4. run npm start
5. See curl.tests file for example curl invocations and documentation on the API. Or tests
folder for jquery examples
6. Use public/example as demo client 

## public/example

Contains a clientside implementation under work. Viewable here
<a href="http://3.121.5.61/example/">Live feed example API usage</a>
It is a static html/js which can be deployed on any webserver. 
The API backend is run as a background process on my lightsail mean stack. 

### To setup the client on own server
1. Upload content of example folder to a webhost, including js and css folders. 
2. index.html is the entry point
3. You need adjust urls in top of the js/feed.js file: feedUrl points to where
you run the API implementation, uploadUrl point to where the uploaded files via
fineuploader is being put. 
4. You need set up the fineuploader endpoint: endpoint.php and handler.php. They can
be put anywhere but you need adjust urls accordingly in the fineuploader initialization in the
feed.js file. 

The usage of fineuploader and endpoint.php is not part of the API but just an example
on how the API can be used. 

### Git structure

<b>apidocs</b> contains api documentation which is in progress<br/>
<b>lib</b> contains a datalayer and an authlayer<br/>
<b>public</b> contains a clientside demo version as described above<br/>
<b>routes</b> contains express routes which basicly works as controllers <br/>
<b>tests</b> contains a simple testsuite made with static html and js, it can 
be run directly as it is (opening test.html) from a folder or a webhost. One need
adjust testUrl var in the top of test.js. The tests are good examples on API usage
with JQuery <br/>


## Contribute

If you find this project interesting, and want to help, or you got some question,
 drop me a message at stigcq at yahoo dot com. 



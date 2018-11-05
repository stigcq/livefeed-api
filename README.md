# livefeed-api

This is an implementation of my livefeed api made with node.js, express and mongodb. 

The livefeed api is basicly a messaging system made for livefeeds, that is
a feed of messages that updates regularly, f.x. a journalist covering a sport event.

The current php implementation with js/jquery frontend can be seen here:
<a href="http://itselskabet.nu/feed">Live feed example</a>

This API implementation with js/jquery frontend can be seen here:
<a href="http://3.121.5.61/example/">Live feed example API usage</a>

Purpose of this implementation is to clearly seperate backend from frontend and hence
make it a genuine JAMStack app. 

## In progress

The project is just started, in progress. When the implementation is usefull
usage notes will be supplied here. But basicly

1. checkout the code
2. run npm install
3. create an .env file (see sample.env) for your db setting
4. run npm start
5. See curl.tests file for example curl invocations and documentation on the API. 
6. Use public/example as client demo (need change server url in the feed.js)

## public/example

Contains a clientside implementation under work. Viewable here
http://3.121.5.61/example/
It is a static html/js which can be deployed on any webserver. 
The API backend is run as a background process on my lightsail mean stack. It might crash
if theres errors since they are thrown. 
Create user, login and posting messages works. Commenting should also work now,
though there might be bugs. Add media and set avatar works in the api, but
not clientside demo yet (and use curl to invoke them).

### To setup the client on own server
1. Upload content of example folder to a webhost, including js and css folders. 
2. index.html is the entry point
3. You need adjust urls in top of the js/feed.js file: feedUrl points to where
you run the API implementation, uploadUrl point to where the uploaded files via
fineuploader is being put. 
4. You need set up the fineuploader endpoint: endpoint.php and handler.php. They can
be put anywhere but you need adjust urls to them in the fineuploader initialization in the
feed.js file. 

The usage of fineuploader end endpoint.php is not part of the API and just an example
on how the API can be used. 

## Contribute

If you find this project interesting and want help, either on API or frontend, drop
me a message at stigcq at yahoo dot com. 

### Git structure

<b>apidocs</b> contains api documentation which is in progress
<b>lib</b> contains a datalayer and an authlayer
<b>public</b> contains a clientside demo version as described above
<b>routes</b> contains express routes which basicly works as controllers 



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
Its run as a background process on my lightsail mean stack. It might crash
if theres errors since they are thrown. 
Create user, login and posting messages works. Commenting should also work now,
though there might be bugs. Add media and set avatar works in the api, but
not clientside demo yet (and use curl to invoke them).

## Contribute

If you find this project interesting and want help, either on API or frontend, drop
me a message at stigcq at yahoo dot com. 



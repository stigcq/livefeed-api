
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

//change for own server
var feedUrl = "http://3.121.5.61:3000/";
var feedId = 0; //'5bd724433e0b567c87409320';

//not api related, basicly where uploader code stores files, is used
//to create url to the file which is send to the API
var uploadUrl = "http://3.121.5.61/files/";


var isFetching = false;
var lastFetch = false;

//how often to check for new messages in msec
var messageLoopTime = 8000;

//how often to check for new comments in msec
var commentLoopTime = 30000;

//highest messsage time, ie. time of newest message, used to request new messages
var highestMessageTime = 0;

//lowest message tme, used to load older messages
var lowestMessageTime = 100000000000000;

//the loaded messages with id as key
var messages = new Array();

//for showing photos in overlay
var focusMessageId = 0;
var photoIndex = 0;

//set when logged in
var sessionToken = 0;

var userId = 0;
var runLoop = true;




jQuery( document ).ready(function() {

    if(Cookies.get('user_id') != undefined && Cookies.get('session_token') != undefined) {

        userId = Cookies.get('user_id');
        sessionToken = Cookies.get('session_token');
        showPostMessage();
        showMyMenu();
    }

    //if viewing 1 message or other circumstances where not showing a feed 
    //it shouldnt run the loops
    if(runLoop) {
        startLoop();
        //wait start comments until messages fetched
        setTimeout(startCommentsLoop, 4000);
    }

    timeago(null, "en").render($('.feed_time'));


});
    

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
       hidePhotos();
   }
});


function startLoop() {

    setTimeout(startLoop, messageLoopTime);
    fetchMessages();
}

function startCommentsLoop() {

    setTimeout(startCommentsLoop, commentLoopTime);
    checkForComments();
}


function checkForComments() {

    jQuery.getJSON(feedUrl + "comment_counts/" + feedId + "/", function(data) {

        for(i = 0; i < data.length; i++) {
            
            currentCommentCount = jQuery("#show_comments_buutton_" + data[i].message_id).attr("data-comment-count");
      
            if(data[i].count > currentCommentCount) {

                jQuery("#show_comments_buutton_" + data[i].message_id).attr("data-comment-count", data[i].count);
                jQuery("#show_comments_buutton_" + data[i].message_id).show();
                jQuery("#show_comments_buutton_" + data[i].message_id).html("<a href='javascript: showComments(\"" + data[i].message_id + "\")'>" + data[i].count + " kommentar(er)</a>");
            }
        }

    });
}






function copyShareLink(messageId) {

    $("#clipboard_field").show();
    $("#clipboard_field").val("http://itselskabet.nu/feed/post/" + messageId);


    var copyText = document.getElementById("clipboard_field");

    /* Select the text field */
    copyText.select();
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    alert("Share link is copied to clipboard. You can paste it on FB, Twitter, emails or whereever you like ");

    $("#clipboard_field").hide();

}


function changeFeed(id, title) {

    feedId = id;
    highestMessageTime = 0;

    if(userId > 0)
    showPostMessage();

    jQuery("#content").html("");
    jQuery("#feed_header").html("<a href='javascript: changeFeed(0, \"ALL FEEDS\");'><h1>" + title + "</h1></a>");

    startLoop();
    startCommentsLoop();
    

}


function loadMore() {

    fetchMessagesX(1);
}

function fetchMessages() {

    fetchMessagesX(0);
}

function showPhotos(mId, index) {

    focusMessageId = mId;
    photoIndex = index;

    jQuery("#overlay_img").attr("src", messages[mId].photos[photoIndex].media_url);
    document.getElementById("overlay").style.display = "block";
}

function nextPhoto() {

    if(messages[focusMessageId].photos.length > (photoIndex+1)) {
        photoIndex++;
    } else {
        photoIndex = 0;
    }

    console.log(messages[focusMessageId].photos.length + " " + photoIndex);

    jQuery("#overlay_img").attr("src", messages[focusMessageId].photos[photoIndex].media_url);
    
}

function prevPhoto() {

    photoIndex--;
    if(photoIndex < 0)
        photoIndex = (messages[focusMessageId].photos.length-1);

    jQuery("#overlay_img").attr("src", messages[focusMessageId].photos[photoIndex].media_url);
        
}

function hidePhotos() {
    document.getElementById("overlay").style.display = "none";

}

function fetchMessagesX(goBack) {

    if(isFetching)
        return;

    //console.log("start fetch " +  feedUrl + "messages/" + feedId + "/" + messageId + "/" + goBack);

    myId = highestMessageTime;

    if(goBack == 1)
        myId = lowestMessageTime;

    jQuery.getJSON(feedUrl + "messages/" + feedId + "/" + myId + "/" + goBack, function(data) {

        
        for(i = 0; i < data.length; i++) {

            //mustache dont got this sort o if 
            if(data[i].user != undefined) {

                if(data[i].user.id == userId)
                    data[i].is_owner = 1;
            }

            data[i].view_feed_id = feedId;
            data[i].message_id = data[i].id;

            if(data[i].content != null && data[i].content != undefined)
                data[i].content = data[i].content.replace(/(?:\r\n|\r|\n)/g, '<br>');

            if(data[i].photos != undefined) {
                if(data[i].photos.length > 1)
                    data[i].more_photos = 1;

                for(j = 0; j < data[i].photos.length; j++)
                    data[i].photos[j].index = j;

            }

            var template = $('#message_view_template').html();

            if(goBack == 1)
                jQuery("#content").append(Mustache.render(template, data[i]));
            else
                jQuery("#content").prepend(Mustache.render(template, data[i]));

            timeago(null, "en").render($('.feed_time'));

            //console.log(data[i].id);
            messages[data[i].id] = data[i];

            if(parseInt(data[i].feed_time) > highestMessageTime)
                highestMessageTime = parseInt(data[i].feed_time);

            if(parseInt(data[i].feed_time) < lowestMessageTime)
                lowestMessageTime = parseInt(data[i].feed_time);
        }

        isFetching = false;
    });
}

function showComments(messageId) {

    
    jQuery("#show_comments_buutton_" + messageId).hide();

    jQuery("#comments_section_" + messageId).show();
    jQuery("#comments_section_" + messageId).html("Loader...");

    

    jQuery.getJSON(feedUrl + "comments/" + messageId, function(data) {

        console.log(data);

        //data = jQuery.parseJSON( data );

        //clear comments
        jQuery("#comments_section_" + messageId).html("");

        //get comment template
        var template = $('#comment_view_template').html();

       //render and append comments
        for(i = 0; i < data.length; i++) {

            /*if(data[i].avatar_path.length < 1)
                data[i].has_avatar = false;
            else
                data[i].has_avatar = true;*/

            jQuery("#comments_section_" + messageId).append(Mustache.render(template, data[i]));
       
        }

        timeago(null, "en").render($('.feed_time'));

        jQuery("#show_comments_buutton_" + messageId).attr("data-comment-count", data.length);
      
    });
}


function commentPost(messageIdX) {

    if(userId == 0)
        jQuery("#feed_item_" + messageIdX).append("<div>Du skal være logget på for at kommentere</div>");
    else {
        var template = $('#comment_template').html();
        //Mustache.parse(template);   
        $('#feed_item_' + messageIdX).append(Mustache.render(template, {message_id: messageIdX}));
    }

}


function sendComment(messageId) {

    content = jQuery("#comment_area_" + messageId).val();

    jQuery.post(feedUrl + "submit_comment/", { 
            message_id: messageId, 
            user_id: userId, 
            feed_id: feedId,
            content: content, 
            session_token: sessionToken }, function(data) {

        console.log("fetched " + data);

        jQuery("#comment_area_" + messageId).val("");

        showComments(messageId);       

    });
}

function cancelComment(messageId) {

    jQuery("#comment_box_" + messageId).remove();

}


function editPost(messageId) {

    messageContent = $('#message_content_' + messageId).html();

    messageContent = messageContent.replaceAll("<br>", "\n");

    var template = $('#edit_template').html();
    //Mustache.parse(template);   
    $('#feed_item_' + messageId).html(Mustache.render(template, {message_id: messageId}));

    $('#edit_textarea_' + messageId).html(messageContent);

    console.log(messageContent);
   

}

function saveEditPost(messageId) {

    messageContent = $('#edit_textarea_' + messageId).val();
    //console.log(messageContent);

    jQuery.post(feedUrl + "submit_message/", { 
        message_id: messageId, 
        content: messageContent, 
        session_token: sessionToken }, 
            function(data) {

                jObj = JSON.parse(data);
            
                if(jObj.user_id == userId)
                    jObj.is_owner = 1;

                var template = $('#message_view_template').html();
                $('#feed_item_' + messageId).replaceWith(Mustache.render(template, jObj));

                timeago(null, "en").render($('.feed_time'));

                console.log(data);
        });

    //send to server as post
    //server sends the post as json back
    //render it again


}


function deletePost(messageId) {

    jQuery.post(feedUrl + "delete_message/", 
            { message_id: messageId, session_token: sessionToken }, function(data) {
        
        jQuery("#feed_item_" + messageId).hide();

        console.log(data);
    });
}


/*function createFeed() {

    feedTitle = jQuery("#feed_title").val();

    jQuery.post(feedUrl + "create_feed/", 
        {feed_title: feedTitle, user_id: userId, session_token: sessionToken }, function(data) {

        console.log("create feed  " + data);

        showPostMessage();

        changeFeed(data);
        //fineupload.reset();
    });
}*/


function sendMessage() {

    console.log(sessionToken);

    mycontent = jQuery("#my_message").val();

    jQuery.post(feedUrl + "submit_message/", 
            { feed_id: feedId, 
                content: mycontent,
                session_token: sessionToken
                }, function(data) {
                    
        console.log("fetched " + data);
        data = jQuery.parseJSON( data );
        
        if(data.error == 1) {

            $("#clipboard_field").show();
            $("#clipboard_field").val(mycontent);        
        
            var copyText = document.getElementById("clipboard_field");
            copyText.select();
            document.execCommand("copy");

            clearUserLogin();

            var template = $('#top_logged_out').html();
            jQuery("#feed_top").html(Mustache.render(template, {"message": "Your post is copied to clipboard."})); 

        } else if(data.error == 2) {

            alert("You dont have perms for this feed");

        } else {
            jQuery("#my_message").val("");
    
            if(isUploaderInited) {
                $("#fine-uploader-gallery").hide();
                $("#fine-uploader-gallery").fineUploader('reset');
                
            }
        }


        //fineupload.reset();
    });
}

function clearUserLogin() {

    userId = 0;
    sessionToken = 0;
    Cookies.remove('user_id');
    Cookies.remove('session_token');

}

function setAvatar(photoId) {

    jQuery.post(feedUrl + "set_avatar/", {photo_id: photoId}, function(data) {

        console.log("set avatar " + data);

        alert("avatar ændret");
        //fineupload.reset();
    });
}


function showUserSettings() {
    
    var template = $('#your_settings_template').html();
    jQuery("#feed_top").html(Mustache.render(template, {}));    
}

function showCreateFeed() {

    var template = $('#create_feed_template').html();
    jQuery("#feed_top").html(Mustache.render(template, {}));    
}

function showLogin() {

    jQuery("#feed_top").html(jQuery("#login_template").html());
}


function login() {

    //console.log(jQuery("#login_pass").val());

    jQuery.post(feedUrl + "login/", 
        { email: jQuery("#login_email").val(), 
            md5password: md5(jQuery("#login_pass").val())}, function(data) {

                console.log(data.session_token + " " + data.id);
                console.log(data);
        data = jQuery.parseJSON( data );

        console.log(data.session_token + " " + data.id);

        if(data.session_token != 1) {
            setUserSession(data.id, data.session_token);
            showPostMessage();

            jQuery("#content").html = "";
            messages = new Array();
            fetchMessagesX(0);

            showMyMenu();
        }
    });
}


function createUser() {

    jQuery.post(feedUrl + "create_user/", { 
        email: jQuery("#create_user_email").val(),
        display_name: jQuery("#create_user_display_name").val(), 
        password: jQuery("#create_user_pass").val() }, function(data) {

            console.log(data);

            data = jQuery.parseJSON( data );

            if(data.error == 1) {
                alert(data.message);
            } else if(data.session_token != 1) {
                console.log(data.session_token);

                setUserSession(data.id, data.session_token);

                showCreateFeed();
                
                showMyMenu();
            }
    });
}

function showMyMenu() {
    var template = $('#feed_menu_template').html();
    jQuery("#feed_menu").html(Mustache.render(template, {}));        
}


function showSettings() {
    
    var template = $('#your_settings_template').html();
    jQuery("#feed_top").html(Mustache.render(template, {}));        
}

function saveMySettings() {

    if(jQuery("#settings_display_name").val().length > 1) {
        jQuery.post(feedUrl + "set_display_name/", { 
            display_name: jQuery("#settings_display_name").val(),
            session_token: sessionToken }, function(data) {
    
                console.log(data);
    
                data = jQuery.parseJSON( data );
    
                if(data.error == 1) {
                    alert(data.message);
                } else {
                    //showCreateFeed();
                    jQuery("#settings_message").val("Displayname saved");
                }
        });
    } 

    if(jQuery("#settings_avatar_url").val().length > 1) {
        jQuery.post(feedUrl + "add_media/", { 
            media_url: jQuery("#settings_avatar_url").val(),
            session_token: sessionToken }, function(data) {
    
                console.log(data);
    
                data = jQuery.parseJSON( data );
    
                if(data.error == 1) {
                    alert(data.message);
                } else {
                    jQuery.post(feedUrl + "set_avatar/", { 
                        media_id: data.id,
                        session_token: sessionToken }, function(data) {
    
                            jQuery("#settings_message").val("Avatar saved saved");
                            
                        });
                    //showCreateFeed();
                }
        });
    } 

}

function setUserSession(userId, mySessionToken) {

    sessionToken = mySessionToken;
    userId = userId;
    Cookies.set('user_id', userId);
    Cookies.set('session_token', sessionToken);

}

function createFeed() {

    jQuery.post(feedUrl + "create_feed/", { 
        feed_title: jQuery("#create_feed_title").val(),
        session_token: sessionToken }, function(data) {

            console.log(data);

            data = jQuery.parseJSON( data );

            if(data.error == 1) {
                alert(data.message);
            } else {
                //showCreateFeed();
                showPostMessage();
            }
    });
}


function showSignup() {
    jQuery("#feed_top").html(jQuery("#create_user_template").html());
    
}

function showPostMessage() {
    var template = $('#post_messsage_feed_template').html();
    jQuery("#feed_top").html(Mustache.render(template, {}));        
}



var isUploaderInited = false;;

function showUploadFiles() {


    if(isUploaderInited == false) {
        isUploaderInited = true;
        initUploader();
    }
        

    $("#fine-uploader-gallery").show();

}


function initUploader() {

    fineupload = $('#fine-uploader-gallery').fineUploader({
        template: 'qq-template-gallery',
        request: {
            endpoint: '/endpoint.php'
        },
        thumbnails: {
            placeholders: {
                waitingPath: '/images/waiting-generic.png',
                notAvailablePath: '/images/not_available-generic.png'
            }
        },
        validation: {
            allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
        },
        onComplete: function(id, name, responseJSON) {
            console.log(id);
            console.log(responseJSON);
        }
    }).on('complete', function(event, id, fileName, responseJSON) {

        console.log(responseJSON.uuid + "/" +  responseJSON.uploadName);
        console.log(responseJSON);

        jQuery.post(feedUrl + "add_media/", 
            {media_url: uploadUrl + responseJSON.uuid + "/" +  responseJSON.uploadName,
            session_token: sessionToken}, function(data) {
                console.log(data);
        });
      
   });

}

//Global Variables
//-----------------------------------
var vote;
var leftComments = [];
var rightComments = [];
var leftPreComments = [];
var rightPreComments = [];
var Data;
var postWhy = false;
var commentAlreadyClicked = false;
var commentThatsBeenClicked;

//height of header for scaling
var headerHeight = 50;

//Function List
//-----------------------------------

var scaler = function() {
    
    var windowheight = $(window).height();
    var resultsheight = $('#results-holder').height();
    var doneheight = $('#donezone').height();
    var whyheight = $('#whybox').height();
    
    var premaynheight = windowheight-headerHeight-resultsheight-doneheight-whyheight-125;
    var maynheight = windowheight-resultsheight-headerHeight;
    var statsheight = windowheight-headerHeight;
    
    $('#mayn').height(maynheight+'px');
    $('#stats').height(statsheight+'px');
    $('#premayn').height(premaynheight+'px');
    
    console.log("Window: " + windowheight);
    console.log("Sum: " + (headerHeight+resultsheight+doneheight+whyheight+premaynheight));

};

//Scales leftbar element on top of right bar background using left and right values (leftbarelement,rightbarelement,leftval,rightval)
var setBar = function(target, reference, leftVal, rightVal) {
    var actualWidth = $(target).width();
    var newWidth = ((leftVal) / (leftVal + rightVal)) * 2 * actualWidth;
    console.log("Actual: "+actualWidth);
    console.log("New: "+newWidth);
    $(target).animate({
        width: newWidth
    }, 400, 'easeOutCubic');
};

//Specifically scales each approval bar 
var setApprovalBars = function(data) {
    var abwidth = $('.approvalbar').width();
    console.log(abwidth);
    for (var i = 0; i < data.comments.length; i++) {
        if (data.comments[i].stance == 'A') {
            $('#ab' + data.comments[i].id).width(((data.comments[i].uVotes - data.comments[i].dVotes) / data.AMax) * abwidth);
        } else {
            $('#ab' + data.comments[i].id).width(((data.comments[i].uVotes - data.comments[i].dVotes) / data.BMax) * abwidth);
        }
    }
};

//Uses data to load comment divs on page and store them in left and right comment arrays
var generateCommentDivs = function(data) {
    for (var i = 0; i < data.comments.length; i++) {
        if (data.comments[i].stance == 'A') {

            $('#leftcomments').append('<div class="cbox cboxleft ccommentleft" id="c' + data.comments[i].id + '"><p>' + data.comments[i].text + '</p></div>');
            $('#leftcomments').append('<div class="infobox"><div class="approvalbar leftcol pull-left" id="ab' + data.comments[i].id + '"></div><p class="commentnum pull-right text-right" id="' + 12 + '"></p></div>');
            $('#leftcomments').append('<br>');

            leftComments.push(data.comments[i].id);
        } else if (data.comments[i].stance == 'B') {

            $('#rightcomments').append('<div class="cbox cboxright ccommentright" id="c' + data.comments[i].id + '"><p>' + data.comments[i].text + '</p></div>');
            $('#rightcomments').append('<div class="infobox"><p class="commentnum pull-left text-left" id="' + 12 + '"></p><div class="approvalbar rightcol pull-right" id="ab' + data.comments[i].id + '"></div></div>');
            $('#rightcomments').append('<br>');

            rightComments.push(data.comments[i].id);
        }
    }
};

var generatePreCommentDivs = function(data, stance) {
    var sideSwitcher = 0;
    for (var i = 0; i < data.comments.length; i++) {
        if (data.comments[i].stance == 'A' && stance == 'left') {
            if(sideSwitcher == 0) {
                $('#preleftcomments').append('<div class="cbox cboxleft ccommentleft" id="c' + data.comments[i].id + 'p"><p>' + data.comments[i].text + '</p></div>');
                $('#preleftcomments').append('<br>');
                sideSwitcher = 1;
            } else if(sideSwitcher == 1) {
                $('#prerightcomments').append('<div class="cbox cboxleft ccommentleft" id="c' + data.comments[i].id + 'p"><p>' + data.comments[i].text + '</p></div>');
                $('#prerightcomments').append('<br>');
                sideSwitcher = 0;
            }
            leftPreComments.push(data.comments[i].id);
        } else if (data.comments[i].stance == 'B' && stance == 'right') {
            if(sideSwitcher == 0) {
                $('#preleftcomments').append('<div class="cbox cboxright ccommentright" id="c' + data.comments[i].id + 'p"><p>' + data.comments[i].text + '</p></div>');
                $('#preleftcomments').append('<br>');
                sideSwitcher = 1;
            } else if(sideSwitcher == 1) {
                $('#prerightcomments').append('<div class="cbox cboxright ccommentright" id="c' + data.comments[i].id + 'p"><p>' + data.comments[i].text + '</p></div>');
                $('#prerightcomments').append('<br>');
                sideSwitcher = 0;
            }
            rightPreComments.push(data.comments[i].id);
        }
    }
};

//Fills reply section with replies corresponding to commentID (id)
var loadReplySection = function(id) {
    $('#stats').empty();
    if (Data.comments[id - 1].stance == 'A') {
        $('#stats').append('<h4 class="text-center" style="font-weight: bold; border-bottom-style: solid; border-bottom-color: #80b3FF; border-bottom-width: 6px; padding-bottom: 10px">' + Data.comments[id - 1].text + '</h4>');
    } else if (Data.comments[id - 1].stance == 'B') {
        $('#stats').append('<h4 class="text-center" style="font-weight: bold; border-bottom-style: solid; border-bottom-color: #FF5555; border-bottom-width: 6px; padding-bottom: 10px">' + Data.comments[id - 1].text + '</h4>');
    }
    $('#stats').append('<div class="col-md-4 text-left"><button class="btn btn-left" id="leftie">[+]</button></div>');
    $('#stats').append('<div class="col-md-4 text-center"><button class="btn btn-center" id="sprk"><img src="img/pop_spark_50.png" style="width: 50px"/></button></div>');
    $('#stats').append('<div class="col-md-4 text-right"><button class="btn btn-right" id="rightie">[-]</button><br></div>');
    $('#stats').append('<div class="col-md-6 text-left" style="color: #999999; height: 50px"><p class="text-left">' + Data.comments[id - 1].uVotes + ' agree' + '</p></div>');
    $('#stats').append('<div class="col-md-6 text-right" style="color: #999999; height: 50px" id="here"><p class="text-right">' + Data.comments[id - 1].dVotes + ' disagree' + '</p><br></div>');
    /*for (var i = 0; i < Data.comments[id - 1].replies.length; i++) {
        $('#stats').append('<div class="col-md-12" style="height: 7px"</div>');
        if (Data.comments[id - 1].replies[i].stance == 'For') {
            $('#stats').append('<div class="rreply pull-left ffor"><p><span>[+]</span> ' + Data.comments[id - 1].replies[i].text + '</p></div>');
        } else if (Data.comments[id - 1].replies[i].stance == 'Against') {
            $('#stats').append('<div class="rreply pull-right aagainst"><p><span>[-]</span> ' + Data.comments[id - 1].replies[i].text + '</p></div>');
        }
    }*/

    //Example of prespark 
    $('#stats').append('<div class="col-md-12 minispark"><div class="col-md-12"><p class="text-center msparktitle" style="border-bottom-style: solid; border-bottom-color: #FF5; border-bottom-width: 6px; padding-bottom: 10px">Do you think I should get a move on and finish this prototype?</p></div><div class="col-md-12 subminispark"><div class="col-md-6 pull-left"><button class="btn btn-sprk btn-sprk-left marg-auto">Certainly</button></div><div class="col-md-6 pull-right"><button class="btn btn-sprk btn-sprk-right marg-auto">Not at all</button></div></div></div><div class="col-md-12"><br></br></div>');

};

//Displays ReplySection and calls loadReplySection to fill it(for left comments)
var lcommentClicker = function(i) {
    return function(event) {
        if(postWhy == true) {
            
            //if the clicked comments is the currently active one, turn it off
            if (commentAlreadyClicked == true && $('#c' + leftComments[i]).hasClass('csparkleft') ) {
                commentAlreadyClicked = false;
                $('#c' + leftComments[i]).toggleClass('csparkleft');
                $('#stats').toggleClass('visible-md', 0);
                $('#mayn').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
                $('#results-holder').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
            } 

            //if another comment is already active, turn that one off and the clicked one on
            else if (commentAlreadyClicked == true && !$('#c' + leftComments[i]).hasClass('csparkleft')) {
                if($('#c' + commentThatsBeenClicked).hasClass('csparkleft')) {
                    $('#c' + commentThatsBeenClicked).toggleClass('csparkleft');
                }
                if($('#c' + commentThatsBeenClicked).hasClass('csparkright')) {
                    $('#c' + commentThatsBeenClicked).toggleClass('csparkright');
                }
                $('#c' + leftComments[i]).toggleClass('csparkleft');
                commentThatsBeenClicked = leftComments[i];
            } 

            //if no comment has been clicked yet, turn the clicked comment on 
            else if (commentAlreadyClicked == false) {
                $('#c' + leftComments[i]).toggleClass('csparkleft');
                commentAlreadyClicked = true;
                commentThatsBeenClicked = leftComments[i];
                $('#stats').toggleClass('visible-md', 400);
                $('#mayn').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
                $('#results-holder').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
            }
            
            
            loadReplySection(leftComments[i]);

        } else {

         $('#c' + leftComments[i] + 'p').toggleClass('csparkleft');

     }
 }
 console.log('Ahem...');
};

//Displays ReplySection and calls loadReplySection to fill it (for right comments)
var rcommentClicker = function(i) {
    return function(event) {
        if(postWhy == true) {
            
            //if the clicked comments is the currently active one, turn it off
            if (commentAlreadyClicked == true && $('#c' + rightComments[i]).hasClass('csparkright') ) {
                commentAlreadyClicked = false;
                $('#c' + rightComments[i]).toggleClass('csparkright');
                $('#stats').toggleClass('visible-md', 0);
                $('#mayn').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
                $('#results-holder').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
            } 

            //if another comment is already active, turn that one off and the clicked one on
            else if (commentAlreadyClicked == true && !$('#c' + rightComments[i]).hasClass('csparkright')) {
                if($('#c' + commentThatsBeenClicked).hasClass('csparkleft')) {
                    $('#c' + commentThatsBeenClicked).toggleClass('csparkleft');
                }
                if($('#c' + commentThatsBeenClicked).hasClass('csparkright')) {
                    $('#c' + commentThatsBeenClicked).toggleClass('csparkright');
                }
                $('#c' + rightComments[i]).toggleClass('csparkright');
                commentThatsBeenClicked = rightComments[i];
            } 

            //if no comment has been clicked yet, turn the clicked comment on 
            else if (commentAlreadyClicked == false) {
                $('#c' + rightComments[i]).toggleClass('csparkright');
                commentAlreadyClicked = true;
                commentThatsBeenClicked = rightComments[i];
                $('#stats').toggleClass('visible-md', 400);
                $('#mayn').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
                $('#results-holder').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
            }
            
            
            loadReplySection(rightComments[i]);

        } else {

         $('#c' + rightComments[i] + 'p').toggleClass('csparkright');

     }
 }
 console.log('Ahem...');
};

//Detects when comments are clicked and calls appropriate handler
var commentHandlerPre = function() {
        for (var _i = 0; _i < leftComments.length; _i++) {
            $('#c' + leftComments[_i]).click(lcommentClicker(_i));
        }

        for (var _j = 0; _j < rightComments.length; _j++) {
            $('#c' + rightComments[_j]).click(rcommentClicker(_j));
        }
};

var commentHandlerPost = function() {
        var target;
        for (var _i = 0; _i < leftComments.length; _i++) {
            $('#c' + leftComments[_i] + 'p').click(lcommentClicker(_i));
        }

        for (var _j = 0; _j < rightComments.length; _j++) {
            $('#c' + rightComments[_j] + 'p').click(rcommentClicker(_j));
        }
};

//Loads general question data (question text, vote numbers etc) from Data and displays to user
var loadQuestionData = function(Data) {
    $('.mquestion').text(Data.text);
    $('.answer-left').text(Data.A);
    $('.answer-right').text(Data.B);
    var APercent = (Data.AVotes) / (Data.AVotes + Data.BVotes) * 100;
    var BPercent = (Data.BVotes) / (Data.AVotes + Data.BVotes) * 100;
    $('.percent-left').text(Math.round(APercent) + '%');
    $('.percent-right').text(Math.round(BPercent) + '%');
    $('.votes-left').text('(' + Data.AVotes + ' Votes)');
    $('.votes-right').text('(' + Data.BVotes + ' Votes)');
    $('.question-nav').text('FACT: ' + Data.facts[0].text);
};

//Sets up user comment input based on the way they voted (stance)
var theWhy = function(stance) {
    var guidanceheader= "Why?";
    var guidancetext = "Type your reason, or click/tap on arguments you agree with below";
    if (stance == 'left') {
        $('#whybox').css('background-color', '#80B3FF');
        $('#theleft').toggleClass('col-md-8');
        $('#theright').toggleClass('col-md-4');
        $('#donezone').append($('<p class="text-center" style="color: #666666">'+guidancetext+'</p>').hide().fadeIn(400));
        $('#theleft').append($('<textarea style="display: block" class="cbox form-control" placeholder="Why...?" rows="1" id="userreason"></textarea>').hide().fadeIn(400));
        $('#theright').append($('<div class="col-md-8 col-lg-offset-2"><button class="btn btn-lg btn-default text-center" id="submitbutton">Submit</button></div>').hide().fadeIn(400));
        $('#whybox').append($('<br></br>').hide().fadeIn(400));        
    } else if (stance == 'right') {
        $('#whybox').css('background-color', '#FF5555');
        $('#theleft').toggleClass('col-md-4');
        $('#theright').toggleClass('col-md-8');
        $('#donezone').append($('<p class="text-center" style="color: #666666">'+guidancetext+'</p>').hide().fadeIn(400));
        $('#theright').append($('<textarea style="display: block" class="cbox  form-control" placeholder="Why...?" rows="1" id="userreason"></textarea>').hide().fadeIn(400));
        $('#theleft').append($('<div class="col-md-8 col-lg-offset-2"><button class="btn btn-lg btn-default text-center" id="submitbutton">Submit</button></div>').hide().fadeIn(400));
        $('#whybox').append($('<br></br>').hide().fadeIn(400));
    }
    $('#userreason').autosize();
    commentHandlerPost();
};

var loadPreMain = function(stance) {
    setTimeout(function() {
        $('#results-holder').fadeIn(400);
        $('#stats').fadeIn(400);
        $('#whybox').fadeIn(400);
        $('#premayn').fadeIn(400);
    }, 450);
    setTimeout(function() {
        setBar('#main-bar-left','#main-bar-right', Data.AVotes, Data.BVotes);
    }, 600);
};

var loadMain = function(stance) {
    $('#premayn').fadeOut(400);
    $('#donezone').fadeOut(400);
    $('#whybox').fadeOut(400);
    setTimeout(function() {
        $('#mayn').fadeIn(400);
    }, 450);
    setTimeout(function() {
        setApprovalBars(Data);
    }, 600);
}

//Handles when user votes on main question:
//Does animation, calls scale bar function
//In future, there should be a case statement to set the click handlers depending on type of poll
//e.g for yn poll, lefty righty, for slider something different etc.
var mainVote = function() {
    //Note once is to ensure votes can't be made multiple times
    var once = 0;
    $('.lefty').on('click', function() {
        if(once == 0) {
            $('#inputzone').fadeOut(400);
            once = 1;
        //'SEND JSON TO DATABASE OF VOTE INFO' CODE HERE
            loadPreMain('left');
            generatePreCommentDivs(Data, 'left');
            setTimeout(function() {
                theWhy('left');
            }, 450);
            vote = 'A';
        }
    });

    $('.righty').on('click', function() {
        if(once == 0) {
            $('#inputzone').fadeOut(400);
            once = 1;
        //'SEND JSON TO DATABASE OF VOTE INFO' CODE HERE
            
            generatePreCommentDivs(Data, 'right');
            loadPreMain('right');
            
            setTimeout(function() {
                theWhy('right');
            }, 450);
            vote = 'B';
        }
    });
    scaler();
};

//Handles when user comments and clicks submit comment
var commentController = function() {
    $(document.body).on('click', '#submitbutton', function() {
        var temptext = $('#userreason').val();
        var temptime = 2;
        var done = false;
        var counter = setInterval(timer, 1000);
        $('#submitbutton').text(temptime + ' seconds');

        function timer() {
            temptime--;
            $('#submitbutton').text(temptime + ' seconds');
            $('#submitbutton').on('click', function() {
                clearInterval(counter);
                temptime = 10;
            });
            if (temptime <= 0 && done == false) {

                //'SEND JSON OF COMMENT TO DATABASE' CODE HERE
                if (vote == 'A') {

                    if(temptext) {
                    $('#leftcomments').append('<div class="cbox cboxleft ccommentleft" id="c' + (Data.comments.length) + '"><p>' + temptext + '</p></div><div class="infobox"><div class="approvalbar leftcol pull-left" id="ab' + (Data.comments.length) + '"></div><p class="commentnum pull-right text-right" id="' + 12 + '">' + 0 + '</p></div>');
                    leftComments.push(Data.comments.length);
                    }
                    loadMain('left');


                } else if (vote == 'B') {

                    if(temptext) {
                    $('#rightcomments').append('<div class="cbox cboxright ccommentright" id="userreasonlocked"><p>' + temptext + '</p></div><div class="infobox"><div class="approvalbar rightcol pull-right" id="ab' + (Data.comments.length) + '"></div><p class="commentnum pull-left text-left" id="' + 12 + '">' + 0 + '</p></div><br>');
                    rightComments.push((Data.comments.length));
                }
                    loadMain('right');
                }
                console.log("TExt = "+temptext);
                postWhy = true;
                done = true;
            }

        }

    });
};

//Handles all user interaction with reply section
var replyController = function() {
    
    //local var, doesn't mean the same as the general stance to original question
    var stance;

    $(document.body).on('click', '#leftie', function() {
        stance = 'A';
        $('#here').after('<textarea id="replyreason" class="ffor form-control" placeholder="Why...?"></textarea><button id="replybutton" class="btn btn-md text-center" style="width: 70%">Spark</button><div class="col-md-12" style="height: 7px"></div>');
        $('textarea').autosize();
        //'SEND JSON OF VOTE ON COMMENT TO DATABASE' CODE HERE
    });

    $(document.body).on('click', '#rightie', function() {
        stance = 'B';
        $('#here').after('<textarea id="replyreason" class="pull-right aagainst form-control" placeholder="Why...?"></textarea><button id="replybutton"  class="btn btn-md text-right pull-right" style="width: 70%">Spark</button><div class="col-md-12" style="height: 7px"></div>');
        $('textarea').autosize();
        //'SEND JSON OF VOTE ON COMMENT TO DATABASE' CODE HERE
    });

    $(document.body).on('click', '#replybutton', function() {
        console.log(stance);
        var temptext = $('#replyreason').val();
        //'SEND JSON OF REPLY TO DB' CODE HERE
        if (stance == 'A') {
            console.log("cooom");
            $('#replyreason').replaceWith('<div class="rreply pull-left ffor"><p><span>[+]</span> ' + temptext + '</p></div>');
        }
        if (stance == 'B') {
            console.log("Booh");
            $('#replyreason').replaceWith('<div class="rreply pull-right aagainst"><p><span>[-]</span> ' + temptext + '</p></div>');
        }
        $('#replybutton').remove();
    });
};

//Processes once the page has launched
$(document).ready(function() {

    $(window).on('resize', function(){
        scaler();
        //setBar('#main-bar-left', '#main-bar-right',Data.AVotes, Data.BVotes);
    })

    //Load data section
    //---------------------
    scaler();
    //TEMP: Store json summary data in global var Data 
    $.getJSON('js/updated.json', function(data) {
        Data = data;
    });
    
    //TEMP: Roughly after json data is loaded, use it to generate commentdivs, question data etc (wait a few seconds)
    setTimeout(function() {
        generateCommentDivs(Data);
        loadQuestionData(Data);
        commentHandlerPre();
    }, 100);

    //Detects when vote on main question is made and does it's magic
    mainVote();

    //Handles when user comments and clicks submit comment
    commentController();

    //Handles all user interaction with reply section
    replyController();


});

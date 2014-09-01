var setMainBar = function (target, other, leftVal, rightVal) {
        var actualWidth = $(target).width();
        var newWidth = ((leftVal) / (leftVal + rightVal)) * 2 * actualWidth;
        $(target).animate({
            width: newWidth
        }, 400, 'easeOutCubic');
    };

var setBar = function (target, leftVal, rightVal) {
        var actualWidth = $(target).width();
        var newWidth = ((leftVal) / (leftVal + rightVal)) * 2 * actualWidth;
        $(target).animate({
            width: newWidth
        }, 400, 'easeOutCubic');
    };

var vote;

var leftComments = [];
var rightComments = [];

var generateComments = function (data) {


        $('#rightcomments').append('<textarea class="cbox cboxright form-control" placeholder="Why...?" rows="1" id="userreason"></textarea>');
        $('#rightcomments').append('<div class="infobox"><p class="commentnum pull-left text-left" id="' + 12 + '">121</p><div class="approvalbar rightcol pull-right" id="' + 14 + '"></div></div>');
        $('#rightcomments').append('<br>');

        $('#userreason').autosize();



        for (var i = 0; i < data.comments.length; i++) {
            if (data.comments[i].comment_op == 1) {

                $('#leftcomments').append('<div class="cbox cboxleft ccommentleft" id="' + data.comments[i].comment_id + '_' + data.comments[i].comment_op + '"><p>' + data.comments[i].comment_text + '</p></div>');
                $('#leftcomments').append('<div class="infobox"><div class="approvalbar leftcol pull-left" id="' + 14 + '"></div><p class="commentnum pull-right text-right" id="' + 12 + '">1345</p></div>');
                $('#leftcomments').append('<br>');
                //Push the id of the comment to an array which is used later for interactivity
                leftComments.push(data.comments[i].comment_id + '_' + data.comments[i].comment_op);
            } else if (data.comments[i].comment_op == 2) {

                $('#rightcomments').append('<div class="cbox cboxright ccommentright" id="' + data.comments[i].comment_id + '_' + data.comments[i].comment_op + '"><p>' + data.comments[i].comment_text + '</p></div>');
                $('#rightcomments').append('<div class="infobox"><p class="commentnum pull-left text-left" id="' + 12 + '">121</p><div class="approvalbar rightcol pull-right" id="' + 14 + '"></div></div>');
                $('#rightcomments').append('<br>');
                rightComments.push(data.comments[i].comment_id + '_' + data.comments[i].comment_op);
            }
        }
    };

var lcommentClicker = function (i) {
        return function (event) {
            $('#' + leftComments[i]).toggleClass('csparkleft');
            if ($('#' + leftComments[i]).hasClass('csparkleft')) {
                $('#stats').toggleClass('visible-md', 400);
            } else {
                $('#stats').toggleClass('visible-md', 0);
            }
            $('#mayn').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
            $('#results-holder').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
            $('#stats').empty();
        }
    }

var rcommentClicker = function (i) {
        return function (event) {
            $('#' + rightComments[i]).toggleClass('csparkright');
            if ($('#' + rightComments[i]).hasClass('csparkright')) {
                $('#stats').toggleClass('visible-md', 400);
            } else {
                $('#stats').toggleClass('visible-md', 0);
            }
            $('#mayn').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
            $('#results-holder').toggleClass('col-lg-offset-0', 350, 'easeOutCubic');
            $('#stats').empty();
        }
    }


var commentHandler = function () {
        for (var _i = 0; _i < leftComments.length; _i++) {
            $('#' + leftComments[_i]).click(lcommentClicker(_i));
        }

        for (var _j = 0; _j < rightComments.length; _j++) {
            $('#' + rightComments[_j]).click(rcommentClicker(_j));
        }
    }

$(document).ready(function () {

    $('textarea').autosize();

    $.getJSON('js/testdata.json', function (data) {
        generateComments(data);
    });

    setTimeout(function () {
        commentHandler();
    }, 1000);

    $('.lefty').on('click', function () {
        $('#inputzone').fadeOut(200);
        setTimeout(function () {
            $('#results-holder').fadeIn(400);
            $('#stats').fadeIn(400);
            $('#mayn').fadeIn(400);
        }, 200);
        setTimeout(function () {
            setMainBar('#main-bar-left', '#main-bar-right', 24235, 1430);
        }, 400);
        vote = 'A';
    });

    $('.righty').on('click', function () {
        $('#inputzone').fadeOut(200);
        setTimeout(function () {
            $('#results-holder').fadeIn(400);
            $('#stats').fadeIn(400);
            $('#mayn').fadeIn(400);
        }, 200);
        setTimeout(function () {
            setMainBar('#main-bar-left', '#main-bar-right', 24235, 1430);
        }, 400);
        vote = 'B';
    });

});

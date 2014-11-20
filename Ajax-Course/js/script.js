
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var address = $("#address").val();


    $greeting.text('So, you want to know about '+address);
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var url = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+address;
    $body.append('<img class="bgimg" src='+url+'>');


    return false;
};

$('#form-container').submit(loadData);

// loadData();

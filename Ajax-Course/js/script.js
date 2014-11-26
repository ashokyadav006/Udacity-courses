
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

    //load new york times article
    var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+address+"&api-key=429b9d3bdd92a40cdb4f15268d2a9bab:1:70213918";

    $.getJSON(url)
        .done(function (data) {
            var articles = data.response.docs;
            var article;
            var listElement = '<li class="article">'
            for (var i=0; i < articles.length; i++) {
                article = articles[i];
                listElement += '<a href='+article.web_url+'><h3>'+article.headline.main+'</h3></a>';
                listElement += '<p>'+article.lead_paragraph+'</p>';                
                listElement += '</li>'
                $nytElem.append(listElement);
            }
        })
        .fail(function (data) {
            $("#nytimes-header").text("New York Times articles could not be loaded.")
        });


    //Load wiki links
    var wikiRequestTimeout = setTimeout(function () {
        $wikiElem.text("Not able to load wikipedia links");
    }, 8000);

    var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+address+"&format=json&callback=wikiCallback";
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp"
    })
    .done(function (response) {
        var articleList = response[1];

        for (var i=0; i < articleList.length; i++) {
            $wikiElem.append('<li><a href="http://en.wikipedia.org/wiki/"'+articleList[i]+'>'+articleList[i]+'</a></li>')
        }
        clearTimeout(wikiRequestTimeout);
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();

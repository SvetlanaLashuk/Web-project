'use strict';

function onChangeFeed() {
    let select = document.getElementById("feedSelect");
    let feedUrl = select.options[select.selectedIndex].value;
    getFeed(feedUrl).then(result => printFeed(result));
}



function getFeed(feedUrl) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/feed', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        alert(feedUrl);
        feedUrl.split(' ').forEach(post => {
            xhr.send(JSON.stringify({url:post }));
            xhr.responseType = 'json';
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(this.status);
                }
            };
        });

    })
}



function printFeed(feed) {
    console.log(feed);
    let posts = '<div id="blocks">';

    feed.items.forEach(post => {
        posts +=
            '<div id="block">' +
            '<h3>' + post.title + '</h3>' +
            '<p>' + post.pubDate + '</p>' +
            '<p>' + post.content + '</p>' +
            '<p id="source">' +"Источник: " +feed.description + '</p>' +
            '</div>';
    });

posts+='</div>';
    document.getElementById('posts').innerHTML = posts;
}

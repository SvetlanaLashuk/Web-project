"use strict";

(function () {
    let feedSelect = document.getElementById("feedSelect");
    if (feedSelect.options.length !== 0) {
        getFeed(feedSelect.options[0].value).then(result => printFeed(result));
    }
})();

function onChangeFeed() {
    let select = document.getElementById("feedSelect");
    let feedUrl = select.options[select.selectedIndex].value;
    getFeed(feedUrl).then(result => printFeed(result));
}

function getFeed(feedUrl) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/feed", true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(JSON.stringify({url: feedUrl}));
        xhr.responseType = "json";
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(this.status);
            }
        };
    });
}

function printFeed(feed) {
    let posts = '<div id="blocks">';
    feed.items.forEach(post => {
        posts +=
            '<div id="block">' +
            '<h3>' + post.title + '</h3>' +
            '<p>' + post.pubDate + '</p>' +
            '<p>' + post.content + '</p>' +
            '<p id="source">' + "Источник: " + feed.description + '</p>' +
            '</div>';
    });
    document.getElementById("posts").innerHTML = posts + "</div>";
}

function addFeed() {
    let feed = {
        title: document.getElementById("feedTitleInput").value,
        url: document.getElementById("feedUrlInput").value
    };

    let feedSelect = document.getElementById("feedSelect");
    let newOption = document.createElement("option");
    newOption.value = feed.url;
    newOption.text = feed.title;
    feedSelect.add(newOption, null);

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "/feed", true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(feed));
}

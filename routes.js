module.exports = (app, db, parser) => {

    app.get("/", (req, res) => {
        db.collection("feeds").findOneAndUpdate(
            {ip: req.ip},
            {$setOnInsert: {feeds: []}},
            {upsert: true, returnOriginal: false},
            (error, result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.render("index", {feeds: result.value.feeds});
                }
            }
        );
    });

    app.put("/feed", (req, res) => {
        db.collection("feeds").findOneAndUpdate(
            {ip: req.ip},
            {
                $push: {
                    feeds: {
                        title: req.body.title,
                        url: req.body.url
                    }
                }
            },
            {upsert: true, returnOriginal: false},
            (err, result) => {
                if (err) {
                    res.send({error: err});
                } else {
                    res.send(result.value);
                }
            }
        );
    });

    app.post("/feed", (req, res) => {
        let promise = new Promise(resolve =>
            resolve(parser.parseURL(req.body.url))
        );
        promise.then(result => res.send(result));
    });
};

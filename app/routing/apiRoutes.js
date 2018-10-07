var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", (req, res) => {
        res.json(friends);
    });

    app.post("/api/friends", (req, res) => {
        debugger;
        const user = req.body;

        // find "friend" with highest compatibility
        var lowestDiff = null;
        var bff = null;

        friends.forEach(friend => {
            var totalDifference = 0;

            for (var i = 0; i < 10; i++) {
                totalDifference += Math.abs(parseInt(user.scores[i]) - parseInt(friend.scores[i]));
            }

            if (lowestDiff === null || totalDifference < lowestDiff) {
                lowestDiff = totalDifference;
                bff = friend;
            }

            if (totalDifference === 0) return;
        });
        
        // save user data for later use
        friends.push(user);

        res.json(bff);
    });
};
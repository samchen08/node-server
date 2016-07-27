module.exports = {
    '/api': {
        method: ['POST', 'GET'],
        handler: function (req, res) {
            res.render('pages/index', function (err, html) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.end(html);
            });

        }
    }

};

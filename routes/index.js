module.exports = {


    /* GET home page. */
    indexRouter: (req, res, next) => {
        let selectQuery = 'SELECT * FROM `video` Order By id asc ';
        db.query(selectQuery, (err, rs) => {
            if (err)
                return res.status(500).send(err);
            res.render('index', { title: 'home', videsData: rs });
        });

    }
}
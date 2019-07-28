module.exports = {


    /* GET home page. */
    indexRouter: (req, res, next) => {
        let selectQuery = 'SELECT * FROM `video` Order By id asc ',
            typeQuery = "SELECT * FROM `selectionType` WHERE 1",
            langQuery = "SELECT * FROM `langFilm` WHERE 1";
        db.query(selectQuery, (err, rs) => {
            if (err)
                return res.status(500).send(err);
            db.query(typeQuery, (er, types) => {
                if (er)
                    return res.status(500).send(e);
                db.query(langQuery, (er, lang) => {
                    if (er)
                        return res.status(500).send(e);
                    res.render('index', { title: 'home', videsData: rs, types, lang });

                });
            });
        });

    }
}
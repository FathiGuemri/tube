module.exports = {

    /* GET home page. */
    indexRouter: (req, res, next) => {
        let selectQuery = 'SELECT * FROM `video` Order By id asc ',
            typeQuery = "SELECT * FROM `selectionType` WHERE 1",
            langQuery = "SELECT * FROM `langFilm` WHERE 1";
        db.query(selectQuery, (err, rs) => {
            if (err)
                return res.send(500).send(err);
            db.query(typeQuery, (er, types) => {
                if (er)
                    return res.send(500).send(e);
                db.query(langQuery, (er, lang) => {
                    if (er)
                        return res.send(500).send(e);
                    res.render('index', { title: 'home', videsData: rs, types, lang, film: rs[rs.length - 1] });

                });
            });
        });
    },

    watch: (req, res) => {
        let selectQuery = 'SELECT * FROM `video` Order By id asc ',
            typeQuery = "SELECT * FROM `selectionType` WHERE 1",
            langQuery = "SELECT * FROM `langFilm` WHERE 1",
            id = req.params.filmId,
            film = "SELECT * FROM `video` WHERE `id` = " + id + "";

        db.query(selectQuery, (err, rs) => {
            if (err)
                return res.send(500).send(err);
            db.query(typeQuery, (er, types) => {
                if (er)
                    return res.send(500).send(e);
                db.query(langQuery, (er, lang) => {
                    if (er)
                        return res.send(500).send(e);
                    db.query(film, (err, result) => {
                        if (err) res.send(err);

                        res.render('index', { title: 'home', videsData: rs, types, lang, film: result[0] });
                    });

                });
            });

        });
    }
}
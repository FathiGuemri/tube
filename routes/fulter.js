module.exports = {
    getData: (req, res, next) => {
        let fulter = req.params.fulter,
            shcima = "SELECT * FROM `video` WHERE `lang` = '" + fulter + "' ";
        langQuery = "SELECT * FROM `langFilm` WHERE 1";

        db.query(langQuery, (err, langs) => {
            if (err) send(500).send(err)
            db.query(shcima, (err, rs) => {
                if (err) send(500).send(err)
                res.render('fulter', { data: rs, lang: langs })
            })
        })
    }
}
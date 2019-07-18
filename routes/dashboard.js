let fs = require('fs');
var msg;

module.exports = {



    admin: (req, res, next) => {
        res.render('admin', { title: 'enter password' })
    },
    addVideo: (req, res, next) => {
        if (req.files) {
            var videoName = req.body.title,
                videoFile = req.files.videoFile;
            let shcima = "INSERT INTO `video`(`title`, `videoName`)" +
                "VALUES ('" + videoName + "','" + videoFile.name + "')";
            db.query(shcima, (err, rs) => {
                if (err)
                    return res.status(500).send(err);
                let id = rs.insertId;
                let imageName = id + '-' + 'video' + '.' + videoFile.name.split('.')[1];

                if (videoFile.mimetype === 'video/mp4' ||
                    videoFile.mimetype === 'video/ogg' ||
                    videoFile.mimetype === 'video/webm'
                ) {

                    videoFile.mv('public/assets/video/' + imageName, (err) => {
                        if (err)
                            return res.status(500).send(err);
                    });
                    msg = { msg: ' Video added successfully', status: 'success' };
                    res.redirect('/dashboard');
                } else {
                    let deletedScima = "DELETE FROM `video` WHERE id=" + id;
                    db.query(deletedScima, (err, rs) => {
                        if (err)
                            return res.status(500).send(err);
                        msg = { msg: 'Invalid Video format. oly "mp4", "ogg", and "webm" videos formats are allowed ', status: 'danger' };
                    });
                    res.redirect('/dashboard');
                }
            });

        }
    },
    deleteVideo: (req, res) => {
        let id = req.params.id;
        let selectQuery = "SELECT * FROM `video` WHERE id=" + id;
        db.query(selectQuery, (err, rs) => {
            if (err)
                return res.status(500).send(err);
            let data;
            rs.forEach(element => {
                data = element;
            });
            let deletedScima = "DELETE FROM `video` WHERE id=" + id;
            let imageName = id + '-' + 'video' + '.' + data.videoName.split('.')[1];
            fs.unlink('public/assets/video/' + imageName, (err) => {
                if (err)
                    return res.status(500).send(err);
                db.query(deletedScima, (err, rs) => {
                    if (err)
                        return res.status(500).send(err);
                    msg = { msg: ' Video Deleded successfully', status: 'success' };
                    res.redirect('/dashboard')
                });
            });
        });

    },
    dashboard: (req, res, next) => {
        let selectQuery = 'SELECT * FROM `video` Order By id asc ';
        db.query(selectQuery, (err, rs) => {
            if (err)
                return res.status(500).send(err);
            res.render('dashboard', {
                title: 'dashboard',
                msg: msg,
                data: rs
            })
        });
    },
}
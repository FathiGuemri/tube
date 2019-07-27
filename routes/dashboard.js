let fs = require('fs');
var msg;

module.exports = {



    admin: (req, res, next) => {
        res.render('admin', { title: 'enter password' })
    },

    adNewType: (req, res) => {
        console.log(req.body.newType);
        shcimaQuery = "INSERT INTO `selectionType`(`type`) VALUES ('" + req.body.newType + "')";
        db.query(shcimaQuery, (err, rs) => {
            if (err) res.send(500).send(err);
            msg = { msg: 'film type added successfuly', status: 'success' }
        });
        res.redirect('/dashboard');
    },

    addVideo: (req, res, next) => {
        if (req.files) {
            var videoName = req.body.title,
                videoFile = req.files.videoFile,
                date = new Date().toString(),
                image = req.files.image,
                description = req.body.description,
                type = req.body.type;
            let shcima = "INSERT INTO `video`(`title`, `videoName`,`date`, `description`, `image`, `type`)" +
                " VALUES ('" + videoName + "','" + videoFile.name + "','" + date + "','" + description + "','" + image.name + "','" + type + "')";
            db.query(shcima, (err, rs) => {
                if (err)
                    return res.status(500).send(err);
                let id = rs.insertId;
                let imageName = id + '-' + 'video' + '.' + videoFile.name.split('.')[1];
                let photoname = id + '-' + 'image' + '.' + image.name.split('.')[1];

                if (videoFile.mimetype === 'video/mp4' ||
                    videoFile.mimetype === 'video/ogg' ||
                    videoFile.mimetype === 'video/webm'
                ) {

                    videoFile.mv('public/assets/video/' + imageName, (err) => {
                        if (err)
                            return res.status(500).send(err);
                    });
                    msg = { msg: ' Video added successfully', status: 'success' };

                    if (image) {
                        if (image.mimetype == 'image/png' ||
                            image.mimetype == 'image/jpeg' ||
                            image.mimetype == 'image/gif') {
                            image.mv('public/assets/images/' + photoname, (err) => {
                                if (err) res.send(404).send(err);
                            })
                        }
                    }


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
            let imageName = id + '-video' + '.' + data.videoName.split('.')[1];
            let photoName = id + '-image' + '.' + data.image.split('.')[1];
            fs.unlink('public/assets/video/' + imageName, (err) => {
                if (err)
                    return res.status(500).send(err);
                db.query(deletedScima, (err, rs) => {
                    if (err)
                        return res.status(500).send(err);
                    msg = { msg: ' Video Deleded successfully', status: 'success' };

                    res.redirect('/dashboard')
                });
                fs.unlink('public/assets/images/' + photoName, (err) => {
                    if (err) res.send(5000).send(err);
                    console.log('delete')
                });
            });
        });

    },
    dashboard: (req, res, next) => {
        let selectQuery = 'SELECT * FROM `video` Order By id asc',
            typeQuery = "SELECT * FROM `selectionType` WHERE 1";

        db.query(selectQuery, (err, rs) => {
            if (err)
                return res.status(500).send(err);

            db.query(typeQuery, (er, types) => {
                if (er)
                    return res.status(500).send(e);
                res.render('dashboard', {
                    title: 'dashboard',
                    msg: msg,
                    data: rs,
                    types: types
                });
            });

        });
    },
}
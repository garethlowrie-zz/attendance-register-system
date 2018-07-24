var ObjectID = require('mongodb').ObjectID;

const COLLECTION_NAME = 'learners';

module.exports = function(app, db) {
    // GET BY ID
    app.get(`/${COLLECTION_NAME}/:id`, (req, res) => {
        const id = req.params.id;
        const query = { '_id': new ObjectID(id) };

        db.collection(COLLECTION_NAME).findOne(query, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          }
        });
    });

    // GET ALL
    app.get(`/${COLLECTION_NAME}`, (req, res) => {
        const x = db.collection(COLLECTION_NAME).find({}).toArray(function(err, items) {
            if (err) {
                res.send({'error':'An error has occurred'});
              } else {
                res.send(items);
              } 
        });
    });

    // DELETE
    app.delete(`/${COLLECTION_NAME}/:id`, (req, res) => {
        const id = req.params.id;
        const query = { '_id': new ObjectID(id) };

        db.collection(COLLECTION_NAME).remove(query, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Learner ' + id + ' deleted!');
          } 
        });
    });

    // UPDATE
    app.put(`/${COLLECTION_NAME}/:id`, (req, res) => {
        const id = req.params.id;
        const query = { '_id': new ObjectID(id) };
        const item = { 
          forname: req.body.forename,
          surname: req.body.surname,
          email: req.body.email,
          phone: req.body.phone,
          nok: req.body.nok,
          dob: req.body.dob,
          photo: req.body.photo,
          group: req.body.groupId
        };

        db.collection(COLLECTION_NAME).update(query, item, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(item);
          } 
        });
    });

    // CREATE
    app.post(`/${COLLECTION_NAME}`, (req, res) => {
        const item = { 
          forname: req.body.forename,
          surname: req.body.surname,
          email: req.body.email,
          phone: req.body.phone,
          nok: req.body.nok,
          dob: req.body.dob,
          photo: req.body.photo,
          group: req.body.groupId
        };

        db.collection(COLLECTION_NAME).insert(item, (err, results) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
              } else {
                res.send(results.ops[0]);
              }
        });
    });
};
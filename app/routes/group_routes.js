var ObjectID = require('mongodb').ObjectID;

const COLLECTION_NAME = 'groups';

module.exports = function(app, db) {
    // GET BY ID
    app.get(`/${COLLECTION_NAME}/:id`, (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection(COLLECTION_NAME).findOne(details, (err, item) => {
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
        const details = { '_id': new ObjectID(id) };

        db.collection(COLLECTION_NAME).remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Group ' + id + ' deleted!');
          } 
        });
    });

    // UPDATE
    app.put(`/${COLLECTION_NAME}/:id`, (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const item = { text: req.body.body, name: req.body.name };

        db.collection(COLLECTION_NAME).update(details, item, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(item);
          } 
        });
    });

    // CREATE
    app.post(`/${COLLECTION_NAME}`, (req, res) => {
        const item = { text: req.body.body, name: req.body.name}

        db.collection(COLLECTION_NAME).insert(item, (err, results) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
              } else {
                res.send(results.ops[0]);
              }
        });
    });
};
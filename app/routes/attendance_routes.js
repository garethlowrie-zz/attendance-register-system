var ObjectID = require('mongodb').ObjectID;

const COLLECTION_NAME = 'attendance';

module.exports = function(app, db) {
    // GET BY ID
    // app.get(`/${COLLECTION_NAME}/:id`, (req, res) => {
    //     const id = req.params.id;
    //     const query = { '_id': new ObjectID(id) };

    //     db.collection(COLLECTION_NAME).findOne(query, (err, item) => {
    //       if (err) {
    //         res.send({'error':'An error has occurred'});
    //       } else {
    //         res.send(item);
    //       }
    //     });
    // });

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

    // GET BY GROUP AND BY DATE
    app.get(`/${COLLECTION_NAME}/:groupId/:date`, (req, res) => {
        const groupId = req.params.groupId;
        const date = req.params.date;
        const day = date.substring(0,2);
        const month = date.substring(3,5);
        const year = date.substring(6,10);
        const newDate = new Date(year, month - 1, day, 0, 0, 0, 0);

        const query = { 
          'groupId': groupId,
          'date': newDate.toString()
        };

        const x = db.collection(COLLECTION_NAME).find(query).toArray(function(err, items) {
            if (err) {
                res.send({'error':'An error has occurred'});
              } else {
                res.send(items);
              } 
        });
    });


    // CREATE
    app.post(`/${COLLECTION_NAME}`, (req, res) => {
      const day = req.body.date.substring(0,2);
      const month = req.body.date.substring(3,5);
      const year = req.body.date.substring(6,10);
      const date = new Date(year, month - 1, day, 0, 0, 0, 0);
      
      console.log('DATE ', date);


      const item = { 
        learnerId: req.body.learnerId,
        groupId: req.body.groupId,
        date: date.toString(),
        mark: req.body.mark
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
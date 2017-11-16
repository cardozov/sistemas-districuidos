
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    app.get('/survey/program/:id', (req, res) => {
        const details = { 'programa': req.params.id };
        db.collection('enquetes').find(details).toArray((err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.get('/survey/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('enquetes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.post('/survey', (req, res) => {
        const enquete = req.body;
        db.collection('enquetes').insert(enquete, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    
    app.delete('/survey/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('enquetes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Survey ' + id + ' deleted!');
            } 
        });
    });
    
    app.put('/survey/:id', (req, res) => {
        const id = req.params.id;
        const survey = {
            respostas: req.body.respostas
        };
        const details = { '_id': new ObjectID(id) };
        db.collection('enquetes').updateOne(details, {"$set": survey}, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(survey);
            } 
        });
    });
  };
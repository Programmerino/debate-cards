const fetch = require('node-fetch');
const db = require('../util/db.js');
const {ObjectId} = require('mongodb');

module.exports = (app) => {
  app.get('/card/:id', async (req, res) => {
    let result = {
      error: null,
      status: 200,
      meta: {
          skip: 0,
          limit: 0,
          total: 1,
      },
      data: []
    }

    try {
      const docs = await db.getConnection()
        .collection("cards_4")
        .find({_id: ObjectId(req.params.id)})
        .toArray(); 
      result.status = 200;
      result.data = docs[0]
    } catch (error) {
      result.status = 400
      result.error = 'Bad Request';
    } finally {
      res.status(result.status).send(result);
    }   
  });
};

// generate solr querey string from user search
buildQuery = str => {
    var ret = str.split(" ").map(x => 
        x.length > 5 ? x+"~2" : x 
    ).join(" ");
    console.log(encodeURIComponent(ret));
    return encodeURIComponent("("+ret+")");
    // return encodeURIComponent(ret);
};
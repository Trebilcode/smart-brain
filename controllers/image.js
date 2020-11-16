const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'df220ba52e3842468956eee9ee1ada22'
});


const handleApiCall = (req, res) => {
  app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
      .then(faceModel => {
        return faceModel.predict(req.body.input);        
      })
      .then(data => res.json(data))
      .catch(error => res.status(400).json('unable to work with api'));
}


const handleImage = (req, res, db) => {
  const { id } = req.body;
  
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => res.json(entries[0]))
  .catch(error => res.status(400).json('unable to get entries'))

}

module.exports = {
  handleImage,
  handleApiCall
}
const handleProfileGet = async (req, res, db) => {
  const { id } = req.params;
  try {
    const user = await db.select('*').from('users').where('id', id);
    if(user.length) {
    res.json(user[0])
    } else {
        res.status(400).json('not found');        
      }
  } catch {
    error => console.log(error)
    };
}

module.exports = {
  handleProfileGet: handleProfileGet
}
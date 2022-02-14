const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  if(!req.body.name) {
    res.status(400).json({message: 'name and budget are required'})
  }
  if(req.body.budget === NaN) {
    res.status(400).json({message: 'budget of account must be a number'})
    next()
  }
  if(req.body.budget){
    if(typeof req.body.budget != 'number' ) {
      res.status(400).json({message: 'budget of account must be a number'})
  }}
  if(!req.body.budget) {
    res.status(400).json({message: 'name and budget are required'})
  }
  req.body.name = req.body.name.trim()

  if(req.body.name.length < 3 || req.body.name.length > 100) {
    res.status(400).json({message: 'name of account must be between 3 and 100'})
  }
  if(isNaN(req.body.budget)) {
    res.status(400).json({message: 'budget of account must be a number'})
  }
  if(req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json({message: 'budget of account is too large or too small'})
  }
  
  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  let name = req.body.name
  Accounts.getAll()
   .then(accs => {
     let checked = accs.filter(acc => acc.name === name)
     if(!checked){
      res.status(400).json({message: 'that name is taken'})
     } else {
       next()
     }
   })
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  let id = req.params.id;
  if(id<0) {
    return res.status(404).json({ message: 'account not found' });
  }
  Accounts.getById(id)
    .then(acc => {
      if(acc){
      req.acc = acc
      next()
      } else {
        return res.status(404).json({ message: 'account not found' });
      }
    })
    .catch(next)

}

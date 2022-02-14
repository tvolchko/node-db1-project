const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(acc => {
      res.status(200).json(acc)
    })
    .catch(next)
    
  })

router.get('/:id', checkAccountId, (req, res, next) => {
      res.status(200).json(req.acc)

})

router.post('/', checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  Accounts.create(req.body)
    .then(acc => {
      console.log(acc)
      res.status(201).json(acc)
    })
    .catch(next)
})

router.put('/:id', checkAccountNameUnique, checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(acc => {
      res.status(200).json(acc)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(acc => {
      res.status(200).json(acc)
    })
    .catch(next)
})

// router.use((err, req, res, next) => { // eslint-disable-line
//   // DO YOUR MAGIC
// })

// router.use((err, req, res, next) => { // eslint-disable-line
//   res.status(err.status || 500).json({
//     message: err.message,
//     stack: err.stack,
//   })
// })

module.exports = router;

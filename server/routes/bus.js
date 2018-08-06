const router = require('express').Router()
const request = require('superagent')

router.get('/:service', (req, res) => {
  console.log(req.params.service);
  request
    .get('https://www.metlink.org.nz/api/v1/ServiceLocation/' + req.params.service)
    .then(data => {
      res.json(data.body.Services)
    })
})

module.exports = router

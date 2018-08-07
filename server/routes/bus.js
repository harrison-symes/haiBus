const router = require('express').Router()
const request = require('superagent')

const fs = require('fs')
const path = require('path')

function readStops (service, isInbound, cb) {
  fs.readFile(path.join(__dirname, `../coords/bus-${service}-${isInbound ? 'IN' : 'OUT'}.txt`), 'utf8', cb)
}

router.get('/:service', (req, res) => {
  request
    .get('https://www.metlink.org.nz/api/v1/ServiceLocation/' + req.params.service)
    .then(data => {
      res.json(data.body.Services)
    })
})

router.get('/:service/stops', (req, res) => {
  console.log(req.params.service);
  readStops(req.params.service, true, (err, IN) => {
    readStops(req.params.service, false, (err, OUT) => {
      res.json({
        IN: JSON.parse(IN).coords,
        OUT: JSON.parse(OUT).coords
      })
    })
  })
})

router.get('/stops/:stopNumber', (req, res) => {
  request
    .get('https://www.metlink.org.nz/api/v1/StopDepartures/' + req.params.stopNumber)
    .then(data => {
      res.json(data.body)
    })
})

module.exports = router

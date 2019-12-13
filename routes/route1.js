const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    console.log('Route 1 example for POST')
});

router.get('/', async (req, res) => {

    console.log('Route 1 example for GET')
});

router.delete('/', async (req, res) => {

    console.log('Route 1 example for DELETE')
});

router.patch('/', async (req, res) => {

    console.log('Route 1 example for PATCH')
});

module.exports = router;
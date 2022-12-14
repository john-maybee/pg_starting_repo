const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * from songs';
    pool.query(queryText)
    .then((result) => {
        console.log('results from DB', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error making a query', error);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    const newSong = req.body;
    const queryText = `
        INSERT INTO "songs" ("rank", "artist", "track", "published")
        VALUES (${newSong.rank}, '${newSong.artist}', '${newSong.track}', '${newSong.published}');
    `;
    pool.query(queryText)
    .then((result) => {
        console.log('result', result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('error making insert query', error);
        res.sendStatus(500);
    })
});

module.exports = router;


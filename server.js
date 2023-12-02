const express = require('express');
const app = express();
const port = 3000;

let downloadCounts = {};

app.use(express.json());

app.get('/download', (req, res) => {
    const { url } = req.query;

    if (!downloadCounts[url]) {
        downloadCounts[url] = 1;
    } else {
        downloadCounts[url]++;
    }

    res.json({ count: downloadCounts[url] });
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});

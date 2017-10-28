import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {
    res.send({name: 'Bendy'});
});

const server = app.listen(3000, () => {
    const port = server.address().port;
    let host = server.address().address;

    if (host === '::') {
        host = '127.0.0.1';
    }

    console.log('Server is listening at http://%s:%s', host, port);
});
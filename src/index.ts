import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressLayouts from 'express-ejs-layouts';

import { Logger } from './lib/logger';

const app = express();
const logger = new Logger('./log');

app.use(bodyParser.json());
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

app.get('/', (req: Request, res: any) => {
    res.render('pages/index', {user: 'Bendy', layout: 'layouts/layout'});
});
app.get('/home', (req: any, res: any) => {
    logger.write('request home');
    res.render('pages/home', {user: 'Bendy'});
});
app.get('/about', (req: any, res: any) => {
    logger.write('request about');
    res.render('pages/about', {user: 'Bendy'});
});

const server = app.listen(3000, () => {
    const port = server.address().port;
    let host = server.address().address;

    if (host === '::') {
        host = '127.0.0.1';
    }

    const msg = `Server is listening at http://${host}:${port}`;
    logger.write(msg);
    console.log(msg);
});
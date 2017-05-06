import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import helmet from 'helmet';
import winstonInstance from './winston';
import routes from '../server/routes/index.route';
import config from './env';
import APIError from '../server/helpers/APIError';
import levelup from 'levelup'

let node;

import ip from 'ip';
import kad from 'kad';

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// set limit size (filemap update)
// import bodyParser from 'body-parser';
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));


app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// mount all routes on /api path
app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);



// DHT starts here
function initDHT(ip, port, networkID, seed, callback) {
  //MyIp , myID : strings
  //myPort : int, preferably 8080
  //mySeed is an object of that shape:-
                    //   const seed = [
                    //   'hostname_IDENTITY',
                    //   { hostname: 'hostname_IP', port: hostname_PORT }
                    // ];


  //TO DO:  use the hash(myID) and not the myID
  node = kad({
    transport: new kad.UDPTransport(),
    storage: levelup('./DHT_Storage/'),
    contact: { hostname: ip , port: port },
    identity: Buffer.from(networkID)
  });



  const logsOn = false;

  if (logsOn) {
    node.use((request, response, next) => {
      console.log('\n---------------------------------------------------------')
      console.log('## REQ')
      console.log(request)
      console.log('## RES')
      console.log(response)
      console.log('---------------------------------------------------------\n')

      next();
    });
  }

  node.listen(port, () => {
    node.join(seed, () => {
      console.log('Successfuly connected to Seed '+seed[1]['hostname']+':'+seed[1]['port']);
      callback();
    })
  });
}

initDHT(ip.address(), 1337, 'THISISTHEBESTBROKER!', [Buffer.from('THISISTHEBESTBROKER!').toString('hex'), { hostname: ip.address(), port: 1337 }], () => {
  console.log('ip: ' + ip.address());
  console.log('-- DHT  INIT')
});

export default app;

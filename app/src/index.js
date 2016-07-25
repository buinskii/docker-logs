'use strict';

const Logger = require('./logger');

setTimeout(itsTime, sleep());

let logger = new Logger({
    tags: ['log-app']
});
let tIndex = 0;
let messages = [
    () => logger.info('this is INFO message'),
    () => logger.debug('this is DEBUG message'),
    () => logger.notice('this is NOTICE message'),
    () => logger.error('this is ERROR message'),
    () => logger.info('hello %s', JSON.stringify({
        object: true,
        whataboutarray: [
            'it exists',
            'not',
            'yes'
        ]
    }, null, 4)),
    () => logger.wrap('someTag').info('is wrapped wiht tag'),
    () => logger.fatality()
];

function log() {
    messages[++tIndex % messages.length]();
}

function itsTime() {
    log();

    setTimeout(itsTime, sleep());
}

function sleep() {
    return (Math.floor(Math.random() * (5 - 2.5)) + 0.5) * 1000;
}

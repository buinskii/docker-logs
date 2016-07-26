'use strict';

const util = require('util');

class Logger {

    constructor(options) {
        this._tags = options.tags;
        if (!Array.isArray(this._tags)) this._tags = ['default'];

        ['info', 'debug', 'notice', 'error'].forEach(level => {
            this[level] = function() {
                let args = Array.from(arguments);
                args.reverse();
                args.push([]);
                args.push(level.toUpperCase());
                args.reverse();
                this.log.apply(this, args);
            }.bind(this)
        });
    }

    wrap(tags) {
        if (!Array.isArray(tags)) tags = [tags];
        return new LoggerWrapper(tags, this);
    }

    log() {
        let args = Array.from(arguments);
        let level = args.shift();
        let tags = this._tags.concat(args.shift() || []);
        tags = tags.join(',');
        console.log(`NDL: ${level}: [${tags}]: ${util.format.apply(util, args)}`);
    }

    fatality() {
        throw new Error('Some fatality error!!!');
    }
    
}

class LoggerWrapper {

    constructor(tags, logger) {
        this._tags = tags;
        this._logger = logger;

        ['info', 'debug', 'notice', 'error'].forEach(level => {
            this[level] = function() {
                let args = Array.from(arguments);
                args.reverse();
                args.push([]);
                args.push(level.toUpperCase());
                args.reverse();
                this.log.apply(this, args);
            }.bind(this)
        });
    }

    log(level, tags) {
        let args = Array.from(arguments);
        args[1] = this._tags.concat(args[1] || []); 
        this._logger.log.apply(this._logger, args);
    }

}

exports = module.exports = Logger;

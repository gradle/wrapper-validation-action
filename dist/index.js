module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(198);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function(module) {

module.exports = require("tls");

/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 141:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


var net = __webpack_require__(631);
var tls = __webpack_require__(16);
var http = __webpack_require__(605);
var https = __webpack_require__(211);
var events = __webpack_require__(614);
var assert = __webpack_require__(357);
var util = __webpack_require__(669);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false
  });
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode === 200) {
      assert.equal(head.length, 0);
      debug('tunneling connection has established');
      self.sockets[self.sockets.indexOf(placeholder)] = socket;
      cb(socket);
    } else {
      debug('tunneling socket could not be established, statusCode=%d',
            res.statusCode);
      var error = new Error('tunneling socket could not be established, ' +
                            'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
    }
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 198:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(__webpack_require__(622));
const core = __importStar(__webpack_require__(470));
const validate = __importStar(__webpack_require__(474));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const minWrapperCount = +core.getInput('min-wrapper-count');
            const allowSnapshots = core.getInput('allow-snapshots') === 'true';
            const allowChecksums = core.getInput('allow-checksums').split(',');
            const invalidWrapperJars = yield validate.findInvalidWrapperJars(path.resolve('.'), minWrapperCount, allowSnapshots, allowChecksums);
            if (invalidWrapperJars.length > 0) {
                const list = invalidWrapperJars.map(invalid => `${invalid.checksum} ${invalid.path}`);
                core.setFailed(`Found unknown Gradle Wrapper JAR files\n${list.join('\n- ')}`);
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
exports.run = run;
run();


/***/ }),

/***/ 211:
/***/ (function(module) {

module.exports = require("https");

/***/ }),

/***/ 339:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(640);

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset, 'value');
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ 357:
/***/ (function(module) {

module.exports = require("assert");

/***/ }),

/***/ 413:
/***/ (function(module, __unusedexports, __webpack_require__) {

module.exports = __webpack_require__(141);


/***/ }),

/***/ 417:
/***/ (function(module) {

module.exports = require("crypto");

/***/ }),

/***/ 431:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const os = __webpack_require__(87);
/**
 * Commands
 *
 * Command Format:
 *   ##[name key=value;key=value]message
 *
 * Examples:
 *   ##[warning]This is the user warning message
 *   ##[set-secret name=mypassword]definitelyNotAPassword!
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        // safely append the val - avoid blowing up when attempting to
                        // call .replace() if message is not a string for some reason
                        cmdStr += `${key}=${escape(`${val || ''}`)},`;
                    }
                }
            }
        }
        cmdStr += CMD_STRING;
        // safely append the message - avoid blowing up when attempting to
        // call .replace() if message is not a string for some reason
        const message = `${this.message || ''}`;
        cmdStr += escapeData(message);
        return cmdStr;
    }
}
function escapeData(s) {
    return s.replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}
function escape(s) {
    return s
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/]/g, '%5D')
        .replace(/;/g, '%3B');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 470:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(431);
const os = __webpack_require__(87);
const path = __webpack_require__(622);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable
 */
function exportVariable(name, val) {
    process.env[name] = val;
    command_1.issueCommand('set-env', { name }, val);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command_1.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store
 */
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message
 */
function error(message) {
    command_1.issue('error', message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message
 */
function warning(message) {
    command_1.issue('warning', message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store
 */
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 474:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const find = __importStar(__webpack_require__(625));
const checksums = __importStar(__webpack_require__(762));
const hash = __importStar(__webpack_require__(652));
function findInvalidWrapperJars(gitRepoRoot, minWrapperCount, allowSnapshots, allowChecksums) {
    return __awaiter(this, void 0, void 0, function* () {
        const wrapperJars = yield find.findWrapperJars(gitRepoRoot);
        if (wrapperJars.length < minWrapperCount) {
            throw new Error(`Expected to find at least ${minWrapperCount} Gradle Wrapper JARs but got only ${wrapperJars.length}`);
        }
        if (wrapperJars.length > 0) {
            const validChecksums = yield checksums.fetchValidChecksums(allowSnapshots);
            validChecksums.push(...allowChecksums);
            const invalidWrapperJars = [];
            for (const wrapperJar of wrapperJars) {
                const sha = yield hash.sha256File(wrapperJar);
                if (!validChecksums.includes(sha)) {
                    invalidWrapperJars.push(new InvalidWrapperJar(wrapperJar, sha));
                }
            }
            return invalidWrapperJars;
        }
        return [];
    });
}
exports.findInvalidWrapperJars = findInvalidWrapperJars;
class InvalidWrapperJar {
    constructor(path, checksum) {
        this.path = path;
        this.checksum = checksum;
    }
}
exports.InvalidWrapperJar = InvalidWrapperJar;


/***/ }),

/***/ 528:
/***/ (function(__unusedmodule, exports) {

"use strict";

/**
 * File originally from this repository but converted to typescript.
 * https://github.com/codebox/homoglyph
 */
Object.defineProperty(exports, "__esModule", { value: true });
const CHAR_MAP = {
    '-': [
        '\u{2cba}',
        '\u{fe58}',
        '\u{2043}',
        '\u{2212}',
        '\u{2011}',
        '\u{2012}',
        '\u{2796}',
        '\u{2013}',
        '\u{02d7}',
        '\u{06d4}',
        '\u{2010}'
    ],
    '.': [
        '\u{a4f8}',
        '\u{06f0}',
        '\u{2024}',
        '\u{ff0e}',
        '\u{0702}',
        '\u{1d16d}',
        '\u{10a50}',
        '\u{0701}',
        '\u{a60e}',
        '\u{0660}'
    ],
    '0': [
        '\u{feeb}',
        '\u{1d6b6}',
        '\u{2c9f}',
        '\u{0c82}',
        '\u{118d7}',
        '\u{1d490}',
        '\u{1d7f6}',
        '\u{fba6}',
        '\u{10404}',
        '\u{1d7d8}',
        '\u{a4f3}',
        '\u{0555}',
        '\u{1d6d0}',
        '\u{1d77e}',
        '\u{fbab}',
        '\u{10ff}',
        '\u{1d560}',
        '\u{1d698}',
        '\u{1d4de}',
        '\u{0665}',
        '\u{1d52c}',
        '\u{0966}',
        '\u{041e}',
        '\u{1d40e}',
        '\u{104c2}',
        '\u{ff2f}',
        '\u{1d7bc}',
        '\u{1d748}',
        '\u{1d7ce}',
        '\u{1d4f8}',
        '\u{1d764}',
        '\u{0b66}',
        '\u{1d442}',
        '\u{1d630}',
        '\u{0585}',
        '\u{1d5ae}',
        '\u{1042c}',
        '\u{0647}',
        '\u{1d594}',
        '\u{0d20}',
        '\u{118b5}',
        '\u{1d782}',
        '\u{104ea}',
        '\u{0ed0}',
        '\u{0c66}',
        '\u{1d6f0}',
        '\u{3007}',
        '\u{09e6}',
        '\u{1d70a}',
        '\u{1d11}',
        '\u{1d428}',
        '\u{0d82}',
        '\u{1d476}',
        '\u{1d7b8}',
        '\u{114d0}',
        '\u{0d02}',
        '\u{1d5fc}',
        '\u{fba7}',
        '\u{0b20}',
        '\u{06d5}',
        '\u{1d45c}',
        '\u{fbaa}',
        '\u{10292}',
        '\u{1d546}',
        '\u{1d5e2}',
        '\u{1d67e}',
        '\u{1d72a}',
        '\u{ab3d}',
        '\u{1ee24}',
        '\u{06be}',
        '\u{03bf}',
        '\u{0d66}',
        '\u{feea}',
        '\u{10516}',
        '\u{118c8}',
        '\u{2134}',
        '\u{1ee64}',
        '\u{1d70e}',
        '\u{ff4f}',
        '\u{06f5}',
        '\u{1d616}',
        '\u{1d0f}',
        '\u{043e}',
        '\u{1d57a}',
        '\u{ff10}',
        '\u{1d7e2}',
        '\u{06c1}',
        '\u{1d4aa}',
        '\u{0ce6}',
        '\u{2c9e}',
        '\u{118e0}',
        '\u{2d54}',
        '\u{1040}',
        '\u{1d512}',
        '\u{fbac}',
        '\u{0be6}',
        '\u{0c02}',
        '\u{1d744}',
        '\u{101d}',
        '\u{1d664}',
        '\u{0ae6}',
        '\u{006f}',
        '\u{039f}',
        '\u{fbad}',
        '\u{fba9}',
        '\u{0a66}',
        '\u{03c3}',
        '\u{12d0}',
        '\u{1d5c8}',
        '\u{05e1}',
        '\u{fba8}',
        '\u{fee9}',
        '\u{1d79e}',
        '\u{feec}',
        '\u{1d7ec}',
        '\u{07c0}',
        '\u{1d6d4}',
        '\u{1d64a}',
        '\u{0e50}',
        '\u{1ee84}',
        '\u{1fbf0}',
        '\u{102ab}',
        '\u{004f}'
    ],
    '1': [
        '\u{0406}',
        '\u{ff4c}',
        '\u{23fd}',
        '\u{05c0}',
        '\u{217c}',
        '\u{1d6b0}',
        '\u{05df}',
        '\u{1d7f7}',
        '\u{1d43c}',
        '\u{1d4d8}',
        '\u{1d591}',
        '\u{1d661}',
        '\u{01c0}',
        '\u{fe8d}',
        '\u{1d5a8}',
        '\u{2110}',
        '\u{1d529}',
        '\u{10320}',
        '\u{1d7ed}',
        '\u{a4f2}',
        '\u{1d425}',
        '\u{1d6ea}',
        '\u{1d610}',
        '\u{07ca}',
        '\u{1d724}',
        '\u{1d4c1}',
        '\u{1d798}',
        '\u{0627}',
        '\u{2d4f}',
        '\u{2160}',
        '\u{1d7cf}',
        '\u{1d62d}',
        '\u{1d5f9}',
        '\u{ffe8}',
        '\u{1d4f5}',
        '\u{16f28}',
        '\u{1d459}',
        '\u{2111}',
        '\u{1d48d}',
        '\u{2223}',
        '\u{10309}',
        '\u{04c0}',
        '\u{0049}',
        '\u{1ee00}',
        '\u{0196}',
        '\u{16c1}',
        '\u{1d540}',
        '\u{1d5dc}',
        '\u{1d55d}',
        '\u{1ee80}',
        '\u{ff29}',
        '\u{2113}',
        '\u{2c92}',
        '\u{1d7e3}',
        '\u{1d678}',
        '\u{1d574}',
        '\u{1d695}',
        '\u{0399}',
        '\u{1d644}',
        '\u{1028a}',
        '\u{1d7d9}',
        '\u{fe8e}',
        '\u{ff11}',
        '\u{1d75e}',
        '\u{06f1}',
        '\u{007c}',
        '\u{1e8c7}',
        '\u{05d5}',
        '\u{006c}',
        '\u{1d470}',
        '\u{1fbf1}',
        '\u{0661}',
        '\u{1d408}',
        '\u{1d5c5}'
    ],
    '2': [
        '\u{a644}',
        '\u{14bf}',
        '\u{1d7f8}',
        '\u{ff12}',
        '\u{03e8}',
        '\u{a6ef}',
        '\u{1fbf2}',
        '\u{01a7}',
        '\u{1d7ee}',
        '\u{1d7d0}',
        '\u{1d7e4}',
        '\u{1d7da}',
        '\u{a75a}'
    ],
    '3': [
        '\u{1d7f9}',
        '\u{04e0}',
        '\u{1fbf3}',
        '\u{1d206}',
        '\u{021c}',
        '\u{1d7e5}',
        '\u{0417}',
        '\u{118ca}',
        '\u{01b7}',
        '\u{1d7ef}',
        '\u{1d7d1}',
        '\u{ff13}',
        '\u{a76a}',
        '\u{a7ab}',
        '\u{2ccc}',
        '\u{16f3b}',
        '\u{1d7db}'
    ],
    '4': [
        '\u{1d7f0}',
        '\u{1d7fa}',
        '\u{ff14}',
        '\u{1d7d2}',
        '\u{1d7e6}',
        '\u{118af}',
        '\u{1fbf4}',
        '\u{1d7dc}',
        '\u{13ce}'
    ],
    '5': [
        '\u{1fbf5}',
        '\u{1d7e7}',
        '\u{1d7d3}',
        '\u{118bb}',
        '\u{1d7fb}',
        '\u{ff15}',
        '\u{01bc}',
        '\u{1d7dd}',
        '\u{1d7f1}'
    ],
    '6': [
        '\u{2cd2}',
        '\u{0431}',
        '\u{1d7e8}',
        '\u{1fbf6}',
        '\u{1d7de}',
        '\u{13ee}',
        '\u{118d5}',
        '\u{1d7fc}',
        '\u{ff16}',
        '\u{1d7f2}',
        '\u{1d7d4}'
    ],
    '7': [
        '\u{118c6}',
        '\u{1d7fd}',
        '\u{1d7f3}',
        '\u{1d7df}',
        '\u{104d2}',
        '\u{1d212}',
        '\u{1d7d5}',
        '\u{1fbf7}',
        '\u{ff17}',
        '\u{1d7e9}'
    ],
    '8': [
        '\u{0223}',
        '\u{1fbf8}',
        '\u{0a6a}',
        '\u{1031a}',
        '\u{0222}',
        '\u{1d7fe}',
        '\u{1d7d6}',
        '\u{1d7e0}',
        '\u{ff18}',
        '\u{1d7ea}',
        '\u{1d7f4}',
        '\u{0b03}',
        '\u{09ea}',
        '\u{1e8cb}'
    ],
    '9': [
        '\u{1d7f5}',
        '\u{a76e}',
        '\u{09ed}',
        '\u{1d7e1}',
        '\u{0b68}',
        '\u{ff19}',
        '\u{1d7ff}',
        '\u{118d6}',
        '\u{1fbf9}',
        '\u{2cca}',
        '\u{0a67}',
        '\u{1d7d7}',
        '\u{118cc}',
        '\u{0d6d}',
        '\u{118ac}',
        '\u{1d7eb}'
    ],
    A: [
        '\u{16f40}',
        '\u{1d71c}',
        '\u{1d6a8}',
        '\u{1d504}',
        '\u{1d756}',
        '\u{0410}',
        '\u{1d6e2}',
        '\u{1d49c}',
        '\u{a4ee}',
        '\u{1d790}',
        '\u{15c5}',
        '\u{ff21}',
        '\u{1d00}',
        '\u{0391}',
        '\u{1d468}',
        '\u{1d538}',
        '\u{1d5d4}',
        '\u{1d63c}',
        '\u{102a0}',
        '\u{1d56c}',
        '\u{1d5a0}',
        '\u{1d434}',
        '\u{1d670}',
        '\u{13aa}',
        '\u{1d400}',
        '\u{1d608}',
        '\u{1d4d0}',
        '\u{ab7a}'
    ],
    B: [
        '\u{1d505}',
        '\u{0412}',
        '\u{13fc}',
        '\u{102a1}',
        '\u{1d63d}',
        '\u{1d5d5}',
        '\u{212c}',
        '\u{1d5a1}',
        '\u{1d469}',
        '\u{16d2}',
        '\u{1d6e3}',
        '\u{a4d0}',
        '\u{a7b4}',
        '\u{1d6a9}',
        '\u{15f7}',
        '\u{1d4d1}',
        '\u{1d791}',
        '\u{10282}',
        '\u{1d757}',
        '\u{13f4}',
        '\u{10301}',
        '\u{1d71d}',
        '\u{1d401}',
        '\u{0392}',
        '\u{1d609}',
        '\u{0299}',
        '\u{0432}',
        '\u{1d435}',
        '\u{1d56d}',
        '\u{ff22}',
        '\u{1d671}',
        '\u{1d539}'
    ],
    C: [
        '\u{0421}',
        '\u{118f2}',
        '\u{1d402}',
        '\u{03f9}',
        '\u{a4da}',
        '\u{10415}',
        '\u{ff23}',
        '\u{1d4d2}',
        '\u{1d436}',
        '\u{1d56e}',
        '\u{1d60a}',
        '\u{10302}',
        '\u{2ca4}',
        '\u{216d}',
        '\u{1d672}',
        '\u{1d5d6}',
        '\u{1051c}',
        '\u{102a2}',
        '\u{1d46a}',
        '\u{1d5a2}',
        '\u{13df}',
        '\u{118e9}',
        '\u{1f74c}',
        '\u{1d63e}',
        '\u{1d49e}',
        '\u{2102}',
        '\u{212d}'
    ],
    D: [
        '\u{1d673}',
        '\u{13a0}',
        '\u{1d403}',
        '\u{1d437}',
        '\u{ab70}',
        '\u{216e}',
        '\u{1d49f}',
        '\u{1d507}',
        '\u{1d56f}',
        '\u{2145}',
        '\u{15ea}',
        '\u{1d5a3}',
        '\u{1d63f}',
        '\u{1d4d3}',
        '\u{15de}',
        '\u{1d5d7}',
        '\u{1d46b}',
        '\u{a4d3}',
        '\u{1d05}',
        '\u{ff24}',
        '\u{1d53b}',
        '\u{1d60b}'
    ],
    E: [
        '\u{1d60c}',
        '\u{1d404}',
        '\u{1d6ac}',
        '\u{1d4d4}',
        '\u{1d438}',
        '\u{10286}',
        '\u{1d6e6}',
        '\u{1d508}',
        '\u{22ff}',
        '\u{118ae}',
        '\u{1d5a4}',
        '\u{0415}',
        '\u{1d46c}',
        '\u{118a6}',
        '\u{2d39}',
        '\u{1d53c}',
        '\u{1d570}',
        '\u{0395}',
        '\u{ab7c}',
        '\u{a4f0}',
        '\u{2130}',
        '\u{1d5d8}',
        '\u{1d75a}',
        '\u{1d640}',
        '\u{1d674}',
        '\u{1d720}',
        '\u{13ac}',
        '\u{1d07}',
        '\u{1d794}',
        '\u{ff25}'
    ],
    F: [
        '\u{1d509}',
        '\u{10287}',
        '\u{118a2}',
        '\u{1d571}',
        '\u{15b4}',
        '\u{1d439}',
        '\u{1d46d}',
        '\u{1d641}',
        '\u{2131}',
        '\u{118c2}',
        '\u{ff26}',
        '\u{1d53d}',
        '\u{1d213}',
        '\u{1d5a5}',
        '\u{03dc}',
        '\u{1d7ca}',
        '\u{1d60d}',
        '\u{1d405}',
        '\u{1d5d9}',
        '\u{a4dd}',
        '\u{1d675}',
        '\u{a798}',
        '\u{10525}',
        '\u{102a5}',
        '\u{1d4d5}'
    ],
    G: [
        '\u{1d53e}',
        '\u{1d46e}',
        '\u{13c0}',
        '\u{1d572}',
        '\u{1d406}',
        '\u{1d5a6}',
        '\u{1d642}',
        '\u{1d5da}',
        '\u{13fb}',
        '\u{1d4d6}',
        '\u{1d43a}',
        '\u{0262}',
        '\u{1d4a2}',
        '\u{1d50a}',
        '\u{1d676}',
        '\u{ab90}',
        '\u{050c}',
        '\u{13f3}',
        '\u{050d}',
        '\u{a4d6}',
        '\u{ff27}',
        '\u{1d60e}'
    ],
    H: [
        '\u{102cf}',
        '\u{1d6e8}',
        '\u{ff28}',
        '\u{1d60f}',
        '\u{210d}',
        '\u{13bb}',
        '\u{2c8e}',
        '\u{1d722}',
        '\u{a4e7}',
        '\u{0397}',
        '\u{1d75c}',
        '\u{157c}',
        '\u{210b}',
        '\u{1d5db}',
        '\u{1d796}',
        '\u{1d573}',
        '\u{1d6ae}',
        '\u{029c}',
        '\u{1d407}',
        '\u{041d}',
        '\u{ab8b}',
        '\u{210c}',
        '\u{1d677}',
        '\u{1d5a7}',
        '\u{1d643}',
        '\u{043d}',
        '\u{1d4d7}',
        '\u{1d46f}',
        '\u{1d43b}'
    ],
    I: [
        '\u{0406}',
        '\u{ff4c}',
        '\u{23fd}',
        '\u{05c0}',
        '\u{217c}',
        '\u{1d6b0}',
        '\u{05df}',
        '\u{1d7f7}',
        '\u{1d43c}',
        '\u{1d4d8}',
        '\u{1d591}',
        '\u{1d661}',
        '\u{01c0}',
        '\u{fe8d}',
        '\u{1d5a8}',
        '\u{2110}',
        '\u{1d529}',
        '\u{10320}',
        '\u{1d7ed}',
        '\u{a4f2}',
        '\u{1d425}',
        '\u{1d6ea}',
        '\u{1d610}',
        '\u{07ca}',
        '\u{1d724}',
        '\u{1d4c1}',
        '\u{1d798}',
        '\u{0627}',
        '\u{2d4f}',
        '\u{2160}',
        '\u{1d7cf}',
        '\u{1d62d}',
        '\u{1d5f9}',
        '\u{ffe8}',
        '\u{0031}',
        '\u{1d4f5}',
        '\u{16f28}',
        '\u{1d459}',
        '\u{2111}',
        '\u{1d48d}',
        '\u{2223}',
        '\u{10309}',
        '\u{04c0}',
        '\u{1ee00}',
        '\u{0196}',
        '\u{16c1}',
        '\u{1d540}',
        '\u{1d5dc}',
        '\u{1d55d}',
        '\u{1ee80}',
        '\u{ff29}',
        '\u{2113}',
        '\u{2c92}',
        '\u{1d7e3}',
        '\u{1d678}',
        '\u{1d574}',
        '\u{1d695}',
        '\u{0399}',
        '\u{1d644}',
        '\u{1028a}',
        '\u{1d7d9}',
        '\u{fe8e}',
        '\u{ff11}',
        '\u{1d75e}',
        '\u{06f1}',
        '\u{007c}',
        '\u{1e8c7}',
        '\u{05d5}',
        '\u{006c}',
        '\u{1d470}',
        '\u{1fbf1}',
        '\u{0661}',
        '\u{1d408}',
        '\u{1d5c5}'
    ],
    J: [
        '\u{a4d9}',
        '\u{a7b2}',
        '\u{1d5a9}',
        '\u{1d4a5}',
        '\u{1d645}',
        '\u{1d5dd}',
        '\u{1d0a}',
        '\u{ab7b}',
        '\u{13ab}',
        '\u{ff2a}',
        '\u{1d409}',
        '\u{1d541}',
        '\u{037f}',
        '\u{1d471}',
        '\u{1d50d}',
        '\u{1d575}',
        '\u{148d}',
        '\u{1d4d9}',
        '\u{0408}',
        '\u{1d43d}',
        '\u{1d611}',
        '\u{1d679}'
    ],
    K: [
        '\u{1d50e}',
        '\u{1d75f}',
        '\u{039a}',
        '\u{1d6eb}',
        '\u{1d799}',
        '\u{1d4a6}',
        '\u{2c94}',
        '\u{041a}',
        '\u{1d612}',
        '\u{1d576}',
        '\u{1d542}',
        '\u{ff2b}',
        '\u{1d43e}',
        '\u{a4d7}',
        '\u{1d67a}',
        '\u{16d5}',
        '\u{1d725}',
        '\u{10518}',
        '\u{1d472}',
        '\u{1d4da}',
        '\u{1d5aa}',
        '\u{1d40a}',
        '\u{1d5de}',
        '\u{1d646}',
        '\u{1d6b1}',
        '\u{212a}',
        '\u{13e6}'
    ],
    L: [
        '\u{029f}',
        '\u{118a3}',
        '\u{1d22a}',
        '\u{abae}',
        '\u{1d647}',
        '\u{1041b}',
        '\u{1d473}',
        '\u{1d43f}',
        '\u{2cd0}',
        '\u{216c}',
        '\u{14aa}',
        '\u{1d4db}',
        '\u{10526}',
        '\u{1d50f}',
        '\u{ff2c}',
        '\u{10443}',
        '\u{1d577}',
        '\u{1d5df}',
        '\u{1d613}',
        '\u{1d543}',
        '\u{1d67b}',
        '\u{118b2}',
        '\u{1d5ab}',
        '\u{a4e1}',
        '\u{1d40b}',
        '\u{2112}',
        '\u{2cd1}',
        '\u{16f16}',
        '\u{13de}'
    ],
    M: [
        '\u{10311}',
        '\u{1d5ac}',
        '\u{1d67c}',
        '\u{16d6}',
        '\u{1d4dc}',
        '\u{1d474}',
        '\u{1d510}',
        '\u{2c98}',
        '\u{041c}',
        '\u{15f0}',
        '\u{03fa}',
        '\u{039c}',
        '\u{1d5e0}',
        '\u{1d578}',
        '\u{1d440}',
        '\u{ff2d}',
        '\u{216f}',
        '\u{1d6b3}',
        '\u{1d79b}',
        '\u{1d40c}',
        '\u{1d727}',
        '\u{1d544}',
        '\u{1d614}',
        '\u{1d761}',
        '\u{102b0}',
        '\u{2133}',
        '\u{1d6ed}',
        '\u{13b7}',
        '\u{1d648}',
        '\u{a4df}'
    ],
    N: [
        '\u{1d5ad}',
        '\u{1d40d}',
        '\u{ff2e}',
        '\u{1d6ee}',
        '\u{2115}',
        '\u{1d4dd}',
        '\u{1d649}',
        '\u{a4e0}',
        '\u{1d475}',
        '\u{1d441}',
        '\u{1d579}',
        '\u{0274}',
        '\u{2c9a}',
        '\u{1d79c}',
        '\u{1d615}',
        '\u{1d67d}',
        '\u{1d728}',
        '\u{1d5e1}',
        '\u{1d511}',
        '\u{039d}',
        '\u{1d4a9}',
        '\u{1d762}',
        '\u{10513}',
        '\u{1d6b4}'
    ],
    O: [
        '\u{feeb}',
        '\u{1d6b6}',
        '\u{2c9f}',
        '\u{0c82}',
        '\u{0030}',
        '\u{118d7}',
        '\u{1d490}',
        '\u{1d7f6}',
        '\u{fba6}',
        '\u{10404}',
        '\u{1d7d8}',
        '\u{a4f3}',
        '\u{0555}',
        '\u{1d6d0}',
        '\u{1d77e}',
        '\u{fbab}',
        '\u{10ff}',
        '\u{1d560}',
        '\u{1d698}',
        '\u{1d4de}',
        '\u{0665}',
        '\u{1d52c}',
        '\u{0966}',
        '\u{041e}',
        '\u{1d40e}',
        '\u{104c2}',
        '\u{ff2f}',
        '\u{1d7bc}',
        '\u{1d748}',
        '\u{1d7ce}',
        '\u{1d4f8}',
        '\u{1d764}',
        '\u{0b66}',
        '\u{1d442}',
        '\u{1d630}',
        '\u{0585}',
        '\u{1d5ae}',
        '\u{1042c}',
        '\u{0647}',
        '\u{1d594}',
        '\u{0d20}',
        '\u{118b5}',
        '\u{1d782}',
        '\u{104ea}',
        '\u{0ed0}',
        '\u{0c66}',
        '\u{1d6f0}',
        '\u{3007}',
        '\u{09e6}',
        '\u{1d70a}',
        '\u{1d11}',
        '\u{1d428}',
        '\u{0d82}',
        '\u{1d476}',
        '\u{1d7b8}',
        '\u{114d0}',
        '\u{0d02}',
        '\u{1d5fc}',
        '\u{fba7}',
        '\u{0b20}',
        '\u{06d5}',
        '\u{1d45c}',
        '\u{fbaa}',
        '\u{10292}',
        '\u{1d546}',
        '\u{1d5e2}',
        '\u{1d67e}',
        '\u{1d72a}',
        '\u{ab3d}',
        '\u{1ee24}',
        '\u{06be}',
        '\u{03bf}',
        '\u{0d66}',
        '\u{feea}',
        '\u{10516}',
        '\u{118c8}',
        '\u{2134}',
        '\u{1ee64}',
        '\u{1d70e}',
        '\u{ff4f}',
        '\u{06f5}',
        '\u{1d616}',
        '\u{1d0f}',
        '\u{043e}',
        '\u{1d57a}',
        '\u{ff10}',
        '\u{1d7e2}',
        '\u{06c1}',
        '\u{1d4aa}',
        '\u{0ce6}',
        '\u{2c9e}',
        '\u{118e0}',
        '\u{2d54}',
        '\u{1040}',
        '\u{1d512}',
        '\u{fbac}',
        '\u{0be6}',
        '\u{0c02}',
        '\u{1d744}',
        '\u{101d}',
        '\u{1d664}',
        '\u{0ae6}',
        '\u{006f}',
        '\u{039f}',
        '\u{fbad}',
        '\u{fba9}',
        '\u{0a66}',
        '\u{03c3}',
        '\u{12d0}',
        '\u{1d5c8}',
        '\u{05e1}',
        '\u{fba8}',
        '\u{fee9}',
        '\u{1d79e}',
        '\u{feec}',
        '\u{1d7ec}',
        '\u{07c0}',
        '\u{1d6d4}',
        '\u{1d64a}',
        '\u{0e50}',
        '\u{1ee84}',
        '\u{1fbf0}',
        '\u{102ab}'
    ],
    P: [
        '\u{03a1}',
        '\u{a4d1}',
        '\u{1d57b}',
        '\u{1d29}',
        '\u{1d67f}',
        '\u{146d}',
        '\u{1d5e3}',
        '\u{1d5af}',
        '\u{1d477}',
        '\u{1d4df}',
        '\u{1d4ab}',
        '\u{0420}',
        '\u{abb2}',
        '\u{1d7a0}',
        '\u{13e2}',
        '\u{1d18}',
        '\u{1d40f}',
        '\u{2ca2}',
        '\u{2119}',
        '\u{10295}',
        '\u{1d617}',
        '\u{ff30}',
        '\u{1d64b}',
        '\u{1d766}',
        '\u{1d443}',
        '\u{1d6b8}',
        '\u{1d6f2}',
        '\u{1d513}',
        '\u{1d72c}'
    ],
    Q: [
        '\u{1d410}',
        '\u{1d514}',
        '\u{1d57c}',
        '\u{1d5e4}',
        '\u{ff31}',
        '\u{1d64c}',
        '\u{1d680}',
        '\u{1d618}',
        '\u{1d478}',
        '\u{1d4ac}',
        '\u{1d5b0}',
        '\u{2d55}',
        '\u{211a}',
        '\u{1d4e0}',
        '\u{1d444}'
    ],
    R: [
        '\u{1d479}',
        '\u{1d619}',
        '\u{0280}',
        '\u{1d57d}',
        '\u{1d411}',
        '\u{1d5e5}',
        '\u{13d2}',
        '\u{16b1}',
        '\u{ab71}',
        '\u{1d64d}',
        '\u{1d445}',
        '\u{aba2}',
        '\u{1587}',
        '\u{211c}',
        '\u{1d5b1}',
        '\u{104b4}',
        '\u{01a6}',
        '\u{1d216}',
        '\u{16f35}',
        '\u{1d681}',
        '\u{1d4e1}',
        '\u{211b}',
        '\u{a4e3}',
        '\u{211d}',
        '\u{13a1}',
        '\u{ff32}'
    ],
    S: [
        '\u{1d57e}',
        '\u{13da}',
        '\u{1d682}',
        '\u{13d5}',
        '\u{10420}',
        '\u{ff33}',
        '\u{1d516}',
        '\u{1d61a}',
        '\u{054f}',
        '\u{10296}',
        '\u{0405}',
        '\u{1d5b2}',
        '\u{1d5e6}',
        '\u{1d47a}',
        '\u{1d4e2}',
        '\u{1d446}',
        '\u{16f3a}',
        '\u{a4e2}',
        '\u{1d54a}',
        '\u{1d412}',
        '\u{1d64e}',
        '\u{1d4ae}'
    ],
    T: [
        '\u{22a4}',
        '\u{2ca6}',
        '\u{13a2}',
        '\u{1d72f}',
        '\u{03c4}',
        '\u{1d57f}',
        '\u{ab72}',
        '\u{16f0a}',
        '\u{1d1b}',
        '\u{0442}',
        '\u{1d70f}',
        '\u{1d47b}',
        '\u{1d683}',
        '\u{27d9}',
        '\u{1d54b}',
        '\u{1d517}',
        '\u{03a4}',
        '\u{10315}',
        '\u{1d4af}',
        '\u{1d5e7}',
        '\u{1d7a3}',
        '\u{1d749}',
        '\u{102b1}',
        '\u{1d413}',
        '\u{1d64f}',
        '\u{ff34}',
        '\u{0422}',
        '\u{1d5b3}',
        '\u{a4d4}',
        '\u{1d6f5}',
        '\u{1d61b}',
        '\u{1d6bb}',
        '\u{1d769}',
        '\u{1d6d5}',
        '\u{1d7bd}',
        '\u{118bc}',
        '\u{1f768}',
        '\u{1d447}',
        '\u{10297}',
        '\u{1d783}',
        '\u{1d4e3}'
    ],
    U: [
        '\u{054d}',
        '\u{222a}',
        '\u{118b8}',
        '\u{1d47c}',
        '\u{1d580}',
        '\u{a4f4}',
        '\u{1d414}',
        '\u{1d448}',
        '\u{1d684}',
        '\u{16f42}',
        '\u{1d518}',
        '\u{144c}',
        '\u{1d54c}',
        '\u{1d650}',
        '\u{1d4e4}',
        '\u{1200}',
        '\u{1d5e8}',
        '\u{1d61c}',
        '\u{1d5b4}',
        '\u{1d4b0}',
        '\u{22c3}',
        '\u{104ce}',
        '\u{ff35}'
    ],
    V: [
        '\u{1d581}',
        '\u{1d47d}',
        '\u{1d20d}',
        '\u{2d38}',
        '\u{a4e6}',
        '\u{1d5e9}',
        '\u{1d519}',
        '\u{1d4b1}',
        '\u{142f}',
        '\u{1d685}',
        '\u{1051d}',
        '\u{1d61d}',
        '\u{16f08}',
        '\u{0474}',
        '\u{13d9}',
        '\u{ff36}',
        '\u{1d415}',
        '\u{2164}',
        '\u{0667}',
        '\u{1d54d}',
        '\u{1d651}',
        '\u{118a0}',
        '\u{1d4e5}',
        '\u{a6df}',
        '\u{06f7}',
        '\u{1d5b5}',
        '\u{1d449}'
    ],
    W: [
        '\u{118ef}',
        '\u{1d686}',
        '\u{1d416}',
        '\u{1d4e6}',
        '\u{13b3}',
        '\u{1d47e}',
        '\u{1d5b6}',
        '\u{1d582}',
        '\u{1d44a}',
        '\u{1d4b2}',
        '\u{13d4}',
        '\u{1d61e}',
        '\u{1d5ea}',
        '\u{a4ea}',
        '\u{118e6}',
        '\u{ff37}',
        '\u{1d652}',
        '\u{051c}',
        '\u{1d51a}',
        '\u{1d54e}'
    ],
    X: [
        '\u{1d76c}',
        '\u{1d54f}',
        '\u{1d5eb}',
        '\u{1d4b3}',
        '\u{166d}',
        '\u{102b4}',
        '\u{1d44b}',
        '\u{2573}',
        '\u{1d47f}',
        '\u{10290}',
        '\u{ff38}',
        '\u{1d583}',
        '\u{1d7a6}',
        '\u{2169}',
        '\u{1d61f}',
        '\u{10527}',
        '\u{1d417}',
        '\u{1d732}',
        '\u{1d6f8}',
        '\u{1d5b7}',
        '\u{2d5d}',
        '\u{1d653}',
        '\u{1d687}',
        '\u{10322}',
        '\u{2cac}',
        '\u{1d4e7}',
        '\u{1d51b}',
        '\u{1d6be}',
        '\u{a4eb}',
        '\u{0425}',
        '\u{16b7}',
        '\u{03a7}',
        '\u{10317}',
        '\u{a7b3}',
        '\u{118ec}'
    ],
    Y: [
        '\u{1d418}',
        '\u{1d480}',
        '\u{1d654}',
        '\u{a4ec}',
        '\u{1d44c}',
        '\u{1d7a4}',
        '\u{13bd}',
        '\u{1d5ec}',
        '\u{1d4b4}',
        '\u{1d620}',
        '\u{1d6f6}',
        '\u{1d5b8}',
        '\u{1d4e8}',
        '\u{0423}',
        '\u{118a4}',
        '\u{1d76a}',
        '\u{16f43}',
        '\u{04ae}',
        '\u{1d688}',
        '\u{1d550}',
        '\u{1d584}',
        '\u{2ca8}',
        '\u{03d2}',
        '\u{1d51c}',
        '\u{13a9}',
        '\u{ff39}',
        '\u{1d6bc}',
        '\u{1d730}',
        '\u{03a5}',
        '\u{102b2}'
    ],
    Z: [
        '\u{a4dc}',
        '\u{1d6ad}',
        '\u{1d795}',
        '\u{102f5}',
        '\u{1d44d}',
        '\u{1d4e9}',
        '\u{1d75b}',
        '\u{0396}',
        '\u{1d419}',
        '\u{1d621}',
        '\u{118e5}',
        '\u{1d585}',
        '\u{1d655}',
        '\u{118a9}',
        '\u{13c3}',
        '\u{2124}',
        '\u{1d5b9}',
        '\u{1d721}',
        '\u{1d481}',
        '\u{1d4b5}',
        '\u{1d689}',
        '\u{1d6e7}',
        '\u{1d5ed}',
        '\u{ff3a}',
        '\u{2128}'
    ],
    a: [
        '\u{1d736}',
        '\u{237a}',
        '\u{1d6c2}',
        '\u{1d41a}',
        '\u{1d4ea}',
        '\u{1d656}',
        '\u{03b1}',
        '\u{0430}',
        '\u{1d5ba}',
        '\u{1d5ee}',
        '\u{0251}',
        '\u{1d6fc}',
        '\u{ff41}',
        '\u{1d770}',
        '\u{1d622}',
        '\u{1d44e}',
        '\u{1d586}',
        '\u{1d51e}',
        '\u{1d68a}',
        '\u{1d482}',
        '\u{1d552}',
        '\u{1d7aa}',
        '\u{1d4b6}'
    ],
    b: [
        '\u{15af}',
        '\u{1d41b}',
        '\u{0184}',
        '\u{1d51f}',
        '\u{1d553}',
        '\u{1d587}',
        '\u{1d5ef}',
        '\u{1d483}',
        '\u{1d623}',
        '\u{1472}',
        '\u{13cf}',
        '\u{ff42}',
        '\u{1d4b7}',
        '\u{1d4eb}',
        '\u{1d68b}',
        '\u{1d5bb}',
        '\u{1d44f}',
        '\u{042c}',
        '\u{1d657}'
    ],
    c: [
        '\u{1d484}',
        '\u{1d5bc}',
        '\u{1d41c}',
        '\u{1d554}',
        '\u{1043d}',
        '\u{2ca5}',
        '\u{1d68c}',
        '\u{1d624}',
        '\u{1d450}',
        '\u{1d4b8}',
        '\u{abaf}',
        '\u{1d04}',
        '\u{1d520}',
        '\u{217d}',
        '\u{1d588}',
        '\u{1d4ec}',
        '\u{1d658}',
        '\u{0441}',
        '\u{ff43}',
        '\u{03f2}',
        '\u{1d5f0}'
    ],
    d: [
        '\u{1d659}',
        '\u{ff44}',
        '\u{1d41d}',
        '\u{13e7}',
        '\u{a4d2}',
        '\u{1d4ed}',
        '\u{1d5bd}',
        '\u{1d521}',
        '\u{0501}',
        '\u{2146}',
        '\u{1d451}',
        '\u{1d485}',
        '\u{1d555}',
        '\u{1d68d}',
        '\u{146f}',
        '\u{1d5f1}',
        '\u{217e}',
        '\u{1d589}',
        '\u{1d625}',
        '\u{1d4b9}'
    ],
    e: [
        '\u{1d556}',
        '\u{1d68e}',
        '\u{1d522}',
        '\u{04bd}',
        '\u{2147}',
        '\u{212e}',
        '\u{1d65a}',
        '\u{1d486}',
        '\u{1d5be}',
        '\u{1d41e}',
        '\u{1d626}',
        '\u{0435}',
        '\u{ab32}',
        '\u{1d452}',
        '\u{1d5f2}',
        '\u{1d58a}',
        '\u{212f}',
        '\u{ff45}',
        '\u{1d4ee}'
    ],
    f: [
        '\u{1d65b}',
        '\u{1d7cb}',
        '\u{1d5bf}',
        '\u{1d523}',
        '\u{1d41f}',
        '\u{1d487}',
        '\u{1d627}',
        '\u{1d557}',
        '\u{a799}',
        '\u{1d453}',
        '\u{0584}',
        '\u{1d5f3}',
        '\u{1d58b}',
        '\u{017f}',
        '\u{03dd}',
        '\u{ff46}',
        '\u{1d4ef}',
        '\u{1d4bb}',
        '\u{1e9d}',
        '\u{1d68f}',
        '\u{ab35}'
    ],
    g: [
        '\u{1d558}',
        '\u{1d690}',
        '\u{0261}',
        '\u{1d58c}',
        '\u{1d83}',
        '\u{1d488}',
        '\u{0581}',
        '\u{1d454}',
        '\u{210a}',
        '\u{1d628}',
        '\u{1d65c}',
        '\u{1d5f4}',
        '\u{1d4f0}',
        '\u{ff47}',
        '\u{018d}',
        '\u{1d524}',
        '\u{1d5c0}',
        '\u{1d420}'
    ],
    h: [
        '\u{0570}',
        '\u{1d421}',
        '\u{1d629}',
        '\u{1d559}',
        '\u{1d525}',
        '\u{1d5f5}',
        '\u{210e}',
        '\u{ff48}',
        '\u{04bb}',
        '\u{1d489}',
        '\u{1d58d}',
        '\u{1d65d}',
        '\u{13c2}',
        '\u{1d4f1}',
        '\u{1d691}',
        '\u{1d5c1}',
        '\u{1d4bd}'
    ],
    i: [
        '\u{2148}',
        '\u{1d422}',
        '\u{1d6a4}',
        '\u{0131}',
        '\u{1d7b2}',
        '\u{1d65e}',
        '\u{1d4f2}',
        '\u{1d48a}',
        '\u{ff49}',
        '\u{0456}',
        '\u{1d4be}',
        '\u{2170}',
        '\u{1d55a}',
        '\u{1d58e}',
        '\u{0269}',
        '\u{04cf}',
        '\u{1d6ca}',
        '\u{02db}',
        '\u{1d5c2}',
        '\u{037a}',
        '\u{118c3}',
        '\u{1d456}',
        '\u{a647}',
        '\u{1d778}',
        '\u{2373}',
        '\u{1d62a}',
        '\u{1d73e}',
        '\u{ab75}',
        '\u{1fbe}',
        '\u{13a5}',
        '\u{026a}',
        '\u{2139}',
        '\u{1d526}',
        '\u{1d692}',
        '\u{1d5f6}',
        '\u{1d704}',
        '\u{03b9}'
    ],
    j: [
        '\u{1d62b}',
        '\u{1d55b}',
        '\u{1d423}',
        '\u{1d48b}',
        '\u{1d58f}',
        '\u{03f3}',
        '\u{ff4a}',
        '\u{1d5c3}',
        '\u{1d4bf}',
        '\u{1d65f}',
        '\u{0458}',
        '\u{1d527}',
        '\u{1d5f7}',
        '\u{1d4f3}',
        '\u{2149}',
        '\u{1d457}',
        '\u{1d693}'
    ],
    k: [
        '\u{1d458}',
        '\u{1d55c}',
        '\u{1d4c0}',
        '\u{1d48c}',
        '\u{1d4f4}',
        '\u{1d590}',
        '\u{ff4b}',
        '\u{1d528}',
        '\u{1d5c4}',
        '\u{1d62c}',
        '\u{1d5f8}',
        '\u{1d660}',
        '\u{1d424}',
        '\u{1d694}'
    ],
    l: [
        '\u{0406}',
        '\u{ff4c}',
        '\u{23fd}',
        '\u{05c0}',
        '\u{217c}',
        '\u{1d6b0}',
        '\u{05df}',
        '\u{1d7f7}',
        '\u{1d43c}',
        '\u{1d4d8}',
        '\u{1d591}',
        '\u{1d661}',
        '\u{01c0}',
        '\u{fe8d}',
        '\u{1d5a8}',
        '\u{2110}',
        '\u{1d529}',
        '\u{10320}',
        '\u{1d7ed}',
        '\u{a4f2}',
        '\u{1d425}',
        '\u{1d6ea}',
        '\u{1d610}',
        '\u{07ca}',
        '\u{1d724}',
        '\u{1d4c1}',
        '\u{1d798}',
        '\u{0627}',
        '\u{2d4f}',
        '\u{2160}',
        '\u{1d7cf}',
        '\u{1d62d}',
        '\u{1d5f9}',
        '\u{ffe8}',
        '\u{0031}',
        '\u{1d4f5}',
        '\u{16f28}',
        '\u{1d459}',
        '\u{2111}',
        '\u{1d48d}',
        '\u{2223}',
        '\u{10309}',
        '\u{04c0}',
        '\u{0049}',
        '\u{1ee00}',
        '\u{0196}',
        '\u{16c1}',
        '\u{1d540}',
        '\u{1d5dc}',
        '\u{1d55d}',
        '\u{1ee80}',
        '\u{ff29}',
        '\u{2113}',
        '\u{2c92}',
        '\u{1d7e3}',
        '\u{1d678}',
        '\u{1d574}',
        '\u{1d695}',
        '\u{0399}',
        '\u{1d644}',
        '\u{1028a}',
        '\u{1d7d9}',
        '\u{fe8e}',
        '\u{ff11}',
        '\u{1d75e}',
        '\u{06f1}',
        '\u{007c}',
        '\u{1e8c7}',
        '\u{05d5}',
        '\u{1d470}',
        '\u{1fbf1}',
        '\u{0661}',
        '\u{1d408}',
        '\u{1d5c5}'
    ],
    m: ['\u{ff4d}'],
    n: [
        '\u{1d45b}',
        '\u{1d5fb}',
        '\u{1d5c7}',
        '\u{1d48f}',
        '\u{ff4e}',
        '\u{1d593}',
        '\u{1d62f}',
        '\u{057c}',
        '\u{1d663}',
        '\u{0578}',
        '\u{1d52b}',
        '\u{1d4f7}',
        '\u{1d4c3}',
        '\u{1d697}',
        '\u{1d55f}',
        '\u{1d427}'
    ],
    o: [
        '\u{feeb}',
        '\u{1d6b6}',
        '\u{2c9f}',
        '\u{0c82}',
        '\u{0030}',
        '\u{118d7}',
        '\u{1d490}',
        '\u{1d7f6}',
        '\u{fba6}',
        '\u{10404}',
        '\u{1d7d8}',
        '\u{a4f3}',
        '\u{0555}',
        '\u{1d6d0}',
        '\u{1d77e}',
        '\u{fbab}',
        '\u{10ff}',
        '\u{1d560}',
        '\u{1d698}',
        '\u{1d4de}',
        '\u{0665}',
        '\u{1d52c}',
        '\u{0966}',
        '\u{041e}',
        '\u{1d40e}',
        '\u{104c2}',
        '\u{ff2f}',
        '\u{1d7bc}',
        '\u{1d748}',
        '\u{1d7ce}',
        '\u{1d4f8}',
        '\u{1d764}',
        '\u{0b66}',
        '\u{1d442}',
        '\u{1d630}',
        '\u{0585}',
        '\u{1d5ae}',
        '\u{1042c}',
        '\u{0647}',
        '\u{1d594}',
        '\u{0d20}',
        '\u{118b5}',
        '\u{1d782}',
        '\u{104ea}',
        '\u{0ed0}',
        '\u{0c66}',
        '\u{1d6f0}',
        '\u{3007}',
        '\u{09e6}',
        '\u{1d70a}',
        '\u{1d11}',
        '\u{1d428}',
        '\u{0d82}',
        '\u{1d476}',
        '\u{1d7b8}',
        '\u{114d0}',
        '\u{0d02}',
        '\u{1d5fc}',
        '\u{fba7}',
        '\u{0b20}',
        '\u{06d5}',
        '\u{1d45c}',
        '\u{fbaa}',
        '\u{10292}',
        '\u{1d546}',
        '\u{1d5e2}',
        '\u{1d67e}',
        '\u{1d72a}',
        '\u{ab3d}',
        '\u{1ee24}',
        '\u{06be}',
        '\u{03bf}',
        '\u{0d66}',
        '\u{feea}',
        '\u{10516}',
        '\u{118c8}',
        '\u{2134}',
        '\u{1ee64}',
        '\u{1d70e}',
        '\u{ff4f}',
        '\u{06f5}',
        '\u{1d616}',
        '\u{1d0f}',
        '\u{043e}',
        '\u{1d57a}',
        '\u{ff10}',
        '\u{1d7e2}',
        '\u{06c1}',
        '\u{1d4aa}',
        '\u{0ce6}',
        '\u{2c9e}',
        '\u{118e0}',
        '\u{2d54}',
        '\u{1040}',
        '\u{1d512}',
        '\u{fbac}',
        '\u{0be6}',
        '\u{0c02}',
        '\u{1d744}',
        '\u{101d}',
        '\u{1d664}',
        '\u{0ae6}',
        '\u{039f}',
        '\u{fbad}',
        '\u{fba9}',
        '\u{0a66}',
        '\u{03c3}',
        '\u{12d0}',
        '\u{1d5c8}',
        '\u{05e1}',
        '\u{fba8}',
        '\u{fee9}',
        '\u{1d79e}',
        '\u{feec}',
        '\u{1d7ec}',
        '\u{07c0}',
        '\u{1d6d4}',
        '\u{1d64a}',
        '\u{0e50}',
        '\u{1ee84}',
        '\u{1fbf0}',
        '\u{102ab}',
        '\u{004f}'
    ],
    p: [
        '\u{1d4c5}',
        '\u{1d665}',
        '\u{1d754}',
        '\u{1d45d}',
        '\u{1d52d}',
        '\u{1d6d2}',
        '\u{1d5c9}',
        '\u{03c1}',
        '\u{1d429}',
        '\u{1d595}',
        '\u{0440}',
        '\u{1d5fd}',
        '\u{1d746}',
        '\u{2374}',
        '\u{1d4f9}',
        '\u{1d7c8}',
        '\u{1d7ba}',
        '\u{1d780}',
        '\u{1d6e0}',
        '\u{03f1}',
        '\u{1d491}',
        '\u{1d699}',
        '\u{ff50}',
        '\u{1d631}',
        '\u{1d561}',
        '\u{1d78e}',
        '\u{1d70c}',
        '\u{2ca3}',
        '\u{1d71a}'
    ],
    q: [
        '\u{0566}',
        '\u{1d562}',
        '\u{1d632}',
        '\u{051b}',
        '\u{1d52e}',
        '\u{1d596}',
        '\u{1d666}',
        '\u{1d492}',
        '\u{1d5fe}',
        '\u{0563}',
        '\u{1d42a}',
        '\u{1d5ca}',
        '\u{1d45e}',
        '\u{1d4fa}',
        '\u{1d4c6}',
        '\u{1d69a}',
        '\u{ff51}'
    ],
    r: [
        '\u{1d563}',
        '\u{ab47}',
        '\u{1d597}',
        '\u{1d26}',
        '\u{ab48}',
        '\u{1d493}',
        '\u{1d633}',
        '\u{0433}',
        '\u{1d4c7}',
        '\u{2c85}',
        '\u{1d45f}',
        '\u{ab81}',
        '\u{ff52}',
        '\u{1d42b}',
        '\u{1d52f}',
        '\u{1d69b}',
        '\u{1d5ff}',
        '\u{1d5cb}',
        '\u{1d4fb}',
        '\u{1d667}'
    ],
    s: [
        '\u{0455}',
        '\u{1d598}',
        '\u{ff53}',
        '\u{1d530}',
        '\u{1d460}',
        '\u{01bd}',
        '\u{a731}',
        '\u{1d5cc}',
        '\u{1d668}',
        '\u{10448}',
        '\u{1d564}',
        '\u{1d494}',
        '\u{1d4fc}',
        '\u{abaa}',
        '\u{1d4c8}',
        '\u{1d69c}',
        '\u{118c1}',
        '\u{1d42c}',
        '\u{1d634}',
        '\u{1d600}'
    ],
    t: [
        '\u{1d42d}',
        '\u{ff54}',
        '\u{1d5cd}',
        '\u{1d669}',
        '\u{1d69d}',
        '\u{1d4fd}',
        '\u{1d461}',
        '\u{1d4c9}',
        '\u{1d599}',
        '\u{1d601}',
        '\u{1d531}',
        '\u{1d635}',
        '\u{1d495}',
        '\u{1d565}'
    ],
    u: [
        '\u{1d602}',
        '\u{ab52}',
        '\u{1d7be}',
        '\u{1d1c}',
        '\u{028b}',
        '\u{104f6}',
        '\u{118d8}',
        '\u{a79f}',
        '\u{ab4e}',
        '\u{1d74a}',
        '\u{1d59a}',
        '\u{1d6d6}',
        '\u{1d4ca}',
        '\u{1d4fe}',
        '\u{ff55}',
        '\u{1d462}',
        '\u{1d636}',
        '\u{1d532}',
        '\u{057d}',
        '\u{1d566}',
        '\u{03c5}',
        '\u{1d69e}',
        '\u{1d42e}',
        '\u{1d710}',
        '\u{1d66a}',
        '\u{1d5ce}',
        '\u{1d496}',
        '\u{1d784}'
    ],
    v: [
        '\u{05d8}',
        '\u{1d4cb}',
        '\u{1d637}',
        '\u{1d6ce}',
        '\u{1d42f}',
        '\u{1d533}',
        '\u{aba9}',
        '\u{03bd}',
        '\u{1d4ff}',
        '\u{1d59b}',
        '\u{0475}',
        '\u{1d603}',
        '\u{22c1}',
        '\u{1d463}',
        '\u{1d708}',
        '\u{118c0}',
        '\u{1d742}',
        '\u{ff56}',
        '\u{1d497}',
        '\u{2174}',
        '\u{1d5cf}',
        '\u{1d66b}',
        '\u{1d7b6}',
        '\u{11706}',
        '\u{1d567}',
        '\u{1d77c}',
        '\u{2228}',
        '\u{1d20}',
        '\u{1d69f}'
    ],
    w: [
        '\u{1d500}',
        '\u{1d5d0}',
        '\u{0461}',
        '\u{026f}',
        '\u{1d66c}',
        '\u{1d6a0}',
        '\u{1d604}',
        '\u{1d568}',
        '\u{1d498}',
        '\u{0561}',
        '\u{1d4cc}',
        '\u{1d59c}',
        '\u{1170e}',
        '\u{1170f}',
        '\u{ab83}',
        '\u{1170a}',
        '\u{1d464}',
        '\u{1d534}',
        '\u{ff57}',
        '\u{1d21}',
        '\u{1d638}',
        '\u{051d}',
        '\u{1d430}'
    ],
    x: [
        '\u{1d605}',
        '\u{1d535}',
        '\u{1d59d}',
        '\u{1d66d}',
        '\u{157d}',
        '\u{166e}',
        '\u{ff58}',
        '\u{1d501}',
        '\u{2a2f}',
        '\u{0445}',
        '\u{292c}',
        '\u{00d7}',
        '\u{1541}',
        '\u{1d569}',
        '\u{2179}',
        '\u{1d639}',
        '\u{1d431}',
        '\u{1d4cd}',
        '\u{1d5d1}',
        '\u{292b}',
        '\u{1d6a1}',
        '\u{1d499}',
        '\u{1d465}'
    ],
    y: [
        '\u{1d59e}',
        '\u{1d502}',
        '\u{0443}',
        '\u{1d466}',
        '\u{118dc}',
        '\u{0263}',
        '\u{1d49a}',
        '\u{1d6fe}',
        '\u{213d}',
        '\u{1d56a}',
        '\u{1d606}',
        '\u{1d5d2}',
        '\u{1d772}',
        '\u{04af}',
        '\u{1d63a}',
        '\u{1d8c}',
        '\u{1d432}',
        '\u{ab5a}',
        '\u{1d738}',
        '\u{1d4ce}',
        '\u{028f}',
        '\u{1d536}',
        '\u{1d6c4}',
        '\u{03b3}',
        '\u{ff59}',
        '\u{1eff}',
        '\u{1d6a2}',
        '\u{1d66e}',
        '\u{10e7}',
        '\u{1d7ac}'
    ],
    z: [
        '\u{1d4cf}',
        '\u{1d49b}',
        '\u{1d63b}',
        '\u{1d607}',
        '\u{1d22}',
        '\u{1d56b}',
        '\u{1d537}',
        '\u{1d5d3}',
        '\u{1d433}',
        '\u{1d467}',
        '\u{1d66f}',
        '\u{1d503}',
        '\u{ab93}',
        '\u{ff5a}',
        '\u{118c4}',
        '\u{1d6a3}',
        '\u{1d59f}'
    ]
};
function buildSearchFunction(charMap) {
    function hasWordAtStart(symbols, word) {
        if (word.length === 0) {
            return true;
        }
        const textChar = symbols[0], wordCharLower = word[0].toLowerCase(), wordCharUpper = word[0].toUpperCase(), firstCharMatches = textChar === wordCharLower ||
            (charMap[wordCharLower] && charMap[wordCharLower].includes(textChar)) ||
            textChar === wordCharUpper ||
            (charMap[wordCharUpper] && charMap[wordCharUpper].includes(textChar));
        return firstCharMatches && hasWordAtStart(symbols.slice(1), word.substr(1));
    }
    function checkForWord(symbols, word) {
        const wordLength = word.length;
        const matches = [];
        let i = 0;
        while (symbols.length >= wordLength) {
            if (hasWordAtStart(symbols, word)) {
                matches.push({
                    match: symbols.slice(0, word.length).join(''),
                    word,
                    index: i
                });
            }
            symbols = symbols.slice(1);
            i++;
        }
        return matches;
    }
    function makeSymbolArray(txt) {
        const a = [];
        for (const s of txt) {
            a.push(s);
        }
        return a;
    }
    return function (inputText, targetWords) {
        const allMatches = [], inputTextSymbolArray = makeSymbolArray(inputText);
        for (const targetWord of targetWords) {
            Array.prototype.push.apply(allMatches, checkForWord(inputTextSymbolArray, targetWord));
        }
        return allMatches;
    };
}
exports.buildSearchFunction = buildSearchFunction;
function search(inputText, targetWords) {
    return buildSearchFunction(CHAR_MAP)(inputText, targetWords);
}
exports.search = search;


/***/ }),

/***/ 605:
/***/ (function(module) {

module.exports = require("http");

/***/ }),

/***/ 614:
/***/ (function(module) {

module.exports = require("events");

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 625:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = __importStar(__webpack_require__(669));
const path = __importStar(__webpack_require__(622));
const fs = __importStar(__webpack_require__(747));
const homoglyphs = __importStar(__webpack_require__(528));
const readdir = util.promisify(fs.readdir);
function findWrapperJars(baseDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const targetWords = ['gradle-wrapper.jar'];
        const files = yield recursivelyListFiles(baseDir);
        return files
            .filter(file => homoglyphs.search(path.basename(file), targetWords).length > 0)
            .map(wrapperJar => path.relative(baseDir, wrapperJar));
    });
}
exports.findWrapperJars = findWrapperJars;
function recursivelyListFiles(baseDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const childrenNames = yield readdir(baseDir);
        const childrenPaths = yield Promise.all(childrenNames.map((childName) => __awaiter(this, void 0, void 0, function* () {
            const childPath = path.resolve(baseDir, childName);
            return fs.lstatSync(childPath).isDirectory()
                ? recursivelyListFiles(childPath)
                : new Promise(resolve => resolve([childPath]));
        })));
        return Array.prototype.concat(...childrenPaths);
    });
}


/***/ }),

/***/ 631:
/***/ (function(module) {

module.exports = require("net");

/***/ }),

/***/ 640:
/***/ (function(module) {

"use strict";


var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ 643:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(819);
var parse = __webpack_require__(339);
var formats = __webpack_require__(755);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ 652:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(__webpack_require__(417));
const fs = __importStar(__webpack_require__(747));
function sha256File(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha256');
            const stream = fs.createReadStream(path);
            stream.on('data', data => hash.update(data));
            stream.on('end', () => {
                stream.destroy();
                resolve(hash.digest('hex'));
            });
            stream.on('error', error => {
                stream.destroy();
                reject(error);
            });
        });
    });
}
exports.sha256File = sha256File;


/***/ }),

/***/ 669:
/***/ (function(module) {

module.exports = require("util");

/***/ }),

/***/ 729:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs = __webpack_require__(643);
const url = __webpack_require__(835);
const path = __webpack_require__(622);
const zlib = __webpack_require__(761);
/**
 * creates an url from a request url and optional base url (http://server:8080)
 * @param {string} resource - a fully qualified url or relative path
 * @param {string} baseUrl - an optional baseUrl (http://server:8080)
 * @param {IRequestOptions} options - an optional options object, could include QueryParameters e.g.
 * @return {string} - resultant url
 */
function getUrl(resource, baseUrl, queryParams) {
    const pathApi = path.posix || path;
    let requestUrl = '';
    if (!baseUrl) {
        requestUrl = resource;
    }
    else if (!resource) {
        requestUrl = baseUrl;
    }
    else {
        const base = url.parse(baseUrl);
        const resultantUrl = url.parse(resource);
        // resource (specific per request) elements take priority
        resultantUrl.protocol = resultantUrl.protocol || base.protocol;
        resultantUrl.auth = resultantUrl.auth || base.auth;
        resultantUrl.host = resultantUrl.host || base.host;
        resultantUrl.pathname = pathApi.resolve(base.pathname, resultantUrl.pathname);
        if (!resultantUrl.pathname.endsWith('/') && resource.endsWith('/')) {
            resultantUrl.pathname += '/';
        }
        requestUrl = url.format(resultantUrl);
    }
    return queryParams ?
        getUrlWithParsedQueryParams(requestUrl, queryParams) :
        requestUrl;
}
exports.getUrl = getUrl;
/**
 *
 * @param {string} requestUrl
 * @param {IRequestQueryParams} queryParams
 * @return {string} - Request's URL with Query Parameters appended/parsed.
 */
function getUrlWithParsedQueryParams(requestUrl, queryParams) {
    const url = requestUrl.replace(/\?$/g, ''); // Clean any extra end-of-string "?" character
    const parsedQueryParams = qs.stringify(queryParams.params, buildParamsStringifyOptions(queryParams));
    return `${url}${parsedQueryParams}`;
}
/**
 * Build options for QueryParams Stringifying.
 *
 * @param {IRequestQueryParams} queryParams
 * @return {object}
 */
function buildParamsStringifyOptions(queryParams) {
    let options = {
        addQueryPrefix: true,
        delimiter: (queryParams.options || {}).separator || '&',
        allowDots: (queryParams.options || {}).shouldAllowDots || false,
        arrayFormat: (queryParams.options || {}).arrayFormat || 'repeat',
        encodeValuesOnly: (queryParams.options || {}).shouldOnlyEncodeValues || true
    };
    return options;
}
/**
 * Decompress/Decode gzip encoded JSON
 * Using Node.js built-in zlib module
 *
 * @param {Buffer} buffer
 * @param {string} charset? - optional; defaults to 'utf-8'
 * @return {Promise<string>}
 */
function decompressGzippedContent(buffer, charset) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            zlib.gunzip(buffer, function (error, buffer) {
                if (error) {
                    reject(error);
                }
                resolve(buffer.toString(charset || 'utf-8'));
            });
        }));
    });
}
exports.decompressGzippedContent = decompressGzippedContent;
/**
 * Obtain Response's Content Charset.
 * Through inspecting `content-type` response header.
 * It Returns 'utf-8' if NO charset specified/matched.
 *
 * @param {IHttpClientResponse} response
 * @return {string} - Content Encoding Charset; Default=utf-8
 */
function obtainContentCharset(response) {
    // Find the charset, if specified.
    // Search for the `charset=CHARSET` string, not including `;,\r\n`
    // Example: content-type: 'application/json;charset=utf-8'
    // |__ matches would be ['charset=utf-8', 'utf-8', index: 18, input: 'application/json; charset=utf-8']
    // |_____ matches[1] would have the charset :tada: , in our example it's utf-8
    // However, if the matches Array was empty or no charset found, 'utf-8' would be returned by default.
    const contentType = response.message.headers['content-type'] || '';
    const matches = contentType.match(/charset=([^;,\r\n]+)/i);
    return (matches && matches[1]) ? matches[1] : 'utf-8';
}
exports.obtainContentCharset = obtainContentCharset;


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 755:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var util = __webpack_require__(640);

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = util.assign(
    {
        'default': Format.RFC3986,
        formatters: {
            RFC1738: function (value) {
                return replace.call(value, percentTwenties, '+');
            },
            RFC3986: function (value) {
                return String(value);
            }
        }
    },
    Format
);


/***/ }),

/***/ 761:
/***/ (function(module) {

module.exports = require("zlib");

/***/ }),

/***/ 762:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpm = __importStar(__webpack_require__(874));
const httpc = new httpm.HttpClient('eskatos/gradle-wrapper-check');
function fetchValidChecksums(allowSnapshots) {
    return __awaiter(this, void 0, void 0, function* () {
        const all = yield httpGetJsonArray('https://services.gradle.org/versions/all');
        const withChecksum = all.filter(entry => entry.hasOwnProperty('wrapperChecksumUrl'));
        const allowed = withChecksum.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (entry) => allowSnapshots || !entry.snapshot);
        const checksumUrls = allowed.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (entry) => entry.wrapperChecksumUrl);
        const checksums = yield Promise.all(checksumUrls.map((url) => __awaiter(this, void 0, void 0, function* () { return httpGetText(url); })));
        return [...new Set(checksums)];
    });
}
exports.fetchValidChecksums = fetchValidChecksums;
function httpGetJsonArray(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return JSON.parse(yield httpGetText(url));
    });
}
function httpGetText(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield httpc.get(url);
        return yield response.readBody();
    });
}


/***/ }),

/***/ 819:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(640);
var formats = __webpack_require__(755);
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key') : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key');
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value'))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ 835:
/***/ (function(module) {

module.exports = require("url");

/***/ }),

/***/ 874:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = __webpack_require__(835);
const http = __webpack_require__(605);
const https = __webpack_require__(211);
const util = __webpack_require__(729);
let fs;
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
const HttpRedirectCodes = [HttpCodes.MovedPermanently, HttpCodes.ResourceMoved, HttpCodes.SeeOther, HttpCodes.TemporaryRedirect, HttpCodes.PermanentRedirect];
const HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let buffer = Buffer.alloc(0);
            const encodingCharset = util.obtainContentCharset(this);
            // Extract Encoding from header: 'content-encoding'
            // Match `gzip`, `gzip, deflate` variations of GZIP encoding
            const contentEncoding = this.message.headers['content-encoding'] || '';
            const isGzippedEncoded = new RegExp('(gzip$)|(gzip, *deflate)').test(contentEncoding);
            this.message.on('data', function (data) {
                const chunk = (typeof data === 'string') ? Buffer.from(data, encodingCharset) : data;
                buffer = Buffer.concat([buffer, chunk]);
            }).on('end', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    if (isGzippedEncoded) { // Process GZipped Response Body HERE
                        const gunzippedBody = yield util.decompressGzippedContent(buffer, encodingCharset);
                        resolve(gunzippedBody);
                    }
                    resolve(buffer.toString(encodingCharset));
                });
            }).on('error', function (err) {
                reject(err);
            });
        }));
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = url.parse(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
var EnvironmentVariables;
(function (EnvironmentVariables) {
    EnvironmentVariables["HTTP_PROXY"] = "HTTP_PROXY";
    EnvironmentVariables["HTTPS_PROXY"] = "HTTPS_PROXY";
    EnvironmentVariables["NO_PROXY"] = "NO_PROXY";
})(EnvironmentVariables || (EnvironmentVariables = {}));
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        let no_proxy = process.env[EnvironmentVariables.NO_PROXY];
        if (no_proxy) {
            this._httpProxyBypassHosts = [];
            no_proxy.split(',').forEach(bypass => {
                this._httpProxyBypassHosts.push(new RegExp(bypass, 'i'));
            });
        }
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            this._httpProxy = requestOptions.proxy;
            if (requestOptions.proxy && requestOptions.proxy.proxyBypassHosts) {
                this._httpProxyBypassHosts = [];
                requestOptions.proxy.proxyBypassHosts.forEach(bypass => {
                    this._httpProxyBypassHosts.push(new RegExp(bypass, 'i'));
                });
            }
            this._certConfig = requestOptions.cert;
            if (this._certConfig) {
                // If using cert, need fs
                fs = __webpack_require__(747);
                // cache the cert content into memory, so we don't have to read it from disk every time
                if (this._certConfig.caFile && fs.existsSync(this._certConfig.caFile)) {
                    this._ca = fs.readFileSync(this._certConfig.caFile, 'utf8');
                }
                if (this._certConfig.certFile && fs.existsSync(this._certConfig.certFile)) {
                    this._cert = fs.readFileSync(this._certConfig.certFile, 'utf8');
                }
                if (this._certConfig.keyFile && fs.existsSync(this._certConfig.keyFile)) {
                    this._key = fs.readFileSync(this._certConfig.keyFile, 'utf8');
                }
            }
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error("Client has already been disposed.");
            }
            let parsedUrl = url.parse(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            let maxTries = (this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1) ? this._maxRetries + 1 : 1;
            let numTries = 0;
            let response;
            while (numTries < maxTries) {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (let i = 0; i < this.handlers.length; i++) {
                        if (this.handlers[i].canHandleAuthentication(response)) {
                            authenticationHandler = this.handlers[i];
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1
                    && this._allowRedirects
                    && redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers["location"];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    let parsedRedirectUrl = url.parse(redirectUrl);
                    if (parsedUrl.protocol == 'https:' && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                        throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            }
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        let isDataString = typeof (data) === 'string';
        if (typeof (data) === 'string') {
            info.options.headers["Content-Length"] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', (sock) => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof (data) === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof (data) !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers && !this._isPresigned(url.format(requestUrl))) {
            this.handlers.forEach((handler) => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _isPresigned(requestUrl) {
        if (this.requestOptions && this.requestOptions.presignedUrlPatterns) {
            const patterns = this.requestOptions.presignedUrlPatterns;
            for (let i = 0; i < patterns.length; i++) {
                if (requestUrl.match(patterns[i])) {
                    return true;
                }
            }
        }
        return false;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxy = this._getProxy(parsedUrl);
        let useProxy = proxy.proxyUrl && proxy.proxyUrl.hostname && !this._isMatchInBypassProxyList(parsedUrl);
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __webpack_require__(413);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    proxyAuth: proxy.proxyAuth,
                    host: proxy.proxyUrl.hostname,
                    port: proxy.proxyUrl.port
                },
            };
            let tunnelAgent;
            const overHttps = proxy.proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, { rejectUnauthorized: false });
        }
        if (usingSsl && this._certConfig) {
            agent.options = Object.assign(agent.options || {}, { ca: this._ca, cert: this._cert, key: this._key, passphrase: this._certConfig.passphrase });
        }
        return agent;
    }
    _getProxy(parsedUrl) {
        let usingSsl = parsedUrl.protocol === 'https:';
        let proxyConfig = this._httpProxy;
        // fallback to http_proxy and https_proxy env
        let https_proxy = process.env[EnvironmentVariables.HTTPS_PROXY];
        let http_proxy = process.env[EnvironmentVariables.HTTP_PROXY];
        if (!proxyConfig) {
            if (https_proxy && usingSsl) {
                proxyConfig = {
                    proxyUrl: https_proxy
                };
            }
            else if (http_proxy) {
                proxyConfig = {
                    proxyUrl: http_proxy
                };
            }
        }
        let proxyUrl;
        let proxyAuth;
        if (proxyConfig) {
            if (proxyConfig.proxyUrl.length > 0) {
                proxyUrl = url.parse(proxyConfig.proxyUrl);
            }
            if (proxyConfig.proxyUsername || proxyConfig.proxyPassword) {
                proxyAuth = proxyConfig.proxyUsername + ":" + proxyConfig.proxyPassword;
            }
        }
        return { proxyUrl: proxyUrl, proxyAuth: proxyAuth };
    }
    _isMatchInBypassProxyList(parsedUrl) {
        if (!this._httpProxyBypassHosts) {
            return false;
        }
        let bypass = false;
        this._httpProxyBypassHosts.forEach(bypassHost => {
            if (bypassHost.test(parsedUrl.href)) {
                bypass = true;
            }
        });
        return bypass;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
}
exports.HttpClient = HttpClient;


/***/ })

/******/ });
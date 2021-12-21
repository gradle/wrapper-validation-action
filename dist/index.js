/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 382:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fetchValidChecksums = void 0;
const httpm = __importStar(__nccwpck_require__(538));
const httpc = new httpm.HttpClient('gradle/wrapper-validation-action', undefined, { allowRetries: true, maxRetries: 3 });
async function fetchValidChecksums(allowSnapshots) {
    const all = await httpGetJsonArray('https://services.gradle.org/versions/all');
    const withChecksum = all.filter(entry => typeof entry === 'object' &&
        entry != null &&
        entry.hasOwnProperty('wrapperChecksumUrl'));
    const allowed = withChecksum.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (entry) => allowSnapshots || !entry.snapshot);
    const checksumUrls = allowed.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (entry) => entry.wrapperChecksumUrl);
    const checksums = await Promise.all(checksumUrls.map(async (url) => httpGetText(url)));
    return [...new Set(checksums)];
}
exports.fetchValidChecksums = fetchValidChecksums;
async function httpGetJsonArray(url) {
    return JSON.parse(await httpGetText(url));
}
async function httpGetText(url) {
    const response = await httpc.get(url);
    return await response.readBody();
}


/***/ }),

/***/ 548:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findWrapperJars = void 0;
const util = __importStar(__nccwpck_require__(669));
const path = __importStar(__nccwpck_require__(622));
const fs = __importStar(__nccwpck_require__(747));
const unhomoglyph_1 = __importDefault(__nccwpck_require__(708));
const readdir = util.promisify(fs.readdir);
async function findWrapperJars(baseDir) {
    const files = await recursivelyListFiles(baseDir);
    return files
        .filter(file => (0, unhomoglyph_1.default)(file).endsWith('gradle-wrapper.jar'))
        .map(wrapperJar => path.relative(baseDir, wrapperJar))
        .sort((a, b) => a.localeCompare(b));
}
exports.findWrapperJars = findWrapperJars;
async function recursivelyListFiles(baseDir) {
    const childrenNames = await readdir(baseDir);
    const childrenPaths = await Promise.all(childrenNames.map(async (childName) => {
        const childPath = path.resolve(baseDir, childName);
        return fs.lstatSync(childPath).isDirectory()
            ? recursivelyListFiles(childPath)
            : new Promise(resolve => resolve([childPath]));
    }));
    return Array.prototype.concat(...childrenPaths);
}


/***/ }),

/***/ 859:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sha256File = void 0;
const crypto = __importStar(__nccwpck_require__(417));
const fs = __importStar(__nccwpck_require__(747));
async function sha256File(path) {
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
}
exports.sha256File = sha256File;


/***/ }),

/***/ 109:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.run = void 0;
const path = __importStar(__nccwpck_require__(622));
const core = __importStar(__nccwpck_require__(186));
const validate = __importStar(__nccwpck_require__(997));
async function run() {
    try {
        const result = await validate.findInvalidWrapperJars(path.resolve('.'), +core.getInput('min-wrapper-count'), core.getInput('allow-snapshots') === 'true', core.getInput('allow-checksums').split(','));
        if (result.isValid()) {
            core.info(result.toDisplayString());
        }
        else {
            core.setFailed(`Gradle Wrapper Validation Failed!\n  See https://github.com/gradle/wrapper-validation-action#reporting-failures\n${result.toDisplayString()}`);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
        else {
            core.setFailed(`Unknown object was thrown: ${error}`);
        }
    }
}
exports.run = run;
run();


/***/ }),

/***/ 997:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WrapperJar = exports.ValidationResult = exports.findInvalidWrapperJars = void 0;
const find = __importStar(__nccwpck_require__(548));
const checksums = __importStar(__nccwpck_require__(382));
const hash = __importStar(__nccwpck_require__(859));
async function findInvalidWrapperJars(gitRepoRoot, minWrapperCount, allowSnapshots, allowChecksums) {
    const wrapperJars = await find.findWrapperJars(gitRepoRoot);
    const result = new ValidationResult([], []);
    if (wrapperJars.length < minWrapperCount) {
        result.errors.push(`Expected to find at least ${minWrapperCount} Gradle Wrapper JARs but got only ${wrapperJars.length}`);
    }
    if (wrapperJars.length > 0) {
        const validChecksums = await checksums.fetchValidChecksums(allowSnapshots);
        validChecksums.push(...allowChecksums);
        for (const wrapperJar of wrapperJars) {
            const sha = await hash.sha256File(wrapperJar);
            if (!validChecksums.includes(sha)) {
                result.invalid.push(new WrapperJar(wrapperJar, sha));
            }
            else {
                result.valid.push(new WrapperJar(wrapperJar, sha));
            }
        }
    }
    return result;
}
exports.findInvalidWrapperJars = findInvalidWrapperJars;
class ValidationResult {
    constructor(valid, invalid) {
        this.errors = [];
        this.valid = valid;
        this.invalid = invalid;
    }
    isValid() {
        return this.invalid.length === 0 && this.errors.length === 0;
    }
    toDisplayString() {
        let displayString = '';
        if (this.invalid.length > 0) {
            displayString += `✗ Found unknown Gradle Wrapper JAR files:\n${ValidationResult.toDisplayList(this.invalid)}`;
        }
        if (this.errors.length > 0) {
            if (displayString.length > 0)
                displayString += '\n';
            displayString += `✗ Other validation errors:\n  ${this.errors.join(`\n  `)}`;
        }
        if (this.valid.length > 0) {
            if (displayString.length > 0)
                displayString += '\n';
            displayString += `✓ Found known Gradle Wrapper JAR files:\n${ValidationResult.toDisplayList(this.valid)}`;
        }
        return displayString;
    }
    static toDisplayList(wrapperJars) {
        return `  ${wrapperJars.map(wj => wj.toDisplayString()).join(`\n  `)}`;
    }
}
exports.ValidationResult = ValidationResult;
class WrapperJar {
    constructor(path, checksum) {
        this.path = path;
        this.checksum = checksum;
    }
    toDisplayString() {
        return `${this.checksum} ${this.path}`;
    }
}
exports.WrapperJar = WrapperJar;


/***/ }),

/***/ 351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(87));
const utils_1 = __nccwpck_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
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
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(278);
const os = __importStar(__nccwpck_require__(87));
const path = __importStar(__nccwpck_require__(622));
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
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
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
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
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
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
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
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
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
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
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
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(747));
const os = __importStar(__nccwpck_require__(87));
const utils_1 = __nccwpck_require__(278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 803:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var GetIntrinsic = __nccwpck_require__(159);

var callBind = __nccwpck_require__(977);

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ 977:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var bind = __nccwpck_require__(200);
var GetIntrinsic = __nccwpck_require__(159);

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ 320:
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ 200:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var implementation = __nccwpck_require__(320);

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ 159:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __nccwpck_require__(587)();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __nccwpck_require__(200);
var hasOwn = __nccwpck_require__(339);
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ 587:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __nccwpck_require__(81);

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ 81:
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ 339:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var bind = __nccwpck_require__(200);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ 504:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
// ie, `has-tostringtag/shams
var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol')
    ? Symbol.toStringTag
    : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;

var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
    [].__proto__ === Array.prototype // eslint-disable-line no-proto
        ? function (O) {
            return O.__proto__; // eslint-disable-line no-proto
        }
        : null
);

function addNumericSeparator(num, str) {
    if (
        num === Infinity
        || num === -Infinity
        || num !== num
        || (num && num > -1000 && num < 1000)
        || $test.call(/e/, str)
    ) {
        return str;
    }
    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof num === 'number') {
        var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
        if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, '$&_') + '.' + $replace.call($replace.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
        }
    }
    return $replace.call(str, sepRegex, '$&_');
}

var inspectCustom = __nccwpck_require__(265).custom;
var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;

module.exports = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
    }

    if (
        has(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (has(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    }
    var numericSeparator = opts.numericSeparator;

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
    }
    if (typeof obj === 'bigint') {
        var bigIntStr = String(obj) + 'n';
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + $join.call(xs, ', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if ('cause' in obj && !isEnumerable.call(obj, 'cause')) {
            return '{ [' + String(obj) + '] ' + $join.call($concat.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
        }
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
        if (ys.length === 0) { return tag + '{}'; }
        if (indent) {
            return tag + '{' + indentedJoin(ys, indent) + '}';
        }
        return tag + '{ ' + $join.call(ys, ', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return $replace.call(String(s), /"/g, '&quot;');
}

function isArray(obj) { return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isDate(obj) { return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isRegExp(obj) { return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isError(obj) { return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isString(obj) { return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isNumber(obj) { return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj) {
    if (hasShammedSymbols) {
        return obj && typeof obj === 'object' && obj instanceof Symbol;
    }
    if (typeof obj === 'symbol') {
        return true;
    }
    if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
    }
    try {
        symToString.call(obj);
        return true;
    } catch (e) {}
    return false;
}

function isBigInt(obj) {
    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
    }
    try {
        bigIntValueOf.call(obj);
        return true;
    } catch (e) {}
    return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakRefDeref.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = $replace.call($replace.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), ' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
            symMap['$' + syms[k]] = syms[k];
        }
    }

    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    if (typeof gOPS === 'function') {
        for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
            }
        }
    }
    return xs;
}


/***/ }),

/***/ 265:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(669).inspect;


/***/ }),

/***/ 334:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var GetIntrinsic = __nccwpck_require__(159);
var callBound = __nccwpck_require__(803);
var inspect = __nccwpck_require__(504);

var $TypeError = GetIntrinsic('%TypeError%');
var $WeakMap = GetIntrinsic('%WeakMap%', true);
var $Map = GetIntrinsic('%Map%', true);

var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);

/*
 * This function traverses the list returning the node corresponding to the
 * given key.
 *
 * That node is also moved to the head of the list, so that if it's accessed
 * again we don't need to traverse the whole list. By doing so, all the recently
 * used nodes can be accessed relatively quickly.
 */
var listGetNode = function (list, key) { // eslint-disable-line consistent-return
	for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
		if (curr.key === key) {
			prev.next = curr.next;
			curr.next = list.next;
			list.next = curr; // eslint-disable-line no-param-reassign
			return curr;
		}
	}
};

var listGet = function (objects, key) {
	var node = listGetNode(objects, key);
	return node && node.value;
};
var listSet = function (objects, key, value) {
	var node = listGetNode(objects, key);
	if (node) {
		node.value = value;
	} else {
		// Prepend the new node to the beginning of the list
		objects.next = { // eslint-disable-line no-param-reassign
			key: key,
			next: objects.next,
			value: value
		};
	}
};
var listHas = function (objects, key) {
	return !!listGetNode(objects, key);
};

module.exports = function getSideChannel() {
	var $wm;
	var $m;
	var $o;
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError('Side channel does not contain ' + inspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					/*
					 * Initialize the linked list as an empty node, so that we don't have
					 * to special-case handling of the first node: we can always refer to
					 * it as (previous node).next, instead of something like (list).head
					 */
					$o = { key: {}, next: null };
				}
				listSet($o, key, value);
			}
		}
	};
	return channel;
};


/***/ }),

/***/ 294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(219);


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(631);
var tls = __nccwpck_require__(16);
var http = __nccwpck_require__(605);
var https = __nccwpck_require__(211);
var events = __nccwpck_require__(614);
var assert = __nccwpck_require__(357);
var util = __nccwpck_require__(669);


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
  agent.defaultPort = 443;
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
  agent.defaultPort = 443;
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
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
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

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
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

/***/ 538:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const url = __nccwpck_require__(835);
const http = __nccwpck_require__(605);
const https = __nccwpck_require__(211);
const util = __nccwpck_require__(470);
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
const NetworkRetryErrors = ['ECONNRESET', 'ENOTFOUND', 'ESOCKETTIMEDOUT', 'ETIMEDOUT', 'ECONNREFUSED'];
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
                    else {
                        resolve(buffer.toString(encodingCharset));
                    }
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
                this._httpProxyBypassHosts.push(util.buildProxyBypassRegexFromEnv(bypass));
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
                fs = __nccwpck_require__(747);
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
                try {
                    response = yield this.requestRaw(info, data);
                }
                catch (err) {
                    numTries++;
                    if (err && err.code && NetworkRetryErrors.indexOf(err.code) > -1 && numTries < maxTries) {
                        yield this._performExponentialBackoff(numTries);
                        continue;
                    }
                    throw err;
                }
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
                socket.destroy();
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
        info.options.timeout = (this.requestOptions && this.requestOptions.socketTimeout) || this._socketTimeout;
        this._socketTimeout = info.options.timeout;
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
                tunnel = __nccwpck_require__(294);
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


/***/ }),

/***/ 470:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const qs = __nccwpck_require__(615);
const url = __nccwpck_require__(835);
const path = __nccwpck_require__(622);
const zlib = __nccwpck_require__(761);
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
 * Builds a RegExp to test urls against for deciding
 * wether to bypass proxy from an entry of the
 * environment variable setting NO_PROXY
 *
 * @param {string} bypass
 * @return {RegExp}
 */
function buildProxyBypassRegexFromEnv(bypass) {
    try {
        // We need to keep this around for back-compat purposes
        return new RegExp(bypass, 'i');
    }
    catch (err) {
        if (err instanceof SyntaxError && (bypass || "").startsWith("*")) {
            let wildcardEscaped = bypass.replace('*', '(.*)');
            return new RegExp(wildcardEscaped, 'i');
        }
        throw err;
    }
}
exports.buildProxyBypassRegexFromEnv = buildProxyBypassRegexFromEnv;
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
    const nodeSupportedEncodings = ['ascii', 'utf8', 'utf16le', 'ucs2', 'base64', 'binary', 'hex'];
    const contentType = response.message.headers['content-type'] || '';
    const matches = contentType.match(/charset=([^;,\r\n]+)/i);
    return (matches && matches[1] && nodeSupportedEncodings.indexOf(matches[1]) != -1) ? matches[1] : 'utf-8';
}
exports.obtainContentCharset = obtainContentCharset;


/***/ }),

/***/ 864:
/***/ ((module) => {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};


/***/ }),

/***/ 615:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var stringify = __nccwpck_require__(599);
var parse = __nccwpck_require__(748);
var formats = __nccwpck_require__(864);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ 748:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(154);

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    allowSparse: false,
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

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
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
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
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

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

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

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
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

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
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
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    if (options.allowSparse === true) {
        return obj;
    }

    return utils.compact(obj);
};


/***/ }),

/***/ 599:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var getSideChannel = __nccwpck_require__(334);
var utils = __nccwpck_require__(154);
var formats = __nccwpck_require__(864);
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
    format,
    formatter,
    encodeValuesOnly,
    charset,
    sideChannel
) {
    var obj = object;

    if (sideChannel.has(object)) {
        throw new RangeError('Cyclic object value');
    }

    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utils.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : undefined }];
    } else if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        var value = typeof key === 'object' && key.value !== undefined ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');

        sideChannel.set(object, true);
        var valueSideChannel = getSideChannel();
        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
        ));
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
        format: format,
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

    var sideChannel = getSideChannel();
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
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
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

/***/ 154:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var formats = __nccwpck_require__(864);

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

var encode = function encode(str, defaultEncoder, charset, kind, format) {
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
            || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
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

var maybeMap = function maybeMap(val, fn) {
    if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
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
    maybeMap: maybeMap,
    merge: merge
};


/***/ }),

/***/ 708:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";



var data = __nccwpck_require__(547);

function escapeRegexp(str) {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}

var REPLACE_RE = RegExp(Object.keys(data).map(escapeRegexp).join('|'), 'g');

function replace_fn(match) {
  return data[match];
}

function unhomoglyph(str) {
  return str.replace(REPLACE_RE, replace_fn);
}

module.exports = unhomoglyph;


/***/ }),

/***/ 547:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"0":"O","1":"l","֭":"֖","֮":"֘","֨":"֙","֤":"֚","᪴":"ۛ","⃛":"ۛ","ؙ":"̓","ࣳ":"̓","̓":"̓","̕":"̓","ُ":"̓","ٝ":"̔","֜":"́","֝":"́","ؘ":"́","݇":"́","́":"́","॔":"́","َ":"́","̀":"̀","॓":"̀","̌":"̆","꙼":"̆","٘":"̆","ٚ":"̆","ͮ":"̆","ۨ":"̆̇","̐":"̆̇","ँ":"̆̇","ঁ":"̆̇","ઁ":"̆̇","ଁ":"̆̇","ఀ":"̆̇","ಁ":"̆̇","ഁ":"̆̇","𑒿":"̆̇","᳐":"̂","̑":"̂","ٛ":"̂","߮":"̂","꛰":"̂","֯":"̊","۟":"̊","៓":"̊","゚":"̊","ْ":"̊","ஂ":"̊","ံ":"̊","ំ":"̊","𑌀":"̊","ํ":"̊","ໍ":"̊","ͦ":"̊","ⷪ":"̊","࣫":"̈","߳":"̈","ً":"̋","ࣰ":"̋","͂":"̃","ٓ":"̃","ׄ":"̇","۬":"̇","݀":"̇","࣪":"̇","݁":"̇","͘":"̇","ֹ":"̇","ֺ":"̇","ׂ":"̇","ׁ":"̇","߭":"̇","ं":"̇","ਂ":"̇","ં":"̇","்":"̇","̷":"̸","᪷":"̨","̢":"̨","ͅ":"̨","᳒":"̄","̅":"̄","ٙ":"̄","߫":"̄","꛱":"̄","᳚":"̎","ٗ":"̒","͗":"͐","ࣿ":"͐","ࣸ":"͐","ऀ":"͒","᳭":"̖","᳜":"̩","ٖ":"̩","᳕":"̫","͇":"̳","ࣹ":"͔","ࣺ":"͕","゛":"ﾞ","゜":"ﾟ","̶":"̵","〬":"̉","ׅ":"̣","࣭":"̣","᳝":"̣","ִ":"̣","ٜ":"̣","़":"̣","়":"̣","਼":"̣","઼":"̣","଼":"̣","𑇊":"̣","𑓃":"̣","𐨺":"̣","࣮":"̤","᳞":"̤","༷":"̥","〭":"̥","̧":"̦","̡":"̦","̹":"̦","᳙":"̭","᳘":"̮","॒":"̱","̠":"̱","ࣱ":"ٌ","ࣨ":"ٌ","ࣥ":"ٌ","ﱞ":"ﹲّ","ࣲ":"ٍ","ﱟ":"ﹴّ","ﳲ":"ﹷّ","ﱠ":"ﹶّ","ﳳ":"ﹹّ","ﱡ":"ﹸّ","ؚ":"ِ","̗":"ِ","ﳴ":"ﹻّ","ﱢ":"ﹺّ","ﱣ":"ﹼٰ","ٟ":"ٕ","̍":"ٰ","݂":"ܼ","ਃ":"ঃ","ః":"ঃ","ಃ":"ঃ","ഃ":"ঃ","ඃ":"ঃ","း":"ঃ","𑓁":"ঃ","់":"่","່":"่","້":"้","໊":"๊","໋":"๋","꙯":"⃩","\\u2028":" ","\\u2029":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" ","ߺ":"_","﹍":"_","﹎":"_","﹏":"_","‐":"-","‑":"-","‒":"-","–":"-","﹘":"-","۔":"-","⁃":"-","˗":"-","−":"-","➖":"-","Ⲻ":"-","⨩":"-̓","⸚":"-̈","﬩":"-̇","∸":"-̇","⨪":"-̣","꓾":"-.","～":"〜","؍":",","٫":",","‚":",","¸":",","ꓹ":",","⸲":"،","٬":"،",";":";","⸵":"؛","ः":":","ઃ":":","：":":","։":":","܃":":","܄":":","᛬":":","︰":":","᠃":":","᠉":":","⁚":":","׃":":","˸":":","꞉":":","∶":":","ː":":","ꓽ":":","⩴":"::=","⧴":":→","！":"!","ǃ":"!","ⵑ":"!","‼":"!!","⁉":"!?","ʔ":"?","Ɂ":"?","ॽ":"?","Ꭾ":"?","ꛫ":"?","⁈":"?!","⁇":"??","⸮":"؟","𝅭":".","․":".","܁":".","܂":".","꘎":".","𐩐":".","٠":".","۰":".","ꓸ":".","ꓻ":".,","‥":"..","ꓺ":"..","…":"...","꛴":"꛳꛳","・":"·","･":"·","᛫":"·","·":"·","⸱":"·","𐄁":"·","•":"·","‧":"·","∙":"·","⋅":"·","ꞏ":"·","ᐧ":"·","⋯":"···","ⵈ":"···","ᑄ":"·<","⋗":"·>","ᐷ":"·>","ᑀ":"·>","ᔯ":"·4","ᑾ":"·b","ᒀ":"·ḃ","ᑺ":"·d","ᒘ":"·J","ᒶ":"·L","ᑶ":"·P","ᑗ":"·U","ᐺ":"·V","ᐼ":"·Ʌ","ᒮ":"·Γ","ᐎ":"·Δ","ᑙ":"·Ո","ᐌ":"·ᐁ","ᐐ":"·ᐄ","ᐒ":"·ᐅ","ᐔ":"·ᐆ","ᐗ":"·ᐊ","ᐙ":"·ᐋ","ᐾ":"·ᐲ","ᑂ":"·ᐴ","ᑆ":"·ᐹ","ᑛ":"·ᑏ","ᑔ":"·ᑐ","ᑝ":"·ᑐ","ᑟ":"·ᑑ","ᑡ":"·ᑕ","ᑣ":"·ᑖ","ᑴ":"·ᑫ","ᑸ":"·ᑮ","ᑼ":"·ᑰ","ᒒ":"·ᒉ","ᒔ":"·ᒋ","ᒖ":"·ᒌ","ᒚ":"·ᒎ","ᒜ":"·ᒐ","ᒞ":"·ᒑ","ᒬ":"·ᒣ","ᒰ":"·ᒦ","ᒲ":"·ᒧ","ᒴ":"·ᒨ","ᒸ":"·ᒫ","ᓉ":"·ᓀ","ᣆ":"·ᓂ","ᣈ":"·ᓃ","ᣊ":"·ᓄ","ᣌ":"·ᓅ","ᓋ":"·ᓇ","ᓍ":"·ᓈ","ᓜ":"·ᓓ","ᓞ":"·ᓕ","ᓠ":"·ᓖ","ᓢ":"·ᓗ","ᓤ":"·ᓘ","ᓦ":"·ᓚ","ᓨ":"·ᓛ","ᓶ":"·ᓭ","ᓸ":"·ᓯ","ᓺ":"·ᓰ","ᓼ":"·ᓱ","ᓾ":"·ᓲ","ᔀ":"·ᓴ","ᔂ":"·ᓵ","ᔗ":"·ᔐ","ᔙ":"·ᔑ","ᔛ":"·ᔒ","ᔝ":"·ᔓ","ᔟ":"·ᔔ","ᔡ":"·ᔕ","ᔣ":"·ᔖ","ᔱ":"·ᔨ","ᔳ":"·ᔩ","ᔵ":"·ᔪ","ᔷ":"·ᔫ","ᔹ":"·ᔭ","ᔻ":"·ᔮ","ᣎ":"·ᕃ","ᣏ":"·ᕆ","ᣐ":"·ᕇ","ᣑ":"·ᕈ","ᣒ":"·ᕉ","ᣓ":"·ᕋ","ᕎ":"·ᕌ","ᕛ":"·ᕚ","ᕨ":"·ᕧ","ᢳ":"·ᢱ","ᢶ":"·ᢴ","ᢹ":"·ᢸ","ᣂ":"·ᣀ","꠰":"।","॥":"।।","᰼":"᰻᰻","။":"၊၊","᪩":"᪨᪨","᪫":"᪪᪨","᭟":"᭞᭞","𐩗":"𐩖𐩖","𑑌":"𑑋𑑋","𑙂":"𑙁𑙁","𑱂":"𑱁𑱁","᱿":"᱾᱾","՝":"\'","＇":"\'","‘":"\'","’":"\'","‛":"\'","′":"\'","‵":"\'","՚":"\'","׳":"\'","`":"\'","`":"\'","｀":"\'","´":"\'","΄":"\'","´":"\'","᾽":"\'","᾿":"\'","῾":"\'","ʹ":"\'","ʹ":"\'","ˈ":"\'","ˊ":"\'","ˋ":"\'","˴":"\'","ʻ":"\'","ʽ":"\'","ʼ":"\'","ʾ":"\'","ꞌ":"\'","י":"\'","ߴ":"\'","ߵ":"\'","ᑊ":"\'","ᛌ":"\'","𖽑":"\'","𖽒":"\'","᳓":"\'\'","\\"":"\'\'","＂":"\'\'","“":"\'\'","”":"\'\'","‟":"\'\'","″":"\'\'","‶":"\'\'","〃":"\'\'","״":"\'\'","˝":"\'\'","ʺ":"\'\'","˶":"\'\'","ˮ":"\'\'","ײ":"\'\'","‴":"\'\'\'","‷":"\'\'\'","⁗":"\'\'\'\'","Ɓ":"\'B","Ɗ":"\'D","ŉ":"\'n","Ƥ":"\'P","Ƭ":"\'T","Ƴ":"\'Y","［":"(","❨":"(","❲":"(","〔":"(","﴾":"(","⸨":"((","㈠":"(ー)","⑵":"(2)","⒇":"(2O)","⑶":"(3)","⑷":"(4)","⑸":"(5)","⑹":"(6)","⑺":"(7)","⑻":"(8)","⑼":"(9)","⒜":"(a)","🄐":"(A)","⒝":"(b)","🄑":"(B)","⒞":"(c)","🄒":"(C)","⒟":"(d)","🄓":"(D)","⒠":"(e)","🄔":"(E)","⒡":"(f)","🄕":"(F)","⒢":"(g)","🄖":"(G)","⒣":"(h)","🄗":"(H)","⒤":"(i)","⒥":"(j)","🄙":"(J)","⒦":"(k)","🄚":"(K)","⑴":"(l)","🄘":"(l)","⒧":"(l)","🄛":"(L)","⑿":"(l2)","⒀":"(l3)","⒁":"(l4)","⒂":"(l5)","⒃":"(l6)","⒄":"(l7)","⒅":"(l8)","⒆":"(l9)","⑾":"(ll)","⑽":"(lO)","🄜":"(M)","⒩":"(n)","🄝":"(N)","⒪":"(o)","🄞":"(O)","⒫":"(p)","🄟":"(P)","⒬":"(q)","🄠":"(Q)","⒭":"(r)","🄡":"(R)","⒨":"(rn)","⒮":"(s)","🄢":"(S)","🄪":"(S)","⒯":"(t)","🄣":"(T)","⒰":"(u)","🄤":"(U)","⒱":"(v)","🄥":"(V)","⒲":"(w)","🄦":"(W)","⒳":"(x)","🄧":"(X)","⒴":"(y)","🄨":"(Y)","⒵":"(z)","🄩":"(Z)","㈀":"(ᄀ)","㈎":"(가)","㈁":"(ᄂ)","㈏":"(나)","㈂":"(ᄃ)","㈐":"(다)","㈃":"(ᄅ)","㈑":"(라)","㈄":"(ᄆ)","㈒":"(마)","㈅":"(ᄇ)","㈓":"(바)","㈆":"(ᄉ)","㈔":"(사)","㈇":"(ᄋ)","㈕":"(아)","㈝":"(오전)","㈞":"(오후)","㈈":"(ᄌ)","㈖":"(자)","㈜":"(주)","㈉":"(ᄎ)","㈗":"(차)","㈊":"(ᄏ)","㈘":"(카)","㈋":"(ᄐ)","㈙":"(타)","㈌":"(ᄑ)","㈚":"(파)","㈍":"(ᄒ)","㈛":"(하)","㈦":"(七)","㈢":"(三)","🉁":"(三)","㈨":"(九)","㈡":"(二)","🉂":"(二)","㈤":"(五)","㈹":"(代)","㈽":"(企)","㉁":"(休)","㈧":"(八)","㈥":"(六)","㈸":"(労)","🉇":"(勝)","㈩":"(十)","㈿":"(協)","㈴":"(名)","㈺":"(呼)","㈣":"(四)","㈯":"(土)","㈻":"(学)","🉃":"(安)","🉅":"(打)","🉈":"(敗)","㈰":"(日)","㈪":"(月)","㈲":"(有)","㈭":"(木)","🉀":"(本)","㈱":"(株)","㈬":"(水)","㈫":"(火)","🉄":"(点)","㈵":"(特)","🉆":"(盗)","㈼":"(監)","㈳":"(社)","㈷":"(祝)","㉀":"(祭)","㉂":"(自)","㉃":"(至)","㈶":"(財)","㈾":"(資)","㈮":"(金)","］":")","❩":")","❳":")","〕":")","﴿":")","⸩":"))","❴":"{","𝄔":"{","❵":"}","〚":"⟦","〛":"⟧","⟨":"❬","〈":"❬","〈":"❬","㇛":"❬","く":"❬","𡿨":"❬","⟩":"❭","〉":"❭","〉":"❭","＾":"︿","⸿":"¶","⁎":"*","٭":"*","∗":"*","𐌟":"*","᜵":"/","⁁":"/","∕":"/","⁄":"/","╱":"/","⟋":"/","⧸":"/","𝈺":"/","㇓":"/","〳":"/","Ⳇ":"/","ノ":"/","丿":"/","⼃":"/","⧶":"/̄","⫽":"//","⫻":"///","＼":"\\\\","﹨":"\\\\","∖":"\\\\","⟍":"\\\\","⧵":"\\\\","⧹":"\\\\","𝈏":"\\\\","𝈻":"\\\\","㇔":"\\\\","丶":"\\\\","⼂":"\\\\","⳹":"\\\\\\\\","⑊":"\\\\\\\\","⟈":"\\\\ᑕ","ꝸ":"&","૰":"॰","𑂻":"॰","𑇇":"॰","⚬":"॰","𑇛":"꣼","៙":"๏","៕":"๚","៚":"๛","༌":"་","༎":"།།","˄":"^","ˆ":"^","꙾":"ˇ","˘":"ˇ","‾":"ˉ","﹉":"ˉ","﹊":"ˉ","﹋":"ˉ","﹌":"ˉ","¯":"ˉ","￣":"ˉ","▔":"ˉ","ъ":"ˉb","ꙑ":"ˉbi","͵":"ˏ","˻":"˪","꜖":"˪","꜔":"˫","。":"˳","⸰":"°","˚":"°","∘":"°","○":"°","◦":"°","⍜":"°̲","⍤":"°̈","℃":"°C","℉":"°F","௵":"௳","༛":"༚༚","༟":"༚༝","࿎":"༝༚","༞":"༝༝","Ⓒ":"©","Ⓡ":"®","Ⓟ":"℗","𝈛":"⅄","⯬":"↞","⯭":"↟","⯮":"↠","⯯":"↡","↵":"↲","⥥":"⇃⇂","⥯":"⇃ᛚ","𝛛":"∂","𝜕":"∂","𝝏":"∂","𝞉":"∂","𝟃":"∂","𞣌":"∂","𞣍":"∂̵","ð":"∂̵","⌀":"∅","𝛁":"∇","𝛻":"∇","𝜵":"∇","𝝯":"∇","𝞩":"∇","𑢨":"∇","⍢":"∇̈","⍫":"∇̴","█":"∎","■":"∎","⨿":"∐","᛭":"+","➕":"+","𐊛":"+","⨣":"+̂","⨢":"+̊","⨤":"+̃","∔":"+̇","⨥":"+̣","⨦":"+̰","⨧":"+₂","➗":"÷","‹":"<","❮":"<","˂":"<","𝈶":"<","ᐸ":"<","ᚲ":"<","⋖":"<·","Ⲵ":"<·","ᑅ":"<·","≪":"<<","⋘":"<<<","᐀":"=","⹀":"=","゠":"=","꓿":"=","≚":"=̆","≙":"=̂","≗":"=̊","≐":"=̇","≑":"=̣̇","⩮":"=⃰","⩵":"==","⩶":"===","≞":"=ͫ","›":">","❯":">","˃":">","𝈷":">","ᐳ":">","𖼿":">","ᑁ":">·","⪥":"><","≫":">>","⨠":">>","⋙":">>>","⁓":"~","˜":"~","῀":"~","∼":"~","⍨":"~̈","⸞":"~̇","⩪":"~̇","⸟":"~̣","𞣈":"∠","⋀":"∧","∯":"∮∮","∰":"∮∮∮","⸫":"∴","⸪":"∵","⸬":"∷","𑇞":"≈","♎":"≏","🝞":"≏","≣":"≡","⨃":"⊍","⨄":"⊎","𝈸":"⊏","𝈹":"⊐","⨅":"⊓","⨆":"⊔","⨂":"⊗","⍟":"⊛","🝱":"⊠","🝕":"⊡","◁":"⊲","▷":"⊳","⍣":"⋆̈","︴":"⌇","◠":"⌒","⨽":"⌙","⌥":"⌤","⧇":"⌻","◎":"⌾","⦾":"⌾","⧅":"⍂","⦰":"⍉","⏃":"⍋","⏂":"⍎","⏁":"⍕","⏆":"⍭","☸":"⎈","︵":"⏜","︶":"⏝","︷":"⏞","︸":"⏟","︹":"⏠","︺":"⏡","▱":"⏥","⏼":"⏻","︱":"│","｜":"│","┃":"│","┏":"┌","┣":"├","▐":"▌","▗":"▖","▝":"▘","☐":"□","￭":"▪","▸":"▶","►":"▶","⳩":"☧","🜊":"☩","🌒":"☽","🌙":"☽","⏾":"☾","🌘":"☾","⧙":"⦚","🜺":"⧟","⨾":"⨟","𐆠":"⳨","♩":"𝅘𝅥","♪":"𝅘𝅥𝅮","⓪":"🄍","↺":"🄎","˙":"ॱ","ൎ":"ॱ","－":"ー","—":"ー","―":"ー","─":"ー","━":"ー","㇐":"ー","ꟷ":"ー","ᅳ":"ー","ㅡ":"ー","一":"ー","⼀":"ー","ᆖ":"ーー","ힹ":"ーᅡ","ힺ":"ーᅥ","ힻ":"ーᅥ丨","ힼ":"ーᅩ","ᆕ":"ーᅮ","ᅴ":"ー丨","ㅢ":"ー丨","ᆗ":"ー丨ᅮ","🄏":"$⃠","₤":"£","〒":"₸","〶":"₸","᭜":"᭐","꧆":"꧐","𑓑":"১","೧":"౧","ၥ":"၁","①":"➀","⑩":"➉","⏨":"₁₀","𝟐":"2","𝟚":"2","𝟤":"2","𝟮":"2","𝟸":"2","🯲":"2","Ꝛ":"2","Ƨ":"2","Ϩ":"2","Ꙅ":"2","ᒿ":"2","ꛯ":"2","ꧏ":"٢","۲":"٢","૨":"२","𑓒":"২","೨":"౨","②":"➁","ƻ":"2̵","🄃":"2,","⒉":"2.","㏵":"22日","㍮":"22点","㏶":"23日","㍯":"23点","㏷":"24日","㍰":"24点","㏸":"25日","㏹":"26日","㏺":"27日","㏻":"28日","㏼":"29日","㏴":"2l日","㍭":"2l点","⒛":"2O.","㏳":"2O日","㍬":"2O点","෩":"෨ා","෯":"෨ී","㏡":"2日","㋁":"2月","㍚":"2点","𝈆":"3","𝟑":"3","𝟛":"3","𝟥":"3","𝟯":"3","𝟹":"3","🯳":"3","Ɜ":"3","Ȝ":"3","Ʒ":"3","Ꝫ":"3","Ⳍ":"3","З":"3","Ӡ":"3","𖼻":"3","𑣊":"3","۳":"٣","𞣉":"٣","૩":"३","③":"➂","Ҙ":"3̦","🄄":"3,","⒊":"3.","㏾":"3l日","㏽":"3O日","㏢":"3日","㋂":"3月","㍛":"3点","𝟒":"4","𝟜":"4","𝟦":"4","𝟰":"4","𝟺":"4","🯴":"4","Ꮞ":"4","𑢯":"4","۴":"٤","૪":"४","④":"➃","🄅":"4,","⒋":"4.","ᔰ":"4·","㏣":"4日","㋃":"4月","㍜":"4点","𝟓":"5","𝟝":"5","𝟧":"5","𝟱":"5","𝟻":"5","🯵":"5","Ƽ":"5","𑢻":"5","⑤":"➄","🄆":"5,","⒌":"5.","㏤":"5日","㋄":"5月","㍝":"5点","𝟔":"6","𝟞":"6","𝟨":"6","𝟲":"6","𝟼":"6","🯶":"6","Ⳓ":"6","б":"6","Ꮾ":"6","𑣕":"6","۶":"٦","𑓖":"৬","⑥":"➅","🄇":"6,","⒍":"6.","㏥":"6日","㋅":"6月","㍞":"6点","𝈒":"7","𝟕":"7","𝟟":"7","𝟩":"7","𝟳":"7","𝟽":"7","🯷":"7","𐓒":"7","𑣆":"7","⑦":"➆","🄈":"7,","⒎":"7.","㏦":"7日","㋆":"7月","㍟":"7点","ଃ":"8","৪":"8","੪":"8","𞣋":"8","𝟖":"8","𝟠":"8","𝟪":"8","𝟴":"8","𝟾":"8","🯸":"8","ȣ":"8","Ȣ":"8","𐌚":"8","૮":"८","⑧":"➇","🄉":"8,","⒏":"8.","㏧":"8日","㋇":"8月","㍠":"8点","੧":"9","୨":"9","৭":"9","൭":"9","𝟗":"9","𝟡":"9","𝟫":"9","𝟵":"9","𝟿":"9","🯹":"9","Ꝯ":"9","Ⳋ":"9","𑣌":"9","𑢬":"9","𑣖":"9","१":"٩","𑣤":"٩","۹":"٩","೯":"౯","⑨":"➈","🄊":"9,","⒐":"9.","㏨":"9日","㋈":"9月","㍡":"9点","⍺":"a","ａ":"a","𝐚":"a","𝑎":"a","𝒂":"a","𝒶":"a","𝓪":"a","𝔞":"a","𝕒":"a","𝖆":"a","𝖺":"a","𝗮":"a","𝘢":"a","𝙖":"a","𝚊":"a","ɑ":"a","α":"a","𝛂":"a","𝛼":"a","𝜶":"a","𝝰":"a","𝞪":"a","а":"a","ⷶ":"ͣ","Ａ":"A","𝐀":"A","𝐴":"A","𝑨":"A","𝒜":"A","𝓐":"A","𝔄":"A","𝔸":"A","𝕬":"A","𝖠":"A","𝗔":"A","𝘈":"A","𝘼":"A","𝙰":"A","Α":"A","𝚨":"A","𝛢":"A","𝜜":"A","𝝖":"A","𝞐":"A","А":"A","Ꭺ":"A","ᗅ":"A","ꓮ":"A","𖽀":"A","𐊠":"A","⍶":"a̲","ǎ":"ă","Ǎ":"Ă","ȧ":"å","Ȧ":"Å","ẚ":"ả","℀":"a/c","℁":"a/s","ꜳ":"aa","Ꜳ":"AA","æ":"ae","ӕ":"ae","Æ":"AE","Ӕ":"AE","ꜵ":"ao","Ꜵ":"AO","🜇":"AR","ꜷ":"au","Ꜷ":"AU","ꜹ":"av","ꜻ":"av","Ꜹ":"AV","Ꜻ":"AV","ꜽ":"ay","Ꜽ":"AY","ꭺ":"ᴀ","∀":"Ɐ","𝈗":"Ɐ","ᗄ":"Ɐ","ꓯ":"Ɐ","𐐟":"Ɒ","𝐛":"b","𝑏":"b","𝒃":"b","𝒷":"b","𝓫":"b","𝔟":"b","𝕓":"b","𝖇":"b","𝖻":"b","𝗯":"b","𝘣":"b","𝙗":"b","𝚋":"b","Ƅ":"b","Ь":"b","Ꮟ":"b","ᑲ":"b","ᖯ":"b","Ｂ":"B","ℬ":"B","𝐁":"B","𝐵":"B","𝑩":"B","𝓑":"B","𝔅":"B","𝔹":"B","𝕭":"B","𝖡":"B","𝗕":"B","𝘉":"B","𝘽":"B","𝙱":"B","Ꞵ":"B","Β":"B","𝚩":"B","𝛣":"B","𝜝":"B","𝝗":"B","𝞑":"B","В":"B","Ᏼ":"B","ᗷ":"B","ꓐ":"B","𐊂":"B","𐊡":"B","𐌁":"B","ɓ":"b̔","ᑳ":"ḃ","ƃ":"b̄","Ƃ":"b̄","Б":"b̄","ƀ":"b̵","ҍ":"b̵","Ҍ":"b̵","ѣ":"b̵","Ѣ":"b̵","ᑿ":"b·","ᒁ":"ḃ·","ᒈ":"b\'","Ы":"bl","в":"ʙ","ᏼ":"ʙ","ｃ":"c","ⅽ":"c","𝐜":"c","𝑐":"c","𝒄":"c","𝒸":"c","𝓬":"c","𝔠":"c","𝕔":"c","𝖈":"c","𝖼":"c","𝗰":"c","𝘤":"c","𝙘":"c","𝚌":"c","ᴄ":"c","ϲ":"c","ⲥ":"c","с":"c","ꮯ":"c","𐐽":"c","ⷭ":"ͨ","🝌":"C","𑣲":"C","𑣩":"C","Ｃ":"C","Ⅽ":"C","ℂ":"C","ℭ":"C","𝐂":"C","𝐶":"C","𝑪":"C","𝒞":"C","𝓒":"C","𝕮":"C","𝖢":"C","𝗖":"C","𝘊":"C","𝘾":"C","𝙲":"C","Ϲ":"C","Ⲥ":"C","С":"C","Ꮯ":"C","ꓚ":"C","𐊢":"C","𐌂":"C","𐐕":"C","𐔜":"C","¢":"c̸","ȼ":"c̸","₡":"C⃫","🅮":"C⃠","ç":"c̦","ҫ":"c̦","Ç":"C̦","Ҫ":"C̦","Ƈ":"C\'","℅":"c/o","℆":"c/u","🅭":"㏄\\t⃝","⋴":"ꞓ","ɛ":"ꞓ","ε":"ꞓ","ϵ":"ꞓ","𝛆":"ꞓ","𝛜":"ꞓ","𝜀":"ꞓ","𝜖":"ꞓ","𝜺":"ꞓ","𝝐":"ꞓ","𝝴":"ꞓ","𝞊":"ꞓ","𝞮":"ꞓ","𝟄":"ꞓ","ⲉ":"ꞓ","є":"ꞓ","ԑ":"ꞓ","ꮛ":"ꞓ","𑣎":"ꞓ","𐐩":"ꞓ","€":"Ꞓ","Ⲉ":"Ꞓ","Є":"Ꞓ","⍷":"ꞓ̲","ͽ":"ꜿ","Ͽ":"Ꜿ","ⅾ":"d","ⅆ":"d","𝐝":"d","𝑑":"d","𝒅":"d","𝒹":"d","𝓭":"d","𝔡":"d","𝕕":"d","𝖉":"d","𝖽":"d","𝗱":"d","𝘥":"d","𝙙":"d","𝚍":"d","ԁ":"d","Ꮷ":"d","ᑯ":"d","ꓒ":"d","Ⅾ":"D","ⅅ":"D","𝐃":"D","𝐷":"D","𝑫":"D","𝒟":"D","𝓓":"D","𝔇":"D","𝔻":"D","𝕯":"D","𝖣":"D","𝗗":"D","𝘋":"D","𝘿":"D","𝙳":"D","Ꭰ":"D","ᗞ":"D","ᗪ":"D","ꓓ":"D","ɗ":"d̔","ɖ":"d̨","ƌ":"d̄","đ":"d̵","Đ":"D̵","Ð":"D̵","Ɖ":"D̵","₫":"ḏ̵","ꝺ":"Ꝺ","ᑻ":"d·","ᒇ":"d\'","ʤ":"dȝ","ǳ":"dz","ʣ":"dz","ǲ":"Dz","Ǳ":"DZ","ǆ":"dž","ǅ":"Dž","Ǆ":"DŽ","ʥ":"dʑ","ꭰ":"ᴅ","⸹":"ẟ","δ":"ẟ","𝛅":"ẟ","𝛿":"ẟ","𝜹":"ẟ","𝝳":"ẟ","𝞭":"ẟ","ծ":"ẟ","ᕷ":"ẟ","℮":"e","ｅ":"e","ℯ":"e","ⅇ":"e","𝐞":"e","𝑒":"e","𝒆":"e","𝓮":"e","𝔢":"e","𝕖":"e","𝖊":"e","𝖾":"e","𝗲":"e","𝘦":"e","𝙚":"e","𝚎":"e","ꬲ":"e","е":"e","ҽ":"e","ⷷ":"ͤ","⋿":"E","Ｅ":"E","ℰ":"E","𝐄":"E","𝐸":"E","𝑬":"E","𝓔":"E","𝔈":"E","𝔼":"E","𝕰":"E","𝖤":"E","𝗘":"E","𝘌":"E","𝙀":"E","𝙴":"E","Ε":"E","𝚬":"E","𝛦":"E","𝜠":"E","𝝚":"E","𝞔":"E","Е":"E","ⴹ":"E","Ꭼ":"E","ꓰ":"E","𑢦":"E","𑢮":"E","𐊆":"E","ě":"ĕ","Ě":"Ĕ","ɇ":"e̸","Ɇ":"E̸","ҿ":"ę","ꭼ":"ᴇ","ə":"ǝ","ә":"ǝ","∃":"Ǝ","ⴺ":"Ǝ","ꓱ":"Ǝ","ɚ":"ǝ˞","ᴔ":"ǝo","ꭁ":"ǝo̸","ꭂ":"ǝo̵","Ә":"Ə","𝈡":"Ɛ","ℇ":"Ɛ","Ԑ":"Ɛ","Ꮛ":"Ɛ","𖼭":"Ɛ","𐐁":"Ɛ","ᶟ":"ᵋ","ᴈ":"ɜ","з":"ɜ","ҙ":"ɜ̦","𐑂":"ɞ","ꞝ":"ʚ","𐐪":"ʚ","𝐟":"f","𝑓":"f","𝒇":"f","𝒻":"f","𝓯":"f","𝔣":"f","𝕗":"f","𝖋":"f","𝖿":"f","𝗳":"f","𝘧":"f","𝙛":"f","𝚏":"f","ꬵ":"f","ꞙ":"f","ſ":"f","ẝ":"f","ք":"f","𝈓":"F","ℱ":"F","𝐅":"F","𝐹":"F","𝑭":"F","𝓕":"F","𝔉":"F","𝔽":"F","𝕱":"F","𝖥":"F","𝗙":"F","𝘍":"F","𝙁":"F","𝙵":"F","Ꞙ":"F","Ϝ":"F","𝟊":"F","ᖴ":"F","ꓝ":"F","𑣂":"F","𑢢":"F","𐊇":"F","𐊥":"F","𐔥":"F","ƒ":"f̦","Ƒ":"F̦","ᵮ":"f̴","℻":"FAX","ﬀ":"ff","ﬃ":"ffi","ﬄ":"ffl","ﬁ":"fi","ﬂ":"fl","ʩ":"fŋ","ᖵ":"Ⅎ","ꓞ":"Ⅎ","𝈰":"ꟻ","ᖷ":"ꟻ","ｇ":"g","ℊ":"g","𝐠":"g","𝑔":"g","𝒈":"g","𝓰":"g","𝔤":"g","𝕘":"g","𝖌":"g","𝗀":"g","𝗴":"g","𝘨":"g","𝙜":"g","𝚐":"g","ɡ":"g","ᶃ":"g","ƍ":"g","ց":"g","𝐆":"G","𝐺":"G","𝑮":"G","𝒢":"G","𝓖":"G","𝔊":"G","𝔾":"G","𝕲":"G","𝖦":"G","𝗚":"G","𝘎":"G","𝙂":"G","𝙶":"G","Ԍ":"G","Ꮐ":"G","Ᏻ":"G","ꓖ":"G","ᶢ":"ᵍ","ɠ":"g̔","ǧ":"ğ","Ǧ":"Ğ","ǵ":"ģ","ǥ":"g̵","Ǥ":"G̵","Ɠ":"G\'","ԍ":"ɢ","ꮐ":"ɢ","ᏻ":"ɢ","ｈ":"h","ℎ":"h","𝐡":"h","𝒉":"h","𝒽":"h","𝓱":"h","𝔥":"h","𝕙":"h","𝖍":"h","𝗁":"h","𝗵":"h","𝘩":"h","𝙝":"h","𝚑":"h","һ":"h","հ":"h","Ꮒ":"h","Ｈ":"H","ℋ":"H","ℌ":"H","ℍ":"H","𝐇":"H","𝐻":"H","𝑯":"H","𝓗":"H","𝕳":"H","𝖧":"H","𝗛":"H","𝘏":"H","𝙃":"H","𝙷":"H","Η":"H","𝚮":"H","𝛨":"H","𝜢":"H","𝝜":"H","𝞖":"H","Ⲏ":"H","Н":"H","Ꮋ":"H","ᕼ":"H","ꓧ":"H","𐋏":"H","ᵸ":"ᴴ","ɦ":"h̔","ꚕ":"h̔","Ᏺ":"h̔","Ⱨ":"H̩","Ң":"H̩","ħ":"h̵","ℏ":"h̵","ћ":"h̵","Ħ":"H̵","Ӊ":"H̦","Ӈ":"H̦","н":"ʜ","ꮋ":"ʜ","ң":"ʜ̩","ӊ":"ʜ̦","ӈ":"ʜ̦","Ԋ":"Ƕ","ꮀ":"ⱶ","Ͱ":"Ⱶ","Ꭸ":"Ⱶ","Ꮀ":"Ⱶ","ꚱ":"Ⱶ","ꞕ":"ꜧ","˛":"i","⍳":"i","ｉ":"i","ⅰ":"i","ℹ":"i","ⅈ":"i","𝐢":"i","𝑖":"i","𝒊":"i","𝒾":"i","𝓲":"i","𝔦":"i","𝕚":"i","𝖎":"i","𝗂":"i","𝗶":"i","𝘪":"i","𝙞":"i","𝚒":"i","ı":"i","𝚤":"i","ɪ":"i","ɩ":"i","ι":"i","ι":"i","ͺ":"i","𝛊":"i","𝜄":"i","𝜾":"i","𝝸":"i","𝞲":"i","і":"i","ꙇ":"i","ӏ":"i","ꭵ":"i","Ꭵ":"i","𑣃":"i","ⓛ":"Ⓘ","⍸":"i̲","ǐ":"ĭ","Ǐ":"Ĭ","ɨ":"i̵","ᵻ":"i̵","ᵼ":"i̵","ⅱ":"ii","ⅲ":"iii","ĳ":"ij","ⅳ":"iv","ⅸ":"ix","ｊ":"j","ⅉ":"j","𝐣":"j","𝑗":"j","𝒋":"j","𝒿":"j","𝓳":"j","𝔧":"j","𝕛":"j","𝖏":"j","𝗃":"j","𝗷":"j","𝘫":"j","𝙟":"j","𝚓":"j","ϳ":"j","ј":"j","Ｊ":"J","𝐉":"J","𝐽":"J","𝑱":"J","𝒥":"J","𝓙":"J","𝔍":"J","𝕁":"J","𝕵":"J","𝖩":"J","𝗝":"J","𝘑":"J","𝙅":"J","𝙹":"J","Ʝ":"J","Ϳ":"J","Ј":"J","Ꭻ":"J","ᒍ":"J","ꓙ":"J","ɉ":"j̵","Ɉ":"J̵","ᒙ":"J·","𝚥":"ȷ","յ":"ȷ","ꭻ":"ᴊ","𝐤":"k","𝑘":"k","𝒌":"k","𝓀":"k","𝓴":"k","𝔨":"k","𝕜":"k","𝖐":"k","𝗄":"k","𝗸":"k","𝘬":"k","𝙠":"k","𝚔":"k","K":"K","Ｋ":"K","𝐊":"K","𝐾":"K","𝑲":"K","𝒦":"K","𝓚":"K","𝔎":"K","𝕂":"K","𝕶":"K","𝖪":"K","𝗞":"K","𝘒":"K","𝙆":"K","𝙺":"K","Κ":"K","𝚱":"K","𝛫":"K","𝜥":"K","𝝟":"K","𝞙":"K","Ⲕ":"K","К":"K","Ꮶ":"K","ᛕ":"K","ꓗ":"K","𐔘":"K","ƙ":"k̔","Ⱪ":"K̩","Қ":"K̩","₭":"K̵","Ꝁ":"K̵","Ҟ":"K̵","Ƙ":"K\'","׀":"l","|":"l","∣":"l","⏽":"l","￨":"l","١":"l","۱":"l","𐌠":"l","𞣇":"l","𝟏":"l","𝟙":"l","𝟣":"l","𝟭":"l","𝟷":"l","🯱":"l","I":"l","Ｉ":"l","Ⅰ":"l","ℐ":"l","ℑ":"l","𝐈":"l","𝐼":"l","𝑰":"l","𝓘":"l","𝕀":"l","𝕴":"l","𝖨":"l","𝗜":"l","𝘐":"l","𝙄":"l","𝙸":"l","Ɩ":"l","ｌ":"l","ⅼ":"l","ℓ":"l","𝐥":"l","𝑙":"l","𝒍":"l","𝓁":"l","𝓵":"l","𝔩":"l","𝕝":"l","𝖑":"l","𝗅":"l","𝗹":"l","𝘭":"l","𝙡":"l","𝚕":"l","ǀ":"l","Ι":"l","𝚰":"l","𝛪":"l","𝜤":"l","𝝞":"l","𝞘":"l","Ⲓ":"l","І":"l","Ӏ":"l","ו":"l","ן":"l","ا":"l","𞸀":"l","𞺀":"l","ﺎ":"l","ﺍ":"l","ߊ":"l","ⵏ":"l","ᛁ":"l","ꓲ":"l","𖼨":"l","𐊊":"l","𐌉":"l","𝈪":"L","Ⅼ":"L","ℒ":"L","𝐋":"L","𝐿":"L","𝑳":"L","𝓛":"L","𝔏":"L","𝕃":"L","𝕷":"L","𝖫":"L","𝗟":"L","𝘓":"L","𝙇":"L","𝙻":"L","Ⳑ":"L","Ꮮ":"L","ᒪ":"L","ꓡ":"L","𖼖":"L","𑢣":"L","𑢲":"L","𐐛":"L","𐔦":"L","ﴼ":"l̋","ﴽ":"l̋","ł":"l̸","Ł":"L̸","ɭ":"l̨","Ɨ":"l̵","ƚ":"l̵","ɫ":"l̴","إ":"lٕ","ﺈ":"lٕ","ﺇ":"lٕ","ٳ":"lٕ","ŀ":"l·","Ŀ":"l·","ᒷ":"l·","🄂":"l,","⒈":"l.","ױ":"l\'","⒓":"l2.","㏫":"l2日","㋋":"l2月","㍤":"l2点","⒔":"l3.","㏬":"l3日","㍥":"l3点","⒕":"l4.","㏭":"l4日","㍦":"l4点","⒖":"l5.","㏮":"l5日","㍧":"l5点","⒗":"l6.","㏯":"l6日","㍨":"l6点","⒘":"l7.","㏰":"l7日","㍩":"l7点","⒙":"l8.","㏱":"l8日","㍪":"l8点","⒚":"l9.","㏲":"l9日","㍫":"l9点","ǉ":"lj","Ĳ":"lJ","ǈ":"Lj","Ǉ":"LJ","‖":"ll","∥":"ll","Ⅱ":"ll","ǁ":"ll","װ":"ll","𐆙":"l̵l̵","⒒":"ll.","Ⅲ":"lll","𐆘":"l̵l̵S̵","㏪":"ll日","㋊":"ll月","㍣":"ll点","Ю":"lO","⒑":"lO.","㏩":"lO日","㋉":"lO月","㍢":"lO点","ʪ":"ls","₶":"lt","Ⅳ":"lV","Ⅸ":"lX","ɮ":"lȝ","ʫ":"lz","أ":"lٴ","ﺄ":"lٴ","ﺃ":"lٴ","ٲ":"lٴ","ٵ":"lٴ","ﷳ":"lكبر","ﷲ":"lللّٰo","㏠":"l日","㋀":"l月","㍙":"l点","ⳑ":"ʟ","ꮮ":"ʟ","𐑃":"ʟ","Ｍ":"M","Ⅿ":"M","ℳ":"M","𝐌":"M","𝑀":"M","𝑴":"M","𝓜":"M","𝔐":"M","𝕄":"M","𝕸":"M","𝖬":"M","𝗠":"M","𝘔":"M","𝙈":"M","𝙼":"M","Μ":"M","𝚳":"M","𝛭":"M","𝜧":"M","𝝡":"M","𝞛":"M","Ϻ":"M","Ⲙ":"M","М":"M","Ꮇ":"M","ᗰ":"M","ᛖ":"M","ꓟ":"M","𐊰":"M","𐌑":"M","Ӎ":"M̦","🝫":"MB","ⷨ":"ᷟ","𝐧":"n","𝑛":"n","𝒏":"n","𝓃":"n","𝓷":"n","𝔫":"n","𝕟":"n","𝖓":"n","𝗇":"n","𝗻":"n","𝘯":"n","𝙣":"n","𝚗":"n","ո":"n","ռ":"n","Ｎ":"N","ℕ":"N","𝐍":"N","𝑁":"N","𝑵":"N","𝒩":"N","𝓝":"N","𝔑":"N","𝕹":"N","𝖭":"N","𝗡":"N","𝘕":"N","𝙉":"N","𝙽":"N","Ν":"N","𝚴":"N","𝛮":"N","𝜨":"N","𝝢":"N","𝞜":"N","Ⲛ":"N","ꓠ":"N","𐔓":"N","𐆎":"N̊","ɳ":"n̨","ƞ":"n̩","η":"n̩","𝛈":"n̩","𝜂":"n̩","𝜼":"n̩","𝝶":"n̩","𝞰":"n̩","Ɲ":"N̦","ᵰ":"n̴","ǌ":"nj","ǋ":"Nj","Ǌ":"NJ","№":"No","ͷ":"ᴎ","и":"ᴎ","𐑍":"ᴎ","ņ":"ɲ","ం":"o","ಂ":"o","ം":"o","ං":"o","०":"o","੦":"o","૦":"o","௦":"o","౦":"o","೦":"o","൦":"o","๐":"o","໐":"o","၀":"o","٥":"o","۵":"o","ｏ":"o","ℴ":"o","𝐨":"o","𝑜":"o","𝒐":"o","𝓸":"o","𝔬":"o","𝕠":"o","𝖔":"o","𝗈":"o","𝗼":"o","𝘰":"o","𝙤":"o","𝚘":"o","ᴏ":"o","ᴑ":"o","ꬽ":"o","ο":"o","𝛐":"o","𝜊":"o","𝝄":"o","𝝾":"o","𝞸":"o","σ":"o","𝛔":"o","𝜎":"o","𝝈":"o","𝞂":"o","𝞼":"o","ⲟ":"o","о":"o","ჿ":"o","օ":"o","ס":"o","ه":"o","𞸤":"o","𞹤":"o","𞺄":"o","ﻫ":"o","ﻬ":"o","ﻪ":"o","ﻩ":"o","ھ":"o","ﮬ":"o","ﮭ":"o","ﮫ":"o","ﮪ":"o","ہ":"o","ﮨ":"o","ﮩ":"o","ﮧ":"o","ﮦ":"o","ە":"o","ഠ":"o","ဝ":"o","𐓪":"o","𑣈":"o","𑣗":"o","𐐬":"o","߀":"O","০":"O","୦":"O","〇":"O","𑓐":"O","𑣠":"O","𝟎":"O","𝟘":"O","𝟢":"O","𝟬":"O","𝟶":"O","🯰":"O","Ｏ":"O","𝐎":"O","𝑂":"O","𝑶":"O","𝒪":"O","𝓞":"O","𝔒":"O","𝕆":"O","𝕺":"O","𝖮":"O","𝗢":"O","𝘖":"O","𝙊":"O","𝙾":"O","Ο":"O","𝚶":"O","𝛰":"O","𝜪":"O","𝝤":"O","𝞞":"O","Ⲟ":"O","О":"O","Օ":"O","ⵔ":"O","ዐ":"O","ଠ":"O","𐓂":"O","ꓳ":"O","𑢵":"O","𐊒":"O","𐊫":"O","𐐄":"O","𐔖":"O","⁰":"º","ᵒ":"º","ǒ":"ŏ","Ǒ":"Ŏ","ۿ":"ô","Ő":"Ö","ø":"o̸","ꬾ":"o̸","Ø":"O̸","ⵁ":"O̸","Ǿ":"Ó̸","ɵ":"o̵","ꝋ":"o̵","ө":"o̵","ѳ":"o̵","ꮎ":"o̵","ꮻ":"o̵","⊖":"O̵","⊝":"O̵","⍬":"O̵","𝈚":"O̵","🜔":"O̵","Ɵ":"O̵","Ꝋ":"O̵","θ":"O̵","ϑ":"O̵","𝛉":"O̵","𝛝":"O̵","𝜃":"O̵","𝜗":"O̵","𝜽":"O̵","𝝑":"O̵","𝝷":"O̵","𝞋":"O̵","𝞱":"O̵","𝟅":"O̵","Θ":"O̵","ϴ":"O̵","𝚯":"O̵","𝚹":"O̵","𝛩":"O̵","𝛳":"O̵","𝜣":"O̵","𝜭":"O̵","𝝝":"O̵","𝝧":"O̵","𝞗":"O̵","𝞡":"O̵","Ө":"O̵","Ѳ":"O̵","ⴱ":"O̵","Ꮎ":"O̵","Ꮻ":"O̵","ꭴ":"ơ","ﳙ":"oٰ","🄁":"O,","🄀":"O.","ơ":"o\'","Ơ":"O\'","Ꭴ":"O\'","%":"º/₀","٪":"º/₀","⁒":"º/₀","‰":"º/₀₀","؉":"º/₀₀","‱":"º/₀₀₀","؊":"º/₀₀₀","œ":"oe","Œ":"OE","ɶ":"oᴇ","∞":"oo","ꝏ":"oo","ꚙ":"oo","Ꝏ":"OO","Ꚙ":"OO","ﳗ":"oج","ﱑ":"oج","ﳘ":"oم","ﱒ":"oم","ﶓ":"oمج","ﶔ":"oمم","ﱓ":"oى","ﱔ":"oى","ൟ":"oരo","တ":"oာ","㍘":"O点","ↄ":"ɔ","ᴐ":"ɔ","ͻ":"ɔ","𐑋":"ɔ","Ↄ":"Ɔ","Ͻ":"Ɔ","ꓛ":"Ɔ","𐐣":"Ɔ","ꬿ":"ɔ̸","ꭢ":"ɔe","𐐿":"ɷ","⍴":"p","ｐ":"p","𝐩":"p","𝑝":"p","𝒑":"p","𝓅":"p","𝓹":"p","𝔭":"p","𝕡":"p","𝖕":"p","𝗉":"p","𝗽":"p","𝘱":"p","𝙥":"p","𝚙":"p","ρ":"p","ϱ":"p","𝛒":"p","𝛠":"p","𝜌":"p","𝜚":"p","𝝆":"p","𝝔":"p","𝞀":"p","𝞎":"p","𝞺":"p","𝟈":"p","ⲣ":"p","р":"p","Ｐ":"P","ℙ":"P","𝐏":"P","𝑃":"P","𝑷":"P","𝒫":"P","𝓟":"P","𝔓":"P","𝕻":"P","𝖯":"P","𝗣":"P","𝘗":"P","𝙋":"P","𝙿":"P","Ρ":"P","𝚸":"P","𝛲":"P","𝜬":"P","𝝦":"P","𝞠":"P","Ⲣ":"P","Р":"P","Ꮲ":"P","ᑭ":"P","ꓑ":"P","𐊕":"P","ƥ":"p̔","ᵽ":"p̵","ᑷ":"p·","ᒆ":"P\'","ᴩ":"ᴘ","ꮲ":"ᴘ","φ":"ɸ","ϕ":"ɸ","𝛗":"ɸ","𝛟":"ɸ","𝜑":"ɸ","𝜙":"ɸ","𝝋":"ɸ","𝝓":"ɸ","𝞅":"ɸ","𝞍":"ɸ","𝞿":"ɸ","𝟇":"ɸ","ⲫ":"ɸ","ф":"ɸ","𝐪":"q","𝑞":"q","𝒒":"q","𝓆":"q","𝓺":"q","𝔮":"q","𝕢":"q","𝖖":"q","𝗊":"q","𝗾":"q","𝘲":"q","𝙦":"q","𝚚":"q","ԛ":"q","գ":"q","զ":"q","ℚ":"Q","𝐐":"Q","𝑄":"Q","𝑸":"Q","𝒬":"Q","𝓠":"Q","𝔔":"Q","𝕼":"Q","𝖰":"Q","𝗤":"Q","𝘘":"Q","𝙌":"Q","𝚀":"Q","ⵕ":"Q","ʠ":"q̔","🜀":"QE","ᶐ":"ɋ","ᴋ":"ĸ","κ":"ĸ","ϰ":"ĸ","𝛋":"ĸ","𝛞":"ĸ","𝜅":"ĸ","𝜘":"ĸ","𝜿":"ĸ","𝝒":"ĸ","𝝹":"ĸ","𝞌":"ĸ","𝞳":"ĸ","𝟆":"ĸ","ⲕ":"ĸ","к":"ĸ","ꮶ":"ĸ","қ":"ĸ̩","ҟ":"ĸ̵","𝐫":"r","𝑟":"r","𝒓":"r","𝓇":"r","𝓻":"r","𝔯":"r","𝕣":"r","𝖗":"r","𝗋":"r","𝗿":"r","𝘳":"r","𝙧":"r","𝚛":"r","ꭇ":"r","ꭈ":"r","ᴦ":"r","ⲅ":"r","г":"r","ꮁ":"r","𝈖":"R","ℛ":"R","ℜ":"R","ℝ":"R","𝐑":"R","𝑅":"R","𝑹":"R","𝓡":"R","𝕽":"R","𝖱":"R","𝗥":"R","𝘙":"R","𝙍":"R","𝚁":"R","Ʀ":"R","Ꭱ":"R","Ꮢ":"R","𐒴":"R","ᖇ":"R","ꓣ":"R","𖼵":"R","ɽ":"r̨","ɼ":"r̩","ɍ":"r̵","ғ":"r̵","ᵲ":"r̴","ґ":"r\'","𑣣":"rn","m":"rn","ⅿ":"rn","𝐦":"rn","𝑚":"rn","𝒎":"rn","𝓂":"rn","𝓶":"rn","𝔪":"rn","𝕞":"rn","𝖒":"rn","𝗆":"rn","𝗺":"rn","𝘮":"rn","𝙢":"rn","𝚖":"rn","𑜀":"rn","₥":"rn̸","ɱ":"rn̦","ᵯ":"rn̴","₨":"Rs","ꭱ":"ʀ","ꮢ":"ʀ","я":"ᴙ","ᵳ":"ɾ̴","℩":"ɿ","ｓ":"s","𝐬":"s","𝑠":"s","𝒔":"s","𝓈":"s","𝓼":"s","𝔰":"s","𝕤":"s","𝖘":"s","𝗌":"s","𝘀":"s","𝘴":"s","𝙨":"s","𝚜":"s","ꜱ":"s","ƽ":"s","ѕ":"s","ꮪ":"s","𑣁":"s","𐑈":"s","Ｓ":"S","𝐒":"S","𝑆":"S","𝑺":"S","𝒮":"S","𝓢":"S","𝔖":"S","𝕊":"S","𝕾":"S","𝖲":"S","𝗦":"S","𝘚":"S","𝙎":"S","𝚂":"S","Ѕ":"S","Տ":"S","Ꮥ":"S","Ꮪ":"S","ꓢ":"S","𖼺":"S","𐊖":"S","𐐠":"S","ʂ":"s̨","ᵴ":"s̴","ꞵ":"ß","β":"ß","ϐ":"ß","𝛃":"ß","𝛽":"ß","𝜷":"ß","𝝱":"ß","𝞫":"ß","Ᏸ":"ß","🝜":"sss","ﬆ":"st","∫":"ʃ","ꭍ":"ʃ","∑":"Ʃ","⅀":"Ʃ","Σ":"Ʃ","𝚺":"Ʃ","𝛴":"Ʃ","𝜮":"Ʃ","𝝨":"Ʃ","𝞢":"Ʃ","ⵉ":"Ʃ","∬":"ʃʃ","∭":"ʃʃʃ","⨌":"ʃʃʃʃ","𝐭":"t","𝑡":"t","𝒕":"t","𝓉":"t","𝓽":"t","𝔱":"t","𝕥":"t","𝖙":"t","𝗍":"t","𝘁":"t","𝘵":"t","𝙩":"t","𝚝":"t","⊤":"T","⟙":"T","🝨":"T","Ｔ":"T","𝐓":"T","𝑇":"T","𝑻":"T","𝒯":"T","𝓣":"T","𝔗":"T","𝕋":"T","𝕿":"T","𝖳":"T","𝗧":"T","𝘛":"T","𝙏":"T","𝚃":"T","Τ":"T","𝚻":"T","𝛵":"T","𝜯":"T","𝝩":"T","𝞣":"T","Ⲧ":"T","Т":"T","Ꭲ":"T","ꓔ":"T","𖼊":"T","𑢼":"T","𐊗":"T","𐊱":"T","𐌕":"T","ƭ":"t̔","⍡":"T̈","Ⱦ":"T̸","Ț":"Ţ","Ʈ":"T̨","Ҭ":"T̩","₮":"T⃫","ŧ":"t̵","Ŧ":"T̵","ᵵ":"t̴","Ⴀ":"Ꞇ","Ꜩ":"T3","ʨ":"tɕ","℡":"TEL","ꝷ":"tf","ʦ":"ts","ʧ":"tʃ","ꜩ":"tȝ","τ":"ᴛ","𝛕":"ᴛ","𝜏":"ᴛ","𝝉":"ᴛ","𝞃":"ᴛ","𝞽":"ᴛ","т":"ᴛ","ꭲ":"ᴛ","ҭ":"ᴛ̩","ţ":"ƫ","ț":"ƫ","Ꮏ":"ƫ","𝐮":"u","𝑢":"u","𝒖":"u","𝓊":"u","𝓾":"u","𝔲":"u","𝕦":"u","𝖚":"u","𝗎":"u","𝘂":"u","𝘶":"u","𝙪":"u","𝚞":"u","ꞟ":"u","ᴜ":"u","ꭎ":"u","ꭒ":"u","ʋ":"u","υ":"u","𝛖":"u","𝜐":"u","𝝊":"u","𝞄":"u","𝞾":"u","ս":"u","𐓶":"u","𑣘":"u","∪":"U","⋃":"U","𝐔":"U","𝑈":"U","𝑼":"U","𝒰":"U","𝓤":"U","𝔘":"U","𝕌":"U","𝖀":"U","𝖴":"U","𝗨":"U","𝘜":"U","𝙐":"U","𝚄":"U","Ս":"U","ሀ":"U","𐓎":"U","ᑌ":"U","ꓴ":"U","𖽂":"U","𑢸":"U","ǔ":"ŭ","Ǔ":"Ŭ","ᵾ":"u̵","ꮜ":"u̵","Ʉ":"U̵","Ꮜ":"U̵","ᑘ":"U·","ᑧ":"U\'","ᵫ":"ue","ꭣ":"uo","ṃ":"ꭑ","պ":"ɰ","ሣ":"ɰ","℧":"Ʊ","ᘮ":"Ʊ","ᘴ":"Ʊ","ᵿ":"ʊ̵","∨":"v","⋁":"v","ｖ":"v","ⅴ":"v","𝐯":"v","𝑣":"v","𝒗":"v","𝓋":"v","𝓿":"v","𝔳":"v","𝕧":"v","𝖛":"v","𝗏":"v","𝘃":"v","𝘷":"v","𝙫":"v","𝚟":"v","ᴠ":"v","ν":"v","𝛎":"v","𝜈":"v","𝝂":"v","𝝼":"v","𝞶":"v","ѵ":"v","ט":"v","𑜆":"v","ꮩ":"v","𑣀":"v","𝈍":"V","٧":"V","۷":"V","Ⅴ":"V","𝐕":"V","𝑉":"V","𝑽":"V","𝒱":"V","𝓥":"V","𝔙":"V","𝕍":"V","𝖁":"V","𝖵":"V","𝗩":"V","𝘝":"V","𝙑":"V","𝚅":"V","Ѵ":"V","ⴸ":"V","Ꮩ":"V","ᐯ":"V","ꛟ":"V","ꓦ":"V","𖼈":"V","𑢠":"V","𐔝":"V","𐆗":"V̵","ᐻ":"V·","🝬":"VB","ⅵ":"vi","ⅶ":"vii","ⅷ":"viii","Ⅵ":"Vl","Ⅶ":"Vll","Ⅷ":"Vlll","🜈":"Vᷤ","ᴧ":"ʌ","𐓘":"ʌ","٨":"Ʌ","۸":"Ʌ","Λ":"Ʌ","𝚲":"Ʌ","𝛬":"Ʌ","𝜦":"Ʌ","𝝠":"Ʌ","𝞚":"Ʌ","Л":"Ʌ","ⴷ":"Ʌ","𐒰":"Ʌ","ᐱ":"Ʌ","ꛎ":"Ʌ","ꓥ":"Ʌ","𖼽":"Ʌ","𐊍":"Ʌ","Ӆ":"Ʌ̦","ᐽ":"Ʌ·","ɯ":"w","𝐰":"w","𝑤":"w","𝒘":"w","𝓌":"w","𝔀":"w","𝔴":"w","𝕨":"w","𝖜":"w","𝗐":"w","𝘄":"w","𝘸":"w","𝙬":"w","𝚠":"w","ᴡ":"w","ѡ":"w","ԝ":"w","ա":"w","𑜊":"w","𑜎":"w","𑜏":"w","ꮃ":"w","𑣯":"W","𑣦":"W","𝐖":"W","𝑊":"W","𝑾":"W","𝒲":"W","𝓦":"W","𝔚":"W","𝕎":"W","𝖂":"W","𝖶":"W","𝗪":"W","𝘞":"W","𝙒":"W","𝚆":"W","Ԝ":"W","Ꮃ":"W","Ꮤ":"W","ꓪ":"W","ѽ":"w҆҇","𑓅":"ẇ","₩":"W̵","ꝡ":"w̦","ᴍ":"ʍ","м":"ʍ","ꮇ":"ʍ","ӎ":"ʍ̦","᙮":"x","×":"x","⤫":"x","⤬":"x","⨯":"x","ｘ":"x","ⅹ":"x","𝐱":"x","𝑥":"x","𝒙":"x","𝓍":"x","𝔁":"x","𝔵":"x","𝕩":"x","𝖝":"x","𝗑":"x","𝘅":"x","𝘹":"x","𝙭":"x","𝚡":"x","х":"x","ᕁ":"x","ᕽ":"x","ⷯ":"ͯ","᙭":"X","╳":"X","𐌢":"X","𑣬":"X","Ｘ":"X","Ⅹ":"X","𝐗":"X","𝑋":"X","𝑿":"X","𝒳":"X","𝓧":"X","𝔛":"X","𝕏":"X","𝖃":"X","𝖷":"X","𝗫":"X","𝘟":"X","𝙓":"X","𝚇":"X","Ꭓ":"X","Χ":"X","𝚾":"X","𝛸":"X","𝜲":"X","𝝬":"X","𝞦":"X","Ⲭ":"X","Х":"X","ⵝ":"X","ᚷ":"X","ꓫ":"X","𐊐":"X","𐊴":"X","𐌗":"X","𐔧":"X","⨰":"ẋ","Ҳ":"X̩","𐆖":"X̵","ⅺ":"xi","ⅻ":"xii","Ⅺ":"Xl","Ⅻ":"Xll","ɣ":"y","ᶌ":"y","ｙ":"y","𝐲":"y","𝑦":"y","𝒚":"y","𝓎":"y","𝔂":"y","𝔶":"y","𝕪":"y","𝖞":"y","𝗒":"y","𝘆":"y","𝘺":"y","𝙮":"y","𝚢":"y","ʏ":"y","ỿ":"y","ꭚ":"y","γ":"y","ℽ":"y","𝛄":"y","𝛾":"y","𝜸":"y","𝝲":"y","𝞬":"y","у":"y","ү":"y","ყ":"y","𑣜":"y","Ｙ":"Y","𝐘":"Y","𝑌":"Y","𝒀":"Y","𝒴":"Y","𝓨":"Y","𝔜":"Y","𝕐":"Y","𝖄":"Y","𝖸":"Y","𝗬":"Y","𝘠":"Y","𝙔":"Y","𝚈":"Y","Υ":"Y","ϒ":"Y","𝚼":"Y","𝛶":"Y","𝜰":"Y","𝝪":"Y","𝞤":"Y","Ⲩ":"Y","У":"Y","Ү":"Y","Ꭹ":"Y","Ꮍ":"Y","ꓬ":"Y","𖽃":"Y","𑢤":"Y","𐊲":"Y","ƴ":"y̔","ɏ":"y̵","ұ":"y̵","¥":"Y̵","Ɏ":"Y̵","Ұ":"Y̵","ʒ":"ȝ","ꝫ":"ȝ","ⳍ":"ȝ","ӡ":"ȝ","ჳ":"ȝ","𝐳":"z","𝑧":"z","𝒛":"z","𝓏":"z","𝔃":"z","𝔷":"z","𝕫":"z","𝖟":"z","𝗓":"z","𝘇":"z","𝘻":"z","𝙯":"z","𝚣":"z","ᴢ":"z","ꮓ":"z","𑣄":"z","𐋵":"Z","𑣥":"Z","Ｚ":"Z","ℤ":"Z","ℨ":"Z","𝐙":"Z","𝑍":"Z","𝒁":"Z","𝒵":"Z","𝓩":"Z","𝖅":"Z","𝖹":"Z","𝗭":"Z","𝘡":"Z","𝙕":"Z","𝚉":"Z","Ζ":"Z","𝚭":"Z","𝛧":"Z","𝜡":"Z","𝝛":"Z","𝞕":"Z","Ꮓ":"Z","ꓜ":"Z","𑢩":"Z","ʐ":"z̨","ƶ":"z̵","Ƶ":"Z̵","ȥ":"z̦","Ȥ":"Z̦","ᵶ":"z̴","ƿ":"þ","ϸ":"þ","Ϸ":"Þ","𐓄":"Þ","⁹":"ꝰ","ᴤ":"ƨ","ϩ":"ƨ","ꙅ":"ƨ","ь":"ƅ","ꮟ":"ƅ","ы":"ƅi","ꭾ":"ɂ","ˤ":"ˁ","ꛍ":"ʡ","⊙":"ʘ","☉":"ʘ","⨀":"ʘ","Ꙩ":"ʘ","ⵙ":"ʘ","𐓃":"ʘ","ℾ":"Γ","𝚪":"Γ","𝛤":"Γ","𝜞":"Γ","𝝘":"Γ","𝞒":"Γ","Ⲅ":"Γ","Г":"Γ","Ꮁ":"Γ","ᒥ":"Γ","𖼇":"Γ","Ғ":"Γ̵","ᒯ":"Γ·","Ґ":"Γ\'","∆":"Δ","△":"Δ","🜂":"Δ","𝚫":"Δ","𝛥":"Δ","𝜟":"Δ","𝝙":"Δ","𝞓":"Δ","Ⲇ":"Δ","ⵠ":"Δ","ᐃ":"Δ","𖼚":"Δ","𐊅":"Δ","𐊣":"Δ","⍙":"Δ̲","ᐏ":"Δ·","ᐬ":"Δᐠ","𝟋":"ϝ","𝛇":"ζ","𝜁":"ζ","𝜻":"ζ","𝝵":"ζ","𝞯":"ζ","ⳤ":"ϗ","𝛌":"λ","𝜆":"λ","𝝀":"λ","𝝺":"λ","𝞴":"λ","Ⲗ":"λ","𐓛":"λ","µ":"μ","𝛍":"μ","𝜇":"μ","𝝁":"μ","𝝻":"μ","𝞵":"μ","𝛏":"ξ","𝜉":"ξ","𝝃":"ξ","𝝽":"ξ","𝞷":"ξ","𝚵":"Ξ","𝛯":"Ξ","𝜩":"Ξ","𝝣":"Ξ","𝞝":"Ξ","ϖ":"π","ℼ":"π","𝛑":"π","𝛡":"π","𝜋":"π","𝜛":"π","𝝅":"π","𝝕":"π","𝝿":"π","𝞏":"π","𝞹":"π","𝟉":"π","ᴨ":"π","п":"π","∏":"Π","ℿ":"Π","𝚷":"Π","𝛱":"Π","𝜫":"Π","𝝥":"Π","𝞟":"Π","Ⲡ":"Π","П":"Π","ꛛ":"Π","𐊭":"Ϙ","𐌒":"Ϙ","ϛ":"ς","𝛓":"ς","𝜍":"ς","𝝇":"ς","𝞁":"ς","𝞻":"ς","𝚽":"Φ","𝛷":"Φ","𝜱":"Φ","𝝫":"Φ","𝞥":"Φ","Ⲫ":"Φ","Ф":"Φ","Փ":"Φ","ቀ":"Φ","ᛰ":"Φ","𐊳":"Φ","ꭓ":"χ","ꭕ":"χ","𝛘":"χ","𝜒":"χ","𝝌":"χ","𝞆":"χ","𝟀":"χ","ⲭ":"χ","𝛙":"ψ","𝜓":"ψ","𝝍":"ψ","𝞇":"ψ","𝟁":"ψ","ѱ":"ψ","𐓹":"ψ","𝚿":"Ψ","𝛹":"Ψ","𝜳":"Ψ","𝝭":"Ψ","𝞧":"Ψ","Ⲯ":"Ψ","Ѱ":"Ψ","𐓑":"Ψ","ᛘ":"Ψ","𐊵":"Ψ","⍵":"ω","ꞷ":"ω","𝛚":"ω","𝜔":"ω","𝝎":"ω","𝞈":"ω","𝟂":"ω","ⲱ":"ω","ꙍ":"ω","Ω":"Ω","𝛀":"Ω","𝛺":"Ω","𝜴":"Ω","𝝮":"Ω","𝞨":"Ω","ᘯ":"Ω","ᘵ":"Ω","𐊶":"Ω","⍹":"ω̲","ώ":"ῴ","☰":"Ⲷ","Ⳝ":"Ϭ","җ":"ж̩","Җ":"Ж̩","𝈋":"И","Ͷ":"И","ꚡ":"И","𐐥":"И","Й":"Ѝ","Ҋ":"Ѝ̦","ѝ":"й","ҋ":"й̦","𐒼":"Ӄ","ᴫ":"л","ӆ":"л̦","ꭠ":"љ","𐓫":"ꙩ","ᷮ":"ⷬ","𐓍":"Ћ","𝈂":"Ӿ","𝈢":"Ѡ","Ꮗ":"Ѡ","ᗯ":"Ѡ","Ѽ":"Ѡ҆҇","ᣭ":"Ѡ·","Ꞷ":"Ꙍ","ӌ":"ҷ","Ӌ":"Ҷ","Ҿ":"Ҽ̨","ⲽ":"ш","Ⲽ":"Ш","Ꙑ":"Ъl","℈":"Э","🜁":"Ꙙ","𖼜":"Ꙙ","ꦒ":"ⰿ","և":"եւ","ኔ":"ձ","ﬔ":"մե","ﬕ":"մի","ﬗ":"մխ","ﬓ":"մն","∩":"Ո","⋂":"Ո","𝉅":"Ո","በ":"Ո","ᑎ":"Ո","ꓵ":"Ո","ᑚ":"Ո·","ᑨ":"Ո\'","ﬖ":"վն","₽":"Ք","˓":"ՙ","ʿ":"ՙ","ℵ":"א","ﬡ":"א","אָ":"אַ","אּ":"אַ","ﭏ":"אל","ℶ":"ב","ℷ":"ג","ℸ":"ד","ﬢ":"ד","ﬣ":"ה","יּ":"יִ","ﬤ":"כ","ﬥ":"ל","ﬦ":"ם","ﬠ":"ע","ﬧ":"ר","שׂ":"שׁ","שּ":"שׁ","שּׂ":"שּׁ","ﬨ":"ת","ﺀ":"ء","۽":"ء͈","ﺂ":"آ","ﺁ":"آ","ﭑ":"ٱ","ﭐ":"ٱ","𞸁":"ب","𞸡":"ب","𞹡":"ب","𞺁":"ب","𞺡":"ب","ﺑ":"ب","ﺒ":"ب","ﺐ":"ب","ﺏ":"ب","ݑ":"بۛ","ࢶ":"بۢ","ࢡ":"بٔ","ﲠ":"بo","ﳢ":"بo","ﲜ":"بج","ﰅ":"بج","ﲝ":"بح","ﰆ":"بح","ﷂ":"بحى","ﲞ":"بخ","ﰇ":"بخ","ﳒ":"بخ","ﱋ":"بخ","ﶞ":"بخى","ﱪ":"بر","ﱫ":"بز","ﲟ":"بم","ﳡ":"بم","ﱬ":"بم","ﰈ":"بم","ﱭ":"بن","ﱮ":"بى","ﰉ":"بى","ﱯ":"بى","ﰊ":"بى","ﭔ":"ٻ","ﭕ":"ٻ","ﭓ":"ٻ","ﭒ":"ٻ","ې":"ٻ","ﯦ":"ٻ","ﯧ":"ٻ","ﯥ":"ٻ","ﯤ":"ٻ","ﭜ":"ڀ","ﭝ":"ڀ","ﭛ":"ڀ","ﭚ":"ڀ","ࢩ":"ݔ","ݧ":"ݔ","⍥":"ة","ö":"ة","ﺔ":"ة","ﺓ":"ة","ۃ":"ة","𞸕":"ت","𞸵":"ت","𞹵":"ت","𞺕":"ت","𞺵":"ت","ﺗ":"ت","ﺘ":"ت","ﺖ":"ت","ﺕ":"ت","ﲥ":"تo","ﳤ":"تo","ﲡ":"تج","ﰋ":"تج","ﵐ":"تجم","ﶠ":"تجى","ﶟ":"تجى","ﲢ":"تح","ﰌ":"تح","ﵒ":"تحج","ﵑ":"تحج","ﵓ":"تحم","ﲣ":"تخ","ﰍ":"تخ","ﵔ":"تخم","ﶢ":"تخى","ﶡ":"تخى","ﱰ":"تر","ﱱ":"تز","ﲤ":"تم","ﳣ":"تم","ﱲ":"تم","ﰎ":"تم","ﵕ":"تمج","ﵖ":"تمح","ﵗ":"تمخ","ﶤ":"تمى","ﶣ":"تمى","ﱳ":"تن","ﱴ":"تى","ﰏ":"تى","ﱵ":"تى","ﰐ":"تى","ﭠ":"ٺ","ﭡ":"ٺ","ﭟ":"ٺ","ﭞ":"ٺ","ﭤ":"ٿ","ﭥ":"ٿ","ﭣ":"ٿ","ﭢ":"ٿ","𞸂":"ج","𞸢":"ج","𞹂":"ج","𞹢":"ج","𞺂":"ج","𞺢":"ج","ﺟ":"ج","ﺠ":"ج","ﺞ":"ج","ﺝ":"ج","ﲧ":"جح","ﰕ":"جح","ﶦ":"جحى","ﶾ":"جحى","ﷻ":"جل جلlلo","ﲨ":"جم","ﰖ":"جم","ﵙ":"جمح","ﵘ":"جمح","ﶧ":"جمى","ﶥ":"جمى","ﴝ":"جى","ﴁ":"جى","ﴞ":"جى","ﴂ":"جى","ﭸ":"ڃ","ﭹ":"ڃ","ﭷ":"ڃ","ﭶ":"ڃ","ﭴ":"ڄ","ﭵ":"ڄ","ﭳ":"ڄ","ﭲ":"ڄ","ﭼ":"چ","ﭽ":"چ","ﭻ":"چ","ﭺ":"چ","ﮀ":"ڇ","ﮁ":"ڇ","ﭿ":"ڇ","ﭾ":"ڇ","𞸇":"ح","𞸧":"ح","𞹇":"ح","𞹧":"ح","𞺇":"ح","𞺧":"ح","ﺣ":"ح","ﺤ":"ح","ﺢ":"ح","ﺡ":"ح","څ":"حۛ","ځ":"حٔ","ݲ":"حٔ","ﲩ":"حج","ﰗ":"حج","ﶿ":"حجى","ﲪ":"حم","ﰘ":"حم","ﵛ":"حمى","ﵚ":"حمى","ﴛ":"حى","ﳿ":"حى","ﴜ":"حى","ﴀ":"حى","𞸗":"خ","𞸷":"خ","𞹗":"خ","𞹷":"خ","𞺗":"خ","𞺷":"خ","ﺧ":"خ","ﺨ":"خ","ﺦ":"خ","ﺥ":"خ","ﲫ":"خج","ﰙ":"خج","ﰚ":"خح","ﲬ":"خم","ﰛ":"خم","ﴟ":"خى","ﴃ":"خى","ﴠ":"خى","ﴄ":"خى","𐋡":"د","𞸃":"د","𞺃":"د","𞺣":"د","ﺪ":"د","ﺩ":"د","ڈ":"دؕ","ﮉ":"دؕ","ﮈ":"دؕ","ڎ":"دۛ","ﮇ":"دۛ","ﮆ":"دۛ","ۮ":"د̂","ࢮ":"د̤̣","𞸘":"ذ","𞺘":"ذ","𞺸":"ذ","ﺬ":"ذ","ﺫ":"ذ","ﱛ":"ذٰ","ڋ":"ڊؕ","ﮅ":"ڌ","ﮄ":"ڌ","ﮃ":"ڍ","ﮂ":"ڍ","𞸓":"ر","𞺓":"ر","𞺳":"ر","ﺮ":"ر","ﺭ":"ر","ڑ":"رؕ","ﮍ":"رؕ","ﮌ":"رؕ","ژ":"رۛ","ﮋ":"رۛ","ﮊ":"رۛ","ڒ":"ر̆","ࢹ":"ر̆̇","ۯ":"ر̂","ݬ":"رٔ","ﱜ":"رٰ","ﷶ":"رسول","﷼":"رىlل","𞸆":"ز","𞺆":"ز","𞺦":"ز","ﺰ":"ز","ﺯ":"ز","ࢲ":"ز̂","ݱ":"ڗؕ","𞸎":"س","𞸮":"س","𞹎":"س","𞹮":"س","𞺎":"س","𞺮":"س","ﺳ":"س","ﺴ":"س","ﺲ":"س","ﺱ":"س","ش":"سۛ","𞸔":"سۛ","𞸴":"سۛ","𞹔":"سۛ","𞹴":"سۛ","𞺔":"سۛ","𞺴":"سۛ","ﺷ":"سۛ","ﺸ":"سۛ","ﺶ":"سۛ","ﺵ":"سۛ","ݾ":"س̂","ﴱ":"سo","ﳨ":"سo","ﴲ":"سۛo","ﳪ":"سۛo","ﲭ":"سج","ﴴ":"سج","ﰜ":"سج","ﴭ":"سۛج","ﴷ":"سۛج","ﴥ":"سۛج","ﴉ":"سۛج","ﵝ":"سجح","ﵞ":"سجى","ﵩ":"سۛجى","ﲮ":"سح","ﴵ":"سح","ﰝ":"سح","ﴮ":"سۛح","ﴸ":"سۛح","ﴦ":"سۛح","ﴊ":"سۛح","ﵜ":"سحج","ﵨ":"سۛحم","ﵧ":"سۛحم","ﶪ":"سۛحى","ﲯ":"سخ","ﴶ":"سخ","ﰞ":"سخ","ﴯ":"سۛخ","ﴹ":"سۛخ","ﴧ":"سۛخ","ﴋ":"سۛخ","ﶨ":"سخى","ﷆ":"سخى","ﴪ":"سر","ﴎ":"سر","ﴩ":"سۛر","ﴍ":"سۛر","ﲰ":"سم","ﳧ":"سم","ﰟ":"سم","ﴰ":"سۛم","ﳩ":"سۛم","ﴨ":"سۛم","ﴌ":"سۛم","ﵡ":"سمج","ﵠ":"سمح","ﵟ":"سمح","ﵫ":"سۛمخ","ﵪ":"سۛمخ","ﵣ":"سمم","ﵢ":"سمم","ﵭ":"سۛمم","ﵬ":"سۛمم","ﴗ":"سى","ﳻ":"سى","ﴘ":"سى","ﳼ":"سى","ﴙ":"سۛى","ﳽ":"سۛى","ﴚ":"سۛى","ﳾ":"سۛى","𐋲":"ص","𞸑":"ص","𞸱":"ص","𞹑":"ص","𞹱":"ص","𞺑":"ص","𞺱":"ص","ﺻ":"ص","ﺼ":"ص","ﺺ":"ص","ﺹ":"ص","ڞ":"صۛ","ࢯ":"ص̤̣","ﲱ":"صح","ﰠ":"صح","ﵥ":"صحح","ﵤ":"صحح","ﶩ":"صحى","ﲲ":"صخ","ﴫ":"صر","ﴏ":"صر","ﷵ":"صلعم","ﷹ":"صلى","ﷰ":"صلى","ﷺ":"صلى lللo علىo وسلم","ﲳ":"صم","ﰡ":"صم","ﷅ":"صمم","ﵦ":"صمم","ﴡ":"صى","ﴅ":"صى","ﴢ":"صى","ﴆ":"صى","𞸙":"ض","𞸹":"ض","𞹙":"ض","𞹹":"ض","𞺙":"ض","𞺹":"ض","ﺿ":"ض","ﻀ":"ض","ﺾ":"ض","ﺽ":"ض","ﲴ":"ضج","ﰢ":"ضج","ﲵ":"ضح","ﰣ":"ضح","ﵮ":"ضحى","ﶫ":"ضحى","ﲶ":"ضخ","ﰤ":"ضخ","ﵰ":"ضخم","ﵯ":"ضخم","ﴬ":"ضر","ﴐ":"ضر","ﲷ":"ضم","ﰥ":"ضم","ﴣ":"ضى","ﴇ":"ضى","ﴤ":"ضى","ﴈ":"ضى","𐋨":"ط","𞸈":"ط","𞹨":"ط","𞺈":"ط","𞺨":"ط","ﻃ":"ط","ﻄ":"ط","ﻂ":"ط","ﻁ":"ط","ڟ":"طۛ","ﲸ":"طح","ﰦ":"طح","ﴳ":"طم","ﴺ":"طم","ﰧ":"طم","ﵲ":"طمح","ﵱ":"طمح","ﵳ":"طمم","ﵴ":"طمى","ﴑ":"طى","ﳵ":"طى","ﴒ":"طى","ﳶ":"طى","𞸚":"ظ","𞹺":"ظ","𞺚":"ظ","𞺺":"ظ","ﻇ":"ظ","ﻈ":"ظ","ﻆ":"ظ","ﻅ":"ظ","ﲹ":"ظم","ﴻ":"ظم","ﰨ":"ظم","؏":"ع","𞸏":"ع","𞸯":"ع","𞹏":"ع","𞹯":"ع","𞺏":"ع","𞺯":"ع","ﻋ":"ع","ﻌ":"ع","ﻊ":"ع","ﻉ":"ع","ﲺ":"عج","ﰩ":"عج","ﷄ":"عجم","ﵵ":"عجم","ﷷ":"علىo","ﲻ":"عم","ﰪ":"عم","ﵷ":"عمم","ﵶ":"عمم","ﵸ":"عمى","ﶶ":"عمى","ﴓ":"عى","ﳷ":"عى","ﴔ":"عى","ﳸ":"عى","𞸛":"غ","𞸻":"غ","𞹛":"غ","𞹻":"غ","𞺛":"غ","𞺻":"غ","ﻏ":"غ","ﻐ":"غ","ﻎ":"غ","ﻍ":"غ","ﲼ":"غج","ﰫ":"غج","ﲽ":"غم","ﰬ":"غم","ﵹ":"غمم","ﵻ":"غمى","ﵺ":"غمى","ﴕ":"غى","ﳹ":"غى","ﴖ":"غى","ﳺ":"غى","𞸐":"ف","𞸰":"ف","𞹰":"ف","𞺐":"ف","𞺰":"ف","ﻓ":"ف","ﻔ":"ف","ﻒ":"ف","ﻑ":"ف","ڧ":"ف","ﲾ":"فج","ﰭ":"فج","ﲿ":"فح","ﰮ":"فح","ﳀ":"فخ","ﰯ":"فخ","ﵽ":"فخم","ﵼ":"فخم","ﳁ":"فم","ﰰ":"فم","ﷁ":"فمى","ﱼ":"فى","ﰱ":"فى","ﱽ":"فى","ﰲ":"فى","𞸞":"ڡ","𞹾":"ڡ","ࢻ":"ڡ","ٯ":"ڡ","𞸟":"ڡ","𞹟":"ڡ","ࢼ":"ڡ","ڤ":"ڡۛ","ﭬ":"ڡۛ","ﭭ":"ڡۛ","ﭫ":"ڡۛ","ﭪ":"ڡۛ","ڨ":"ڡۛ","ࢤ":"ڢۛ","ﭰ":"ڦ","ﭱ":"ڦ","ﭯ":"ڦ","ﭮ":"ڦ","𞸒":"ق","𞸲":"ق","𞹒":"ق","𞹲":"ق","𞺒":"ق","𞺲":"ق","ﻗ":"ق","ﻘ":"ق","ﻖ":"ق","ﻕ":"ق","ﳂ":"قح","ﰳ":"قح","ﷱ":"قلى","ﳃ":"قم","ﰴ":"قم","ﶴ":"قمح","ﵾ":"قمح","ﵿ":"قمم","ﶲ":"قمى","ﱾ":"قى","ﰵ":"قى","ﱿ":"قى","ﰶ":"قى","𞸊":"ك","𞸪":"ك","𞹪":"ك","ﻛ":"ك","ﻜ":"ك","ﻚ":"ك","ﻙ":"ك","ک":"ك","ﮐ":"ك","ﮑ":"ك","ﮏ":"ك","ﮎ":"ك","ڪ":"ك","ڭ":"كۛ","ﯕ":"كۛ","ﯖ":"كۛ","ﯔ":"كۛ","ﯓ":"كۛ","ݣ":"كۛ","ﲀ":"كl","ﰷ":"كl","ﳄ":"كج","ﰸ":"كج","ﳅ":"كح","ﰹ":"كح","ﳆ":"كخ","ﰺ":"كخ","ﳇ":"كل","ﳫ":"كل","ﲁ":"كل","ﰻ":"كل","ﳈ":"كم","ﳬ":"كم","ﲂ":"كم","ﰼ":"كم","ﷃ":"كمم","ﶻ":"كمم","ﶷ":"كمى","ﲃ":"كى","ﰽ":"كى","ﲄ":"كى","ﰾ":"كى","ݢ":"ڬ","ﮔ":"گ","ﮕ":"گ","ﮓ":"گ","ﮒ":"گ","ࢰ":"گ","ڴ":"گۛ","ﮜ":"ڱ","ﮝ":"ڱ","ﮛ":"ڱ","ﮚ":"ڱ","ﮘ":"ڳ","ﮙ":"ڳ","ﮗ":"ڳ","ﮖ":"ڳ","𞸋":"ل","𞸫":"ل","𞹋":"ل","𞺋":"ل","𞺫":"ل","ﻟ":"ل","ﻠ":"ل","ﻞ":"ل","ﻝ":"ل","ڷ":"لۛ","ڵ":"ل̆","ﻼ":"لl","ﻻ":"لl","ﻺ":"لlٕ","ﻹ":"لlٕ","ﻸ":"لlٴ","ﻷ":"لlٴ","ﳍ":"لo","ﻶ":"لآ","ﻵ":"لآ","ﳉ":"لج","ﰿ":"لج","ﶃ":"لجج","ﶄ":"لجج","ﶺ":"لجم","ﶼ":"لجم","ﶬ":"لجى","ﳊ":"لح","ﱀ":"لح","ﶵ":"لحم","ﶀ":"لحم","ﶂ":"لحى","ﶁ":"لحى","ﳋ":"لخ","ﱁ":"لخ","ﶆ":"لخم","ﶅ":"لخم","ﳌ":"لم","ﳭ":"لم","ﲅ":"لم","ﱂ":"لم","ﶈ":"لمح","ﶇ":"لمح","ﶭ":"لمى","ﲆ":"لى","ﱃ":"لى","ﲇ":"لى","ﱄ":"لى","𞸌":"م","𞸬":"م","𞹬":"م","𞺌":"م","𞺬":"م","ﻣ":"م","ﻤ":"م","ﻢ":"م","ﻡ":"م","ࢧ":"مۛ","۾":"م͈","ﲈ":"مl","ﳎ":"مج","ﱅ":"مج","ﶌ":"مجح","ﶒ":"مجخ","ﶍ":"مجم","ﷀ":"مجى","ﳏ":"مح","ﱆ":"مح","ﶉ":"محج","ﶊ":"محم","ﷴ":"محمد","ﶋ":"محى","ﳐ":"مخ","ﱇ":"مخ","ﶎ":"مخج","ﶏ":"مخم","ﶹ":"مخى","ﳑ":"مم","ﲉ":"مم","ﱈ":"مم","ﶱ":"ممى","ﱉ":"مى","ﱊ":"مى","𞸍":"ن","𞸭":"ن","𞹍":"ن","𞹭":"ن","𞺍":"ن","𞺭":"ن","ﻧ":"ن","ﻨ":"ن","ﻦ":"ن","ﻥ":"ن","ݨ":"نؕ","ݩ":"ن̆","ﳖ":"نo","ﳯ":"نo","ﶸ":"نجح","ﶽ":"نجح","ﶘ":"نجم","ﶗ":"نجم","ﶙ":"نجى","ﷇ":"نجى","ﳓ":"نح","ﱌ":"نح","ﶕ":"نحم","ﶖ":"نحى","ﶳ":"نحى","ﳔ":"نخ","ﱍ":"نخ","ﲊ":"نر","ﲋ":"نز","ﳕ":"نم","ﳮ":"نم","ﲌ":"نم","ﱎ":"نم","ﶛ":"نمى","ﶚ":"نمى","ﲍ":"نن","ﲎ":"نى","ﱏ":"نى","ﲏ":"نى","ﱐ":"نى","ۂ":"ۀ","ﮥ":"ۀ","ﮤ":"ۀ","𐋤":"و","𞸅":"و","𞺅":"و","𞺥":"و","ﻮ":"و","ﻭ":"و","ࢱ":"و","ۋ":"وۛ","ﯟ":"وۛ","ﯞ":"وۛ","ۇ":"و̓","ﯘ":"و̓","ﯗ":"و̓","ۆ":"و̆","ﯚ":"و̆","ﯙ":"و̆","ۉ":"و̂","ﯣ":"و̂","ﯢ":"و̂","ۈ":"وٰ","ﯜ":"وٰ","ﯛ":"وٰ","ؤ":"وٴ","ﺆ":"وٴ","ﺅ":"وٴ","ٶ":"وٴ","ٷ":"و̓ٴ","ﯝ":"و̓ٴ","ﷸ":"وسلم","ﯡ":"ۅ","ﯠ":"ۅ","ٮ":"ى","𞸜":"ى","𞹼":"ى","ں":"ى","𞸝":"ى","𞹝":"ى","ﮟ":"ى","ﮞ":"ى","ࢽ":"ى","ﯨ":"ى","ﯩ":"ى","ﻰ":"ى","ﻯ":"ى","ي":"ى","𞸉":"ى","𞸩":"ى","𞹉":"ى","𞹩":"ى","𞺉":"ى","𞺩":"ى","ﻳ":"ى","ﻴ":"ى","ﻲ":"ى","ﻱ":"ى","ی":"ى","ﯾ":"ى","ﯿ":"ى","ﯽ":"ى","ﯼ":"ى","ے":"ى","ﮯ":"ى","ﮮ":"ى","ٹ":"ىؕ","ﭨ":"ىؕ","ﭩ":"ىؕ","ﭧ":"ىؕ","ﭦ":"ىؕ","ڻ":"ىؕ","ﮢ":"ىؕ","ﮣ":"ىؕ","ﮡ":"ىؕ","ﮠ":"ىؕ","پ":"ىۛ","ﭘ":"ىۛ","ﭙ":"ىۛ","ﭗ":"ىۛ","ﭖ":"ىۛ","ث":"ىۛ","𞸖":"ىۛ","𞸶":"ىۛ","𞹶":"ىۛ","𞺖":"ىۛ","𞺶":"ىۛ","ﺛ":"ىۛ","ﺜ":"ىۛ","ﺚ":"ىۛ","ﺙ":"ىۛ","ڽ":"ىۛ","ۑ":"ىۛ","ؿ":"ىۛ","ࢷ":"ىۛۢ","ݖ":"ى̆","ێ":"ى̆","ࢺ":"ى̆̇","ؽ":"ى̂","ࢨ":"ىٔ","ﲐ":"ىٰ","ﱝ":"ىٰ","ﳞ":"ىo","ﳱ":"ىo","ﳦ":"ىۛo","ئ":"ىٴ","ﺋ":"ىٴ","ﺌ":"ىٴ","ﺊ":"ىٴ","ﺉ":"ىٴ","ٸ":"ىٴ","ﯫ":"ىٴl","ﯪ":"ىٴl","ﲛ":"ىٴo","ﳠ":"ىٴo","ﯭ":"ىٴo","ﯬ":"ىٴo","ﯸ":"ىٴٻ","ﯷ":"ىٴٻ","ﯶ":"ىٴٻ","ﲗ":"ىٴج","ﰀ":"ىٴج","ﲘ":"ىٴح","ﰁ":"ىٴح","ﲙ":"ىٴخ","ﱤ":"ىٴر","ﱥ":"ىٴز","ﲚ":"ىٴم","ﳟ":"ىٴم","ﱦ":"ىٴم","ﰂ":"ىٴم","ﱧ":"ىٴن","ﯯ":"ىٴو","ﯮ":"ىٴو","ﯱ":"ىٴو̓","ﯰ":"ىٴو̓","ﯳ":"ىٴو̆","ﯲ":"ىٴو̆","ﯵ":"ىٴوٰ","ﯴ":"ىٴوٰ","ﯻ":"ىٴى","ﯺ":"ىٴى","ﱨ":"ىٴى","ﯹ":"ىٴى","ﰃ":"ىٴى","ﱩ":"ىٴى","ﰄ":"ىٴى","ﳚ":"ىج","ﱕ":"ىج","ﰑ":"ىۛج","ﶯ":"ىجى","ﳛ":"ىح","ﱖ":"ىح","ﶮ":"ىحى","ﳜ":"ىخ","ﱗ":"ىخ","ﲑ":"ىر","ﱶ":"ىۛر","ﲒ":"ىز","ﱷ":"ىۛز","ﳝ":"ىم","ﳰ":"ىم","ﲓ":"ىم","ﱘ":"ىم","ﲦ":"ىۛم","ﳥ":"ىۛم","ﱸ":"ىۛم","ﰒ":"ىۛم","ﶝ":"ىمم","ﶜ":"ىمم","ﶰ":"ىمى","ﲔ":"ىن","ﱹ":"ىۛن","ﲕ":"ىى","ﱙ":"ىى","ﲖ":"ىى","ﱚ":"ىى","ﱺ":"ىۛى","ﰓ":"ىۛى","ﱻ":"ىۛى","ﰔ":"ىۛى","ﮱ":"ۓ","ﮰ":"ۓ","𐊸":"ⵀ","⁞":"ⵂ","⸽":"ⵂ","⦙":"ⵂ","︙":"ⵗ","⁝":"ⵗ","⋮":"ⵗ","Մ":"ሆ","Ռ":"ቡ","Ի":"ኮ","Պ":"ጣ","आ":"अा","ऒ":"अाॆ","ओ":"अाे","औ":"अाै","ऄ":"अॆ","ऑ":"अॉ","ऍ":"एॅ","ऎ":"एॆ","ऐ":"एे","ई":"र्इ","ઽ":"ऽ","𑇜":"ꣻ","𑇋":"ऺ","ુ":"ु","ૂ":"ू","ੋ":"ॆ","੍":"्","્":"्","আ":"অা","ৠ":"ঋৃ","ৡ":"ঋৃ","𑒒":"ঘ","𑒔":"চ","𑒖":"জ","𑒘":"ঞ","𑒙":"ট","𑒛":"ড","𑒪":"ণ","𑒞":"ত","𑒟":"থ","𑒠":"দ","𑒡":"ধ","𑒢":"ন","𑒣":"প","𑒩":"ব","𑒧":"ম","𑒨":"য","𑒫":"র","𑒝":"ল","𑒭":"ষ","𑒮":"স","𑓄":"ঽ","𑒰":"া","𑒱":"ি","𑒹":"ে","𑒼":"ো","𑒾":"ৌ","𑓂":"্","𑒽":"ৗ","ਉ":"ੳੁ","ਊ":"ੳੂ","ਆ":"ਅਾ","ਐ":"ਅੈ","ਔ":"ਅੌ","ਇ":"ੲਿ","ਈ":"ੲੀ","ਏ":"ੲੇ","આ":"અા","ઑ":"અાૅ","ઓ":"અાે","ઔ":"અાૈ","ઍ":"અૅ","એ":"અે","ઐ":"અૈ","ଆ":"ଅା","௮":"அ","ர":"ஈ","ா":"ஈ","௫":"ஈு","௨":"உ","ഉ":"உ","ஊ":"உள","ഊ":"உൗ","௭":"எ","௷":"எவ","ஜ":"ஐ","ജ":"ஐ","௧":"க","௪":"ச","௬":"சு","௲":"சூ","ഺ":"டி","ണ":"ண","௺":"நீ","௴":"மீ","௰":"ய","ഴ":"ழ","ௗ":"ள","ை":"ன","ശ":"ஶ","௸":"ஷ","ി":"ி","ീ":"ி","ொ":"ெஈ","ௌ":"ெள","ோ":"ேஈ","ಅ":"అ","ಆ":"ఆ","ಇ":"ఇ","ౠ":"ఋా","ౡ":"ఌా","ಒ":"ఒ","ఔ":"ఒౌ","ಔ":"ఒౌ","ఓ":"ఒౕ","ಓ":"ఒౕ","ಜ":"జ","ಞ":"ఞ","ఢ":"డ̣","ಣ":"ణ","థ":"ధּ","భ":"బ̣","ಯ":"య","ఠ":"రּ","ಱ":"ఱ","ಲ":"ల","ష":"వ̣","హ":"వా","మ":"వు","ూ":"ుా","ౄ":"ృా","ೡ":"ಌಾ","ഈ":"ഇൗ","ഐ":"എെ","ഓ":"ഒാ","ഔ":"ഒൗ","ൡ":"ഞ","൫":"ദ്ര","൹":"നു","ഌ":"നു","ങ":"നു","൯":"ന്","ൻ":"ന്","൬":"ന്ന","൚":"ന്മ","റ":"ര","൪":"ര്","ർ":"ര്","൮":"വ്ര","൶":"ഹ്മ","ൂ":"ു","ൃ":"ു","ൈ":"െെ","෪":"ජ","෫":"ද","𑐓":"𑐴𑑂𑐒","𑐙":"𑐴𑑂𑐘","𑐤":"𑐴𑑂𑐣","𑐪":"𑐴𑑂𑐩","𑐭":"𑐴𑑂𑐬","𑐯":"𑐴𑑂𑐮","𑗘":"𑖂","𑗙":"𑖂","𑗚":"𑖃","𑗛":"𑖄","𑗜":"𑖲","𑗝":"𑖳","ฃ":"ข","ด":"ค","ต":"ค","ม":"ฆ","ຈ":"จ","ซ":"ช","ฏ":"ฎ","ท":"ฑ","ບ":"บ","ປ":"ป","ຝ":"ฝ","ພ":"พ","ຟ":"ฟ","ฦ":"ภ","ຍ":"ย","។":"ฯ","ๅ":"า","ำ":"̊า","ិ":"ิ","ី":"ี","ឹ":"ึ","ឺ":"ื","ຸ":"ุ","ູ":"ู","แ":"เเ","ໜ":"ຫນ","ໝ":"ຫມ","ຳ":"̊າ","༂":"འུྂཿ","༃":"འུྂ༔","ཪ":"ར","ༀ":"ཨོཾ","ཷ":"ྲཱྀ","ཹ":"ླཱྀ","𑲲":"𑲪","ႁ":"ဂှ","က":"ဂာ","ၰ":"ဃှ","ၦ":"ပှ","ဟ":"ပာ","ၯ":"ပာှ","ၾ":"ၽှ","ဩ":"သြ","ဪ":"သြော်","႞":"ႃ̊","ឣ":"អ","᧐":"ᦞ","᧑":"ᦱ","᪀":"ᩅ","᪐":"ᩅ","꩓":"ꨁ","꩖":"ꨣ","᭒":"ᬍ","᭓":"ᬑ","᭘":"ᬨ","ꦣ":"ꦝ","ᢖ":"ᡜ","ᡕ":"ᠵ","ῶ":"Ꮿ","ᐍ":"ᐁ·","ᐫ":"ᐁᐠ","ᐑ":"ᐄ·","ᐓ":"ᐅ·","ᐭ":"ᐅᐠ","ᐕ":"ᐆ·","ᐘ":"ᐊ·","ᐮ":"ᐊᐠ","ᐚ":"ᐋ·","ᣝ":"ᐞᣟ","ᓑ":"ᐡ","ᕀ":"ᐩ","ᐿ":"ᐲ·","ᑃ":"ᐴ·","⍩":"ᐵ","ᑇ":"ᐹ·","ᑜ":"ᑏ·","⸧":"ᑐ","⊃":"ᑐ","ᑞ":"ᑐ·","ᑩ":"ᑐ\'","⟉":"ᑐ/","⫗":"ᑐᑕ","ᑠ":"ᑑ·","⸦":"ᑕ","⊂":"ᑕ","ᑢ":"ᑕ·","ᑪ":"ᑕ\'","ᑤ":"ᑖ·","ᑵ":"ᑫ·","ᒅ":"ᑫ\'","ᑹ":"ᑮ·","ᑽ":"ᑰ·","ᘃ":"ᒉ","ᒓ":"ᒉ·","ᒕ":"ᒋ·","ᒗ":"ᒌ·","ᒛ":"ᒎ·","ᘂ":"ᒐ","ᒝ":"ᒐ·","ᒟ":"ᒑ·","ᒭ":"ᒣ·","ᒱ":"ᒦ·","ᒳ":"ᒧ·","ᒵ":"ᒨ·","ᒹ":"ᒫ·","ᓊ":"ᓀ·","ᣇ":"ᓂ·","ᣉ":"ᓃ·","ᣋ":"ᓄ·","ᣍ":"ᓅ·","ᓌ":"ᓇ·","ᓎ":"ᓈ·","ᘄ":"ᓓ","ᓝ":"ᓓ·","ᓟ":"ᓕ·","ᓡ":"ᓖ·","ᓣ":"ᓗ·","ᓥ":"ᓘ·","ᘇ":"ᓚ","ᓧ":"ᓚ·","ᓩ":"ᓛ·","ᓷ":"ᓭ·","ᓹ":"ᓯ·","ᓻ":"ᓰ·","ᓽ":"ᓱ·","ᓿ":"ᓲ·","ᔁ":"ᓴ·","ᔃ":"ᓵ·","ᔌ":"ᔋ<","ᔎ":"ᔋb","ᔍ":"ᔋᑕ","ᔏ":"ᔋᒐ","ᔘ":"ᔐ·","ᔚ":"ᔑ·","ᔜ":"ᔒ·","ᔞ":"ᔓ·","ᔠ":"ᔔ·","ᔢ":"ᔕ·","ᔤ":"ᔖ·","ᔲ":"ᔨ·","ᔴ":"ᔩ·","ᔶ":"ᔪ·","ᔸ":"ᔫ·","ᔺ":"ᔭ·","ᔼ":"ᔮ·","ᘢ":"ᕃ","ᣠ":"ᕃ·","ᘣ":"ᕆ","ᘤ":"ᕊ","ᕏ":"ᕌ·","ᖃ":"ᕐb","ᖄ":"ᕐḃ","ᖁ":"ᕐd","ᕿ":"ᕐP","ᙯ":"ᕐᑫ","ᕾ":"ᕐᑬ","ᖀ":"ᕐᑮ","ᖂ":"ᕐᑰ","ᖅ":"ᕐᒃ","ᕜ":"ᕚ·","ᣣ":"ᕞ·","ᣤ":"ᕦ·","ᕩ":"ᕧ·","ᣥ":"ᕫ·","ᣨ":"ᖆ·","ᖑ":"ᖕJ","ᙰ":"ᖕᒉ","ᖎ":"ᖕᒊ","ᖏ":"ᖕᒋ","ᖐ":"ᖕᒌ","ᖒ":"ᖕᒎ","ᖓ":"ᖕᒐ","ᖔ":"ᖕᒑ","ᙳ":"ᖖJ","ᙱ":"ᖖᒋ","ᙲ":"ᖖᒌ","ᙴ":"ᖖᒎ","ᙵ":"ᖖᒐ","ᙶ":"ᖖᒑ","ᣪ":"ᖗ·","ᙷ":"ᖧ·","ᙸ":"ᖨ·","ᙹ":"ᖩ·","ᙺ":"ᖪ·","ᙻ":"ᖫ·","ᙼ":"ᖬ·","ᙽ":"ᖭ·","⪫":"ᗒ","⪪":"ᗕ","ꓷ":"ᗡ","ᣰ":"ᗴ·","ᣲ":"ᘛ·","ᶻ":"ᙆ","ꓭ":"ᙠ","ᶺ":"ᣔ","ᴾ":"ᣖ","ᣜ":"ᣟᐞ","ˡ":"ᣳ","ʳ":"ᣴ","ˢ":"ᣵ","ᣛ":"ᣵ","ꚰ":"ᚹ","ᛡ":"ᚼ","⍿":"ᚽ","ᛂ":"ᚽ","𝈿":"ᛋ","↑":"ᛏ","↿":"ᛐ","⥮":"ᛐ⇂","⥣":"ᛐᛚ","ⵣ":"ᛯ","↾":"ᛚ","⨡":"ᛚ","⋄":"ᛜ","◇":"ᛜ","◊":"ᛜ","♢":"ᛜ","🝔":"ᛜ","𑢷":"ᛜ","𐊔":"ᛜ","⍚":"ᛜ̲","⋈":"ᛞ","⨝":"ᛞ","𐓐":"ᛦ","↕":"ᛨ","𐳼":"𐲂","𐳺":"𐲥","ㄱ":"ᄀ","ᆨ":"ᄀ","ᄁ":"ᄀᄀ","ㄲ":"ᄀᄀ","ᆩ":"ᄀᄀ","ᇺ":"ᄀᄂ","ᅚ":"ᄀᄃ","ᇃ":"ᄀᄅ","ᇻ":"ᄀᄇ","ᆪ":"ᄀᄉ","ㄳ":"ᄀᄉ","ᇄ":"ᄀᄉᄀ","ᇼ":"ᄀᄎ","ᇽ":"ᄀᄏ","ᇾ":"ᄀᄒ","ㄴ":"ᄂ","ᆫ":"ᄂ","ᄓ":"ᄂᄀ","ᇅ":"ᄂᄀ","ᄔ":"ᄂᄂ","ㅥ":"ᄂᄂ","ᇿ":"ᄂᄂ","ᄕ":"ᄂᄃ","ㅦ":"ᄂᄃ","ᇆ":"ᄂᄃ","ퟋ":"ᄂᄅ","ᄖ":"ᄂᄇ","ᅛ":"ᄂᄉ","ᇇ":"ᄂᄉ","ㅧ":"ᄂᄉ","ᅜ":"ᄂᄌ","ᆬ":"ᄂᄌ","ㄵ":"ᄂᄌ","ퟌ":"ᄂᄎ","ᇉ":"ᄂᄐ","ᅝ":"ᄂᄒ","ᆭ":"ᄂᄒ","ㄶ":"ᄂᄒ","ᇈ":"ᄂᅀ","ㅨ":"ᄂᅀ","ㄷ":"ᄃ","ᆮ":"ᄃ","ᄗ":"ᄃᄀ","ᇊ":"ᄃᄀ","ᄄ":"ᄃᄃ","ㄸ":"ᄃᄃ","ퟍ":"ᄃᄃ","ퟎ":"ᄃᄃᄇ","ᅞ":"ᄃᄅ","ᇋ":"ᄃᄅ","ꥠ":"ᄃᄆ","ꥡ":"ᄃᄇ","ퟏ":"ᄃᄇ","ꥢ":"ᄃᄉ","ퟐ":"ᄃᄉ","ퟑ":"ᄃᄉᄀ","ꥣ":"ᄃᄌ","ퟒ":"ᄃᄌ","ퟓ":"ᄃᄎ","ퟔ":"ᄃᄐ","ㄹ":"ᄅ","ᆯ":"ᄅ","ꥤ":"ᄅᄀ","ᆰ":"ᄅᄀ","ㄺ":"ᄅᄀ","ꥥ":"ᄅᄀᄀ","ퟕ":"ᄅᄀᄀ","ᇌ":"ᄅᄀᄉ","ㅩ":"ᄅᄀᄉ","ퟖ":"ᄅᄀᄒ","ᄘ":"ᄅᄂ","ᇍ":"ᄅᄂ","ꥦ":"ᄅᄃ","ᇎ":"ᄅᄃ","ㅪ":"ᄅᄃ","ꥧ":"ᄅᄃᄃ","ᇏ":"ᄅᄃᄒ","ᄙ":"ᄅᄅ","ᇐ":"ᄅᄅ","ퟗ":"ᄅᄅᄏ","ꥨ":"ᄅᄆ","ᆱ":"ᄅᄆ","ㄻ":"ᄅᄆ","ᇑ":"ᄅᄆᄀ","ᇒ":"ᄅᄆᄉ","ퟘ":"ᄅᄆᄒ","ꥩ":"ᄅᄇ","ᆲ":"ᄅᄇ","ㄼ":"ᄅᄇ","ퟙ":"ᄅᄇᄃ","ꥪ":"ᄅᄇᄇ","ᇓ":"ᄅᄇᄉ","ㅫ":"ᄅᄇᄉ","ꥫ":"ᄅᄇᄋ","ᇕ":"ᄅᄇᄋ","ퟚ":"ᄅᄇᄑ","ᇔ":"ᄅᄇᄒ","ꥬ":"ᄅᄉ","ᆳ":"ᄅᄉ","ㄽ":"ᄅᄉ","ᇖ":"ᄅᄉᄉ","ᄛ":"ᄅᄋ","ퟝ":"ᄅᄋ","ꥭ":"ᄅᄌ","ꥮ":"ᄅᄏ","ᇘ":"ᄅᄏ","ᆴ":"ᄅᄐ","ㄾ":"ᄅᄐ","ᆵ":"ᄅᄑ","ㄿ":"ᄅᄑ","ᄚ":"ᄅᄒ","ㅀ":"ᄅᄒ","ᄻ":"ᄅᄒ","ᆶ":"ᄅᄒ","ퟲ":"ᄅᄒ","ᇗ":"ᄅᅀ","ㅬ":"ᄅᅀ","ퟛ":"ᄅᅌ","ᇙ":"ᄅᅙ","ㅭ":"ᄅᅙ","ퟜ":"ᄅᅙᄒ","ㅁ":"ᄆ","ᆷ":"ᄆ","ꥯ":"ᄆᄀ","ᇚ":"ᄆᄀ","ퟞ":"ᄆᄂ","ퟟ":"ᄆᄂᄂ","ꥰ":"ᄆᄃ","ᇛ":"ᄆᄅ","ퟠ":"ᄆᄆ","ᄜ":"ᄆᄇ","ㅮ":"ᄆᄇ","ᇜ":"ᄆᄇ","ퟡ":"ᄆᄇᄉ","ꥱ":"ᄆᄉ","ᇝ":"ᄆᄉ","ㅯ":"ᄆᄉ","ᇞ":"ᄆᄉᄉ","ᄝ":"ᄆᄋ","ㅱ":"ᄆᄋ","ᇢ":"ᄆᄋ","ퟢ":"ᄆᄌ","ᇠ":"ᄆᄎ","ᇡ":"ᄆᄒ","ᇟ":"ᄆᅀ","ㅰ":"ᄆᅀ","ㅂ":"ᄇ","ᆸ":"ᄇ","ᄞ":"ᄇᄀ","ㅲ":"ᄇᄀ","ᄟ":"ᄇᄂ","ᄠ":"ᄇᄃ","ㅳ":"ᄇᄃ","ퟣ":"ᄇᄃ","ᇣ":"ᄇᄅ","ퟤ":"ᄇᄅᄑ","ퟥ":"ᄇᄆ","ᄈ":"ᄇᄇ","ㅃ":"ᄇᄇ","ퟦ":"ᄇᄇ","ᄬ":"ᄇᄇᄋ","ㅹ":"ᄇᄇᄋ","ᄡ":"ᄇᄉ","ㅄ":"ᄇᄉ","ᆹ":"ᄇᄉ","ᄢ":"ᄇᄉᄀ","ㅴ":"ᄇᄉᄀ","ᄣ":"ᄇᄉᄃ","ㅵ":"ᄇᄉᄃ","ퟧ":"ᄇᄉᄃ","ᄤ":"ᄇᄉᄇ","ᄥ":"ᄇᄉᄉ","ᄦ":"ᄇᄉᄌ","ꥲ":"ᄇᄉᄐ","ᄫ":"ᄇᄋ","ㅸ":"ᄇᄋ","ᇦ":"ᄇᄋ","ᄧ":"ᄇᄌ","ㅶ":"ᄇᄌ","ퟨ":"ᄇᄌ","ᄨ":"ᄇᄎ","ퟩ":"ᄇᄎ","ꥳ":"ᄇᄏ","ᄩ":"ᄇᄐ","ㅷ":"ᄇᄐ","ᄪ":"ᄇᄑ","ᇤ":"ᄇᄑ","ꥴ":"ᄇᄒ","ᇥ":"ᄇᄒ","ㅅ":"ᄉ","ᆺ":"ᄉ","ᄭ":"ᄉᄀ","ㅺ":"ᄉᄀ","ᇧ":"ᄉᄀ","ᄮ":"ᄉᄂ","ㅻ":"ᄉᄂ","ᄯ":"ᄉᄃ","ㅼ":"ᄉᄃ","ᇨ":"ᄉᄃ","ᄰ":"ᄉᄅ","ᇩ":"ᄉᄅ","ᄱ":"ᄉᄆ","ퟪ":"ᄉᄆ","ᄲ":"ᄉᄇ","ㅽ":"ᄉᄇ","ᇪ":"ᄉᄇ","ᄳ":"ᄉᄇᄀ","ퟫ":"ᄉᄇᄋ","ᄊ":"ᄉᄉ","ㅆ":"ᄉᄉ","ᆻ":"ᄉᄉ","ퟬ":"ᄉᄉᄀ","ퟭ":"ᄉᄉᄃ","ꥵ":"ᄉᄉᄇ","ᄴ":"ᄉᄉᄉ","ᄵ":"ᄉᄋ","ᄶ":"ᄉᄌ","ㅾ":"ᄉᄌ","ퟯ":"ᄉᄌ","ᄷ":"ᄉᄎ","ퟰ":"ᄉᄎ","ᄸ":"ᄉᄏ","ᄹ":"ᄉᄐ","ퟱ":"ᄉᄐ","ᄺ":"ᄉᄑ","ퟮ":"ᄉᅀ","ㅇ":"ᄋ","ᆼ":"ᄋ","ᅁ":"ᄋᄀ","ᇬ":"ᄋᄀ","ᇭ":"ᄋᄀᄀ","ᅂ":"ᄋᄃ","ꥶ":"ᄋᄅ","ᅃ":"ᄋᄆ","ᅄ":"ᄋᄇ","ᅅ":"ᄋᄉ","ᇱ":"ᄋᄉ","ㆂ":"ᄋᄉ","ᅇ":"ᄋᄋ","ㆀ":"ᄋᄋ","ᇮ":"ᄋᄋ","ᅈ":"ᄋᄌ","ᅉ":"ᄋᄎ","ᇯ":"ᄋᄏ","ᅊ":"ᄋᄐ","ᅋ":"ᄋᄑ","ꥷ":"ᄋᄒ","ᅆ":"ᄋᅀ","ᇲ":"ᄋᅀ","ㆃ":"ᄋᅀ","ㅈ":"ᄌ","ᆽ":"ᄌ","ퟷ":"ᄌᄇ","ퟸ":"ᄌᄇᄇ","ᅍ":"ᄌᄋ","ᄍ":"ᄌᄌ","ㅉ":"ᄌᄌ","ퟹ":"ᄌᄌ","ꥸ":"ᄌᄌᄒ","ㅊ":"ᄎ","ᆾ":"ᄎ","ᅒ":"ᄎᄏ","ᅓ":"ᄎᄒ","ㅋ":"ᄏ","ᆿ":"ᄏ","ㅌ":"ᄐ","ᇀ":"ᄐ","ꥹ":"ᄐᄐ","ㅍ":"ᄑ","ᇁ":"ᄑ","ᅖ":"ᄑᄇ","ᇳ":"ᄑᄇ","ퟺ":"ᄑᄉ","ᅗ":"ᄑᄋ","ㆄ":"ᄑᄋ","ᇴ":"ᄑᄋ","ퟻ":"ᄑᄐ","ꥺ":"ᄑᄒ","ㅎ":"ᄒ","ᇂ":"ᄒ","ᇵ":"ᄒᄂ","ᇶ":"ᄒᄅ","ᇷ":"ᄒᄆ","ᇸ":"ᄒᄇ","ꥻ":"ᄒᄉ","ᅘ":"ᄒᄒ","ㆅ":"ᄒᄒ","ᄽ":"ᄼᄼ","ᄿ":"ᄾᄾ","ㅿ":"ᅀ","ᇫ":"ᅀ","ퟳ":"ᅀᄇ","ퟴ":"ᅀᄇᄋ","ㆁ":"ᅌ","ᇰ":"ᅌ","ퟵ":"ᅌᄆ","ퟶ":"ᅌᄒ","ᅏ":"ᅎᅎ","ᅑ":"ᅐᅐ","ㆆ":"ᅙ","ᇹ":"ᅙ","ꥼ":"ᅙᅙ","ㅤ":"ᅠ","ㅏ":"ᅡ","ᆣ":"ᅡー","ᅶ":"ᅡᅩ","ᅷ":"ᅡᅮ","ᅢ":"ᅡ丨","ㅐ":"ᅡ丨","ㅑ":"ᅣ","ᅸ":"ᅣᅩ","ᅹ":"ᅣᅭ","ᆤ":"ᅣᅮ","ᅤ":"ᅣ丨","ㅒ":"ᅣ丨","ㅓ":"ᅥ","ᅼ":"ᅥー","ᅺ":"ᅥᅩ","ᅻ":"ᅥᅮ","ᅦ":"ᅥ丨","ㅔ":"ᅥ丨","ㅕ":"ᅧ","ᆥ":"ᅧᅣ","ᅽ":"ᅧᅩ","ᅾ":"ᅧᅮ","ᅨ":"ᅧ丨","ㅖ":"ᅧ丨","ㅗ":"ᅩ","ᅪ":"ᅩᅡ","ㅘ":"ᅩᅡ","ᅫ":"ᅩᅡ丨","ㅙ":"ᅩᅡ丨","ᆦ":"ᅩᅣ","ᆧ":"ᅩᅣ丨","ᅿ":"ᅩᅥ","ᆀ":"ᅩᅥ丨","ힰ":"ᅩᅧ","ᆁ":"ᅩᅧ丨","ᆂ":"ᅩᅩ","ힱ":"ᅩᅩ丨","ᆃ":"ᅩᅮ","ᅬ":"ᅩ丨","ㅚ":"ᅩ丨","ㅛ":"ᅭ","ힲ":"ᅭᅡ","ힳ":"ᅭᅡ丨","ᆄ":"ᅭᅣ","ㆇ":"ᅭᅣ","ᆆ":"ᅭᅣ","ᆅ":"ᅭᅣ丨","ㆈ":"ᅭᅣ丨","ힴ":"ᅭᅥ","ᆇ":"ᅭᅩ","ᆈ":"ᅭ丨","ㆉ":"ᅭ丨","ㅜ":"ᅮ","ᆉ":"ᅮᅡ","ᆊ":"ᅮᅡ丨","ᅯ":"ᅮᅥ","ㅝ":"ᅮᅥ","ᆋ":"ᅮᅥー","ᅰ":"ᅮᅥ丨","ㅞ":"ᅮᅥ丨","ힵ":"ᅮᅧ","ᆌ":"ᅮᅧ丨","ᆍ":"ᅮᅮ","ᅱ":"ᅮ丨","ㅟ":"ᅮ丨","ힶ":"ᅮ丨丨","ㅠ":"ᅲ","ᆎ":"ᅲᅡ","ힷ":"ᅲᅡ丨","ᆏ":"ᅲᅥ","ᆐ":"ᅲᅥ丨","ᆑ":"ᅲᅧ","ㆊ":"ᅲᅧ","ᆒ":"ᅲᅧ丨","ㆋ":"ᅲᅧ丨","ힸ":"ᅲᅩ","ᆓ":"ᅲᅮ","ᆔ":"ᅲ丨","ㆌ":"ᅲ丨","ㆍ":"ᆞ","ퟅ":"ᆞᅡ","ᆟ":"ᆞᅥ","ퟆ":"ᆞᅥ丨","ᆠ":"ᆞᅮ","ᆢ":"ᆞᆞ","ᆡ":"ᆞ丨","ㆎ":"ᆞ丨","ヘ":"へ","⍁":"〼","⧄":"〼","꒞":"ꁊ","꒬":"ꁐ","꒜":"ꃀ","꒨":"ꄲ","꒿":"ꉙ","꒾":"ꊱ","꒔":"ꋍ","꓀":"ꎫ","꓂":"ꎵ","꒺":"ꎿ","꒰":"ꏂ","꒧":"ꑘ","⊥":"ꓕ","⟂":"ꓕ","𝈜":"ꓕ","Ʇ":"ꓕ","Ꞟ":"ꓤ","⅁":"ꓨ","⅂":"ꓶ","𝈕":"ꓶ","𝈫":"ꓶ","𖼦":"ꓶ","𐐑":"ꓶ","⅃":"𖼀","𑫦":"𑫥𑫯","𑫨":"𑫥𑫥","𑫩":"𑫥𑫥𑫯","𑫪":"𑫥𑫥𑫰","𑫧":"𑫥𑫰","𑫴":"𑫳𑫯","𑫶":"𑫳𑫳","𑫷":"𑫳𑫳𑫯","𑫸":"𑫳𑫳𑫰","𑫵":"𑫳𑫰","𑫬":"𑫫𑫯","𑫭":"𑫫𑫫","𑫮":"𑫫𑫫𑫯","⊕":"𐊨","⨁":"𐊨","🜨":"𐊨","Ꚛ":"𐊨","▽":"𐊼","𝈔":"𐊼","🜄":"𐊼","⧖":"𐋀","ꞛ":"𐐺","Ꞛ":"𐐒","𐒠":"𐒆","𐏑":"𐎂","𐏓":"𐎓","𒀸":"𐎚","☥":"𐦞","𓋹":"𐦞","〹":"卄","不":"不","丽":"丽","並":"並","⎜":"丨","⎟":"丨","⎢":"丨","⎥":"丨","⎪":"丨","⎮":"丨","㇑":"丨","ᅵ":"丨","ㅣ":"丨","⼁":"丨","ᆜ":"丨ー","ᆘ":"丨ᅡ","ᆙ":"丨ᅣ","ힽ":"丨ᅣᅩ","ힾ":"丨ᅣ丨","ힿ":"丨ᅧ","ퟀ":"丨ᅧ丨","ᆚ":"丨ᅩ","ퟁ":"丨ᅩ丨","ퟂ":"丨ᅭ","ᆛ":"丨ᅮ","ퟃ":"丨ᅲ","ᆝ":"丨ᆞ","ퟄ":"丨丨","串":"串","丸":"丸","丹":"丹","乁":"乁","㇠":"乙","⼄":"乙","㇟":"乚","⺃":"乚","㇖":"乛","⺂":"乛","⻲":"亀","亂":"亂","㇚":"亅","⼅":"亅","了":"了","ニ":"二","⼆":"二","𠄢":"𠄢","⼇":"亠","亮":"亮","⼈":"人","イ":"亻","⺅":"亻","什":"什","仌":"仌","令":"令","你":"你","倂":"併","倂":"併","侀":"侀","來":"來","例":"例","侮":"侮","侮":"侮","侻":"侻","便":"便","值":"値","倫":"倫","偺":"偺","備":"備","像":"像","僚":"僚","僧":"僧","僧":"僧","㒞":"㒞","⼉":"儿","兀":"兀","⺎":"兀","充":"充","免":"免","免":"免","兔":"兔","兤":"兤","⼊":"入","內":"內","全":"全","兩":"兩","ハ":"八","⼋":"八","六":"六","具":"具","𠔜":"𠔜","𠔥":"𠔥","冀":"冀","㒹":"㒹","⼌":"冂","再":"再","𠕋":"𠕋","冒":"冒","冕":"冕","㒻":"㒻","最":"最","⼍":"冖","冗":"冗","冤":"冤","⼎":"冫","冬":"冬","况":"况","况":"况","冷":"冷","凉":"凉","凌":"凌","凜":"凜","凞":"凞","⼏":"几","𠘺":"𠘺","凵":"凵","⼐":"凵","⼑":"刀","⺉":"刂","刃":"刃","切":"切","切":"切","列":"列","利":"利","㓟":"㓟","刺":"刺","刻":"刻","剆":"剆","割":"割","剷":"剷","劉":"劉","𠠄":"𠠄","カ":"力","力":"力","⼒":"力","劣":"劣","㔕":"㔕","劳":"劳","勇":"勇","勇":"勇","勉":"勉","勉":"勉","勒":"勒","勞":"勞","勤":"勤","勤":"勤","勵":"勵","⼓":"勹","勺":"勺","勺":"勺","包":"包","匆":"匆","𠣞":"𠣞","⼔":"匕","北":"北","北":"北","⼕":"匚","⼖":"匸","匿":"匿","⼗":"十","〸":"十","〺":"卅","卉":"卉","࿖":"卍","࿕":"卐","卑":"卑","卑":"卑","博":"博","ト":"卜","⼘":"卜","⼙":"卩","⺋":"㔾","即":"即","卵":"卵","卽":"卽","卿":"卿","卿":"卿","卿":"卿","⼚":"厂","𠨬":"𠨬","⼛":"厶","參":"參","⼜":"又","及":"及","叟":"叟","𠭣":"𠭣","ロ":"口","⼝":"口","囗":"口","⼞":"口","句":"句","叫":"叫","叱":"叱","吆":"吆","吏":"吏","吝":"吝","吸":"吸","呂":"呂","呈":"呈","周":"周","咞":"咞","咢":"咢","咽":"咽","䎛":"㖈","哶":"哶","唐":"唐","啓":"啓","啟":"啓","啕":"啕","啣":"啣","善":"善","善":"善","喇":"喇","喙":"喙","喙":"喙","喝":"喝","喝":"喝","喫":"喫","喳":"喳","嗀":"嗀","嗂":"嗂","嗢":"嗢","嘆":"嘆","嘆":"嘆","噑":"噑","噴":"噴","器":"器","囹":"囹","圖":"圖","圗":"圗","⼟":"土","士":"土","⼠":"土","型":"型","城":"城","㦳":"㘽","埴":"埴","堍":"堍","報":"報","堲":"堲","塀":"塀","塚":"塚","塚":"塚","塞":"塞","填":"塡","壿":"墫","墬":"墬","墳":"墳","壘":"壘","壟":"壟","𡓤":"𡓤","壮":"壮","売":"売","壷":"壷","⼡":"夂","夆":"夆","⼢":"夊","タ":"夕","⼣":"夕","多":"多","夢":"夢","⼤":"大","奄":"奄","奈":"奈","契":"契","奔":"奔","奢":"奢","女":"女","⼥":"女","𡚨":"𡚨","𡛪":"𡛪","姘":"姘","姬":"姬","娛":"娛","娧":"娧","婢":"婢","婦":"婦","嬀":"媯","㛮":"㛮","㛼":"㛼","媵":"媵","嬈":"嬈","嬨":"嬨","嬾":"嬾","嬾":"嬾","⼦":"子","⼧":"宀","宅":"宅","𡧈":"𡧈","寃":"寃","寘":"寘","寧":"寧","寧":"寧","寧":"寧","寮":"寮","寳":"寳","𡬘":"𡬘","⼨":"寸","寿":"寿","将":"将","⼩":"小","尢":"尢","⺐":"尢","⼪":"尢","⺏":"尣","㞁":"㞁","⼫":"尸","尿":"尿","屠":"屠","屢":"屢","層":"層","履":"履","屮":"屮","屮":"屮","⼬":"屮","𡴋":"𡴋","⼭":"山","峀":"峀","岍":"岍","𡷤":"𡷤","𡷦":"𡷦","崙":"崙","嵃":"嵃","嵐":"嵐","嵫":"嵫","嵮":"嵮","嵼":"嵼","嶲":"嶲","嶺":"嶺","⼮":"巛","巢":"巢","エ":"工","⼯":"工","⼰":"己","⺒":"巳","㠯":"㠯","巽":"巽","⼱":"巾","帲":"帡","帨":"帨","帽":"帽","幩":"幩","㡢":"㡢","𢆃":"𢆃","⼲":"干","年":"年","𢆟":"𢆟","⺓":"幺","⼳":"幺","⼴":"广","度":"度","㡼":"㡼","庰":"庰","庳":"庳","庶":"庶","廊":"廊","廊":"廊","廉":"廉","廒":"廒","廓":"廓","廙":"廙","廬":"廬","⼵":"廴","廾":"廾","⼶":"廾","𢌱":"𢌱","𢌱":"𢌱","弄":"弄","⼷":"弋","⼸":"弓","弢":"弢","弢":"弢","⼹":"彐","⺔":"彑","当":"当","㣇":"㣇","⼺":"彡","形":"形","彩":"彩","彫":"彫","⼻":"彳","律":"律","㣣":"㣣","徚":"徚","復":"復","徭":"徭","⼼":"心","⺖":"忄","⺗":"㣺","忍":"忍","志":"志","念":"念","忹":"忹","怒":"怒","怜":"怜","恵":"恵","㤜":"㤜","㤺":"㤺","悁":"悁","悔":"悔","悔":"悔","惇":"惇","惘":"惘","惡":"惡","𢛔":"𢛔","愈":"愈","慨":"慨","慄":"慄","慈":"慈","慌":"慌","慌":"慌","慎":"慎","慎":"慎","慠":"慠","慺":"慺","憎":"憎","憎":"憎","憎":"憎","憐":"憐","憤":"憤","憯":"憯","憲":"憲","𢡄":"𢡄","𢡊":"𢡊","懞":"懞","懲":"懲","懲":"懲","懲":"懲","懶":"懶","懶":"懶","戀":"戀","⼽":"戈","成":"成","戛":"戛","戮":"戮","戴":"戴","⼾":"戶","戸":"戶","⼿":"手","⺘":"扌","扝":"扝","抱":"抱","拉":"拉","拏":"拏","拓":"拓","拔":"拔","拼":"拼","拾":"拾","𢬌":"𢬌","挽":"挽","捐":"捐","捨":"捨","捻":"捻","掃":"掃","掠":"掠","掩":"掩","揄":"揄","揤":"揤","摒":"摒","𢯱":"𢯱","搜":"搜","搢":"搢","揅":"揅","摩":"摩","摷":"摷","摾":"摾","㨮":"㨮","搉":"㩁","撚":"撚","撝":"撝","擄":"擄","㩬":"㩬","⽀":"支","⽁":"攴","⺙":"攵","敏":"敏","敏":"敏","敖":"敖","敬":"敬","數":"數","𣀊":"𣀊","⽂":"文","⻫":"斉","⽃":"斗","料":"料","⽄":"斤","⽅":"方","旅":"旅","⽆":"无","⺛":"旡","既":"既","旣":"旣","⽇":"日","易":"易","曶":"㫚","㫤":"㫤","晉":"晉","晩":"晚","晴":"晴","晴":"晴","暑":"暑","暑":"暑","暈":"暈","㬈":"㬈","暜":"暜","暴":"暴","曆":"曆","㬙":"㬙","𣊸":"𣊸","⽈":"曰","更":"更","書":"書","⽉":"月","𣍟":"𣍟","肦":"朌","胐":"朏","胊":"朐","脁":"朓","胶":"㬵","朗":"朗","朗":"朗","朗":"朗","脧":"朘","望":"望","望":"望","幐":"㬺","䐠":"㬻","𣎓":"𣎓","膧":"朣","𣎜":"𣎜","⽊":"木","李":"李","杓":"杓","杖":"杖","杞":"杞","𣏃":"𣏃","柿":"杮","杻":"杻","枅":"枅","林":"林","㭉":"㭉","𣏕":"𣏕","柳":"柳","柺":"柺","栗":"栗","栟":"栟","桒":"桒","𣑭":"𣑭","梁":"梁","梅":"梅","梅":"梅","梎":"梎","梨":"梨","椔":"椔","楂":"楂","㮝":"㮝","㮝":"㮝","槩":"㮣","樧":"榝","榣":"榣","槪":"槪","樂":"樂","樂":"樂","樂":"樂","樓":"樓","𣚣":"𣚣","檨":"檨","櫓":"櫓","櫛":"櫛","欄":"欄","㰘":"㰘","⽋":"欠","次":"次","𣢧":"𣢧","歔":"歔","㱎":"㱎","⽌":"止","⻭":"歯","歲":"歲","歷":"歷","歹":"歹","⽍":"歹","⺞":"歺","殟":"殟","殮":"殮","⽎":"殳","殺":"殺","殺":"殺","殺":"殺","殻":"殻","𣪍":"𣪍","⽏":"毋","⺟":"母","𣫺":"𣫺","⽐":"比","⽑":"毛","⽒":"氏","⺠":"民","⽓":"气","⽔":"水","⺡":"氵","⺢":"氺","汎":"汎","汧":"汧","沈":"沈","沿":"沿","泌":"泌","泍":"泍","泥":"泥","𣲼":"𣲼","洛":"洛","洞":"洞","洴":"洴","派":"派","流":"流","流":"流","流":"流","洖":"洖","浩":"浩","浪":"浪","海":"海","海":"海","浸":"浸","涅":"涅","𣴞":"𣴞","淋":"淋","淚":"淚","淪":"淪","淹":"淹","渚":"渚","港":"港","湮":"湮","潙":"溈","滋":"滋","滋":"滋","溜":"溜","溺":"溺","滇":"滇","滑":"滑","滛":"滛","㴳":"㴳","漏":"漏","漢":"漢","漢":"漢","漣":"漣","𣻑":"𣻑","潮":"潮","𣽞":"𣽞","𣾎":"𣾎","濆":"濆","濫":"濫","濾":"濾","瀛":"瀛","瀞":"瀞","瀞":"瀞","瀹":"瀹","灊":"灊","㶖":"㶖","⽕":"火","⺣":"灬","灰":"灰","灷":"灷","災":"災","炙":"炙","炭":"炭","烈":"烈","烙":"烙","煮":"煮","煮":"煮","𤉣":"𤉣","煅":"煅","煉":"煉","𤋮":"𤋮","熜":"熜","燎":"燎","燐":"燐","𤎫":"𤎫","爐":"爐","爛":"爛","爨":"爨","⽖":"爪","爫":"爫","⺤":"爫","爵":"爵","爵":"爵","⽗":"父","⽘":"爻","⺦":"丬","⽙":"爿","⽚":"片","牐":"牐","⽛":"牙","𤘈":"𤘈","⽜":"牛","牢":"牢","犀":"犀","犕":"犕","⽝":"犬","⺨":"犭","犯":"犯","狀":"狀","𤜵":"𤜵","狼":"狼","猪":"猪","猪":"猪","𤠔":"𤠔","獵":"獵","獺":"獺","⽞":"玄","率":"率","率":"率","⽟":"玉","王":"王","㺬":"㺬","玥":"玥","玲":"玲","㺸":"㺸","㺸":"㺸","珞":"珞","琉":"琉","理":"理","琢":"琢","瑇":"瑇","瑜":"瑜","瑩":"瑩","瑱":"瑱","瑱":"瑱","璅":"璅","璉":"璉","璘":"璘","瓊":"瓊","⽠":"瓜","⽡":"瓦","㼛":"㼛","甆":"甆","⽢":"甘","⽣":"生","甤":"甤","⽤":"用","⽥":"田","画":"画","甾":"甾","𤰶":"𤰶","留":"留","略":"略","異":"異","異":"異","𤲒":"𤲒","⽦":"疋","⽧":"疒","痢":"痢","瘐":"瘐","瘟":"瘟","瘝":"瘝","療":"療","癩":"癩","⽨":"癶","⽩":"白","𤾡":"𤾡","𤾸":"𤾸","⽪":"皮","⽫":"皿","𥁄":"𥁄","㿼":"㿼","益":"益","益":"益","盛":"盛","盧":"盧","䀈":"䀈","⽬":"目","直":"直","直":"直","𥃲":"𥃲","𥃳":"𥃳","省":"省","䀘":"䀘","𥄙":"𥄙","眞":"眞","真":"真","真":"真","𥄳":"𥄳","着":"着","睊":"睊","睊":"睊","鿃":"䀹","䀹":"䀹","䀹":"䀹","晣":"䀿","䁆":"䁆","瞋":"瞋","𥉉":"𥉉","瞧":"瞧","⽭":"矛","⽮":"矢","⽯":"石","䂖":"䂖","𥐝":"𥐝","硏":"研","硎":"硎","硫":"硫","碌":"碌","碌":"碌","碑":"碑","磊":"磊","磌":"磌","磌":"磌","磻":"磻","䃣":"䃣","礪":"礪","⽰":"示","⺭":"礻","礼":"礼","社":"社","祈":"祈","祉":"祉","𥘦":"𥘦","祐":"祐","祖":"祖","祖":"祖","祝":"祝","神":"神","祥":"祥","視":"視","視":"視","祿":"祿","𥚚":"𥚚","禍":"禍","禎":"禎","福":"福","福":"福","𥛅":"𥛅","禮":"禮","⽱":"禸","⽲":"禾","秊":"秊","䄯":"䄯","秫":"秫","稜":"稜","穊":"穊","穀":"穀","穀":"穀","穏":"穏","⽳":"穴","突":"突","𥥼":"𥥼","窱":"窱","立":"立","⽴":"立","⻯":"竜","𥪧":"𥪧","𥪧":"𥪧","竮":"竮","⽵":"竹","笠":"笠","節":"節","節":"節","䈂":"䈂","𥮫":"𥮫","篆":"篆","䈧":"䈧","築":"築","𥲀":"𥲀","𥳐":"𥳐","簾":"簾","籠":"籠","⽶":"米","类":"类","粒":"粒","精":"精","糒":"糒","糖":"糖","糨":"糨","䊠":"䊠","糣":"糣","糧":"糧","⽷":"糸","⺯":"糹","𥾆":"𥾆","紀":"紀","紐":"紐","索":"索","累":"累","絶":"絕","絣":"絣","絛":"絛","綠":"綠","綾":"綾","緇":"緇","練":"練","練":"練","練":"練","縂":"縂","䌁":"䌁","縉":"縉","縷":"縷","繁":"繁","繅":"繅","𦇚":"𦇚","䌴":"䌴","⽸":"缶","𦈨":"𦈨","缾":"缾","𦉇":"𦉇","⽹":"网","⺫":"罒","⺲":"罒","⺱":"罓","䍙":"䍙","署":"署","𦋙":"𦋙","罹":"罹","罺":"罺","羅":"羅","𦌾":"𦌾","⽺":"羊","羕":"羕","羚":"羚","羽":"羽","⽻":"羽","翺":"翺","老":"老","⽼":"老","⺹":"耂","者":"者","者":"者","者":"者","⽽":"而","𦓚":"𦓚","⽾":"耒","𦔣":"𦔣","⽿":"耳","聆":"聆","聠":"聠","𦖨":"𦖨","聯":"聯","聰":"聰","聾":"聾","⾀":"聿","⺺":"肀","⾁":"肉","肋":"肋","肭":"肭","育":"育","䏕":"䏕","䏙":"䏙","腁":"胼","脃":"脃","脾":"脾","䐋":"䐋","朡":"朡","𦞧":"𦞧","𦞵":"𦞵","朦":"䑃","臘":"臘","⾂":"臣","臨":"臨","⾃":"自","臭":"臭","⾄":"至","⾅":"臼","舁":"舁","舁":"舁","舄":"舄","⾆":"舌","舘":"舘","⾇":"舛","⾈":"舟","䑫":"䑫","⾉":"艮","良":"良","⾊":"色","⾋":"艸","艹":"艹","艹":"艹","⺾":"艹","⺿":"艹","⻀":"艹","芋":"芋","芑":"芑","芝":"芝","花":"花","芳":"芳","芽":"芽","若":"若","若":"若","苦":"苦","𦬼":"𦬼","茶":"茶","荒":"荒","荣":"荣","茝":"茝","茣":"茣","莽":"莽","荓":"荓","菉":"菉","菊":"菊","菌":"菌","菜":"菜","菧":"菧","華":"華","菱":"菱","著":"著","著":"著","𦰶":"𦰶","莭":"莭","落":"落","葉":"葉","蔿":"蒍","𦳕":"𦳕","𦵫":"𦵫","蓮":"蓮","蓱":"蓱","蓳":"蓳","蓼":"蓼","蔖":"蔖","䔫":"䔫","蕤":"蕤","𦼬":"𦼬","藍":"藍","䕝":"䕝","𦾱":"𦾱","䕡":"䕡","藺":"藺","蘆":"蘆","䕫":"䕫","蘒":"蘒","蘭":"蘭","𧃒":"𧃒","虁":"蘷","蘿":"蘿","⾌":"虍","⻁":"虎","虐":"虐","虜":"虜","虜":"虜","虧":"虧","虩":"虩","⾍":"虫","蚩":"蚩","蚈":"蚈","蛢":"蛢","蜎":"蜎","蜨":"蜨","蝫":"蝫","蟡":"蟡","蝹":"蝹","蝹":"蝹","螆":"螆","䗗":"䗗","𧏊":"𧏊","螺":"螺","蠁":"蠁","䗹":"䗹","蠟":"蠟","⾎":"血","行":"行","⾏":"行","衠":"衠","衣":"衣","⾐":"衣","⻂":"衤","裂":"裂","𧙧":"𧙧","裏":"裏","裗":"裗","裞":"裞","裡":"裡","裸":"裸","裺":"裺","䘵":"䘵","褐":"褐","襁":"襁","襤":"襤","⾑":"襾","⻄":"西","⻃":"覀","覆":"覆","見":"見","⾒":"見","𧢮":"𧢮","⻅":"见","⾓":"角","⾔":"言","𧥦":"𧥦","詽":"訮","訞":"䚶","䚾":"䚾","䛇":"䛇","誠":"誠","說":"說","說":"說","調":"調","請":"請","諒":"諒","論":"論","諭":"諭","諭":"諭","諸":"諸","諸":"諸","諾":"諾","諾":"諾","謁":"謁","謁":"謁","謹":"謹","謹":"謹","識":"識","讀":"讀","讏":"讆","變":"變","變":"變","⻈":"讠","⾕":"谷","⾖":"豆","豈":"豈","豕":"豕","⾗":"豕","豣":"豜","⾘":"豸","𧲨":"𧲨","⾙":"貝","貫":"貫","賁":"賁","賂":"賂","賈":"賈","賓":"賓","贈":"贈","贈":"贈","贛":"贛","⻉":"贝","⾚":"赤","⾛":"走","起":"起","趆":"赿","𧻓":"𧻓","𧼯":"𧼯","⾜":"足","跋":"跋","趼":"趼","跺":"跥","路":"路","跰":"跰","躛":"躗","⾝":"身","車":"車","⾞":"車","軔":"軔","輧":"軿","輦":"輦","輪":"輪","輸":"輸","輸":"輸","輻":"輻","轢":"轢","⻋":"车","⾟":"辛","辞":"辞","辰":"辰","⾠":"辰","⾡":"辵","辶":"辶","⻌":"辶","⻍":"辶","巡":"巡","連":"連","逸":"逸","逸":"逸","遲":"遲","遼":"遼","𨗒":"𨗒","𨗭":"𨗭","邏":"邏","⾢":"邑","邔":"邔","郎":"郎","郞":"郎","郞":"郎","郱":"郱","都":"都","𨜮":"𨜮","鄑":"鄑","鄛":"鄛","⾣":"酉","酪":"酪","醙":"醙","醴":"醴","⾤":"釆","里":"里","⾥":"里","量":"量","金":"金","⾦":"金","鈴":"鈴","鈸":"鈸","鉶":"鉶","鋗":"鋗","鋘":"鋘","鉼":"鉼","錄":"錄","鍊":"鍊","鎮":"鎭","鏹":"鏹","鐕":"鐕","𨯺":"𨯺","⻐":"钅","⻑":"長","⾧":"長","⻒":"镸","⻓":"长","⾨":"門","開":"開","䦕":"䦕","閭":"閭","閷":"閷","𨵷":"𨵷","⻔":"门","⾩":"阜","⻏":"阝","⻖":"阝","阮":"阮","陋":"陋","降":"降","陵":"陵","陸":"陸","陼":"陼","隆":"隆","隣":"隣","䧦":"䧦","⾪":"隶","隷":"隷","隸":"隷","隸":"隷","⾫":"隹","雃":"雃","離":"離","難":"難","難":"難","⾬":"雨","零":"零","雷":"雷","霣":"霣","𩅅":"𩅅","露":"露","靈":"靈","⾭":"靑","⻘":"青","靖":"靖","靖":"靖","𩇟":"𩇟","⾮":"非","⾯":"面","𩈚":"𩈚","⾰":"革","䩮":"䩮","䩶":"䩶","⾱":"韋","韛":"韛","韠":"韠","⻙":"韦","⾲":"韭","𩐊":"𩐊","⾳":"音","響":"響","響":"響","⾴":"頁","䪲":"䪲","頋":"頋","頋":"頋","頋":"頋","領":"領","頩":"頩","𩒖":"𩒖","頻":"頻","頻":"頻","類":"類","⻚":"页","⾵":"風","𩖶":"𩖶","⻛":"风","⾶":"飛","⻜":"飞","⻝":"食","⾷":"食","⻟":"飠","飢":"飢","飯":"飯","飼":"飼","䬳":"䬳","館":"館","餩":"餩","⻠":"饣","⾸":"首","⾹":"香","馧":"馧","⾺":"馬","駂":"駂","駱":"駱","駾":"駾","驪":"驪","⻢":"马","⾻":"骨","䯎":"䯎","⾼":"高","⾽":"髟","𩬰":"𩬰","鬒":"鬒","鬒":"鬒","⾾":"鬥","⾿":"鬯","⿀":"鬲","⿁":"鬼","⻤":"鬼","⿂":"魚","魯":"魯","鱀":"鱀","鱗":"鱗","⻥":"鱼","⿃":"鳥","鳽":"鳽","䳎":"䳎","鵧":"鵧","䳭":"䳭","𪃎":"𪃎","鶴":"鶴","𪄅":"𪄅","䳸":"䳸","鷺":"鷺","𪈎":"𪈎","鸞":"鸞","鹃":"鹂","⿄":"鹵","鹿":"鹿","⿅":"鹿","𪊑":"𪊑","麗":"麗","麟":"麟","⿆":"麥","⻨":"麦","麻":"麻","⿇":"麻","𪎒":"𪎒","⿈":"黃","⻩":"黄","⿉":"黍","黎":"黎","䵖":"䵖","⿊":"黑","黒":"黑","墨":"墨","黹":"黹","⿋":"黹","⿌":"黽","鼅":"鼅","黾":"黾","⿍":"鼎","鼏":"鼏","⿎":"鼓","鼖":"鼖","⿏":"鼠","鼻":"鼻","⿐":"鼻","齃":"齃","⿑":"齊","⻬":"齐","⿒":"齒","𪘀":"𪘀","⻮":"齿","龍":"龍","⿓":"龍","龎":"龎","⻰":"龙","龜":"龜","龜":"龜","龜":"龜","⿔":"龜","⻳":"龟","⿕":"龠"}');

/***/ }),

/***/ 357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 614:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 605:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 211:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 631:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 87:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 622:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 16:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 835:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 669:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(109);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
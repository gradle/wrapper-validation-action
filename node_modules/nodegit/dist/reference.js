"use strict";

var util = require("util");
var NodeGit = require("../");
var LookupWrapper = NodeGit.Utils.lookupWrapper;

var Reference = NodeGit.Reference;
var Branch = NodeGit.Branch;

/**
* Retrieves the reference by it's short name
* @async
* @param {Repository} repo The repo that the reference lives in
* @param {String|Reference} id The reference to lookup
* @param {Function} callback
* @return {Reference}
*/
Reference.dwim = LookupWrapper(Reference, Reference.dwim);

/**
* Retrieves the reference pointed to by the oid
* @async
* @param {Repository} repo The repo that the reference lives in
* @param {String|Reference} id The reference to lookup
* @param {Function} callback
* @return {Reference}
*/
Reference.lookup = LookupWrapper(Reference);

/**
 * Returns true if this reference is not symbolic
 * @return {Boolean}
 */
Reference.prototype.isConcrete = function () {
  return this.type() == Reference.TYPE.DIRECT;
};

/**
 * Returns if the ref is pointed at by HEAD
 * @return {Boolean}
 */
Reference.prototype.isHead = function () {
  return Branch.isHead(this);
};

/**
 * Returns true if this reference is symbolic
 * @return {Boolean}
 */
Reference.prototype.isSymbolic = function () {
  return this.type() == Reference.TYPE.SYMBOLIC;
};

/**
 * Returns true if this reference is valid
 * @return {Boolean}
 */
Reference.prototype.isValid = function () {
  return this.type() != Reference.TYPE.INVALID;
};

/**
 * Returns the name of the reference.
 * @return {String}
 */
Reference.prototype.toString = function () {
  return this.name();
};

var getTerminal = function getTerminal(repo, refName) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var prevRef = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  if (depth <= 0) {
    return Promise.resolve({
      error: NodeGit.Error.CODE.ENOTFOUND,
      out: prevRef
    });
  }

  return NodeGit.Reference.lookup(repo, refName).then(function (ref) {
    if (ref.type() === NodeGit.Reference.TYPE.DIRECT) {
      return {
        error: NodeGit.Error.CODE.OK,
        out: ref
      };
    } else {
      return getTerminal(repo, ref.symbolicTarget(), depth - 1, ref).then(function (_ref) {
        var error = _ref.error,
            out = _ref.out;

        if (error === NodeGit.Error.CODE.ENOTFOUND && !out) {
          return { error: error, out: ref };
        } else {
          return { error: error, out: out };
        }
      });
    }
  }).catch(function (error) {
    return {
      error: error.errno,
      out: null
    };
  });
};

var getSignatureForReflog = function getSignatureForReflog(repo) {
  var _repo$ident = repo.ident(),
      email = _repo$ident.email,
      name = _repo$ident.name;

  if (email && name) {
    return Promise.resolve(NodeGit.Signature.now(name, email));
  }

  return NodeGit.Signature.default(repo).catch(function () {
    return NodeGit.Signature.now("unknown", "unknown");
  });
};

/**
 * Given a reference name, follows symbolic links and updates the direct
 * reference to point to a given OID. Updates the reflog with a given message.
 *
 * @async
 * @param {Repository} repo The repo where the reference and objects live
 * @param {String} refName The reference name to update
 * @param {Oid} oid The target OID that the reference will point to
 * @param {String} logMessage The reflog message to be writted
 * @param {Signature} signature Optional signature to use for the reflog entry
 */
Reference.updateTerminal = function (repo, refName, oid, logMessage, signature) {
  var signatureToUse = void 0;
  var promiseChain = Promise.resolve();

  if (!signature) {
    promiseChain = promiseChain.then(function () {
      return getSignatureForReflog(repo);
    }).then(function (sig) {
      signatureToUse = sig;
      return Promise.resolve();
    });
  } else {
    signatureToUse = signature;
  }

  return promiseChain.then(function () {
    return getTerminal(repo, refName);
  }).then(function (_ref2) {
    var error = _ref2.error,
        out = _ref2.out;

    if (error === NodeGit.Error.CODE.ENOTFOUND && out) {
      return NodeGit.Reference.create(repo, out.symbolicTarget(), oid, 0, logMessage);
    } else if (error === NodeGit.Error.CODE.ENOTFOUND) {
      return NodeGit.Reference.create(repo, refName, oid, 0, logMessage);
    } else {
      return NodeGit.Reference.createMatching(repo, out.name(), oid, 1, out.target(), logMessage);
    }
  }).then(function () {
    return NodeGit.Reflog.read(repo, refName);
  }).then(function (reflog) {
    // Janky, but works. Ideally, we would want to generate the correct reflog
    // entry in the first place, rather than drop the most recent entry and
    // write the correct one.
    // NOTE: There is a theoretical race condition that could happen here.
    // We may want to consider some kind of transactional logic to make sure
    // that the reflog on disk isn't modified before we can write back.
    reflog.drop(0, 1);
    reflog.append(oid, signatureToUse, logMessage);
    return reflog.write();
  });
};

// Deprecated -----------------------------------------------------------------

Object.defineProperty(NodeGit.Reference.TYPE, "OID", {
  get: util.deprecate(function () {
    return NodeGit.Reference.TYPE.DIRECT;
  }, "Use NodeGit.Reference.TYPE.DIRECT instead of NodeGit.Reference.TYPE.OID.")
});

Object.defineProperty(NodeGit.Reference.TYPE, "LISTALL", {
  get: util.deprecate(function () {
    return NodeGit.Reference.TYPE.ALL;
  }, "Use NodeGit.Reference.TYPE.ALL instead of NodeGit.Reference.TYPE.LISTALL.")
});

NodeGit.Reference.NORMALIZE = {};
Object.keys(NodeGit.Reference.FORMAT).forEach(function (key) {
  Object.defineProperty(NodeGit.Reference.NORMALIZE, "REF_FORMAT_" + key, {
    get: util.deprecate(function () {
      return NodeGit.Reference.FORMAT[key];
    }, "Use NodeGit.Reference.FORMAT." + key + " instead of " + ("NodeGit.Reference.NORMALIZE.REF_FORMAT_" + key + "."))
  });
});
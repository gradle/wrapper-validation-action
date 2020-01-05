"use strict";

var NodeGit = require("../");
var LookupWrapper = NodeGit.Utils.lookupWrapper;
var Tag = NodeGit.Tag;

var signatureRegexesBySignatureType = {
  gpgsig: [/-----BEGIN PGP SIGNATURE-----[\s\S]+?-----END PGP SIGNATURE-----/gm, /-----BEGIN PGP MESSAGE-----[\s\S]+?-----END PGP MESSAGE-----/gm],
  x509: [/-----BEGIN SIGNED MESSAGE-----[\s\S]+?-----END SIGNED MESSAGE-----/gm]
};

/**
 * Retrieves the tag pointed to by the oid
 * @async
 * @param {Repository} repo The repo that the tag lives in
 * @param {String|Oid|Tag} id The tag to lookup
 * @return {Tag}
 */
Tag.lookup = LookupWrapper(Tag);

/**
 * @async
 * @param {Repository} repo
 * @param {String} tagName
 * @param {Oid} target
 * @param {Signature} tagger
 * @return {String}
 */
Tag.createBuffer = function (repo, tagName, target, tagger, message) {
  return NodeGit.Object.lookup(repo, target, NodeGit.Object.TYPE.ANY).then(function (object) {
    if (!NodeGit.Object.typeisloose(object.type())) {
      throw new Error("Object must be a loose type");
    }

    var id = object.id().toString();
    var objectType = NodeGit.Object.type2String(object.type());
    var lines = ["object " + id, "type " + objectType, "tag " + tagName, "tagger " + tagger.toString(true) + "\n", "" + message + (message.endsWith("\n") ? "" : "\n")];
    return lines.join("\n");
  });
};

/**
 * @async
 * @param {Repository} repo
 * @param {String} tagName
 * @param {Oid} target
 * @param {Signature} tagger
 * @param {String} message
 * @param {Number} force
 * @param {Function} signingCallback Takes a string and returns a string
 *                                   representing the signed message
 * @return {Oid}
 */
Tag.createWithSignature = function (repo, tagName, target, tagger, message, force, signingCallback) {
  var tagBuffer = void 0;
  return Tag.createBuffer(repo, tagName, target, tagger, message).then(function (tagBufferResult) {
    tagBuffer = tagBufferResult;
    return signingCallback(tagBuffer);
  }).then(function (_ref) {
    var code = _ref.code,
        signedData = _ref.signedData;

    switch (code) {
      case NodeGit.Error.CODE.OK:
        {
          var normalizedEnding = signedData.endsWith("\n") ? "" : "\n";
          var signedTagString = tagBuffer + signedData + normalizedEnding;
          return Tag.createFromBuffer(repo, signedTagString, force);
        }
      case NodeGit.Error.CODE.PASSTHROUGH:
        return Tag.create(repo, tagName, target, tagger, message, force);
      default:
        {
          var error = new Error("Tag.createWithSignature threw with error code " + code);
          error.errno = code;
          throw error;
        }
    }
  });
};

/**
 * Retrieves the signature of an annotated tag
 * @async
 * @param {String} signatureType
 * @return {String|null}
 */
Tag.prototype.extractSignature = function () {
  var signatureType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "gpgsig";

  var id = this.id();
  var repo = this.repo;
  var signatureRegexes = signatureRegexesBySignatureType[signatureType];
  if (!signatureRegexes) {
    throw new Error("Unsupported signature type");
  }

  return repo.odb().then(function (odb) {
    return odb.read(id);
  }).then(function (odbObject) {
    var odbData = odbObject.toString();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = signatureRegexes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var regex = _step.value;

        var matchResult = odbData.match(regex);

        if (matchResult !== null) {
          return matchResult[0];
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    throw new Error("this tag is not signed");
  });
};
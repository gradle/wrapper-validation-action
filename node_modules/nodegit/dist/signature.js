"use strict";

var NodeGit = require("../");
var Signature = NodeGit.Signature;

var toPaddedDoubleDigitString = function toPaddedDoubleDigitString(number) {
  if (number < 10) {
    return "0" + number;
  }

  return "" + number;
};

/**
 * Standard string representation of an author.
 * @param {Boolean} withTime Whether or not to include timestamp
 * @return {String} Representation of the author.
 */
Signature.prototype.toString = function (withTime) {
  var name = this.name().toString();
  var email = this.email().toString();

  var stringifiedSignature = name + " <" + email + ">";

  if (!withTime) {
    return stringifiedSignature;
  }

  var when = this.when();
  var offset = when.offset();
  var offsetMagnitude = Math.abs(offset);
  var time = when.time();

  var sign = offset < 0 || when.sign() === "-" ? "-" : "+";
  var hours = toPaddedDoubleDigitString(Math.floor(offsetMagnitude / 60));
  var minutes = toPaddedDoubleDigitString(offsetMagnitude % 60);

  stringifiedSignature += " " + time + " " + sign + hours + minutes;
  return stringifiedSignature;
};
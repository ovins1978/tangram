'use strict';
// shared cucumber steps

var should = require('should'),
    assert = require('chai').assert,
    gl     = require("gl"),
    Scene  = require('../../src/scene');


module.exports = function () {


    this.Given(/^I have a sample dataset$/, function (cb) {
        assert.ok(typeof Scene === 'function');
        var scene = new Scene();

        assert.equal(scene.prototype, Scene);
        cb();
    });

    this.Given(/^I have a style$/, function (cb) {
        cb.pending();
    });

    this.When(/^I attempt to render a map$/, function (cb) {
        cb.pending();
    });

    this.Then(/^I should see an image$/, function (cb) {
        cb.pending();
    });

};


'use strict';
var wd = require('webdriver-sync');
var mocha = require('mocha');
var chai = require('chai');
var assert = chai.assert;
var webdrSetup = require('../setupWebdr.js');
var driver;

describe("toggle widget", function() {
  this.timeout(30000);

  before(function() {
    driver = webdrSetup.reset();
  });


  it("click toggle button", function() {
    var menu = driver.findElement(wd.By.id("toggleWidget"));
    webdrSetup.click(menu);
    var toggle = driver.findElement(wd.By.id("toggle"));
    toggle.click();
    assert.equal("Callback I", toggle.getText());
    toggle.click();
    assert.equal("Callback II", toggle.getText());
    toggle.click();
    assert.equal("Callback III", toggle.getText());
    toggle.click();
    assert.equal("Callback IV", toggle.getText());
    toggle.click();
    assert.equal("Callback I", toggle.getText());
  });
});

'use strict';
var wd = require('webdriver-sync');
var mocha = require('mocha');
var chai = require('chai');
var assert = chai.assert;
var webdrSetup = require('../setupWebdr.js');
var driver;


describe("pointer-events widget", function() {
  this.timeout(30000);

  before(function() {
    driver = webdrSetup.reset();
  });


  it("click event handling Click", function() {
    var menu = driver.findElement(wd.By.id("pointerEvents"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.xpath("//button[contains(@id,'click')]"));
    var clickButton = driver.findElement(wd.By.xpath("//button[contains(@id,'click')]"));
    clickButton.click();
    var infoarea = driver.findElement(wd.By.id("info-text"));
    assert.equal(infoarea.getText(), "Hit the \"click\" button!");
  });


  it("click event handling Tap", function() {
    var menu = driver.findElement(wd.By.id("pointerEvents"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.xpath("//button[contains(@id,'tap')]"));
    var tapButton = driver.findElement(wd.By.xpath("//button[contains(@id,'tap')]"));
    tapButton.click();
    var infoarea = driver.findElement(wd.By.id("info-text"));
    assert.equal(infoarea.getText(), "Hit the \"tap\" button!");
  });
});
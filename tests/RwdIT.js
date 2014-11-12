'use strict';
var wd = require('webdriver-sync');
var mocha = require('mocha');
var chai = require('chai');
var assert = chai.assert;
var webdrSetup = require('../setupWebdr.js');
var driver;

before(function() {
  this.timeout(30000);
  driver = webdrSetup.setup(wd);
});


after(function() {
  webdrSetup.teardown(driver);
});


describe("rwd widget", function() {
  this.timeout(30000);

  it("resize browser", function() {
    var menu = driver.findElement(wd.By.id("rwdModule"));
    webdrSetup.click(menu);
    var sizeText = driver.findElement(wd.By.id("qx-media-debug"));
    assert.equal("device-size-xlarge", sizeText.getText());
    driver.manage().window().setSize(new wd.Dimension(200, 400));
    wd.sleep(700);
    assert.equal("device-size-small", sizeText.getText());
    driver.manage().window().setSize(new wd.Dimension(900, 600));
    wd.sleep(700);
    assert.equal("device-size-medium", sizeText.getText());
    driver.manage().window().maximize();
    driver.manage().window().setSize(new wd.Dimension(1400, 1000));
    wd.sleep(700);
    assert.equal("device-size-large", sizeText.getText());
    driver.manage().window().maximize();
  });

});
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


describe("button widget", function() {
  this.timeout(30000);

  it("click button", function() {
    //drawer has also id 'buttonWidget'
    var menu = driver.findElements(wd.By.id("buttonWidget"));
    webdrSetup.click(menu[1]);
    wd.sleep(1000);
    var button = driver.findElement(wd.By.xpath("//button[contains(@id,'button-example')]"));
    button.click();
    var buttonMenu = driver.findElement(wd.By.id("buttonMenu"));
    assert.isTrue(buttonMenu.isDisplayed());
    driver.findElement(wd.By.id("action1")).click();
    var text = driver.findElement(wd.By.id("button-debug"));
    assert.equal("You have selected the 'Action 1'", text.getText());
  });
});
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

describe("rating widget", function() {
  this.timeout(30000);

  it("click at default settings", function() {
    var menu = driver.findElement(wd.By.id("ratingWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.id("ratingTarget1"));
    var items = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget1')]/span"));
    for (var i = 0; i < items.length; i++) {
      items[i].click();
      var value = driver.findElement(wd.By.id("ratingdebug1")).getText();
      assert.equal(value, "Value : " + (i + 1));
    }
  });


  it("initial value set", function() {
    var menu = driver.findElement(wd.By.id("ratingWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.id("ratingTarget2"));
    var items = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget2')]/span"));
    var itemsOff = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget2')]/span[contains(@class,'qx-rating-item qx-rating-item-off')]"));
    assert.equal(itemsOff.length, 3);
    for (var i = 0; i < items.length; i++) {
      items[i].click();
      var value = driver.findElement(wd.By.id("ratingdebug2")).getText();
      assert.equal(value, "Value : " + (i + 1));
    }
  });


  it("define rating length", function() {
    var menu = driver.findElement(wd.By.id("ratingWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.id("ratingTarget3"));
    var items = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget3')]/span"));
    var itemsOff = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget3')]/span[contains(@class,'qx-rating-item qx-rating-item-off')]"));
    assert.equal(items[0].getText(), "★");
    assert.equal(itemsOff.length, 8);
    for (var i = 0; i < items.length; i++) {
      items[i].click();
      var value = driver.findElement(wd.By.id("ratingdebug3")).getText();
      assert.equal(value, "Value : " + (i + 1));
    }
  });


  it("define custom icons", function() {
    var menu = driver.findElement(wd.By.id("ratingWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.id("ratingTarget4"));
    var items = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget4')]/span"));
    assert.equal(items[0].getText(), "♥");
    for (var i = 0; i < items.length; i++) {
      items[i].click();
      var value = driver.findElement(wd.By.id("ratingdebug4")).getText();
      assert.equal(value, "Value : " + (i + 1));
    }
  });


  it("define custom icons2", function() {
    var menu = driver.findElement(wd.By.id("ratingWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.id("ratingTarget5"));
    var items = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget5')]/span"));
    assert.equal(items[0].getText(), "✔");
    for (var i = 0; i < items.length; i++) {
      items[i].click();
      var value = driver.findElement(wd.By.id("ratingdebug5")).getText();
      assert.equal(value, "Value : " + (i + 1));
    }
  });
});

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


describe("lightbox widget", function() {
  this.timeout(30000);

  it("click First demo", function() {
    var menu = driver.findElement(wd.By.id("lightboxWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.id("firstControl"));
    driver.findElement(wd.By.id("firstControl")).click();
    var lightbox = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-lightbox-content lightbox_content')]")).getText();
    assert.equal("Please log in\nUsername:\nPassword:", lightbox);
    wd.sleep(500);
    var esc = driver.findElement(wd.By.id("button-1"))
    webdrSetup.click(esc);
  });


  it("click Second demo", function() {
    wd.sleep(300);
    var menu = driver.findElement(wd.By.id("lightboxWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.id("secondControl"));
    driver.findElement(wd.By.id("secondControl")).click();
    wd.sleep(300);
    var lightbox = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-lightbox-content lightbox_content')]")).getText();
    assert.equal("Small demo to demonstrate that the lightBox configuration includes also the color and the transparency of the blocker element.", lightbox);
    driver.findElement(wd.By.id("button-2")).click();
  });
});
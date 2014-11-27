'use strict';
var wd = require('webdriver-sync');
var mocha = require('mocha');
var chai = require('chai');
var assert = chai.assert;
var webdrSetup = require('../setupWebdr.js');
var driver;


describe("tabs widget", function() {
  this.timeout(30000);

  before(function() {
    driver = webdrSetup.reset();
  });


  it("click next tab", function() {
    var menu = driver.findElement(wd.By.id("tabsWidget"));
    webdrSetup.click(menu);
    var textHtml = driver.findElement(wd.By.id("demo-page0")).getText();
    var tab2 = driver.findElement(wd.By.xpath("//li[contains(@class,'qx-tabs-button')][text()='JavaScript']"));
    tab2.click();
    var textJS = driver.findElement(wd.By.id("demo-page1")).getText();
    var tab3 = driver.findElement(wd.By.xpath("//li[contains(@class,'qx-tabs-button')][text()='Css']"));
    tab3.click();
    var textCss = driver.findElement(wd.By.id("demo-page2")).getText();
    var tab4 = driver.findElement(wd.By.xpath("//li[contains(@class,'qx-tabs-button')][text()='NodeJs']"));
    tab4.click();
    var textNodeJS = driver.findElement(wd.By.id("demo-page3"));
    assert.notEqual(textHtml, textJS, textCss, textNodeJS);
  });
});

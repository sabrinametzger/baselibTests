'use strict';
var wd = require('webdriver-sync');
var mocha = require('mocha');
var chai = require('chai');
var assert = chai.assert;
var webdrSetup = require('../setupWebdr.js');
var driver;


describe("select box widget", function() {
  this.timeout(30000);

  before(function() {
    driver = webdrSetup.reset();
  });


  it("select value", function() {
    var menu = driver.findElement(wd.By.id("selectboxWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.xpath("//div[contains(@class,'qx-select-value')]"));
    var select = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-select-value')]"));
    assert.equal(select.getText(), "Joomla");
    select.click();
    var slideshareEl = driver.findElement(wd.By.xpath("//ul[contains(@id,'mySelectBox')]/descendant::p[text()='Slideshare']"));
    slideshareEl.click();
    var debug = driver.findElement(wd.By.id("debug"));
    assert.equal(debug.getText(), "selectedIndex : 1");
    var submit = driver.findElement(wd.By.xpath("//input[contains(@type,'submit')]"));
    submit.click();
    assert.equal(debug.getText(), 'document.forms["testForm"].elements["mySelectBox"].value = Slideshare');
  });
});

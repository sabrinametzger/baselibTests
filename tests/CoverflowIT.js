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


describe("coverflow widget", function() {
  this.timeout(30000);

  it("check submenu", function() {
    var menu = driver.findElement(wd.By.id("coverflowWidget"));
    webdrSetup.click(menu);
    var submenu1 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '2D-style']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '3D-style']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized layout']"));
    var submenu4 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Carousel mode']"));
    assert.isTrue(submenu1.isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed() && submenu4.isDisplayed());
  });


  it("check 2D-style", function() {
    var menu = driver.findElement(wd.By.id("coverflowWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '2D-style']")).click();
    webdrSetup.waitUntil(wd.By.xpath("//li[contains(@id,'item2')]"));
    driver.findElement(wd.By.xpath("//li[contains(@id,'item2')]")).click();
    webdrSetup.waitUntil(wd.By.xpath("//li[contains(@id,'item3')]"));
    driver.findElement(wd.By.xpath("//li[contains(@id,'item3')]")).click();
  });


  it("check 3D-style", function() {
    var menu = driver.findElement(wd.By.id("coverflowWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '3D-style']")).click();
    var el = driver.findElement(wd.By.xpath("//li[contains(@id,'item3')]"));
    webdrSetup.waitUntil(wd.By.xpath("//li[contains(@id,'item2')]"));
    driver.findElement(wd.By.xpath("//li[contains(@id,'item2')]")).click();
    wd.sleep(400);
    el.click();
  });


  it("check customized layout", function() {
    var menu = driver.findElement(wd.By.id("coverflowWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized layout']")).click();
    wd.sleep(500);
    var elements = driver.findElements(wd.By.xpath("//li[contains(@class,'qx-coverflow-right')]"));
    elements[1].click();
    wd.sleep(1000);
    var elementsLeft = driver.findElements(wd.By.xpath("//li[contains(@class,'qx-coverflow-left')]"));
    elementsLeft[3].click();
  });


  it("check carousel mode", function() {
    var menu = driver.findElement(wd.By.id("coverflowWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Carousel mode']")).click();
    var el = driver.findElements(wd.By.xpath("//div[contains(@class,'indicator-item')]"));
    wd.sleep(500);
    el[1].click();
  });

});
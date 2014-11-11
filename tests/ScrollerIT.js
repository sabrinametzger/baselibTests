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

describe("scroller widget", function() {
  this.timeout(700000);
  it("check submenu", function() {
    var menu = driver.findElement(wd.By.id("scrollerWidget"));
    webdrSetup.click(menu);
    var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized scrollbar']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Horizontal scroller']"));
    assert.isTrue(submenu1[2].isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed());
    webdrSetup.click(menu);
  });

  //test fails, no method found to simulate scrolling
  it.skip("check default layout", function() {
    wd.sleep(2000);
    var menu = driver.findElement(wd.By.id("scrollerWidget"));
    webdrSetup.click(menu);
    var submenu = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));
    submenu[2].click();
    wd.sleep(1000);
    var scroller = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-scroller-vscrollbar qxVScrollbar')]"));
    driver.getMouse()._instance.mouseDownSync(scroller._instance.getCoordinatesSync());
    var item3 = driver.findElement(wd.By.id("item3"));
    var item4 = driver.findElement(wd.By.id("item4"));
    var item6 = driver.findElement(wd.By.id("item6"));
    var item12 = driver.findElement(wd.By.id("item12"));
    var item14 = driver.findElement(wd.By.id("item49"));
    var item18 = driver.findElement(wd.By.id("item49"));
    var item30 = driver.findElement(wd.By.id("item49"));
    driver.getMouse()._instance.mouseMoveSync(item3._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(item4._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(item6._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(item12._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseUpSync(item12._instance.getCoordinatesSync());
    var item49 = driver.findElement(wd.By.id("item49"));
    item12.sendKeys(wd.Keys.PAGE_UP);
    assert.isTrue(item49.isDisplayed());
  });

  it.skip("scroll horizontal", function() {
    var menu = driver.findElement(wd.By.id("scrollerWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Horizontal scroller']")).click();
    wd.sleep(4000);
    var scroller = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-scroller-hscrollbar qxHScrollbar')]"));
    driver.getMouse()._instance.mouseDownSync(scroller._instance.getCoordinatesSync());
    var item8 = driver.findElement(wd.By.id("item8"));
    driver.getMouse()._instance.mouseMoveSync(item8._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseUpSync(item8._instance.getCoordinatesSync());
    wd.sleep(4000);
  });
});
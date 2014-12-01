'use strict';
var wd = require('webdriver-sync');
var mocha = require('mocha');
var chai = require('chai');
var assert = chai.assert;
var webdrSetup = require('../setupWebdr.js');
var driver;


describe("drawer widget", function() {
  this.timeout(30000);

  before(function() {
    driver = webdrSetup.reset();
  });


  it("show drawer left", function() {
    //first drawer
    var menu = driver.findElement(wd.By.id("drawerWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show left drawer I']")).click();
    var left1 = driver.findElement(wd.By.id("drawer4"));
    assert.isTrue(left1.isDisplayed(), "1");
    wd.sleep(1000);
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer4')]")).click();
    wd.sleep(1000);
    //2nd drawer
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show left drawer II']")).click();
    var left2 = driver.findElement(wd.By.id("drawer5"));
    assert.isTrue(left2.isDisplayed(), "2");
    wd.sleep(1000);
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer5')]")).click();
    wd.sleep(1000);
    //3rd drawer
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show left drawer III']")).click();
    var left3 = driver.findElement(wd.By.id("drawer6"));
    assert.isTrue(left3.isDisplayed(), "3");
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer6')]")).click();
  });


  it("show drawer right", function() {
    //first drawer
    var menu = driver.findElement(wd.By.id("drawerWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show right drawer I']")).click();
    var right1 = driver.findElement(wd.By.id("drawer7"));
    assert.isTrue(right1.isDisplayed(), "1");
    wd.sleep(1000);
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer7')]")).click();
    wd.sleep(1000);
    //2nd drawer
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show right drawer II']")).click();
    var right2 = driver.findElement(wd.By.id("drawer8"));
    assert.isTrue(right2.isDisplayed(), "2");
    wd.sleep(1000);
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer8')]")).click();
    wd.sleep(1000);
    //3rd drawer
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show right drawer III']")).click();
    var right3 = driver.findElement(wd.By.id("drawer9"));
    assert.isTrue(right3.isDisplayed(), "3");
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer9')]")).click();
  });


  it("show drawer top", function() {
    //first drawer
    var menu = driver.findElement(wd.By.id("drawerWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show top drawer I']")).click();
    var top1 = driver.findElement(wd.By.id("drawer1"));
    assert.isTrue(top1.isDisplayed(), "1");
    wd.sleep(1000);
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer1')]")).click();
    wd.sleep(1000);
    //2nd drawer
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show top drawer II']")).click();
    var top2 = driver.findElement(wd.By.id("drawer2"));
    assert.isTrue(top2.isDisplayed(), "2");
    wd.sleep(1000);
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer2')]")).click();
    wd.sleep(1000);
    //3rd drawer
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show top drawer III']")).click();
    var top3 = driver.findElement(wd.By.id("drawer3"));
    assert.isTrue(top3.isDisplayed(), "3");
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer3')]")).click();
  });


  it("show drawer bottom", function() {
    //first drawer
    var menu = driver.findElement(wd.By.id("drawerWidget"));
    webdrSetup.click(menu);
    wd.sleep(1000);
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show bottom drawer I']")).click();
    var bottom1 = driver.findElement(wd.By.id("drawer10"));
    assert.isTrue(bottom1.isDisplayed(), "1");
    wd.sleep(1000);
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer10')]")).click();
    wd.sleep(1000);
    //2nd drawer
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show bottom drawer II']")).click();
    var bottom2 = driver.findElement(wd.By.id("drawer11"));
    assert.isTrue(bottom2.isDisplayed(), "2");
    wd.sleep(1000);
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer11')]")).click();
    wd.sleep(1500);
    //3rd drawer
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show bottom drawer III']")).click();
    var bottom3 = driver.findElement(wd.By.id("drawer12"));
    wd.sleep(1000);
    assert.isTrue(bottom3.isDisplayed(), "3");
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer12')]")).click();
  });


  it("click reset", function() {
    var menu = driver.findElement(wd.By.id("drawerWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show left drawer I']")).click();
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a2')][text()='RESET']")).click();
  });
});
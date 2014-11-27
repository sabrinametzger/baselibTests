'use strict';
var wd = require('webdriver-sync');
var mocha = require('mocha');
var chai = require('chai');
var assert = chai.assert;
var webdrSetup = require('../setupWebdr.js');
var driver;


describe("autocompletion widget", function() {
  this.timeout(30000);

  before(function() {
    driver = webdrSetup.reset();
  });


  it("check submenu", function() {
    var menu = driver.findElement(wd.By.id("autocompletionWidget"));
    webdrSetup.click(menu);
    var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized result list']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Result grouping']"));
    var submenu4 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Multiple datasources']"));
    assert.isTrue(submenu1[1].isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed() && submenu4.isDisplayed());
  });


  it("autocomplete default", function() {
    var menu = driver.findElement(wd.By.id("autocompletionWidget"));
    webdrSetup.click(menu);
    var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));
    submenu1[1].click();
    webdrSetup.waitUntil(wd.By.id("autocomplete"));
    var input = driver.findElement(wd.By.id("autocomplete"));
    input.sendKeys("Karl");
    input.sendKeys(wd.Keys.ENTER);
    assert.equal(input.getAttribute("value"), "Karlsruhe");
  });


  it("customized result list", function() {
    var menu = driver.findElement(wd.By.id("autocompletionWidget"));
    webdrSetup.click(menu);
    var submenu = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized result list']"));
    submenu.click();
    wd.sleep(400);
    var input = driver.findElement(wd.By.id("autocomplete"));
    input.sendKeys("dai");
    input.sendKeys(wd.Keys.ENTER);
    assert.equal(input.getAttribute("value"), "DAILYMOTION");
  });


  it("result grouping", function() {
    var menu = driver.findElement(wd.By.id("autocompletionWidget"));
    webdrSetup.click(menu);
    wd.sleep(200);
    var submenu = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Result grouping']"));
    submenu.click();
    wd.sleep(500);
    var input = driver.findElement(wd.By.id("autocomplete"));
    input.click();
    input.sendKeys("ma");
    input.sendKeys(wd.Keys.ENTER);
    input.sendKeys(wd.Keys.RETURN);
    wd.sleep(400);
    assert.equal(input.getAttribute("value"), "Matlab");
  });
});

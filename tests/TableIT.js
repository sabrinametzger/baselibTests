'use strict';
var wd = require('webdriver-sync');
var mocha = require('mocha');
var chai = require('chai');
var assert = chai.assert;
var webdrSetup = require('../setupWebdr.js');
var driver;


describe("table widget", function() {
  this.timeout(30000);

  before(function() {
    driver = webdrSetup.reset();
  });


  it("check submenu", function() {
    var menu = driver.findElement(wd.By.id("tableWidget"));
    webdrSetup.click(menu);
    var submenu1 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Dom based table']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Model based table']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Custom paging']"));
    assert.isTrue(submenu1.isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed());
  });


  it("check Dom based table", function() {
    var menu = driver.findElement(wd.By.id("tableWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Dom based table']")).click();
    var tableLength = driver.findElements(wd.By.xpath("//table[contains(@id,employeetable)]//tbody//tr")).length;
    var filterKeyword = driver.findElement(wd.By.id("filterKeyword"));
    filterKeyword.sendKeys("Tokyo");
    driver.findElement(wd.By.id("filterButton")).click();
    wd.sleep(1000);
    assert.equal(driver.findElements(wd.By.xpath("//table[contains(@id,employeetable)]//tbody//tr")).length, 3);
    driver.findElement(wd.By.id("resetButton")).click();
    assert.equal(tableLength, driver.findElements(wd.By.xpath("//table[contains(@id,employeetable)]//tbody//tr")).length);
  });


  it("check model based table", function() {
    var menu = driver.findElement(wd.By.id("tableWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Model based table']")).click();
    var tableLength = driver.findElements(wd.By.xpath("//table[contains(@id,employeetable)]//tbody//tr")).length;
    var filterKeyword = driver.findElement(wd.By.id("filterKeyword"));
    filterKeyword.sendKeys("Tokyo");
    driver.findElement(wd.By.id("filterButton")).click();
    wd.sleep(1000);
    assert.equal(driver.findElements(wd.By.xpath("//table[contains(@id,employeetable)]//tbody//tr")).length, 5);

    driver.findElement(wd.By.xpath("//th[contains(@class,'qx-table-row-selection qx-table-header')]")).click();
    var selected = driver.findElements(wd.By.xpath("//td[contains(@class,'qx-table-row-selection qx-table-cell')]"));
    assert.equal(selected.length, 5);

    driver.findElement(wd.By.id("resetButton")).click();
    assert.equal(tableLength, driver.findElements(wd.By.xpath("//table[contains(@id,employeetable)]//tbody//tr")).length);
  });


  it("check custom paging", function() {
    var menu = driver.findElement(wd.By.id("tableWidget"));
    menu.click();
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Custom paging']")).click();
    webdrSetup.waitUntil(wd.By.xpath("//div[contains(@class,'clearfix')]/span"));
    var pages = driver.findElements(wd.By.xpath("//div[contains(@class,'clearfix')]/span"));
    pages[0].click();

    assert.isTrue(pages[0].getText() == "4");
    assert.isTrue(driver.findElements(wd.By.xpath("//div[contains(@class,'qx-table-cell')]"))[0].getText().indexOf("Shou") != -1);
  });

});
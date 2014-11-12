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


describe("datePicker widget", function() {
  this.timeout(30000);

  it("check headline", function() {
    var menu = driver.findElement(wd.By.id("datePickerWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.xpath("//h1[contains(@class,'headline-a1')]"));
    var headline = driver.findElement(wd.By.xpath("//h1[contains(@class,'headline-a1')]")).getText();
    assert.equal(headline, "Date Picker");
  });


  it("check date picker with user input enabled", function() {
    var input = driver.findElement(wd.By.id("datepicker-basic"));
    input.click();
    var datepicker = driver.findElement(wd.By.xpath("//table[contains(@class,'qx-calendar-container')]"));
    assert.isTrue(datepicker.isDisplayed());
    input.sendKeys("01/01/2015");
    assert.equal("01/01/2015", input.getAttribute("value"));
    input.click();
  });


  it("check date picker with additional icon", function() {
    var icon = driver.findElement(wd.By.xpath("//img[contains(@class,'qx-datepicker-icon')]"));
    icon.click();
    var datepicker = driver.findElements(wd.By.xpath("//table[contains(@class,'qx-calendar-container')]"));
    assert.isTrue(datepicker[1].isDisplayed());
    icon.click();
  });

  //cannot pick a day
  it("check date picker with configured format", function() {
    var input = driver.findElement(wd.By.id("datepicker-format"));
    input.click();
    var datepicker = driver.findElements(wd.By.xpath("//table[contains(@class,'qx-calendar-container')]"))[2];
    wd.sleep(2000);
    var days = datepicker.findElements(wd.By.className("qx-calendar-day"));
    days[12].click();
    var regExp = new RegExp(/(\w\w\w)\s(\w\w\w)\s(\d\d)\s(\d\d\d\d)/);
    var text = driver.findElement(wd.By.id("datepicker-format")).getAttribute("value");
    assert.match(text, regExp);
  });


  it("check date picker with localized weekdays", function() {
    var textfield = driver.findElement(wd.By.id("datepicker-localized"));
    textfield.click();
    var datepicker = driver.findElements(wd.By.xpath("//table[contains(@class,'qx-calendar-container')]"));
    assert.isTrue(datepicker[3].getText().indexOf("Lun Mar Mer Jeu Ven Sam Dim") != -1);
    assert.isTrue(datepicker[3].isDisplayed());
    textfield.click();
  });
});

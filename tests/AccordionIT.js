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

describe("accordion widget", function() {
  this.timeout(30000);

  it("show content", function() {
    var menu = driver.findElement(wd.By.id("accordionWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.id('menuwrapper'));
    var buttonA1 = driver.findElements(wd.By.xpath("//div[contains(@class,'button-a1')]"));
    wd.sleep(500);
    var content = driver.findElements(wd.By.xpath("//div[contains(@class,'contentWrapper')]"));
    assert.isTrue(content[0].isDisplayed());
  });


  it("show content2", function() {
    var menu = driver.findElement(wd.By.id("accordionWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.id('menuwrapper'));
    var buttonA1 = driver.findElements(wd.By.xpath("//div[contains(@class,'button-a1')]"));
    buttonA1[1].click();
    wd.sleep(500);
    assert.equal(buttonA1[1].getText(), "JavaScript");
    var content = driver.findElements(wd.By.xpath("//div[contains(@class,'contentWrapper')]"));
    assert.isTrue(content[1].isDisplayed());
  });
});

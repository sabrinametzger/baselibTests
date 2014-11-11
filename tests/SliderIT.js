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

describe("slider widget", function() {
  this.timeout(30000);

  beforeEach(function() {
    wd.sleep(2000);
  });

  it("check slider positive", function() {
    var menu = driver.findElement(wd.By.id("sliderWidget"));
    webdrSetup.click(menu);
    var knob = driver.findElement(wd.By.id("knob2"));
    assert.equal(knob.getText(), "0");
    var slider = driver.findElement(wd.By.id("myslider2"));
    wd.sleep(500);
    driver.getMouse()._instance.mouseDownSync(knob._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(slider._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseUpSync(slider._instance.getCoordinatesSync());
    assert.equal(knob.getText(), "500");
  });


  it("check slider negative", function() {
    var menu = driver.findElement(wd.By.id("sliderWidget"));
    webdrSetup.click(menu);
    var knob = driver.findElement(wd.By.id("knob"));
    assert.equal(knob.getText(), "-10");
    var slider = driver.findElement(wd.By.id("myslider"));
    wd.sleep(1000);
    driver.getMouse()._instance.mouseDownSync(knob._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(slider._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseUpSync(slider._instance.getCoordinatesSync());
    assert.equal(knob.getText(), "0");
  });


  it("check slider with scaling", function() {
    var menu = driver.findElement(wd.By.id("sliderWidget"));
    webdrSetup.click(menu);

    var knob = driver.findElement(wd.By.xpath("//div[contains(@class,'knob alphapng knob2')]"));
    // var slider = driver.findElement(wd.By.xpath("//div[contains(@class,'myslider pos1 alphapng qx-widget qx-slider')]"));
    var positionBefore = knob.getLocation().getX();
    var slider = driver.findElement(wd.By.id("slider-body-cpu"));
    wd.sleep(500);
    driver.getMouse()._instance.mouseDownSync(knob._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(slider._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseUpSync(slider._instance.getCoordinatesSync());
    var positionAfter = knob.getLocation().getX();
    assert.isTrue(positionBefore < positionAfter);
  });

});

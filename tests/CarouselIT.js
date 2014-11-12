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


describe("carousel widget", function() {
  this.timeout(50000);

  it("check submenu", function() {
    var menu = driver.findElement(wd.By.id("carouselWidget"));
    webdrSetup.click(menu);
    var submenu1 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Endless loop']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Auto-animated endless loop']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'No loop mode']"));
    assert.isTrue(submenu1.isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed());
  });


  it("check endless loop", function() {
    var menu = driver.findElement(wd.By.id("carouselWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Endless loop']")).click();
    webdrSetup.waitUntil(wd.By.xpath("//div[contains(@class,'qx-carousel-arrow qx-carousel-backward')]"));
    driver.findElement(wd.By.xpath("//div[contains(@class,'qx-carousel-arrow qx-carousel-backward')]")).click();
    webdrSetup.waitUntil(wd.By.xpath("//img[contains(@alt,'Grass')]"));
    var img = driver.findElement(wd.By.xpath("//img[contains(@alt,'Grass')]"));
    assert.isTrue(img.isDisplayed());
    driver.findElement(wd.By.xpath("//div[contains(@class,'qx-carousel-arrow qx-carousel-forward')]")).click();
    webdrSetup.waitUntil(wd.By.xpath("//img[contains(@alt,'Autumn')]"));
    var img2 = driver.findElement(wd.By.xpath("//img[contains(@alt,'Autumn')]"));
    assert.isTrue(img2.isDisplayed());
  });


  it("check auto-animated", function(done) {
    var img;
    var menu = driver.findElement(wd.By.id("carouselWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Auto-animated endless loop']")).click();

    webdrSetup.waitUntil(wd.By.xpath("//img[contains(@alt,'Autumn')]"));
    img = driver.findElement(wd.By.xpath("//img[contains(@alt,'Autumn')]"));
    assert.isTrue(img.isDisplayed());
    wd.sleep(2800);
    assert.isFalse(img.isDisplayed());
  });


  it("check no loop mode", function() {
    var forward;
    var menu = driver.findElement(wd.By.id("carouselWidget"));
    webdrSetup.click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'No loop mode']")).click();
    webdrSetup.waitUntil(wd.By.xpath("//div[contains(@class,'qx-carousel-arrow qx-carousel-forward')]"));
    forward = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-carousel-arrow qx-carousel-forward')]"));
    var images = driver.findElements(wd.By.xpath("//li[contains(@class,'qx-carousel-view-item')]"));
    for (var i = 0; i < 7; i++) {
      webdrSetup.waitUntilVisible(images[i]);
      forward.click();
    }
    wd.sleep(1000);
    assert.isFalse(forward.isDisplayed());

  });

});

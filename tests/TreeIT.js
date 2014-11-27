'use strict';
var wd = require('webdriver-sync');
var mocha = require('mocha');
var chai = require('chai');
var assert = chai.assert;
var webdrSetup = require('../setupWebdr.js');
var driver;


describe("tree widget", function() {
  this.timeout(30000);

  before(function() {
    driver = webdrSetup.reset();
  });


  beforeEach(function() {
    wd.sleep(2000);
  });

  it("create new folder", function() {
    var menu = driver.findElement(wd.By.id("treeWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.id("createFolder"));
    driver.findElement(wd.By.id("createFolder")).click();
    driver.findElement(wd.By.id("editFolder")).sendKeys("Testfolder");
    driver.findElement(wd.By.id("confirmNewFolder")).click();
    var tree = driver.findElement(wd.By.xpath("//ul[contains(@class,'qx-tree baselib-tree')]"));
    assert.isTrue(tree.getText().indexOf("Testfolder") != -1);
  });


  it("cancel folder", function() {
    var menu = driver.findElement(wd.By.id("treeWidget"));
    webdrSetup.click(menu);
    webdrSetup.waitUntil(wd.By.id("createFolder"));
    driver.findElement(wd.By.id("createFolder")).click();
    driver.findElement(wd.By.id("editFolder")).sendKeys("Testfolder2");
    driver.findElement(wd.By.id("cancelNewFolder")).click();
    var tree = driver.findElement(wd.By.xpath("//ul[contains(@class,'qx-tree baselib-tree')]"));
    assert.isTrue(tree.getText().indexOf("Testfolder2") == -1);
  });


  it("enable multi selection", function() {
    driver.findElement(wd.By.id("enablemulti")).click();
    var checkboxes = driver.findElements(wd.By.xpath("//input[contains(@class,'qx-tree-checkbox baselib-tree-checkbox')]"));

    for (var i = 1; i < checkboxes.length; i++) {
      checkboxes[i].click();
      assert.isTrue(checkboxes[i].isSelected());
      checkboxes[i].click();
      assert.isFalse(checkboxes[i].isSelected());
    }
    checkboxes[0].click();

    for (var index in checkboxes) {
      assert.isTrue(checkboxes[index].isSelected());
    }
  });


  it("disable multi selection", function() {
    var menu = driver.findElement(wd.By.id("treeWidget"));
    webdrSetup.click(menu);
    wd.sleep(2000);
    driver.findElement(wd.By.id("enablemulti")).click();
    var checkboxes = driver.findElements(wd.By.xpath("//input[contains(@class,'qx-tree-checkbox baselib-tree-checkbox')]"));
    checkboxes[0].click();
    assert.isTrue(checkboxes[0].isDisplayed());
    driver.findElement(wd.By.id("disablemulti")).click();
  });
});

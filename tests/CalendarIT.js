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

describe("calendar widget", function() {
    this.timeout(30000);
  // it("check submenu", function() {
  //   var menu = driver.findElement(wd.By.id("calendarWidget"));
  //   webdrSetup.click(menu);

  //   var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));
  //   var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Range selection']"));
  //   var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Custom range selection 1']"));
  //   var submenu4 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Custom range selection 2']"));
  //   assert.isTrue(submenu1[0].isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed() && submenu4.isDisplayed());
  // });


  // it("check default layout", function() {
  //   var menu = driver.findElement(wd.By.id("calendarWidget"));
  //   webdrSetup.click(menu);
  //   var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));
  //   submenu1[0].click();
  //   var day = driver.findElements(wd.By.xpath("//button[contains(@class,'qx-calendar-day')]"));
  //   //in this case it is not possible to check the attribute after clicking
  //   var dayText = day[16].getAttribute("value");

  //   // console.log(day[16].getAttribute("value"));
  //   var regExp = new RegExp(/(\w\w\w)\s(\w\w\w)\s(\d\d)\s(\d\d\d\d)/);
  //   var date = dayText.match(regExp);
  //   var daySelected = date[3];
  //   day[16].click();
  //   //assert.match(dayText,regExp);
  //   var d = new Date();
  //   var n = d.getMonth();
  //   var y = d.getFullYear();
  //   var output = driver.findElement(wd.By.id("output"));
  //   if (output.getText() === ("Current Date: " + daySelected + "." + (n + 1) + "." + y) || output.getText() === ("Current Date: " + (n+1) + "/" + daySelected+ "/" + y)) {
  //     assert.isTrue(true);
  //   } else {
  //     assert.isTrue(false);
  //   }
  // });

  it("check range selection", function() {
    var menu = driver.findElement(wd.By.id("calendarWidget"));
    webdrSetup.click(menu);
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Range selection']"));
    submenu2.click();
    var days = driver.findElements(wd.By.xpath("//button[contains(@class,'qx-calendar-day')]"));
    days[14].click();
    var nextDays = driver.findElements(wd.By.xpath("//button[contains(@class,'qx-calendar-day')]"));
    nextDays[17].click();
    var selectedDays = driver.findElements(wd.By.xpath("//td[contains(@class,'qx-calendar-selected')]"));
    assert.isTrue(selectedDays.length === 4);
  });

  it("check custom range selection 1", function() {
    var menu = driver.findElement(wd.By.id("calendarWidget"));
    webdrSetup.click(menu);
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Custom range selection 1']"));
    submenu2.click();
    var start = driver.findElement(wd.By.id("range-start"));
    start.click();
    var startCalendarDisplayed = true;

    while (startCalendarDisplayed && driver.findElements(wd.By.xpath("//td[contains(@colspan,5)]"))[1].getText() != "November 2014") {
      driver.findElements(wd.By.xpath("//button[contains(@class,'qx-calendar-prev')]"))[1].click();
    }

    var startCalendar = driver.findElements(wd.By.xpath("//div[contains(@id,'datepicker-calendar-')]"))[0];
    var endCalendar = driver.findElements(wd.By.xpath("//div[contains(@id,'datepicker-calendar-')]"))[1];
    var daysStart = driver.findElements(wd.By.xpath("//div[contains(@id,'datepicker-calendar-')]//button"));
    daysStart[17].click();
    startCalendarDisplayed = false;


    var end = driver.findElement(wd.By.id("range-end"));
    end.click();
    while (!startCalendarDisplayed && driver.findElements(wd.By.xpath("//td[contains(@colspan,5)]"))[2].getText() != "November 2014") {
      driver.findElements(wd.By.xpath("//button[contains(@class,'qx-calendar-prev')]"))[2].click();
    }
    var daysEnd = endCalendar.findElements(wd.By.className("qx-calendar-day"));
    daysEnd[19].click();

    var selectedDays = driver.findElements(wd.By.xpath("//td[contains(@class,'qx-calendar-selected')]"));
    //+2 for start and end date
    assert.isTrue(selectedDays.length === 7);
    if (start.getAttribute("value") === "11.11.2014" || start.getAttribute("value") === "11/11/2014") {
      assert.isTrue(true);
    } else {
      assert.isTrue(false);
    }
    if (end.getAttribute("value") === "15.11.2014" || end.getAttribute("value") === "11/15/2014") {
      assert.isTrue(true);
    } else {
      assert.isTrue(false);
    }

  });


  it("check custom range selection 2", function() {
    var menu = driver.findElement(wd.By.id("calendarWidget"));
    webdrSetup.click(menu);
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Custom range selection 2']"));
    submenu2.click();

    while (driver.findElement(wd.By.xpath("//td[contains(@colspan,5)]")).getText() != "November 2014") {
      driver.findElement(wd.By.xpath("//button[contains(@class,'qx-calendar-prev')]")).click();
    }

    var days = driver.findElements(wd.By.xpath("//button[contains(@class,'qx-calendar-day')]"));
    days[14].click();
    var nextDays = driver.findElements(wd.By.xpath("//button[contains(@class,'qx-calendar-day')]"));
    nextDays[17].click();

    var start = driver.findElement(wd.By.id("range-start"));
    var end = driver.findElement(wd.By.id("range-end"));
    if (start.getAttribute("value") === "10.11.2014" || start.getAttribute("value") === "11/10/2014") {
      assert.isTrue(true);
    } else {
      assert.isTrue(false);
    }
    if (end.getAttribute("value") === "13.11.2014" || end.getAttribute("value") === "11/13/2014") {
      assert.isTrue(true);
    } else {
      assert.isTrue(false);
    }

  });

});

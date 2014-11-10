'use strict';
var wd = require('webdriver-sync');
var chai = require('chai');
var assert = chai.assert;
var FirefoxDriver;
var driver;

before(function() {
  this.timeout(30000);
  FirefoxDriver = wd.FirefoxDriver;
  driver = new FirefoxDriver();
  driver.get("http://baselib.ai.1und1.de/0.9.24-SNAPSHOT/docs/demos/");
  driver.manage().window().maximize();
})
after(function() {
  driver.quit();
});

describe("carousel widget", function() {
  this.timeout(30000);

  it("check submenu", function() {
    var menu = driver.findElement(wd.By.id("carouselWidget"));
    click(menu);
    var submenu1 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Endless loop']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Auto-animated endless loop']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'No loop mode']"));
    assert.isTrue(submenu1.isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed());
  });


  it("check endless loop", function() {
    var menu = driver.findElement(wd.By.id("carouselWidget"));
    click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Endless loop']")).click();
    waitUntil(wd.By.xpath("//div[contains(@class,'qx-carousel-arrow qx-carousel-backward')]"));
    driver.findElement(wd.By.xpath("//div[contains(@class,'qx-carousel-arrow qx-carousel-backward')]")).click();
    waitUntil(wd.By.xpath("//img[contains(@alt,'Grass')]"));
    var img = driver.findElement(wd.By.xpath("//img[contains(@alt,'Grass')]"));
    assert.isTrue(img.isDisplayed());
    driver.findElement(wd.By.xpath("//div[contains(@class,'qx-carousel-arrow qx-carousel-forward')]")).click();
    waitUntil(wd.By.xpath("//img[contains(@alt,'Autumn')]"));
    var img2 = driver.findElement(wd.By.xpath("//img[contains(@alt,'Autumn')]"));
    assert.isTrue(img2.isDisplayed());
  });


  it("check auto-animated", function(done) {
    var img;
    var menu = driver.findElement(wd.By.id("carouselWidget"));
    click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Auto-animated endless loop']")).click();

    waitUntil(wd.By.xpath("//img[contains(@alt,'Autumn')]"));
    img = driver.findElement(wd.By.xpath("//img[contains(@alt,'Autumn')]"));
    assert.isTrue(img.isDisplayed());

    setTimeout(function() {
      assert.isFalse(img.isDisplayed());
      done();
    }, 2800);
  });


  it("check no loop mode", function(done) {

    var forward;
    var menu = driver.findElement(wd.By.id("carouselWidget"));
    click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'No loop mode']")).click();
    waitUntil(wd.By.xpath("//div[contains(@class,'qx-carousel-arrow qx-carousel-forward')]"));
    forward = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-carousel-arrow qx-carousel-forward')]"));
    var images = driver.findElements(wd.By.xpath("//li[contains(@class,'qx-carousel-view-item')]"));
    for (var i = 0; i < 7; i++) {
      waitUntilVisible(images[i]);
      forward.click();
    }
    setTimeout(function() {
      assert.isFalse(forward.isDisplayed());
      done();
    }, 1000);
  });

});


describe("coverflow widget", function() {
  this.timeout(30000);

  it("check submenu", function() {
    var menu = driver.findElement(wd.By.id("coverflowWidget"));
    click(menu);
    var submenu1 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '2D-style']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '3D-style']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized layout']"));
    var submenu4 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Carousel mode']"));
    assert.isTrue(submenu1.isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed() && submenu4.isDisplayed());
  });


  it("check 2D-style", function() {
    var menu = driver.findElement(wd.By.id("coverflowWidget"));
    click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '2D-style']")).click();
    waitUntil(wd.By.xpath("//li[contains(@id,'item2')]"));
    driver.findElement(wd.By.xpath("//li[contains(@id,'item2')]")).click();
    waitUntil(wd.By.xpath("//li[contains(@id,'item3')]"));
    driver.findElement(wd.By.xpath("//li[contains(@id,'item3')]")).click();
  });


  it("check 3D-style", function() {
    var menu = driver.findElement(wd.By.id("coverflowWidget"));
    click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '3D-style']")).click();
    var el = driver.findElement(wd.By.xpath("//li[contains(@id,'item3')]"));
    waitUntil(wd.By.xpath("//li[contains(@id,'item2')]"));
    driver.findElement(wd.By.xpath("//li[contains(@id,'item2')]")).click();
    wd.sleep(400);
    el.click();


  });


  it("check customized layout", function() {
    var menu = driver.findElement(wd.By.id("coverflowWidget"));
    click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized layout']")).click();
    var el = driver.findElement(wd.By.xpath("//li[contains(@class,'qx-coverflow-right')]"));
    wd.sleep(300);
    el.click();

  });

  it("check carousel mode", function() {
    var menu = driver.findElement(wd.By.id("coverflowWidget"));
    click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Carousel mode']")).click();
    var el = driver.findElements(wd.By.xpath("//div[contains(@class,'indicator-item')]"));
    wd.sleep(500);
    el[1].click();

  })

});


describe("lightbox widget", function() {
  this.timeout(30000);

  it("click First demo", function() {
    var menu = driver.findElement(wd.By.id("lightboxWidget"));
    click(menu);
    waitUntil(wd.By.id("firstControl"));
    driver.findElement(wd.By.id("firstControl")).click();
    var lightbox = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-lightbox-content lightbox_content')]")).getText();
    assert.equal("Please log in\nUsername:\nPassword:", lightbox);
    wd.sleep(500);
    var esc = driver.findElement(wd.By.id("button-1"))
    click(esc);
  });


  it("click Second demo", function() {
    wd.sleep(300);
    var menu = driver.findElement(wd.By.id("lightboxWidget"));
    click(menu);
    waitUntil(wd.By.id("secondControl"));
    driver.findElement(wd.By.id("secondControl")).click();
    wd.sleep(300);
    var lightbox = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-lightbox-content lightbox_content')]")).getText();
    assert.equal("Small demo to demonstrate that the lightBox configuration includes also the color and the transparency of the blocker element.", lightbox);
    driver.findElement(wd.By.id("button-2")).click();
  });
});


describe("slider widget", function() {
  this.timeout(30000);

  beforeEach(function() {
    wd.sleep(2000);
  })

  it("check slider positive", function() {
    var menu = driver.findElement(wd.By.id("sliderWidget"));
    click(menu);
    var knob = driver.findElement(wd.By.id("knob2"));
    assert.equal(knob.getText(), "0");
    var slider = driver.findElement(wd.By.id("myslider2"));
    driver.getMouse()._instance.mouseDownSync(knob._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(slider._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseUpSync(slider._instance.getCoordinatesSync());
    assert.equal(knob.getText(), "500");
  });


  it("check slider negative", function() {
    var menu = driver.findElement(wd.By.id("sliderWidget"));
    click(menu);
    var knob = driver.findElement(wd.By.id("knob"));
    assert.equal(knob.getText(), "-10");
    var slider = driver.findElement(wd.By.id("myslider"));
    driver.getMouse()._instance.mouseDownSync(knob._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(slider._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseUpSync(slider._instance.getCoordinatesSync());
    assert.equal(knob.getText(), "0");
  });


  it("check slider with scaling", function() {
    var menu = driver.findElement(wd.By.id("sliderWidget"));
    click(menu);

    var knob = driver.findElement(wd.By.xpath("//div[contains(@class,'knob alphapng knob2')]"));
    // var slider = driver.findElement(wd.By.xpath("//div[contains(@class,'myslider pos1 alphapng qx-widget qx-slider')]"));
    var positionBefore = knob.getLocation().getX();
    var slider = driver.findElement(wd.By.id("slider-body-cpu"));
    driver.getMouse()._instance.mouseDownSync(knob._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(slider._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseUpSync(slider._instance.getCoordinatesSync());
    var positionAfter = knob.getLocation().getX();
    assert.isTrue(positionBefore < positionAfter);
  });

});


describe("datePicker widget", function() {
  this.timeout(30000);

  it("check headline", function() {
    var menu = driver.findElement(wd.By.id("datePickerWidget"));
    click(menu);
    waitUntil(wd.By.xpath("//h1[contains(@class,'headline-a1')]"));
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

describe("calendar widget", function() {
  it("check submenu", function() {
    var menu = driver.findElement(wd.By.id("calendarWidget"));
    click(menu);

    var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Range selection']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Custom range selection 1']"));
    var submenu4 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Custom range selection 2']"));
    assert.isTrue(submenu1[0].isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed() && submenu4.isDisplayed());
  });


  it("check default layout", function() {
    var menu = driver.findElement(wd.By.id("calendarWidget"));
    click(menu);
    var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));
    submenu1[0].click();
    var day = driver.findElements(wd.By.xpath("//button[contains(@class,'qx-calendar-day')]"));
    //in this case it is not possible to check the attribute after clicking
    var dayText = day[16].getAttribute("value");

    // console.log(day[16].getAttribute("value"));
    var regExp = new RegExp(/(\w\w\w)\s(\w\w\w)\s(\d\d)\s(\d\d\d\d)/);
    var date = dayText.match(regExp);
    var daySelected = date[3];
    day[16].click();
    //assert.match(dayText,regExp);
    var d = new Date();
    var n = d.getMonth();
    var y = d.getFullYear();
    var output = driver.findElement(wd.By.id("output"));
    assert.equal(output.getText(), ("Current Date: " + daySelected + "." + (n + 1) + "." + y) || ("Current Date: " + daySelected + "/" + (n + 1) + "/" + y));
  });

  it("check range selection", function() {
    var menu = driver.findElement(wd.By.id("calendarWidget"));
    click(menu);
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
    click(menu);
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
    assert.equal(start.getAttribute("value"), "11.11.2014" || "11/11/2014");
    assert.equal(end.getAttribute("value"), "15.11.2014" || "15/11/2014");
  });


  it("check custom range selection 2", function() {
    var menu = driver.findElement(wd.By.id("calendarWidget"));
    click(menu);
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
    assert.equal(start.getAttribute("value"), ("10.11.2014" || "10/11/2014"));
    assert.equal(end.getAttribute("value"), ("13.11.2014" || "13/11/2014"));
  });

});



describe("autocompletion widget", function() {

  this.timeout(30000);

  it("check submenu", function() {
    var menu = driver.findElement(wd.By.id("autocompletionWidget"));
    click(menu);

    var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));

    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized result list']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Result grouping']"));
    var submenu4 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Multiple datasources']"));
    assert.isTrue(submenu1[1].isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed() && submenu4.isDisplayed());
  });


  it("autocomplete default", function() {
    var menu = driver.findElement(wd.By.id("autocompletionWidget"));
    click(menu);
    var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));
    submenu1[1].click();
    waitUntil(wd.By.id("autocomplete"));
    var input = driver.findElement(wd.By.id("autocomplete"));
    input.sendKeys("Karl");
    input.sendKeys(wd.Keys.ENTER);
    assert.equal(input.getAttribute("value"), "Karlsruhe");
  });


  it("customized result list", function() {
    var menu = driver.findElement(wd.By.id("autocompletionWidget"));
    click(menu);
    var submenu = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized result list']"));
    submenu.click();
    wd.sleep(400);
    var input = driver.findElement(wd.By.id("autocomplete"));
    input.sendKeys("dai");

    input.sendKeys(wd.Keys.ENTER);
    assert.equal(input.getAttribute("value"), "DAILYMOTION");

  });


  it("result grouping", function() {
    var menu = // driver.findElement(wd.By.id("autocompletionWidget"));
      click(menu);
    wd.sleep(200);
    var submenu = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Result grouping']"));
    submenu.click();
    wd.sleep(500);
    var input = driver.findElement(wd.By.id("autocomplete"));

    input.click();

    input.sendKeys("ma");
    wd.sleep(200);
    input.sendKeys(wd.Keys.ENTER);
    wd.sleep(200);
    assert.equal(input.getAttribute("value"), "Matlab");
  });
});


describe("rating widget", function() {
  this.timeout(30000);
  it("click at default settings", function() {
    var menu = driver.findElement(wd.By.id("ratingWidget"));
    click(menu);
    waitUntil(wd.By.id("ratingTarget1"));
    var items = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget1')]/span"));
    for (var i = 0; i < items.length; i++) {
      items[i].click();
      var value = driver.findElement(wd.By.id("ratingdebug1")).getText();
      assert.equal(value, "Value : " + (i + 1));
    }
  });


  it("initial value set", function() {
    var menu = driver.findElement(wd.By.id("ratingWidget"));
    click(menu);
    waitUntil(wd.By.id("ratingTarget2"));
    var items = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget2')]/span"));
    var itemsOff = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget2')]/span[contains(@class,'qx-rating-item qx-rating-item-off')]"));
    assert.equal(itemsOff.length, 3);
    for (var i = 0; i < items.length; i++) {
      items[i].click();
      var value = driver.findElement(wd.By.id("ratingdebug2")).getText();
      assert.equal(value, "Value : " + (i + 1));
    }
  });


  it("define rating length", function() {
    var menu = driver.findElement(wd.By.id("ratingWidget"));
    click(menu);
    waitUntil(wd.By.id("ratingTarget3"));
    var items = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget3')]/span"));
    var itemsOff = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget3')]/span[contains(@class,'qx-rating-item qx-rating-item-off')]"));
    assert.equal(items[0].getText(), "★");
    assert.equal(itemsOff.length, 8);
    for (var i = 0; i < items.length; i++) {
      items[i].click();
      var value = driver.findElement(wd.By.id("ratingdebug3")).getText();
      assert.equal(value, "Value : " + (i + 1));
    }
  });


  it("define custom icons", function() {
    var menu = driver.findElement(wd.By.id("ratingWidget"));
    click(menu);
    waitUntil(wd.By.id("ratingTarget4"));
    var items = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget4')]/span"));
    assert.equal(items[0].getText(), "♥");
    for (var i = 0; i < items.length; i++) {
      items[i].click();
      var value = driver.findElement(wd.By.id("ratingdebug4")).getText();
      assert.equal(value, "Value : " + (i + 1));
    }
  });


  it("define custom icons2", function() {
    var menu = driver.findElement(wd.By.id("ratingWidget"));
    click(menu);
    waitUntil(wd.By.id("ratingTarget5"));
    var items = driver.findElements(wd.By.xpath("//div[contains(@id,'ratingTarget5')]/span"));
    assert.equal(items[0].getText(), "✔");
    for (var i = 0; i < items.length; i++) {
      items[i].click();
      var value = driver.findElement(wd.By.id("ratingdebug5")).getText();
      assert.equal(value, "Value : " + (i + 1));
    }
  });
});


describe("select box widget", function() {
  this.timeout(30000);

  it("select value", function() {
    var menu = driver.findElement(wd.By.id("selectboxWidget"));
    click(menu);
    waitUntil(wd.By.xpath("//div[contains(@class,'qx-select-value')]"));
    var select = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-select-value')]"));
    assert.equal(select.getText(), "Joomla");
    select.click();
    var slideshareEl = driver.findElement(wd.By.xpath("//ul[contains(@id,'mySelectBox')]/descendant::p[text()='Slideshare']"));
    slideshareEl.click();
    var debug = driver.findElement(wd.By.id("debug"));
    assert.equal(debug.getText(), "selectedIndex : 1");
    var submit = driver.findElement(wd.By.xpath("//input[contains(@type,'submit')]"));
    submit.click();
    assert.equal(debug.getText(), 'document.forms["testForm"].elements["mySelectBox"].value = Slideshare');
  });
});


describe("accordion widget", function() {
  this.timeout(30000);

  it("show content", function() {
    var menu = driver.findElement(wd.By.id("accordionWidget"));
    click(menu);
    waitUntil(wd.By.id('menuwrapper'));
    var buttonA1 = driver.findElements(wd.By.xpath("//div[contains(@class,'button-a1')]"));
    buttonA1[0].click();
    var content = driver.findElements(wd.By.xpath("//div[contains(@class,'contentWrapper')]"));
    assert.isTrue(content[0].isDisplayed());
  });


  it("show content2", function() {
    var menu = driver.findElement(wd.By.id("accordionWidget"));
    click(menu);
    waitUntil(wd.By.id('menuwrapper'));
    var buttonA1 = driver.findElements(wd.By.xpath("//div[contains(@class,'button-a1')]"));
    buttonA1[1].click();
    waitUntil(wd.By.xpath("//div[contains(@class,'contentWrapper')]"));
    assert.equal(buttonA1[1].getText(), "JavaScript");
    var content = driver.findElements(wd.By.xpath("//div[contains(@class,'contentWrapper')]"));
    assert.isTrue(content[1].isDisplayed());
  });
});

describe("tabs widget", function() {

  it("click next tab", function() {
    var menu = driver.findElement(wd.By.id("tabsWidget"));
    click(menu);
    var textHtml = driver.findElement(wd.By.id("demo-page0")).getText();
    var tab2 = driver.findElement(wd.By.xpath("//li[contains(@class,'qx-tabs-button')][text()='JavaScript']"));
    tab2.click();
    var textJS = driver.findElement(wd.By.id("demo-page1")).getText();
    var tab3 = driver.findElement(wd.By.xpath("//li[contains(@class,'qx-tabs-button')][text()='Css']"));
    tab3.click();
    var textCss = driver.findElement(wd.By.id("demo-page2")).getText();
    var tab4 = driver.findElement(wd.By.xpath("//li[contains(@class,'qx-tabs-button')][text()='NodeJs']"));
    tab4.click();
    var textNodeJS = driver.findElement(wd.By.id("demo-page3"));
    assert.notEqual(textHtml, textJS, textCss, textNodeJS);
  });
});
describe("tree widget", function() {
  this.timeout(30000);
  beforeEach(function() {
    wd.sleep(2000);
  });
  it("create new folder", function() {
    var menu = driver.findElement(wd.By.id("treeWidget"));
    click(menu);
    waitUntil(wd.By.id("createFolder"));
    driver.findElement(wd.By.id("createFolder")).click();
    driver.findElement(wd.By.id("editFolder")).sendKeys("Testfolder");
    driver.findElement(wd.By.id("confirmNewFolder")).click();
    var tree = driver.findElement(wd.By.xpath("//ul[contains(@class,'qx-tree baselib-tree')]"));
    assert.isTrue(tree.getText().indexOf("Testfolder") != -1);
  });

  it("cancel folder", function() {
    var menu = driver.findElement(wd.By.id("treeWidget"));
    click(menu);
    waitUntil(wd.By.id("createFolder"));
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

  //missing assert for disableing
  it("disable multi selection", function() {
    var menu = driver.findElement(wd.By.id("treeWidget"));
    click(menu);
    wd.sleep(2000);
    driver.findElement(wd.By.id("enablemulti")).click();
    var checkboxes = driver.findElements(wd.By.xpath("//input[contains(@class,'qx-tree-checkbox baselib-tree-checkbox')]"));
    checkboxes[0].click();
    assert.isTrue(checkboxes[0].isDisplayed());
    driver.findElement(wd.By.id("disablemulti")).click();
  });
});
describe("toggle widget", function() {

  it("click toggle button", function() {
    var menu = driver.findElement(wd.By.id("toggleWidget"));
    click(menu);
    var toggle = driver.findElement(wd.By.id("toggle"));
    toggle.click();
    assert.equal("Callback I", toggle.getText());
    toggle.click();
    assert.equal("Callback II", toggle.getText());
    toggle.click();
    assert.equal("Callback III", toggle.getText());
    toggle.click();
    assert.equal("Callback IV", toggle.getText());
    toggle.click();
    assert.equal("Callback I", toggle.getText());
  });
});


describe("button widget", function() {

  it("click button", function() {
    //drawer has also id 'buttonWidget'
    var menu = driver.findElements(wd.By.id("buttonWidget"));
    click(menu[1]);
    var button = driver.findElement(wd.By.xpath("//button[contains(@id,'button-example')]"));
    button.click();
    var buttonMenu = driver.findElement(wd.By.id("buttonMenu"));
    assert.isTrue(buttonMenu.isDisplayed());
    driver.findElement(wd.By.id("action1")).click();
    var text = driver.findElement(wd.By.id("button-debug"));
    assert.equal("You have selected the 'Action 1'", text.getText());
  });
});

describe("table widget", function() {
  this.timeout(30000);

  it("check submenu", function() {

    var menu = driver.findElement(wd.By.id("tableWidget"));
    click(menu);
    var submenu1 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Dom based table']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Model based table']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Custom paging']"));
    assert.isTrue(submenu1.isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed());
  });

  it("check Dom based table", function() {

    var menu = driver.findElement(wd.By.id("tableWidget"));
    click(menu);
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
    click(menu);
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
    click(menu);
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Custom paging']")).click();
    var pages = driver.findElements(wd.By.xpath("//div[contains(@class,'clearfix')]/span"));
    pages[0].click();
    assert.isTrue(pages[0].getText() == "4");
    assert.isTrue(driver.findElements(wd.By.xpath("//div[contains(@class,'qx-table-cell')]"))[0].getText().indexOf("Shou") != -1);
  });

});

describe("rwd widget", function() {

  it("resize browser", function() {

    var menu = driver.findElement(wd.By.id("rwdModule"));
    click(menu);
    var sizeText = driver.findElement(wd.By.id("qx-media-debug"));
    assert.equal("device-size-xlarge", sizeText.getText());
    driver.manage().window().setSize(new wd.Dimension(200, 400));
    assert.equal("device-size-small", sizeText.getText());
    driver.manage().window().setSize(new wd.Dimension(900, 600));
    assert.equal("device-size-medium", sizeText.getText());
    driver.manage().window().maximize();
    driver.manage().window().setSize(new wd.Dimension(1400, 1000));
    assert.equal("device-size-large", sizeText.getText());
    driver.manage().window().maximize();
  });

});
describe("pointer-events widget", function() {

  it("click event handling Click", function() {
    var menu = driver.findElement(wd.By.id("pointerEvents"));
    click(menu);
    waitUntil(wd.By.xpath("//button[contains(@id,'click')]"));
    var clickButton = driver.findElement(wd.By.xpath("//button[contains(@id,'click')]"));
    clickButton.click();
    var infoarea = driver.findElement(wd.By.id("info-text"));
    assert.equal(infoarea.getText(), "Hit the \"click\" button!");
  });

  it("click event handling Tap", function() {
    var menu = driver.findElement(wd.By.id("pointerEvents"));
    click(menu);
    waitUntil(wd.By.xpath("//button[contains(@id,'tap')]"));
    var tapButton = driver.findElement(wd.By.xpath("//button[contains(@id,'tap')]"));
    tapButton.click();
    var infoarea = driver.findElement(wd.By.id("info-text"));
    assert.equal(infoarea.getText(), "Hit the \"tap\" button!");
  });
});
describe("scroller widget", function() {
  this.timeout(700000);
  it("check submenu", function() {
    var menu = driver.findElement(wd.By.id("scrollerWidget"));
    click(menu);
    var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized scrollbar']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Horizontal scroller']"));
    assert.isTrue(submenu1[2].isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed());
    click(menu);
  });

  //test fails, no method found to simulate scrolling
  it.skip("check default layout", function() {
    wd.sleep(2000);
    var menu = driver.findElement(wd.By.id("scrollerWidget"));
    click(menu);
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
    click(menu);
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
describe("drawer widget", function() {
  this.timeout(10000);
  it("show drawer left", function() {
    //first drawer
    var menu = driver.findElements(wd.By.id("buttonWidget"));
    click(menu[0]);
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
    var menu = driver.findElements(wd.By.id("buttonWidget"));
    click(menu[0]);
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
    var menu = driver.findElements(wd.By.id("buttonWidget"));
    click(menu[0]);
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
    var menu = driver.findElements(wd.By.id("buttonWidget"));
    click(menu[0]);
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
    wd.sleep(1000);
    //3rd drawer
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show bottom drawer III']")).click();
    var bottom3 = driver.findElement(wd.By.id("drawer12"));
    assert.isTrue(bottom3.isDisplayed(), "3");
    driver.findElement(wd.By.xpath("//label[contains(@class,'center buttonHide button-b3')][contains(@data-target,'drawer12')]")).click();
  });

  it("click reset", function() {
    var menu = driver.findElements(wd.By.id("buttonWidget"));
    click(menu[0]);
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a1')][text()='Show left drawer I']")).click();
    driver.findElement(wd.By.xpath("//label[contains(@class,'button-a2')][text()='RESET']")).click();
  });
});

function waitUntil(byLocator, timeout) {
  var wait = new wd.WebDriverWait(driver, timeout | 5); //default:5s
  var condition = wd.ExpectedConditions.visibilityOfElementLocated(byLocator);
  return wait.until(condition);
}

function waitUntilVisible(WebElement, timeout) {
  var wait = new wd.WebDriverWait(driver, timeout | 5); //default:5s
  var condition = wd.ExpectedConditions.visibilityOf(WebElement);
  return wait.until(condition);
}

function click(WebElement) {
  driver.getMouse()._instance.mouseDownSync(WebElement._instance.getCoordinatesSync());
  driver.getMouse()._instance.mouseUpSync(WebElement._instance.getCoordinatesSync());
}

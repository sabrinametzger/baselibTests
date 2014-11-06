'use strict';
var wd = require('webdriver-sync');
var chai = require('chai');
var assert = chai.assert;
var FirefoxDriver = wd.FirefoxDriver;
var driver = new FirefoxDriver();
driver.get("http://baselib.ai.1und1.de/0.9.24-SNAPSHOT/docs/demos/");
// driver.manage().window().maximize();
after(function() {
  driver.quit();
});


describe("carousel widget", function() {


  it("check submenu", function() {
    driver.findElement(wd.By.id("carouselWidget")).click();
    var submenu1 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Endless loop']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Auto-animated endless loop']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'No loop mode']"));
    assert.isTrue(submenu1.isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed());
  });


  it("check endless loop", function() {
    this.timeout(3600);
    driver.findElement(wd.By.id("carouselWidget")).click();
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
    this.timeout(4300);
    var img;
    driver.findElement(wd.By.id("carouselWidget")).click();
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
    this.timeout(10000);
    var forward;
    driver.findElement(wd.By.id("carouselWidget")).click();
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
  this.timeout(10000);

  it("check submenu", function() {
    driver.findElement(wd.By.id("coverflowWidget")).click();
    var submenu1 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '2D-style']"));
    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '3D-style']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized layout']"));
    var submenu4 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Carousel mode']"));
    assert.isTrue(submenu1.isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed() && submenu4.isDisplayed());
  });

  it("check 2D-style", function() {
    driver.findElement(wd.By.id("coverflowWidget")).click();
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '2D-style']")).click();
    waitUntil(wd.By.xpath("//li[contains(@id,'item2')]"));
    driver.findElement(wd.By.xpath("//li[contains(@id,'item2')]")).click();
    waitUntil(wd.By.xpath("//li[contains(@id,'item3')]"));
    driver.findElement(wd.By.xpath("//li[contains(@id,'item3')]")).click();
  });


  it("check 3D-style", function(done) {
    driver.findElement(wd.By.id("coverflowWidget")).click();
    driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = '3D-style']")).click();
    var el = driver.findElement(wd.By.xpath("//li[contains(@id,'item3')]"));
    waitUntil(wd.By.xpath("//li[contains(@id,'item2')]"));
    driver.findElement(wd.By.xpath("//li[contains(@id,'item2')]")).click();
    setTimeout(function() {
      el.click();
      done();
    }, 200);

  });
});

describe("lightbox widget", function() {
  this.timeout(4000);

  it("check headline", function() {
    driver.findElement(wd.By.id("lightboxWidget")).click();
    waitUntil(wd.By.xpath("//h1[contains(@class,'headline-a1')]"));
    var headline = driver.findElement(wd.By.xpath("//h1[contains(@class,'headline-a1')]")).getText();
    assert.equal(headline, "Lightbox");
  });


  it("click First demo", function() {
    driver.findElement(wd.By.id("lightboxWidget")).click();
    waitUntil(wd.By.id("firstControl"));
    driver.findElement(wd.By.id("firstControl")).click();
    var lightbox = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-lightbox-content lightbox_content')]")).getText();
    assert.equal("Please log in\nUsername:\nPassword:", lightbox);
    driver.findElement(wd.By.id("button-1")).click();

  });


  it("click Second demo", function() {
    driver.findElement(wd.By.id("lightboxWidget")).click();
    waitUntil(wd.By.id("secondControl"));
    driver.findElement(wd.By.id("secondControl")).click();
    var lightbox = driver.findElement(wd.By.xpath("//div[contains(@class,'qx-lightbox-content lightbox_content')]")).getText();
    assert.equal("Small demo to demonstrate that the lightBox configuration includes also the color and the transparency of the blocker element.", lightbox);
    driver.findElement(wd.By.id("button-2")).click();
  });

});

describe("slider widget", function() {
  this.timeout(4000);

  it("check headline", function() {
    var slider = driver.findElement(wd.By.id("sliderWidget"));
    slider.click();
    waitUntil(wd.By.xpath("//h1[contains(@class,'headline-a1')]"));
    var headline = driver.findElement(wd.By.xpath("//h1[contains(@class,'headline-a1')]")).getText();
    assert.equal(headline, "Slider");
  });

  it("check slider positive", function() {
    driver.findElement(wd.By.id("sliderWidget")).click();
    var knob = driver.findElement(wd.By.id("knob2"));
    assert.equal(knob.getText(), "0");
    var slider = driver.findElement(wd.By.id("myslider2"));
    driver.getMouse()._instance.mouseDownSync(knob._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(slider._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseUpSync(slider._instance.getCoordinatesSync());
    assert.equal(knob.getText(), "500");
  });

  it("check slider negative", function() {
    driver.findElement(wd.By.id("sliderWidget")).click();
    var knob = driver.findElement(wd.By.id("knob"));
    assert.equal(knob.getText(), "-10");
    var slider = driver.findElement(wd.By.id("myslider"));
    driver.getMouse()._instance.mouseDownSync(knob._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(slider._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseUpSync(slider._instance.getCoordinatesSync());
    assert.equal(knob.getText(), "0");
  });

  it("check slider with scaling", function() {

    setTimeout(function() {
      driver.findElement(wd.By.id("sliderWidget")).click();
    }, 300);

    var knob = driver.findElement(wd.By.xpath("//div[contains(@class,'knob alphapng knob2')]"));
    // var slider = driver.findElement(wd.By.xpath("//div[contains(@class,'myslider pos1 alphapng qx-widget qx-slider')]"));
    var positionBefore = knob.getLocation().getX();
    var slider = driver.findElement(wd.By.id("myslider"));
    driver.getMouse()._instance.mouseDownSync(knob._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseMoveSync(slider._instance.getCoordinatesSync());
    driver.getMouse()._instance.mouseUpSync(slider._instance.getCoordinatesSync());
    var positionAfter = knob.getLocation().getX();
    assert.isTrue(positionBefore < positionAfter);
  });

});

describe("datePicker widget", function() {
  this.timeout(4000);
  it("check headline", function() {
    driver.findElement(wd.By.id("datePickerWidget")).click();
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
  // it.skip("check date picker with configured format", function() {

  //   var input = driver.findElement(wd.By.id("datepicker-format"));
  //   input.click();
  //   var datepicker = driver.findElements(wd.By.xpath("//table[contains(@class,'qx-calendar-container')]"));
  //   setTimeout(function() {
  //     //assert.isTrue(datepicker[2].isDisplayed());
  //     //waitUntil(wd.By.xpath("//button[contains(@class,'qx-calendar-day')]"));
  //     var days = driver.findElements(wd.By.xpath("//td[contains(@class,' qx-calendar-weekday')]"));
  //     days[2].click();
  //     console.log(day.getAttribute("value"));
  //     console.log(input.getAttribute("value"));
  //     done();
  //   }, 200);
  // });


  it("check date picker with localized weekdays", function() {
    var textfield = driver.findElement(wd.By.id("datepicker-localized"));
    textfield.click();
    var datepicker = driver.findElements(wd.By.xpath("//table[contains(@class,'qx-calendar-container')]"));
    assert.isTrue(datepicker[3].getText().indexOf("Lun Mar Mer Jeu Ven Sam Dim") != -1);
    assert.isTrue(datepicker[3].isDisplayed());
    textfield.click();
  });
});
describe("autocompletion widget", function() {
  this.timeout(30000);
  it("check submenu", function() {
    driver.findElement(wd.By.id("autocompletionWidget")).click();

    var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));

    var submenu2 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized result list']"));
    var submenu3 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Result grouping']"));
    var submenu4 = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Multiple datasources']"));
    assert.isTrue(submenu1[1].isDisplayed() && submenu2.isDisplayed() && submenu3.isDisplayed() && submenu4.isDisplayed());
  });

  it("autocomplete default", function() {
    driver.findElement(wd.By.id("autocompletionWidget")).click();
    var submenu1 = driver.findElements(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Default layout']"));
    submenu1[1].click();
    waitUntil(wd.By.id("autocomplete"));
    var input = driver.findElement(wd.By.id("autocomplete"));
    input.sendKeys("Karl");
    input.sendKeys(wd.Keys.ENTER);
    assert.equal(input.getAttribute("value"), "Karlsruhe");
  });

  it("customized result list", function(done) {
    driver.findElement(wd.By.id("autocompletionWidget")).click();
    var submenu = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Customized result list']"));
    submenu.click();

    setTimeout(function() {
      var input = driver.findElement(wd.By.id("autocomplete"));
      input.sendKeys("dai");
      input.sendKeys(wd.Keys.ENTER);
      assert.equal(input.getAttribute("value"), "DAILYMOTION");
      done();
    }, 100);
  });

  it("result grouping", function(done) {
    // driver.findElement(wd.By.id("autocompletionWidget")).click();
    var submenu = driver.findElement(wd.By.xpath("//li[contains(@class,'submenu')]/descendant::a[text() = 'Result grouping']"));
    submenu.click();
    setTimeout(function() {
      var input = driver.findElement(wd.By.id("autocomplete"));
      input.sendKeys("ma");
      input.sendKeys(wd.Keys.ENTER);
      assert.equal(input.getAttribute("value"), "Matlab");
      done();
    }, 300);
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

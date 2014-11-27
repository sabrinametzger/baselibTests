/**
 *  example:
 *  mocha test.js --url "http://<url>" --server http://<server>" --caps '{"browserName":"<browser>"}'
 *
 */
var wd = require('webdriver-sync');
var nopt = require('nopt');
var mocha = require('mocha');
var webdr = module.exports = {};
var driver;
var url;


before(function(){
  this.timeout(30000);
  driver = webdr.setup(wd);
});

after(function() {
 webdr.teardown(driver);
});

webdr.setup = function(wd) {

  knownOpts = {
    "url": [String],
    "server": [String],
    "caps": [String]
  }, parsed = nopt(knownOpts, process.argv, 0);

  var capability = new wd.DesiredCapabilities().firefox();
  var caps = JSON.parse(parsed.caps);
  for (var key in caps) {
    capability.setCapability(key, caps[key]);
  }
  if (parsed.server) {
    driver = new wd.RemoteWebDriver(parsed.server + "/wd/hub", capability);
  }
  driver.manage().window().maximize();
  url = parsed.url;
  driver.get(parsed.url);
  return driver;
};


webdr.teardown = function(driver) {
  driver.quit();
};

webdr.getDriver = function(){
  return driver;
};
webdr.reset = function(){
  driver.get(url);
  return driver;
}
webdr.waitUntil = function(byLocator, timeout) {
  var wait = new wd.WebDriverWait(driver, timeout || 5); //default:5s
  var condition = wd.ExpectedConditions.visibilityOfElementLocated(byLocator);
  return wait.until(condition);
};


webdr.waitUntilVisible = function(WebElement, timeout) {
  if(!timeout){
    timeout = 5;
  }
  var wait = new wd.WebDriverWait(driver, timeout); //default:5s
  var condition = wd.ExpectedConditions.visibilityOf(WebElement);
  return wait.until(condition);
};


webdr.click = function(WebElement) {
  driver.getMouse()._instance.mouseDownSync(WebElement._instance.getCoordinatesSync());
  driver.getMouse()._instance.mouseUpSync(WebElement._instance.getCoordinatesSync());
};

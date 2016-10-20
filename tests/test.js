var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
var By = webdriver.By,
    until = webdriver.until;

driver.get('https://www.google.co.in');
driver.findElement(By.id('email')).sendKeys('kumarshubham347@gmail.com');
driver.findElement(By.id('password')).sendKeys('shubhi');
driver.findElement(By.id('submit')).click();
//driver.quit();
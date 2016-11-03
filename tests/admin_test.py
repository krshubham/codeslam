from selenium import webdriver
from selenium.webdriver.common.keys import Keys

chromedriver = '/home/ks/Downloads/chromedriver'

driver = webdriver.Chrome(chromedriver)
driver.get("http://localhost/admin")
assert "Codeslam" in driver.title

'''
Below are the test cases for the web application. test cases are commented in exach line
'''
nameval = 'Raghav Alagh'
emailval = 'raghav.alagh2015@vit.ac.in'
unval = 'raghav.alagh'
passval = 'koolis'
confirmval = 'kooliss'

name = driver.find_element_by_name("uname")
name.clear()

email = driver.find_element_by_name("pwd")
email.clear()

submit = driver.find_element_by_name("submit")

name.send_keys(nameval)
email.send_keys(emailval)
username.send_keys(unval)
password.send_keys(passval)
confirm.send_keys(confirmval)
try:
    submit.click()
    assert "not the same" in driver.page_source
except AssertionError:
    print("Not the correct password")
driver.close()


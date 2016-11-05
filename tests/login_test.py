from selenium import webdriver
from selenium.webdriver.common.keys import Keys

chromedriver = '/home/ks/Downloads/chromedriver'

driver = webdriver.Chrome(chromedriver)
driver.get("http://localhost/login")
assert "Codeslam" in driver.title

'''
Below are the test cases for the web application. test cases are commented in exach line
'''
emails = ['wrong','k@s.com',"<script>alert('hello');</script>","kumarshubham347@gmail.com"]
passwords = [' wrong','shubhi','wrong','shubhi']
for i in range(0,len(emails)+1):
    print i
    email = driver.find_element_by_name("email")
    email.clear()
    email.send_keys(emails[i])
    password = driver.find_element_by_name("password")
    password.clear
    password.send_keys(passwords[i])
    driver.find_element_by_id("submit").click()
    #logout = driver.find_element_by_id("logout").click()
    try:
        driver.implicitly_wait(10)
        assert "wrong" not in driver.page_source
    except AssertionError:
        email.clear()
        password.clear()
        driver.implicitly_wait(10)
#driver.close()
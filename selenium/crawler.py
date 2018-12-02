from selenium.webdriver import Chrome, ChromeOptions
import time
from argparse import ArgumentParser


parser = ArgumentParser()
parser.add_argument('-url', type=str)
args = parser.parse_args()
url = args.url

options = ChromeOptions() 
driver = Chrome()

driver.get(url)

SCROLL_PAUSE_TIME = 5
last_height = driver.execute_script("return document.body.scrollHeight")
for i in range(100):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(SCROLL_PAUSE_TIME)
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

html_source = driver.page_source
is_continue = True
while is_continue:
    try:
        f_script = html_source.index('<script')
        s_script = html_source.index('/script>')
        error = html_source[f_script: s_script + len('/script>')]
        html_source = html_source.replace(error, '')
    except:
        break
f_body = html_source.index('<body')
s_body = html_source.index('/body>')
html_source = html_source[f_body: s_body + len('body/>')]

fn = open('index.html', 'w')
fn.write(html_source)
fn.close()

driver.close()

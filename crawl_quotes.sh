#!/bin/bash

cd selenium

TYPE='life'
python crawler.py -url https://www.brainyquote.com/topics/$TYPE
cd ../scrapy
scrapy crawl quotes -o $TYPE.json
cd ../selenium

TYPE='motivational'
python crawler.py -url https://www.brainyquote.com/topics/$TYPE
cd ../scrapy
scrapy crawl quotes -o $TYPE.json
cd ../selenium

TYPE='positive'
python crawler.py -url https://www.brainyquote.com/topics/$TYPE
cd ../scrapy
scrapy crawl quotes -o $TYPE.json
cd ../selenium

TYPE='inspirational'
python crawler.py -url https://www.brainyquote.com/topics/$TYPE
cd ../scrapy
scrapy crawl quotes -o $TYPE.json
cd ../selenium

TYPE='funny'
python crawler.py -url https://www.brainyquote.com/topics/$TYPE
cd ../scrapy
scrapy crawl quotes -o $TYPE.json
cd ../selenium

TYPE='success'
python crawler.py -url https://www.brainyquote.com/topics/$TYPE
cd ../scrapy
scrapy crawl quotes -o $TYPE.json
cd ../selenium

TYPE='faith'
python crawler.py -url https://www.brainyquote.com/topics/$TYPE
cd ../scrapy
scrapy crawl quotes -o $TYPE.json
cd ../selenium

TYPE='best'
python crawler.py -url https://www.brainyquote.com/topics/$TYPE
cd ../scrapy
scrapy crawl quotes -o $TYPE.json
cd ../selenium

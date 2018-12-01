import scrapy


class QuotesSpider(scrapy.Spider):
    name = "quotes"
    start_urls = [
        'file:///media/thangbm/6CF2096DF2093CB8/Work/Web/icety/index.html',
    ]

    def parse(self, response):
        for quote in response.css('div.grid-item'):
            yield {
                'content': quote.css('a.b-qt::text').extract_first(),
                'author': quote.css('a.bq-aut::text').extract_first(),
            }

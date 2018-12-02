import json
from sklearn.utils import shuffle


filenames = ['final_faith.json', 'final_best.json', 'final_inspirational.json',
            'final_life.json', 'final_motivational.json', 'final_success.json']

sum_data = []
for filename in filenames:
    fn = open(filename, 'r')
    data= json.load(fn)
    sum_data.extend(data)
sum_data = shuffle(sum_data)

print("Number of quotes: ", len(sum_data))
with open('quotes.json', 'w') as fn:
    json.dump(sum_data, fn)

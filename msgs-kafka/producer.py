from kafka import KafkaProducer
producer = KafkaProducer(bootstrap_servers = '192.168.99.100:9092', key_serializer=str.encode, value_serializer = str.encode)

from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017')
db = client['ec-project'];
coll = db.uploadfiles;

change_stream = coll.watch([{'$match': {'operationType': {'$in': ['insert', 'replace']}}}])

for change in change_stream:
    dict = change['fullDocument']
    filepath = r'E:/EDU/Angular' + dict['filePath'];
    f = open(filepath, "r")
    producer.send('my-topic', key = '%s' % dict['fileName'], value = '%s' % f.read())

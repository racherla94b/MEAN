from kafka import KafkaConsumer

consumer = KafkaConsumer('my-topic', bootstrap_servers='192.168.99.100:9092')

for msg in consumer:
    print("key = %s, value = %s" % (msg.key, msg.value))

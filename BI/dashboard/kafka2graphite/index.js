const kafka = require('kafka-node');
const graphite = require('graphite');

const ENV = process.env;

const graphiteClient = graphite.createClient(ENV.GRAPHITE_CLIENT);

const Producer = kafka.Producer;
const Consumer = kafka.Consumer
const KeyedMessage = kafka.KeyedMessage;
const kafkaClient = new kafka.KafkaClient({
  kafkaHost: ENV.KAFKA_HOST
});

const consumer = new Consumer(
  kafkaClient,
  [
    {
      topic: ENV.KAFKA_TOPIC,
      partition: parseInt(ENV.KAFKA_PARTITION, 10)
    },
    // { topic: 't1', partition: 0 }
  ],
  {
    autoCommit: true
  }
);

consumer.on('message', function (message) {
  if (message.key === 'connected-users') {
    const connectedUsers = parseInt(message.value, 10);
    const metrics = { jeffrey: { 'connected-users': connectedUsers } };
    const timestamp = Date.now();
    graphiteClient.write(metrics, timestamp, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});

// const producer = new Producer(client);
//
// producer.on('ready', function () {
//   console.log('producer ready');
//
//   const km = new KeyedMessage('key', 'message');
//   const payloads = [
//     { topic: 'topic1', messages: 'hi', partition: 0 },
//     { topic: 'topic2', messages: ['hello', 'world', km] }
//   ];
//
//   producer.send(payloads, function (err, data) {
//     console.log(data);
//   });
//
// });
//
// producer.on('error', function (err) {
//   console.error(err);
// });




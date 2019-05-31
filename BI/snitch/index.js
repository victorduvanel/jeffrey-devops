const kafka = require('kafka-node');
const redis = require('redis');

const ENV = process.env;

const redisClient = redis.createClient('redis://localhost:6379');

const Producer = kafka.Producer;
const KeyedMessage = kafka.KeyedMessage;
const client = new kafka.KafkaClient({
  // kafkaHost: '127.0.0.1:9092'
  kafkaHost: 'kafka:9092'
  // kafkaHost: ENV.KAFKA_HOST
});

const producer = new Producer(client);

producer.on('ready', function () {
  console.log('producer ready');

  const check = () => {
    redisClient.scard('online-user-ids', (err, reply) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      const km = new KeyedMessage('connected-users', `${reply}`);
      console.log(reply);
      const payloads = [
        // { topic: 't1', messages: 'hi', partition: 0 },
        { topic: 't', messages: [km] }
      ];

      producer.send(payloads, (err, data) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        setTimeout(check, 1000);
      });
    });
  };

  check();

  // producer.createTopics(['t','t1'], false, function (err, data) {
  //   console.log(data);
  // });
});

producer.on('error', function (err) {
  console.error(err);
  process.exit(1);
});


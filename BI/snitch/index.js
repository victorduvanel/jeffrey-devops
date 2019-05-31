const kafka = require('kafka-node');
const redis = require('redis');

const ENV = process.env;

const redisClient = redis.createClient(ENV.REDIS_HOST);

const Producer = kafka.Producer;
const KeyedMessage = kafka.KeyedMessage;
const client = new kafka.KafkaClient({
  kafkaHost: ENV.KAFKA_HOST
});

const producer = new Producer(client);

producer.on('ready', function () {
  const check = () => {
    redisClient.scard('online-user-ids', (err, reply) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      const km = new KeyedMessage('connected-users', `${reply}`);
      const payloads = [
        // { topic: 't1', messages: 'hi', partition: 0 },
        { topic: ENV.KAFKA_TOPIC, messages: [km] }
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


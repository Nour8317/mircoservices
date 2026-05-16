import {kafka} from 'kafkajs';

const kafka = new Kafka({
  clientId: 'kafka-service',
  brokers: ['localhost:9092']
});

const admin = kafka.admin();

const run = async () => {
  await admin.connect();
  await admin.createTopics({
    topics: [
        {
            topic: "payment-successful",
            numPartitions: 1,
            replicationFactor: 1
        },
        {
            topic: "payment-failed",
            numPartitions: 1,
            replicationFactor: 1
        },
        {
        topic: "payment-pending",
        numPartitions: 1,
        replicationFactor: 1
        },
        {
        topic: "payment-refunded",
        numPartitions: 1,
        replicationFactor: 1
        },
        {
            topic: "order-created",
            numPartitions: 1,
            replicationFactor: 1
        },
        {
            topic: "email-notification",
            numPartitions: 1,
            replicationFactor: 1
        }
    ]
  });
  await admin.disconnect();
}

run().catch(console.error);

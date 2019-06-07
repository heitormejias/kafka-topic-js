'use strict';

const kafka = require('kafka-node');
const jsonfile = require('jsonfile');

exports.initProducer = function(config) {

    try {
   
        console.log("Iniciando producer app...")
        let Producer = kafka.Producer;
        let client = new kafka.KafkaClient({kafkaHost:config.kafka_server});
        let producer = new Producer(client);
        let kafka_topic = config.kafka_topic;
        
        let payloads = [];
        
        function sendArrayElements(element, index, array) {
            console.log("Adicionando mensagem ...");
            payloads.push({
                topic: kafka_topic,
                messages: element
            });
        }
        
        producer.on('error', function(err) {
            console.log('-- ERRO: \n ' + err);
            throw err;
        });
        
        producer.on('connect', async function() {
            console.log('Conectado!');
        });
        
        producer.on('ready', async function() {  
            let fileMessagesJson = jsonfile.readFileSync(config.producer_file_json);
            fileMessagesJson.messages.forEach(sendArrayElements);
        
            console.log("Enviando as mensagens...");
            producer.send(payloads, (err, result) => {
                if (err) {
                    console.error(err);
                    throw err;
                } else {
                    console.log('Enviado com sucesso!', result);
                }
                process.exit();
            });
        });
    }
    catch(e) {
        console.log(e);
    }
};
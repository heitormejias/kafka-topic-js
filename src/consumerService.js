'use strict';

const kafka = require('kafka-node');
const jsonfile = require('jsonfile');

exports.initConsumer = function(config) {

    try {
      
        console.log("Iniciando consumer app...")
        let client = new kafka.KafkaClient({kafkaHost:config.kafka_server});  
        let consumer = new kafka.Consumer(
            client,
            [{ topic: config.kafka_topic, partition: 0 }],
            {
                autoCommit: true,
                fetchMaxWaitMs: 1000,
                fetchMaxBytes: 1024 * 1024,
                encoding: 'utf8',
                fromOffset: false
            }
        );
        
        let nameFile = config.kafka_topic+'.json';
        
        let obj = {
            messages: []
        };
        
        /*
            ####  Funcoes ####
        */
        function addMessage(value) {
            obj.messages.push(value);// salvar como texto
        }
        
        function saveMessagesOnFile() {
            // save file pretty
            jsonfile.writeFileSync(nameFile, obj, { spaces: 2, EOL: '\r\n' });
        }
        
        /*
            ####  Metodos do consumidor ####
        */
        consumer.on('error', function(err) {
            console.log('-- ERRO: \n ' + err);
            throw err;
        });
        
        consumer.on('message', async function(message) {
            console.log(
                'message-> ',
                message,
            );
            addMessage(message.value);
            saveMessagesOnFile();

            console.log("Precione Ctrl + C quando quiser sair...")
        });
        
        console.log("App iniciada!");
        console.log("Precione Ctrl + C quando quiser sair...")
    }
    catch(e) {
        console.log(e);
    }
};
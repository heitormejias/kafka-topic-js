#!/usr/bin/env node
const consumerService = require("./src/consumerService");
const producerService = require("./src/producerService");
const fs = require("fs");
const args = require('minimist')(process.argv.slice(2), {  
    alias: {
        t: 'kafka_topic',
        s: 'kafka_server',
        f: 'producer_file_json',
        h: 'help'
    },
    default: {
        help: false,
        kafka_topic: "topico",
        kafka_server: "localhost:9092",
        producer_file_json: ""
    },
});

// HELP
if(args.help) {
    showHelp();
    process.exit();
}
// MODO PRODUCER
else if(args.producer_file_json != "") {

    if(args.producer_file_json == undefined || args.producer_file_json == ""){
        console.log('--------------------');
        console.log('-- Para usar como `producer`, é necessário o parametro `--producer_file_json=example.json` ou --f=example.json');
        console.log('--------------------');
        process.exit();
    }
    else {
        let fileName = args.producer_file_json;
        fs.exists(fileName, function(exists){
            if(!exists) {
                console.log("Erro: Arquivo `",fileName,"` não existe! ")
                process.exit();
            }
        });

        producerService.initProducer(args);
    }
}
// MODO CONSUMER
else {
    
    consumerService.initConsumer(args);
}


function showHelp() {
    console.log('------  Kafka Topic JS  ------');
    console.log('  - Esta app consome ou publica mensagens no kafka em 1 topico.');
    console.log('');
    console.log(' Modo de usar:   kafka-topic-js  <<parametros>>  ');
    console.log(' Para usar como `producer`, passe o parametro `--producer_file_json=topico.json` ou --f=example.json');
    console.log('');
    console.log('---  Esta app aceita os seguintes parametros: ');
    console.log('  --t  --kafka_topic           Parametro para passar o nome do tópico. (default:"topico" ');
    console.log('  --s  --kafka_server          Parametro para passar o host[:porta] do servidor kafka. (default:"localhost:9092" ');
    console.log('  --f  --producer_file_json    Parametro para passar o nome do arquivo json com as mensagens para publicar. (* Opcional) ');
    console.log('  --h  --help                  Parametro para mostrar este help.');
    console.log('');
    console.log(' Exemplos de uso:   kafka-topic-js  -t=topico -s=localhost:9092  ');
    console.log('             kafka-topic-js  -t=topico -s=localhost:9092 -f=./topico-send.json ');
    console.log('');
    console.log(' Exemplo do arquivo "producer_file_json": ');
    console.log('');
    console.log('{');
    console.log('   "messages": [');
    console.log('       "este e apenas um texto para teste" ');
    console.log('       "CLASS(@EXAMPLE_CODIGOS)"');
    console.log('   ]');
    console.log('}');
    console.log('');
}
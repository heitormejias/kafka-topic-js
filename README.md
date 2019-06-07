# Kafka Topic JS

Esta app consome ou publica mensagens no kafka de um tópico.

**Como instalar:** 
```sh
npm install -g
```

**Modo de execuções:** 
- Como `consumer` é o default. Executa e fica consumindo o topico do kafka e gera o arquivo ` <<NOME_TOPICO>>.json ` com as mensagens consumidas.
- Como `producer` passe o parametro `--producer_file_json=exemplo_topico.json` ou `--f=exemplo_topico.json`

**Modo de usar:** 
```sh
kafka-topic-js  <<parametros>>  
```
***Esta aplicação aceita os seguintes parametros:*** 

| Parâmetro | Descrição |
| ------ | ------ |
| --t  --kafka_topic | Parametro para passar o nome do tópico. (default:"topico" |
| --s  --kafka_server | Parametro para passar o host[:porta] do servidor kafka. default:"localhost:9092" |
| --f  --producer_file_json | Parametro para passar o nome do arquivo json com as mensagens para publicar. (* Opcional) |
| --h  --help | Parametro para mostrar o help. |

**Exemplos de uso:**
```sh
kafka-topic-js  -t=topico -s=localhost:9092  
```
```sh
kafka-topic-js  -t=topico -s=localhost:9092 -f=./topico-send.json 
```
## Exemplo do arquivo "producer_file_json": 
```json 
 {
    "messages": [
        "{\"objt\":62,\"value\":\"Este e um examplo de mensagem em json\"}",
        "este e apenas um texto para teste", 
        "CLASS(@EXAMPLOS_DE_CODIGOS)"
    ]
 }
```
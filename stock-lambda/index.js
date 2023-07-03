const axios = require('axios').default

const consumer = async (event) => {
  
  for (const record of event.Records) {
    const json = JSON.parse(record.body).MessageAttributes
    console.log(`body 데이터 : ${record.body}`);
    console.log(`필요데이터 : ${JSON.stringify(json)}`);
    console.log(`물건아이디 : ${json.MessageAttributeProductId.Value}`);
    console.log(`공장아이디 : ${json.MessageAttributeFactoryId.Value}`);

  const payload = {
    MessageGroupId: json.MessageId,
    MessageAttributeProductId: json.MessageAttributeProductId.Value,
    MessageAttributeProductCnt: json.MessageAttributeProductCnt.Value,
    MessageAttributeFactoryId: json.MessageAttributeFactoryId.Value,
    MessageAttributeRequester: json.MessageAttributeRequester.Value,
    CallbackUrl: 'https://재고증가 프로세스 API게이트웨이.execute-api.ap-northeast-2.amazonaws.com/product/donut'
  };
  
  console.log(`파라미터 값: ${JSON.stringify(payload)}`);


  axios.post('http://공장 API', payload)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  };
};

module.exports = {
  consumer,
};
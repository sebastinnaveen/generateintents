
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
var fs = require('fs');
var moment = require('moment');

console.log('Start Data Mining');

readFile('./eightcolumn.csv', 'utf-8', (err, fileContent) => {
    if(err) {
        console.log(err); // Do something to handle the error or just throw it
        throw new Error(err);
    }
    const jsonObj = csvjson.toObject(fileContent);
  
/*var itemsObj = {};
var itemsList = [];
  for (var i = 0; i < jsonObj.length; i++) {
    var item = jsonObj[i]["IntentID"];
    if (itemsObj[i]==item) {
        itemsObj[item] = "dupe";
	//	itemsList.push(item);
    }
    else {
        itemsObj[item] = item;
	   //itemsList.push(item);
    }
}


for (var myKey in itemsObj) {
    if (itemsObj[myKey] !== "dupe") {
        itemsList.push(itemsObj[myKey]);
    }
}
console.log(itemsList)
*/
console.log('Create Intents');
	var jsonData = jsonObj;
	var intentArr = {};
	
			if (jsonData.length > 0) {
				
				for (var i = 0; i < jsonData.length; i++) {
				
					 var id = jsonData[i]["IntentID"]
				
						var jsonArray = [];				 
					for (var j = 0; j < jsonData.length; j++) {
					if(id == jsonData[j]["IntentID"])
						{
							jsonArray.push(jsonData[j])
							
						}
					}
			
					intentArr[id] = jsonArray;
				}
					

				//console.log(intentArr);
				
				for (var myKey in intentArr)
				{
					var intentName = intentArr[myKey][0].IntentName;
					var intentResp = intentArr[myKey][0].Response;
					var unixdatetime = moment().valueOf();

					var intentJson = {
									"id": "",
									"name": ""+intentName+"",
									"auto": true,
									"contexts": [],
									"responses": [
											{
												  "resetContexts": false,
												  "action": "",
												  "affectedContexts": [],
												  "parameters": [],
												  "messages": [
													{
													  "type": 0,
													  "lang": "en",
													  "speech": ""+intentResp+""
													}
												  ],
												  "defaultResponsePlatforms": {},
												  "speech": []
											}
											],
								  "priority": 500000,
								  "webhookUsed": true,
								  "webhookForSlotFilling": false,
								  "lastUpdate": unixdatetime,
								  "fallbackIntent": false,
								  "userSays" : [],
								  "events": []
							   }
					fs.writeFileSync('./dialogflowimport/intents/'+intentName+' Intent.json',JSON.stringify(intentJson));	
						var userSayJsonArr =[];					
					 for(var ele=0;ele<intentArr[myKey].length;ele++)
					 {
						 var unixdatetime = moment().valueOf();
						var userJson = {
							"id": "",
							"data": [
							  {
								"text": ""+intentArr[myKey][ele].Query+"",
								"userDefined": false
							  }
							],
							"isTemplate": false,
							"count": 0,
							"updated": unixdatetime
						  }
						  
						   userSayJsonArr.push(userJson);
					 }
					 // intentJson.userSays = userSayJsonArr;
					 //console.log(intentJson);
					fs.writeFileSync('./dialogflowimport/intents/'+intentName+' Intent_usersays_en.json',JSON.stringify(userSayJsonArr));		   
					//console.log(intentJson);
					//break;
					
				}
				console.log('Completed!!!');
			}

		
});

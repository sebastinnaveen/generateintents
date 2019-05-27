
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
var fs = require('fs');
var moment = require('moment');

console.log("Reading template file !!!");
readFile('C:/Users/ramkumar/Downloads/datamining/datamining/eightcolumn.csv', 'utf-8', (err, fileContent) => {
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
	var jsonData = jsonObj;
	var intentArr = {};
	console.log("Processing the training dataset and generating the intents !!!");
	
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
												  //"action": "instbot.attendance",
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
								  "webhookUsed": false,
								  "webhookForSlotFilling": false,
								  "lastUpdate": unixdatetime,
								  "fallbackIntent": false,
								  "events": []
							   }
					fs.writeFile('./dialogflowimport/intents/'+intentName+' Intent.json',JSON.stringify(intentJson), function(err, result) {
						if(err) console.log('error', err);
					});	
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
					fs.writeFile('./dialogflowimport/intents/'+intentName+' Intent_usersays_en.json',JSON.stringify(userSayJsonArr), function(err, result) {
						if(err) console.log('error', err);
					});		   
					//console.log(intentJson);
					//break;
					
				}
			}

		console.log("Generated the FAQ dataset for bot !!!");
});
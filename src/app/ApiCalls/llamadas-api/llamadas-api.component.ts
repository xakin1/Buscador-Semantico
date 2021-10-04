import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-llamadas-api',
  templateUrl: './llamadas-api.component.html',
  styleUrls: ['./llamadas-api.component.scss']
})
export class LlamadasApiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

var Apiurl = 'https://api.s-recsolutions.com/v1/';

export async function send_get_command(commandId) {

  var params = {'apiKey':'02d5214506fa468484e962868800395f','userPwd':'69637182','profileID':'1268900770','commandID':commandId};
  var url = Apiurl+'command/command';

  let j = await send_get(params, url);
  let listOfCommands = eval(j)
  return listOfCommands;

}

export async function send_get_step(commandId,stepId) {

  var params = {'apiKey':'02d5214506fa468484e962868800395f','userPwd':'69637182','profileID':'1268900770','commandID':commandId,'stepID':stepId};
  var url = Apiurl+'command/command';

  let j = await send_get(params, url);
  let listOfCommands = eval(j)
  return listOfCommands;

}

export function send_edit_command(name,commandId,description) {
  var type = '0';
  var data
  commandId == undefined ? data = {"apiKey":"02d5214506fa468484e962868800395f","commandID":commandId,"description":description,"name":name,"profileID":"1268900770","userPwd":"69637182"}
  :  data = {"apiKey":"02d5214506fa468484e962868800395f","commandID":commandId,"name":name,"profileID":"1268900770","userPwd":"69637182"};

  var url = Apiurl+'new/command';

  send_post(data, url,type).then((j) => {
    console.log(eval(j));
  });
}

export function send_edit_step(name) {
  var type = '0';
  // var data = {"apiKey":"02d5214506fa468484e962868800395f","commandID":"-755434474","name":name,"description":"","profileID":"1268900770","userPwd":"69637182","type":"0"};
  var data = {"apiKey":"02d5214506fa468484e962868800395f","commandID":"-755434474","name":name,"profileID":"1268900770","userPwd":"69637182"};
  var url = Apiurl+'new/step';

  send_post(data, url,type).then((j) => {
    console.log(eval(j));
  });
}

function send_post(data, url, type) {
	var valor, index;
	return fetch(url, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Accept': '*',
			'Content-Type': '*'
		},
		body: JSON.stringify(data)
	}).then(function(response) {
		return response.text();
	}).then(function(text) {
		if (!localStorage.getItem('userPwd') && !localStorage.getItem('profileID')) {
			index = text.indexOf('\n');
			valor = text.substring(0, index);
			localStorage.setItem('userPwd', valor);
			valor = text.substring(index + 1);
			localStorage.setItem('profileID', valor);
		}
		if(type == 'event') {
		  text = valor;
		  index = text.indexOf('\n');
		  valor = text.substring(0, index);
		  valor = text.substring(index + 1);
		  localStorage.setItem('idEvent', valor);
		}
		return text;
	});
}


function send_get(params, url) {
  var queryString = Object.keys(params).map(function(key) {
    return key + '=' + params[key]
  }).join('&');

  var completeUrl = url +"?"+ queryString;
  return fetch(completeUrl, {
    method: 'GET',
    mode: 'cors',
  }).then(function(response) {
    return response.text();
  }).then(function(text) {
    return text;
  });
}


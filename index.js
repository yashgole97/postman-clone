console.log('postman');

// utility function of dom element to get string
function getElementFromString(string) {
  let div = document.createElement('div');
  div.innerHTML = string;
  return div.firstElementChild;
}

// initialize the no of parameter

let addedParamCount = 0;

let prism = document.getElementById('prism');

// hide the parameter box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';
// if the users click on params box hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
  document.getElementById('requestJsonBox').style.display = 'none';
  document.getElementById('parametersBox').style.display = 'block';
})
//  if the users click on json box hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
  document.getElementById('parametersBox').style.display = 'none';
  document.getElementById('requestJsonBox').style.display = 'block';

})
// if the user click on + add button add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
  let params = document.getElementById('params');
  let string = `<div class="row my-2" >
    <label for="URL" class="col-sm-2 col-form-label">parameter ${addedParamCount + 2}</label>
    <div class="col-md-4">
    <input type="text" class="form-control" id="parameterkey${addedParamCount + 2}" placeholder="${addedParamCount + 2} key">
    </div>
    <div class="col-md-4">
    <input type="text" class="form-control" id="parametervalue${addedParamCount + 2}" placeholder="${addedParamCount + 2} value">
    </div>
        <button class=" col-md-1 btn btn-primary deleteParam"> - </button>
</div>`;

  // convert element string to dom node
  let paramElement = getElementFromString(string);
  console.log(paramElement)
  params.appendChild(paramElement);
  // add a event listener to  remove the parameter on clicking - button
  let deleteParam = document.getElementsByClassName('deleteParam');
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();

    })
  }
  addedParamCount++;

})
// if the users click on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
  // show please wait in the response box to request patience from the user 
  document.getElementById('responseprism').innerHTML = "please wait.. fetching response ..."
  // fetching all the value user has entered
  let url = document.getElementById('url').value;
  let RequestType = document.querySelector("input[name='RequestType']:checked").value;
  let contentType = document.querySelector("input[name='contentType']:checked").value;
  console.log('url is', url)
  console.log('RequestType is', RequestType)
  console.log('contentType is', contentType)
  // if the users used params option insted of jsonRadio, collect all parameters in object
  if (contentType == 'params') {
    data = {};
    for (i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById('parameterkey' + (i + 1)) != undefined) {
        let key = document.getElementById('parameterkey' + (i + 1)).value;
        let value = document.getElementById('parametervalue' + (i + 1)).value;
        data[key] = value;
      }
      data = JSON.stringify(data);
    }
  }
  else {
    data = document.getElementById('requestJsontext').value;
  }
  // LOG ALL THE VALUE OF CONSOLE FOR DEBUGG
  console.log('url is', url);
  console.log('RequestType is', RequestType);
  console.log('contentType is', contentType);
  console.log('data is', data);

  // if the request type is post, invoke fetch api to create a post request
  if (RequestType == 'GET') {
    fetch(url, {
      method: 'GET',
    })
      .then(Response => Response.text())
      .then((text) => {
        document.getElementById('responseprism').innerHTML = text;
        prism.highlightAll();
      });
  }
  else {
    fetch(url, {
      method: 'POST',
      body: "data",
      headers: {
        "content-type": "application/json; charset=UTF-8"
      }
    })
      .then(Response => Response.text())
      .then((text) => {
        document.getElementById('responseprism').innerHTML = text;
        prism.highlightAll();
      });
  }


});
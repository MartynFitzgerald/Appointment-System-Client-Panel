const endpointAWS = `http://localhost:4000`;
//API key for the DirectMe's API.
var apiKey = '86fe8ac4-ebf5-3f8c-bd29-94fdc950b26e';


exports.read = async function(item) {
  try {
    return fetch(`${endpointAWS}/${item}/${apiKey}`).then((response) => response.json()).then((result) => {
      if (result.status === 200){
        return result.result;
      } else {
        return []
      }
    });
  } catch (error) {
    return console.error(error);
  }
}

exports.create = async function(item, data) {
  try {
    let header = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
    return fetch(`${endpointAWS}/${item}/${apiKey}`, header).then((response) => response.json()).then((result) => {
      return result.status;
    });
  } catch (error) {
    return console.error(error);
  }
}

exports.update = async function(item, data) {
  try {
    let header = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
    return fetch(`${endpointAWS}/${item}/${apiKey}`, header).then((response) => response.json()).then((result) => {
      return result.status;
    });
  } catch (error) {
    return console.error(error);
  }
}
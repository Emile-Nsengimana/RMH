const baseUrl = 'http://localhost:7000';
const consume = async (url, method, body, token) => {
  const request = new Request(baseUrl + url, {
    method,
    mode: 'cors',
    cache: 'reload',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
    body: JSON.stringify(body),
  });
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    return error;
  }
};
const defaultGet = async (url, token) => {
  const request = new Request(baseUrl + url, {
    method: 'GET',
    mode: 'cors',
    cache: 'reload',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  });
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    return error;
  }
};

export {
    consume,
    defaultGet,
}

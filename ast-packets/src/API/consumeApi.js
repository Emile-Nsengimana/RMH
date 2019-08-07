const baseUrl = 'http://localhost:7000';

const consume = async (url, meth, bd, token) => {
  const request = new Request(baseUrl + url, {
    method: meth,
    mode: 'cors',
    cache: 'reload',
    body: JSON.stringify(bd),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  });
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    return 'connection refused or server down';
  }
};

const remove = async (url, meth, token) => {
  const request = new Request(baseUrl + url, {
    method: meth,
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
    return 'connection refused or server down';
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
    return 'connection refused or server down';
  }
};

export {
  consume,
  defaultGet,
  remove,
}

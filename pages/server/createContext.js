class Context {
  constructor(req, res) {
    const { body } = req;
    this.requestPayload = JSON.parse(body);
    this.req = req;
    this.res = res;
    this.responsePayload = {};
    this.userData = {
      mobileNumber: '',
      name: '',
      email: '',
    };
    this.error = null;
    this.flow = null;
    this.inferenceResult = null;
  }
}

function createContext(req, res) {
  return new Context(req, res);
}

export { createContext, Context };

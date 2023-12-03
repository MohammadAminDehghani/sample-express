export default class Middleware {
    constructor() {
        this.error = this.error.bind(this);
    }

    error(message: string, statusCode = 500) {
        const err = new Error(message);
        (err as any).statusCode = statusCode;
        throw err;
    }
  
    // Additional methods or properties can be added here as needed
}
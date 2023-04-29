export default class HttpResponse {
  static badRequest(error: Error) {
    return {
      statusCode: 400,
      body: error
    }
  }
  static serverError() {
    return {
      statusCode: 500,
      body: {
        error: "Internal server error"
      }
    }
  }
  static ok(type: string, data: any) {
    return {
      statusCode: 200,
      body: {
        message: `${type} found successfully`,
        data
      }
    }
  }
  static success(type: string, data: any) {
    return {
      statusCode: 201,
      body: {
        message: `${type} created successfully`,
        data
      }
    }
  }
}
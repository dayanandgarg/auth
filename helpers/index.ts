export function returnErrorResponse(message: string, response: any): string {
  const responseData: { message: string; success: boolean } = {
    message: message,
    success: false,
  };

  return response.status(500).json(responseData);
}

export function returnSuccessResponse(
  message: string,
  data: any,
  response: any
): string {
  const responseData = {
    message: message,
    data: data,
    success: true,
  };
  return response.json(responseData);
}

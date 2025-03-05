const express = require('express');
const app = express();

// Define a mapping for the supported HTTP status codes and their messages.
const statusMessages = {
  "200": "OK: The request has succeeded. The meaning of this status depends on the HTTP method used.",
  "201": "Created: The request has been fulfilled and resulted in a new resource being created.",
  "204": "No Content: The server successfully processed the request and is not returning any content.",
  "400": "Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax).",
  "401": "Unauthorized: The request has not been applied because it lacks valid authentication credentials for the target resource.",
  "403": "Forbidden: The server understood the request but refuses to authorize it.",
  "404": "Not Found: The server has not found anything matching the request URI. This is often caused by a missing page or resource.",
  "405": "Method Not Allowed: The method specified in the request is not allowed for the resource identified by the request URI.",
  "429": "Too Many Requests: The user has sent too many requests in a given amount of time ('rate limiting').",
  "500": "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.",
  "502": "Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.",
  "503": "Service Unavailable: The server is currently unable to handle the request due to temporary overloading or maintenance.",
  "504": "Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server."
};

app.get('/status-info', (req, res) => {
  // Extract the "code" query parameter
  const codeParam = req.query.code;

  // If code is not provided, return an error
  if (!codeParam) {
    return res.status(400).json({
      error: "Please provide a 'code' query parameter. Example: /status-info?code=200"
    });
  }
  
  // Check if the provided code is in our mapping.
  // We use the string form of the code because our keys are stored as strings.
  if (statusMessages[codeParam]) {
    return res.json({
      status: parseInt(codeParam, 10),
      message: statusMessages[codeParam]
    });
  } else {
    // If the code is not supported, return an error with a helpful message.
    return res.status(400).json({
      error: `Status code ${codeParam} is not recognized. Please use one of the following codes: ${Object.keys(statusMessages).join(', ')}.`
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Status Code API is running on http://localhost:${PORT}`);
});
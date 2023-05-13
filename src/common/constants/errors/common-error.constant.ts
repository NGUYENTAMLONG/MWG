export const COMMON_ERROR = {
  COMMON_SYSTEM_ERROR: {
    CODE: 'sys00001',
    MESSAGE:
      'An error has arisen from the system. Please try again later or contact us for a fix.',
  },
  COMMON_BADREQUEST_ERROR: {
    CODE: 'br00001',
    MESSAGE: 'A runtime exception indicating a bad client request.',
  },
  COMMON_UNAUTHORIZED_ERROR: {
    CODE: 'una00001',
    MESSAGE:
      "The server's request was not verified because it lacks valid authentication credentials for the target resource",
  },
  INVALID_MIME_TYPE: {
    CODE: 'att00001',
    MESSAGE: 'Invalid mime type',
  },
};

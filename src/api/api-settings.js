const isProduction = ["production"].includes(process.env.NODE_ENV);

// APIs
export const baseURL = `${process.env.VUE_APP_BASE_API}${
  !isProduction ? `:${process.env.VUE_APP_BASE_PORT}` : ""
}`;

// socket.io
export const socketURL = `${process.env.VUE_APP_BASE_API}${
  !isProduction ? `:${process.env.VUE_APP_SOCKET_PORT}` : ""
}`;

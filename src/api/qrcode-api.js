import RequestHttp from "@/api/common-api";

const REST = new RequestHttp();
const baseURL = "http://localhost:1929";

export default {
  getQRcode(uuid) {
    return REST.post(`${baseURL}/qrcode`, uuid);
  },
  getTEST() {
    return REST.get(`${baseURL}/qrcode`);
  },
};

import RequestHttp from "@/api/common-api";

const REST = new RequestHttp();
const baseURL = "http://localhost:3030";

export default {
  /**
   * 取得QRcode(url)資訊
   * @param {Object} param 參數
   * @param {String} id 使用者序號
   * @returns
   */
  getQRcode({ id }) {
    return REST.post(`${baseURL}/qrcode`, { id });
  },
};

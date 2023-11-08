import RequestHttp from "@/api/common-api";
import { baseURL } from "@/api/api-settings";

const REST = new RequestHttp({
  baseURL: baseURL,
});

export default {
  /**
   * 取得QRcode(url)資訊
   * @param {Object} param 參數
   * @param {String} param.connectWith 連線方式
   * @param {String} param.id 使用者序號
   * @returns
   */
  getQRcode({ id, connectWith }) {
    return REST.post(`/qrcode`, { id, connectWith });
  },
};

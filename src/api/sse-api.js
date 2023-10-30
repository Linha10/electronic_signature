import RequestHttp from "@/api/common-api";

const REST = new RequestHttp();
const baseURL = "http://localhost:3000";

export default {
  /**
   * 取得簽名檔案 (SSE)
   *
   * @param {string} id 使用者序號
   * @returns {Promise}
   */
  connectServer(id) {
    return new EventSource(`${baseURL}/sse/get-data?userId=${id}`);
  },
  /**
   * 送出簽名檔案
   *
   * @returns {Promise}
   */
  sendSignature(param) {
    return REST.post(`${baseURL}/sse/send-data`, param);
  },
  /**
   * 確認是否擁有權限開啟簽名
   *
   * @returns {Promise}
   */
  checkPermission(id) {
    return REST.get(`${baseURL}/sse/check?userId=${id}`);
  },
};

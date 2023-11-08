import axios from "axios";
import { merge } from "lodash";

const apiConfig = axios.create({
  // env設定對應api路徑
  baseURL: process.env.VUE_APP_BASE_API,
  // 標頭
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
  // 請求回應超時
  timeout: 30000,
  // 請求超時 重新請求最大次數
  maxRetry: 20,
  // 重新請求間隔時間 (每秒)
  retryDelay: 2000,
});

class RequestHttp {
  /**
   * 建構子
   *
   * @param {object} config - 選項參數
   */
  constructor(config = {}) {
    // 自訂選項參數
    this.options = merge({}, apiConfig, config);
    // 實例化 axios
    this.service = axios.create(this.options);
  }

  /**
   * 讀取 資源
   *
   * @param {string} url - 網址
   * @param {object} config - 選項參數
   * @returns {AxiosInstance}
   */
  get(url, config) {
    config = config || {};

    return this.service.get(url, config);
  }

  /**
   * 新增 資源
   *
   * @param {string} url - 網址
   * @param {object} data - 傳遞數據
   * @param {object} config - 選項參數
   * @returns {AxiosInstance}
   */
  post(url, data, config) {
    data = data || {};
    config = config || {};

    return this.service.post(url, data, config);
  }

  /**
   * 更新 單筆資源
   *
   * @param {string} url - 網址
   * @param {object} data - 傳遞數據
   * @param {object} config - 選項參數
   * @returns {AxiosInstance}
   */
  put(url, data, config) {
    data = data || {};
    config = config || {};
    return this.service.put(url, data, config);
  }

  /**
   * 刪除 資源
   *
   * @param {string} url - 網址
   * @param {object} config - 選項參數
   * @returns {AxiosInstance}
   */
  delete(url, config) {
    config = config || {};
    return this.service.delete(url, config);
  }
}

export default RequestHttp;

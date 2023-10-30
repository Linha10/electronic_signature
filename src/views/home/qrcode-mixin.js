import { isEmpty, isFunction } from "lodash";
import qrcodeApi from "@/api/qrcode-api";
export default {
  data() {
    return {
      // 使用者序號
      userId: "",
      // QRCODE連結網址
      QRUrl:
        "https://cdn.discordapp.com/attachments/370937669607489546/1149644478592847902/IMG_9487.jpg",
      // 簽名base64圖檔
      signatureImage: "",
    };
  },
  methods: {
    /**
     * 連線至socket.io
     *
     * @param {Function} done 取得簽名後續處理方法
     */
    async initConnect(done) {
      // 開啟socket.io連線
      this.$socket.connect();
      // 建立房間
      this.$socket.emit("createRoom", this.userId);
      this.$socket.on("capture-signature", async (signature) => {
        if (!isEmpty(signature)) {
          this.signatureImage = signature;
          if (isFunction(done)) {
            done();
          }
        }
      });
    },
    /**
     * 取得QRcode的url (象徵性)
     *
     * @param {String} connectWith 連線方式 (socket.io || sse)
     */
    async getQrUrl(connectWith = "socket.io") {
      // 取得QRcode
      await qrcodeApi
        .getQRcode({ id: this.userId, connectWith: connectWith })
        .then((res) => {
          const { data } = res.data;

          this.QRUrl = data.qr_url;
        })
        .catch(() => {});
    },
  },
};

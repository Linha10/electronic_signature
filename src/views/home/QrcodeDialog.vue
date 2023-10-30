<template>
  <el-dialog
    title="掃描QR CODE"
    :visible.sync="dialogVisible"
    width="500px"
    :close-on-click-modal="false"
    @close="handleCloseDialog"
  >
    <!-- QRcode -->
    <qrcode-vue
      :value="QRUrl"
      render-as="canvas"
      :size="150"
      foreground="#00a7f2"
    >
    </qrcode-vue>
    {{ QRUrl }}
    <el-divider></el-divider>
    <!-- 讀取QRcode -->
    <QrcodeDropZone @decode="onDecode">
      <div class="scan-zone">
        <div style="margin: auto" class="scan-zone--result">
          {{ scanUrl ? `QRcode網址為：${scanUrl}` : "請放入QRcode" }}
        </div>
      </div>
    </QrcodeDropZone>

    <div slot="footer">
      <el-button type="primary" @click="handleCloseDialog">確定</el-button>
    </div>
  </el-dialog>
</template>

<script >
import QrcodeVue from "qrcode.vue";
import qrcodeMixin from "@/views/home/qrcode-mixin";
import { QrcodeDropZone } from "vue-qrcode-reader";
import sseApi from "@/api/sse-api";

export default {
  name: "QRcodeDialog",
  components: {
    QrcodeVue,
    QrcodeDropZone,
  },
  mixins: [qrcodeMixin],
  data() {
    return {
      // 彈窗狀態
      dialogVisible: false,
      // QRcode掃描資料結果
      scanUrl: null,
      // 連線方式
      connectWith: "",
      // sse
      sseSource: null,
    };
  },
  computed: {
    /**
     * 交換簽名模式 [socket.io , sse]
     */
    transmission() {
      switch (this.connectWith) {
        case "socket.io":
          return {
            // 連線方式
            connect: this.initConnect,
            // 斷開連線
            disconnect: () => {
              this.$socket.disconnect();
            },
          };

        case "sse":
          return {
            // 連線方式
            connect: this.setupSSE,
            // 斷開連線
            disconnect: () => {
              this.sseSource.close();
            },
          };
        default:
          return null;
      }
    },
  },
  methods: {
    /**
     * 開啟QR-code彈窗
     *
     * @param {String} memberId 人員序號
     * @param {String} connection 連接方法
     */
    openDialog(memberId, connection) {
      this.userId = memberId;

      if (["socket.io", "sse"].includes(connection)) {
        // 連線至socket
        this.connectWith = connection;
        this.transmission.connect(this.done);
        this.getQrUrl(connection);
        // 掃描連接時給予websocket 提示， 關閉此彈窗 > 返回圖片
        this.dialogVisible = true;
      }
    },
    /**
     * 建立SSE連線
     */
    setupSSE() {
      // 連接至server端
      this.sseSource = sseApi.connectServer(this.userId);

      // 取得server派發訊息
      this.sseSource.onmessage = (res) => {
        const { status, signature } = JSON.parse(res.data);
        if (status === "success") {
          this.signatureImage = signature;

          this.done();
        }
      };
    },
    /**
     * 開啟/關閉QRcode彈窗顯 示狀態
     */
    handleCloseDialog() {
      this.transmission.disconnect();
      this.dialogVisible = false;
    },
    /**
     * 傳遞簽名資料，關閉彈窗
     */
    done() {
      this.handleCloseDialog();
      this.$emit("update", this.signatureImage);
    },
    /**
     * 取得QRcode資料結果
     *
     * @param {String} result 掃描結果字串
     */
    onDecode(result) {
      this.scanUrl = result;
    },
  },
};
</script>

<style lang="scss" scoped>
.scan-zone {
  height: 150px;
  width: 200px;
  border: 1px solid rgb(229, 229, 229);
  margin: auto;
  display: flex;
  .scan-zone--result {
    margin: auto;
  }
}
</style>

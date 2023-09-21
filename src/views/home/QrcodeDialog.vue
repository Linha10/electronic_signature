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

<script>
import QrcodeVue from "qrcode.vue";
import qrcodeMixin from "@/views/home/qrcode-mixin";
import { QrcodeDropZone } from "vue-qrcode-reader";

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
    };
  },

  methods: {
    /**
     * 開啟QR-code彈窗
     *
     * @param {String} memberId
     */
    openDialog(memberId) {
      this.userId = memberId;
      // 連線至socket
      this.initConnect();
      this.getQrUrl();
      // 掃描連接時給予websocket 提示， 關閉此彈窗 > 返回圖片
      this.dialogVisible = true;
    },
    /**
     * 開啟/關閉QRcode彈窗顯示狀態
     */
    handleCloseDialog() {
      this.$socket.disconnect();

      this.dialogVisible = false;
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
  watch: {
    // 監聽取得scoket.io派發的簽名
    signatureImage: function () {
      this.handleCloseDialog();
      this.$emit("update", this.signatureImage);
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

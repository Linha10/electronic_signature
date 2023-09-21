<template>
  <div class="signature">
    <!-- 開啟簽名設定彈窗 -->
    <el-button type="primary" @click="handleOuterDialogVisible" size="mini">
      設定簽名
    </el-button>

    <!-- 簽名設定彈窗 -->
    <el-dialog
      title="簽名設定"
      :visible.sync="outerDialogVisible"
      width="300px"
      center
    >
      <!-- 簽名設定彈窗 - 內容區塊 -->
      <div class="signature__content">
        <!-- 簽名鈕  -->
        <el-button
          v-show="isSignatureImgEmpty"
          class="signature__content__signBtn"
          @click="openCanvasDialog"
        >
          簽名
        </el-button>
        <!-- 簽名圖檔標籤 -->
        <div>
          <!-- 圖檔 -->
          <el-tag
            class="signature__content__tag"
            v-show="!isSignatureImgEmpty"
            v-for="item in signatureImgList"
            :key="item.src"
            closable
            @close="removeTag(item.src)"
            size="medium"
          >
            <el-image
              class="signature__content__tag__image"
              :src="item.src"
            ></el-image>
          </el-tag>
        </div>

        <!-- 編輯我的簽名彈窗 -->
        <el-dialog
          class="signDialog"
          :visible.sync="dialogVisible"
          :width="canvasSetting.width"
          center
          appendToBody
          :close-on-click-modal="false"
        >
          <!-- 彈窗標題 -->
          <template #title>
            <div class="signDialog__header">
              <div class="signDialog__header__label">編輯我的簽名</div>
              <el-button type="primary" size="mini" @click="handleQRcode"
                >使用行動裝置簽名</el-button
              >

              <el-button type="primary" size="mini" @click="handleWindowQRcode"
                >使用行動裝置簽名-新視窗</el-button
              >
            </div>
          </template>
          <!-- Canvas簽名 -->
          <template>
            <EleSignature ref="signatureCanvas" />
          </template>
          <!-- footer按鈕 -->
          <div slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="signatureConfirm">
              確 定
            </el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 設定簽名彈窗footer -->
      <div slot="footer">
        <el-button type="primary" @click="handleOuterDialogVisible"
          >確定</el-button
        >
      </div>
    </el-dialog>
    <QrcodeDialog ref="qrcodeDialog" @update="getSignatureByMobile" />
  </div>
</template>

<script>
import EleSignature from "@/components/EleSignature";
import mobile from "is-mobile";
import QrcodeDialog from "@/views/home/QrcodeDialog";
import { isEmpty } from "lodash";

const memberId = "terminator-9000";
export default {
  name: "SignatureDisplay",
  components: {
    EleSignature,
    QrcodeDialog,
  },
  data() {
    return {
      // 簽名設定彈窗狀態
      outerDialogVisible: false,
      // 編輯簽名彈窗狀態
      dialogVisible: false,
      // 簽名圖檔
      signatureImgList: [],
      // 手機模式
      isMoible: false,
      // 橫畫面 - 手機版下生效
      isFull: true,
      childWindow: null,
    };
  },
  created() {
    this.isMobile = mobile({ featureDetect: true, tablet: true });
  },
  computed: {
    /**
     * 儲存簽名圖檔陣列是否為空
     */
    isSignatureImgEmpty() {
      return isEmpty(this.signatureImgList);
    },
    /**
     * 桌機 & 手機版 canvas畫布設定
     */
    canvasSetting() {
      return this.isMobile
        ? { width: `${window.innerWidth - 10}px`, height: "100%" }
        : { width: "800px" };
    },
  },
  methods: {
    /**
     * 關閉簽名設定彈窗
     */
    handleOuterDialogVisible() {
      this.outerDialogVisible = !this.outerDialogVisible;
    },
    /**
     * 開啟編輯簽名彈窗
     */
    openCanvasDialog() {
      this.dialogVisible = true;
      const { signatureCanvas } = this.$refs;
      if (!isEmpty(signatureCanvas)) signatureCanvas?.init();
    },
    /**
     * 關閉 編輯我的簽名彈窗 & 取得簽名
     */
    signatureConfirm() {
      const signature = this.$refs.signatureCanvas.getSignature();
      if (!isEmpty(signature)) this.signatureImgList = [{ src: signature }];

      this.dialogVisible = false;
    },
    /**
     * 移除簽名
     *
     * @param {String} imgSrc 簽名圖檔資訊
     */
    removeTag(imgSrc) {
      this.signatureImgList = this.signatureImgList.filter(
        ({ src }) => imgSrc !== src
      );
    },
    /**
     * 開啟QRcode彈窗
     */
    handleQRcode() {
      this.$refs.qrcodeDialog.openDialog(memberId);
    },
    /**
     * 取得從行動裝置取得的簽名
     */
    getSignatureByMobile(signature) {
      this.signatureImgList = [{ src: signature }];

      this.dialogVisible = false;
    },
    /**
     * 開啟QRcode新視窗
     */
    handleWindowQRcode() {
      this.childWindow = window.open(
        `http://localhost:8080/window/qrcode/${memberId}`,
        "QRcode",
        "popup,width=500,height=500"
      );
      // 監聽新QRcode視窗
      window.addEventListener("message", this.getSignatureFromOtherWindow);

      // 接收到手機端圖檔，移除監聽
      if (!isEmpty(this.signatureImgList)) {
        window.removeEventListener("message", this.getSignatureFromOtherWindow);
      }
    },
    /**
     * 從新視窗中監聽 & 取得簽名圖檔
     */
    getSignatureFromOtherWindow(event) {
      if (!isEmpty(event?.data)) {
        // 關閉簽名彈窗
        this.dialogVisible = false;
        // 取得簽名圖檔資料
        const signature = event.data.signatureImage;

        this.signatureImgList = [{ src: signature }];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 設定簽名彈窗
.signature {
  display: flex;
  // 簽名內容區塊
  .signature__content {
    text-align: center;
  }
  // 設定簽名鈕
  .signature__content__signBtn {
    width: 100%;
  }
  // 簽名標籤
  .signature__content__tag {
    height: 100%;
    // 簽名標籤圖檔
    .signature__content__tag__image {
      width: 200px;
      height: 80px;
    }
  }
}
:deep(.el-dialog__header) {
  height: 56px;
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
}
.signDialog {
  height: 100%;
  .signDialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 30px);
  }
  .signDialog__header__label {
    font-weight: 700;
    font-size: 16px;
    color: black;
  }
  .signature__cancel {
    padding: 0 !important;
    border: 0 !important;
    border-radius: 4px;
    position: absolute;
  }
}

:deep(.el-tag .el-icon-close) {
  top: -55px;
}
</style>

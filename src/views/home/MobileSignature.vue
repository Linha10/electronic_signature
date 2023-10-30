<template>
  <div>
    <div v-if="isMobile && !state.isError">
      <!-- 簽名成功提示 -->
      <div class="signature__confirm--success" v-show="emitSignatureState">
        <el-result
          icon="success"
          :class="['hint', { showAnimation: emitSignatureState }]"
        >
          <div slot="extra">
            <img class="success-img" :src="imgs.success" alt="成功送出" />
            <div class="success-text">完成簽名，請關閉此頁。</div>
          </div>
        </el-result>
      </div>
      <!-- 簽名區塊 - drawer -->
      <el-drawer
        :visible.sync="drawerVisible"
        :direction="direction"
        size="100%"
        @close="handleClose"
        v-loading="isLoading"
      >
        <el-button
          class="signature__confirm"
          type="primary"
          size="mini"
          v-show="!isLoading"
          @click="handleEmitSignature"
          >簽名完成</el-button
        >

        <EleSignature ref="signatue" v-loading="isLoading" />
      </el-drawer>
    </div>
    <!-- 裝置錯誤提示 -->
    <div v-else class="signature--deviceWrong">
      <el-result icon="warning" :subTitle="state.content">
        <div slot="extra">
          <img :src="imgs.errorFile" alt="錯誤 - 檔案" />

          <img :src="imgs.errorBB" alt="錯誤 - 雲寶" />
        </div>
      </el-result>
    </div>
  </div>
</template>

<script>
import mobile from "is-mobile";
import EleSignature from "@/components/EleSignature";
import Err_cloud_bb from "@/assets/Err_cloud_bb.png";
import sperate_files from "@/assets/sperate_files.png";
import apply_success from "@/assets/apply_success.svg";
import sse from "@/api/sse-api";
import { isEmpty } from "lodash";
/**
 * 倒數計時器
 */
const setTimeoutTimer = (time = 100) => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(true);
      clearTimeout(timer);
    }, time);
  });
};

export default {
  name: "MobileSignature",
  components: {
    EleSignature,
  },
  data() {
    return {
      // 是否為行動裝置
      isMobile: false,
      // 讀取狀態
      isLoading: true,
      // 抽屜顯示狀態
      drawerVisible: true,
      // 抽屜展開方式
      direction: "rtl",
      // 簽名圖檔資訊傳送狀態
      emitSignatureState: false,
      // 使用者序號
      userId: "",
      // 連線方式
      connectWith: "",
      // 當前狀態
      state: {
        // 為錯誤狀態
        isError: false,
        // 內容
        content: "請切換至行動裝置或重新掃描QRcode",
        // 代碼
        code: "device-error",
      },
      // 裝置錯誤圖片
      imgs: {
        errorBB: Err_cloud_bb,
        errorFile: sperate_files,
        success: apply_success,
      },
    };
  },
  computed: {
    /**
     * 連線功能 (確認連線狀態 、 送出簽名)
     *
     * @returns {Object}
     */
    connect() {
      switch (this.connectWith) {
        case "socket.io":
          return {
            // 連線至socket.io
            checkPermission: () => {
              // 開啟socket.io連線
              this.$socket.connect();

              this.$socket.emit("join-room", this.userId);
              // 加入失敗
              this.$socket.on("connect-error", (feedback) => {
                this.state = feedback;
              });
            },
            // 送出簽名
            sendSignature: (signature) => {
              this.$socket.emit("send-signature", {
                image: signature,
                roomId: this.userId,
              });
              // 顯示成功
              this.emitSignatureState = true;
              this.$socket.disconnect();
              // 關閉簽名彈窗
              this.handleClose();
            },
          };

        // SSE連線
        case "sse":
          return {
            // 取得SSE連線
            checkPermission: () => {
              sse
                .checkPermission(this.userId)
                .then(({ data }) => {
                  const { permission } = data;

                  if (!permission) {
                    this.state = data.feedback;
                  }
                })
                .catch(() => {
                  this.state.isError = true;
                });
            },
            // 送出簽名
            sendSignature: (signature) => {
              //
              sse
                .sendSignature({ id: this.userId, signature })
                .then(() => {
                  // 顯示成功
                  this.emitSignatureState = true;
                  // 關閉簽名彈窗
                  this.handleClose();
                })
                .catch(() => {});
            },
          };
        default:
          return null;
      }
    },
  },
  async created() {
    this.isMobile = mobile({ featureDetect: true, tablet: true });

    // 取得使用者序號及連線方式(socket.io|sse)
    [this.userId, this.connectWith] = [
      this.$route.params.id,
      this.$route.params.connect,
    ];

    await setTimeoutTimer(1000);

    // 為移動裝置時才進行socket連線
    if (this.isMobile && !isEmpty(this.connect)) {
      this.connect.checkPermission();
      this.isLoading = false;
    } else {
      this.state.isError = true;
    }
  },

  methods: {
    /**
     * 關閉行動裝置簽名彈窗
     */
    handleClose() {
      this.isLoading = false;
      this.$socket.disconnect();
      this.drawerVisible = false;
    },
    /**
     * 傳送手機裝置簽名圖檔資訊
     */
    async handleEmitSignature() {
      this.isLoading = true;
      await setTimeoutTimer(1000);
      // 這邊預設只剩下橫畫面簽名 所以不必取得is-full的值
      this.$refs.signatue.getSignature((signatue) => {
        const isEmptyCanvas = signatue.isEmpty();

        if (!isEmptyCanvas) {
          const rotateSignatue = signatue.getRotateCanvas(-90).toDataURL();
          this.connect.sendSignature(rotateSignatue);
        }
      });
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.el-drawer__close-btn) {
  position: relative;
  z-index: 5000;
}
.signature__confirm {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: rotate(90deg);
  z-index: 5000;
}
.signature__confirm--success {
  display: flex;
  align-items: center;
  height: calc(100vh - 100px);
  .hint {
    transform: rotate(90deg);
    margin: auto;
  }
  .success-img {
    z-index: -1;
    position: absolute;
    bottom: 10px;
    left: 150px;
  }
  .success-text {
    color: #606266;
    font-weight: 700;
    font-size: 18px;
    margin-top: 5px;
  }
}
.signature--deviceWrong {
  display: flex;
  justify-content: center;
  height: calc(100vh - 100px);
  :deep(.el-result__subtitle > p) {
    font-size: 18px;
    font-weight: 700;
  }
}
:deep(.el-drawer__close-btn) {
  display: none;
}
</style>

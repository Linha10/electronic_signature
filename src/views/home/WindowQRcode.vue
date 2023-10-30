<template>
  <div>
    <p>掃描QR CODE</p>
    <!-- 簽名用QRcode -->
    <qrcode-vue
      :value="QRUrl"
      render-as="canvas"
      :size="150"
      foreground="#00a7f2"
    >
    </qrcode-vue>

    {{ this.userId }}
    <el-divider></el-divider>
    <div>
      <div>NUEiP官網</div>
      <!-- 測試用 - 有背景圖的QRcode -->
      <vue-qr
        :bgSrc="img"
        text="https://www.nueip.com/"
        :size="200"
        :dotScale="0.3"
        :correctLevel="3"
        colorDark="#00a7f2"
      ></vue-qr>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import VueQr from "vue-qr";
import qrcodeMixin from "@/views/home/qrcode-mixin";
import nueipAutumnFestival from "@/assets/nueip_autumn_festival.png";

export default {
  name: "QRcodeWindow",
  components: { QrcodeVue, VueQr },
  mixins: [qrcodeMixin],
  data() {
    return {
      // 官網QRcode背景圖
      img: nueipAutumnFestival,
    };
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * 取得QRcode設定
     */
    init() {
      this.userId = this.$route.params.id;
      this.initConnect(this.done);
      this.getQrUrl();
    },
    /**
     * 完成簽名，關閉分頁
     */
    done() {
      window.opener.postMessage(
        {
          signatureImage: this.signatureImage,
        },
        //TODO 須限制targetOrigin
        "*"
      );
      window.close();
    },
  },
};
</script>

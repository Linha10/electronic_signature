<script>
import SmoothSignature from "smooth-signature";
import mobile from "is-mobile";
import { isFunction } from "lodash";

export default {
  //TODO 直畫面的切版設定
  props: {
    // 直畫面展示鈕
    showPortrait: {
      type: Boolean,
      default: false,
    },
    // 可選色
    colors: {
      type: Array,
      default: () => [
        { name: "Black", code: "#000000" },
        { name: "skyblue", code: "#1890ff" },
        { name: "Red", code: "#FF2D2D" },
      ],
    },
    // canvas設定
    options: {
      type: Object,
      default: () => {
        return {
          // 畫布倍率(影響簽名圖檔畫質)
          scale: 1,
          // 最小筆寬
          minWidth: 4,
          // 最大筆寬
          maxWidth: 6,
          // 筆色
          color: "#000000",
        };
      },
    },
  },
  data() {
    return {
      // 簽名畫布
      signature: null,
      // 寬度
      width: 0,
      // 手機版
      isMobile: false,
      // 橫畫面
      isFull: true,
    };
  },
  created() {
    this.isMobile = mobile({ featureDetect: true, tablet: true });
  },
  mounted() {
    this.init();
  },
  computed: {
    /**
     * 設定當前畫筆顏色
     */
    currentColor: {
      get() {
        return this.signature?.color;
      },
      set(val) {
        this.handleColor(val);
      },
    },
    /**
     * 設定canvas-outer寬度, 橫畫面(isFull)時為高度
     */
    setCanvasOuterSize() {
      // 手機版且為橫畫面
      if (this.isMobile && this.isFull) {
        return { height: `${window.innerHeight - 50 + 4}px` };
      }
      // 直畫面 or 網頁版
      return { width: `${this.width + 4}px` };
    },
  },
  methods: {
    /**
     * 設定canvas畫布寬與高
     *
     * @returns {Object}
     */
    setCanvasRange() {
      // 為手機版且橫畫面時
      if (this.isMobile && this.isFull) {
        this.width = window.innerWidth - 100;
        return {
          width: this.width,
          height: window.innerHeight - 50,
        };
      }

      // 畫面最小寬與預設寬取最低 (手機版且直畫面 || 桌機版)
      this.width = this.isMobile ? Math.min(window.innerWidth, 300) : 700;
      return {
        width: this.width,
        height: 210,
      };
    },
    /**
     * 初始化canvas設定
     */
    init() {
      const canvas = this.$refs.canvas || document.querySelector("canvas");

      const width_height = this.setCanvasRange();
      // 配置canvas 設定
      const options = {
        ...width_height,
        ...this.options,
      };

      this.signature = new SmoothSignature(canvas, options);
    },
    /**
     * 重置簽名
     *
     * @param {Function} action 函式
     */
    handleReset(action) {
      // 重置簽名
      const doReset = this.signature.clear;
      isFunction(action) ? action(doReset) : doReset();
    },
    /**
     * 返回上一步
     *
     * @param {Function} action 函式
     */
    handleUndo(action) {
      const doUndo = this.signature.undo;
      isFunction(action) ? action(doUndo) : doUndo();
    },
    /**
     * 設定當前筆色
     */
    handleColor(color) {
      this.signature.color = color;
    },
    /**
     * 取得canvas簽名圖片
     *
     *  @param {Function|null} method 自訂方法
     */
    getSignature(method = null) {
      if (isFunction(method)) {
        method(this.signature);
        return;
      }

      const empty = this.signature.isEmpty();
      if (!empty) {
        if (this.isMobile && this.isFull) {
          this.signature = this.signature.getRotateCanvas(-90);
        }

        const image = this.signature.toDataURL();

        return image;
      }
      return {};
    },
    /**
     * 手機版時，是否為全螢幕
     */
    showFull() {
      this.isFull = !this.isFull;

      this.init();
    },
    /**
     * 渲染canvas畫布
     *
     * @returns {Element}
     */
    renderCanvas() {
      return (
        <div class="canvas-outer" style={this.setCanvasOuterSize}>
          <canvas class="canvas-inner" ref="canvas" />
        </div>
      );
    },
    /**
     * 渲染canvas互動鈕
     *
     * @returns {Element}
     */
    renderActionBtns() {
      return (
        <div class="canvas__actions">
          {this.$scopedSlots?.leftTool ? (
            // 左側插槽
            this.$scopedSlots.leftTool({
              reset: this.handleReset,
              undo: this.handleUndo,
            })
          ) : (
            <div>
              <el-button
                type="warning"
                size="mini"
                onClick={() => {
                  this.handleUndo();
                }}
              >
                返回上一步
              </el-button>
              <el-button
                type="danger"
                size="mini"
                onClick={() => {
                  this.handleReset();
                }}
              >
                清除
              </el-button>

              {
                // 手機版時顯示全螢幕設定鈕
                this.isMobile && this.showPortrait ? (
                  <el-button
                    type="primary"
                    size="mini"
                    onClick={() => {
                      this.showFull();
                    }}
                  >
                    {!this.isFull ? "全螢幕" : "關閉全螢幕"}
                  </el-button>
                ) : (
                  ""
                )
              }
            </div>
          )}
        </div>
      );
    },
    /**
     * 渲染切換筆色列
     *
     * @returns {Element}
     */
    renderPenColorList() {
      return (
        <div style="margin: 5px">
          {this.$scopedSlots?.rightTool ? (
            // 右側插槽
            this.$scopedSlots.rightTool({
              reset: this.handleReset,
              undo: this.handleUndo,
            })
          ) : (
            <el-radio-group
              vModel={this.currentColor}
              size="mini"
              fill={`${this.currentColor}`}
            >
              {this.colors.map((item) => {
                return (
                  <el-radio-button
                    key={item.code}
                    label={item.code}
                    style={{ color: `${item.code}` }}
                  >
                    {item.name}
                  </el-radio-button>
                );
              })}
            </el-radio-group>
          )}
        </div>
      );
    },
    /**
     * 渲染工具列 (互動鈕 & 筆色)
     *
     * @returns {Element}
     */
    renderTool() {
      return (
        <div class="canvas__tools actions">
          {this.renderActionBtns()}
          {this.renderPenColorList()}
        </div>
      );
    },
  },

  render() {
    return (
      <div class={`${this.isMobile ? "is-mobile" : "is-desktop"}`}>
        {
          // 為行動裝置且全(橫)螢幕
          this.isMobile && this.isFull ? (
            <div class="canvas--extend">
              <div class="canvas-contanier"> {this.renderCanvas()} </div>
              <div class="actions--extend">{this.renderTool()}</div>
            </div>
          ) : (
            <div class="canvas--wrap">
              <div class="canvas-contanier"> {this.renderCanvas()}</div>
              {this.renderTool()}
            </div>
          )
        }
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.is-mobile {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .canvas--wrap {
    margin-top: 100px;
    .actions {
      margin-bottom: 20px;
    }
    .canvas-outer {
      background: rgb(245, 245, 245);
      border-radius: 4px;
      height: 214px;
      margin: auto;
      .canvas-inner {
        border-radius: 4px;
        cursor: crosshair;
        background-color: transparent;
        border: 2px solid rgb(229, 229, 229);
      }
    }
  }
  .canvas--extend {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 15px;
    display: flex;
    justify-content: center;
    .actions--extend {
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .canvas {
      flex: 1;
    }
    .canvas-outer {
      background: rgb(245, 245, 245);
      border-radius: 4px;
      .canvas-inner {
        border-radius: 4px;
        cursor: crosshair;
        background-color: transparent;
        border: 2px solid rgb(229, 229, 229);
      }
    }
    .actions {
      margin-right: 10px;
      white-space: nowrap;
      transform: rotate(90deg);
    }
  }

  .canvas-contanier {
    margin: 15px;
  }
}

.is-desktop {
  .canvas--wrap {
    display: flex;
    flex-direction: column;
  }
  & .canvas-outer {
    background: rgb(245, 245, 245);
    border-radius: 4px;
    height: 214px;
    margin: auto;
    .canvas-inner {
      border-radius: 4px;
      cursor: crosshair;
      background-color: transparent;
      border: 2px solid rgb(229, 229, 229);
    }
  }
  .canvas__tools {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    align-items: center;
    .canvas__actions {
      margin: 0px 15px;
    }
  }
}
</style>

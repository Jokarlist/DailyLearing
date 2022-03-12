<template>
  <ul class="contact-container">
    <li>
      <a target="_blank" :href="data.github">
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>{{ data.githubName }}</span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${data.mail}`">
        <div class="icon">
          <Icon type="mail" />
        </div>
        <span>{{ data.mail }}</span>
      </a>
    </li>
    <li>
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
      >
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span>{{ data.qq }}</span>
      </a>
      <div class="pop">
        <img :src="data.qqQrCode" alt="" />
      </div>
    </li>
    <li>
      <a>
        <div class="icon weixin">
          <Icon type="weixin" />
        </div>
        <span>heungkuen328</span>
      </a>
      <div class="pop">
        <img :src="data.weixinQrCode" alt="" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  components: {
    Icon,
  },
  props: {
    data: null,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.contact-container {
  padding: 20px;
  margin: 0;
  color: @gray;
  @itemHeight: 30px;

  li {
    position: relative;
    height: @itemHeight;
    margin: 14px 0;
    line-height: @itemHeight;

    &:hover {
      color: #fff;

      .pop {
        transform: scaleY(1);
      }
    }

    a {
      display: flex;
      align-items: center;
      font-size: 13px;
      cursor: pointer;

      .icon {
        width: 36px;
        font-size: 26px;

        &.weixin {
          font-size: 32px;
          text-indent: -3px;
        }
      }
    }

    .pop {
      position: absolute;
      left: 0;
      bottom: @itemHeight + 5px;
      padding: 8px 12px;
      background: #fff;
      border-radius: 5px;
      transform: scaleY(0);
      transform-origin: center bottom;
      transition: all 0.3s ease;

      img {
        width: 150px;
        height: 150px;
      }

      &::after {
        position: absolute;
        left: 50%;
        bottom: -12px;
        border: 6px solid #fff;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        transform: translateX(-50%);
        content: "";
      }
    }
  }
}
</style>
<template>
  <div class="card-content">
    <div class="media">
      <h1 class="title is-4 is-dark">文本转换二维码工具</h1>
    </div>
    <div class="content">
      <p class="tag is-link">可以很方便的生成二维码</p>
      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" placeholder="请输入文本内容.." v-model="textContent">
        </div>
        <div class="control">
          <a class="button" v-on:click="generateQrcode">
            生成二维码
          </a>
        </div>
      </div>
    </div>
    <div class="img-area" v-show="showImg">
      <span class="tag is-info">二维码已生成！感谢使用！</span>
      <figure class="image is-128x128">
        <img v-bind:src="base64_qrcode">
      </figure>
    </div>
  </div>
</template>
<script>
  import extraActions from '@/actions/extraActions';
  import AntiKeyWords from "anti-key-words"; // 反关键词库 @author<timrchen95@gmail.com>

  export default {
    data() {
      return {
          textContent: '', // 输入文本
          base64_qrcode: '', // qrcode base64 code
          showImg: false // 图片显示🔐
      }
    },
    methods: {
      generateQrcode: function () { // 生成二维码
        const _self = this;
        let textContent = _self.textContent;
        /**
         * 处理输入，确保词汇净化
         */
        let antiKeyWords = new AntiKeyWords(textContent);
        antiKeyWords.filterKeyWords();
        let outputSting = antiKeyWords.outputString;
        console.log(`处理后的输入：${outputSting}`);

        extraActions.getQrcode(outputSting).then(res => {
          let qrcodeData = res.body.data.qrcode;
          _self.base64_qrcode = `data:image/png;base64,${qrcodeData}`;
          _self.showImg = true;
        });
      }
    }
  };
</script>
<style>

</style>

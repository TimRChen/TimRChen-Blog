<template>
  <div class="card-content">
    <div class="media">
      <h1 class="title is-4 is-dark">摩斯电码加密工具</h1>
    </div>
    <div class="content">
      <p class="tag is-warning">@作者: TimRChen</p>
      <p class="tag is-success">仅支持英文字符加密</p>
      <div class="field">
        <span class="help">摩斯电码使用 '_' 和 '.' 及英文标点符号作为码元</span>
      </div>
      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" placeholder="请输入待加密字符.." v-model="textContent" style="ime-mode:disabled">
        </div>
        <div class="control">
          <a class="button is-link" v-on:click="encode">
            加密
          </a>
        </div>
      </div>
    </div>
    <div class="code-area" v-show="encodeText.length > 0">
      <span class="tag is-info">文本已加密</span>
      <span>{{ encodeText }}</span>
    </div>
  </div>
</template>
<script>
  const morseCodeMap = {
    originalCode: [
      'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
      '1','2','3','4','5','6','7','8','9','0',
      '.',':',',',';','?','=',"'",'/','!','-','_','"','(',')','$','&','@','+'
    ],
    morseCode: [
      // letter
      '._','_...','_._.','_..','.','.._.','__.','....','..','.___','_._','._..','__','_.','___','.__.','__._','._.','...','_','.._','..._','.__','_.._','_.__','__..',
      // number 
      '.____','..___','...__','...._','.....','_....','__...','___..','____.','_____',
      // punctuation
      '._._._','___...','__..__','_._._.','..__..','_..._','.____.','_.._.','_._.__','_...._','..__._','._.._.','_.__.','_.__._','..._.._','._...','.__._.','._._.'
    ]
  };
  export default {
    data() {
      return {
          textContent: '', // 输入文本
          encodeText: '' // 加密文本
      }
    },
    methods: {
      encode: function () {
        let textContent = this.textContent.trim().toUpperCase();
        let textSplit = textContent.split('');
        let encodeText = [];
        for (let text of textSplit) {
          if (text === ' ') {
            encodeText.push(text);
          }
          for (let codeKey in morseCodeMap.originalCode) {
            if (text === morseCodeMap.originalCode[codeKey]) {
              encodeText.push(morseCodeMap.morseCode[codeKey]);
            }
          }
        }
        this.encodeText = encodeText.join('');
      }
    }
  };
</script>
<style scoped>

</style>

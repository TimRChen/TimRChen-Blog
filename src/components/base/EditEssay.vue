<template>

  <div class="container admin">
    <!-- 隐藏的表单域，用于存储文章的id -->
    <!-- <input type="hidden" name="_id" value="essay._id"> -->
    <br>
    <div class="field">
      <label class="essay-title-tip label">文章标题</label>
      <div class="control">
        <input type="text" class="essay-title input" placeholder="请输入文章标题" v-model="title" />
      </div>
    </div>
    <br>
    <div class="field">
      <label class="essay-content-tip label">内容区域</label>
      <div class="control">
        <!-- 即时显示 -->
        <div class="text-display" v-html="displayText"></div>
        <textarea type="text" class="essay-content textarea" placeholder="请输入文章内容" v-model="content" />
      </div>
    </div>
    <br>
    <div class="field">
      <label class="upload-img label">文章图片</label>
      <div class="control">
        <input type="text" class="input" placeholder="请输入图片位于图床的URL" v-model="picUrl" />
      </div>
    </div>
    <br>
    <div class="field">
      <button class="button" v-on:click="sendEssay()">发布文章</button>
    </div>
  </div>

</template>

<script>

  import essayActions from '../../actions/essayActions';
  import MarkdownIt from 'markdown-it';
  const md = new MarkdownIt();

  
  // var result = md.render('# markdown-it rulezz!');

  export default {
    data() {
      return {
        title: "",
        content: "",
        picUrl: "",
        displayText: ""
      };
    },
    methods: {
      sendEssay: function () {
        const _self = this;
        let essayInfo = {
          title: _self.title,
          content: _self.content,
          picUrl: _self.picUrl
        };
        essayActions.newEssay(essayInfo).then(res => {
          if (res.status === 200) {
            alert(res.body.message);
          }
        }).catch(err => {
          console.error(err);
        });
      }
    },
    beforeUpdate: function () {
      const _self = this;
      _self.displayText = md.render(_self.content);
    }
  };


</script>

<style>

  /* .text-display {
      color:#444;
      font-family: Georgia, Palatino, 'Palatino Linotype', Times, 'Times New Roman', serif!important;
      line-height:1.5em;
      padding:1em;
      margin:auto;
      max-width:42em;
      background:#fefefe;
  } */

  .text-display h1, h2, h3, h4, h5, h6 {
      font-weight: bold;
  }

  .text-display h1 {
      color: #000000;
      font-size: 28px;
  }

  .text-display h2 {
      border-bottom: 2px solid #CCCCCC;
      color: #000000;
      font-size: 24px;
  }

  .text-display h3 {
      border-bottom: 2px solid #CCCCCC;
      font-size: 18px;
  }

  .text-display h4 {
      font-size: 16px;
  }

  .text-display h5 {
      font-size: 14px;
  }

  .text-display h6 {
      color: #777777;
      background-color: inherit;
      font-size: 14px;
  }

  .text-display hr {
      height: 0.2em;
      border: 0;
      color: #CCCCCC;
      background-color: #CCCCCC;
  }

  .text-display ul {
    list-style-type: disc!important;
  }

  .text-display p, .text-display blockquote, .text-display ul, .text-display ol, .text-display dl, .text-display li, .text-display table, .text-display pre {
      margin: 15px 0;
  }

  .text-display p{
      margin:1em 0;
  }

  .text-display pre { 
      background-color: #F8F8F8;    
      border: 1px solid #CCCCCC;
      border-radius: 3px;
      overflow: auto;
      padding: 5px;
  }

  .text-display pre code {
      background-color: #F8F8F8;
      border: none;    
      padding: 0;
  }

  .text-display code {
      font-family: Consolas, Monaco, Andale Mono, monospace;
      background-color:#F8F8F8;
      border: 1px solid #CCCCCC;
      border-radius: 3px;
      padding: 0 0.2em;
      line-height: 1;
  }

  .text-display pre > code {
      border: 0;
      margin: 0;
      padding: 0;
  }


  .text-display a{ color: #0645ad; text-decoration:none;}
  .text-display a:visited{ color: #0b0080; }
  .text-display a:hover{ color: #06e; }
  .text-display a:active{ color:#faa700; }
  .text-display a:focus{ outline: thin dotted; }
  .text-display a:hover, a:active{ outline: 0; }

  ::-moz-selection{background:rgba(255,255,0,0.3);color:#000}
  ::selection{background:rgba(255,255,0,0.3);color:#000}

  .text-display a::-moz-selection{background:rgba(255,255,0,0.3);color:#0645ad}
  .text-display a::selection{background:rgba(255,255,0,0.3);color:#0645ad}

  .text-display blockquote{
      color:#666666;
      margin:0;
      padding-left: 3em;
      border-left: 0.5em #EEE solid;
  }

  .text-display ul, .text-display ol { margin: 1em 0; padding: 0 0 0 2em; }
  .text-display li p:last-child { margin:0 }
  .text-display dd { margin: 0 0 0 2em; }

  .text-display img { border: 0; -ms-interpolation-mode: bicubic; vertical-align: middle; max-width:100%;}

  .text-display table { border-collapse: collapse; border-spacing: 0; }
  .text-display td { vertical-align: top; }

  @media only screen and (min-width: 480px) {
      body{font-size:14px;}
  }

  @media only screen and (min-width: 768px) {
      body{font-size:16px;}
  } 

</style>
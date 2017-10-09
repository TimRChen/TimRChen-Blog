<template>

  <div class="container edit-essay">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            新建一篇简单而精致的美文.
          </h2>
        </div>
      </div>
    </section>
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
        <div class="editor-text-display" v-html="displayText"></div>
        <textarea type="text" class="essay-content textarea textarea-custom" placeholder="请输入文章内容" v-model="content" />
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

  export default {
    data() {
      return {
        title: '',
        content: '',
        picUrl: '',
        essayId: 'undefined',
        displayText: '<h1>编辑内容显示在此处</h1>'
      };
    },
    beforeCreate: function () {
      const _self = this;

      const essayId = window.sessionStorage.getItem('essayId');

      if (essayId) {
        essayActions.getEssayDetails(essayId).then(res => {
          if (res.status === 200) {
            const essayObj = res.body.essay;
            _self.essayId = essayObj._id;
            _self.picUrl = essayObj.picUrl;
            _self.title = essayObj.title;
            _self.content = essayObj.content;
          }
        }).catch(err => {
          console.error(err);
        });
      }

    },
    methods: {
      sendEssay: function () {
        const _self = this;
        if (!_self.title.length || !_self.content.length || !_self.picUrl.length) {
          alert('请输入完整的标题、内容以及图片链接!');
        } else if (_self.title.length > 0) {
          let essayInfo = {
            essayId: _self.essayId,
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
      }
    },
    beforeUpdate: function () {
      const _self = this;
      _self.displayText = md.render(_self.content);
    },
    destroyed: function () {
      window.sessionStorage.removeItem('essayId');
    }
  };


</script>

<style>

  .edit-essay {
    margin-top: 5%;
  }

  .textarea-custom {
    background-color:transparent;
    color: #666464;
    height: auto;
    font-size: 22px;
  }

  .editor-text-display {
    margin-top: 5%;
    margin-bottom: 5%;
    padding: 20px;
    /* box-shadow: 10px 10px 5px #888888; */
    text-indent: 22px;
    /* border-radius: 15px; */
  }


  .editor-text-display h1, h2, h3, h4, h5, h6 {
      font-weight: bold;
  }

  .editor-text-display h1 {
      color: #666464;
      font-size: 28px;
  }

  .editor-text-display h2 {
      border-bottom: 2px solid #CCCCCC;
      color: #666464;
      font-size: 24px;
  }

  .editor-text-display h3 {
      border-bottom: 2px solid #CCCCCC;
      color: #666464;
      font-size: 18px;
  }

  .editor-text-display h4 {
      color: #666464;
      font-size: 16px;
  }

  .editor-text-display h5 {
      color: #666464;
      font-size: 14px;
  }

  .editor-text-display h6 {
      color: #666464;
      background-color: inherit;
      font-size: 14px;
  }

  .editor-text-display hr {
      height: 0.2em;
      border: 0;
      color: #CCCCCC;
      background-color: #CCCCCC;
  }

  .editor-text-display ul {
    list-style-type: disc!important;
  }

  .editor-text-display p, .editor-text-display blockquote, .editor-text-display ul, .editor-text-display ol, .editor-text-display dl, .editor-text-display li, .editor-text-display table, .editor-text-display pre {
      margin: 15px 0;
  }

  .editor-text-display p{
      margin:1em 0;
  }

  .editor-text-display pre { 
      background-color: #F8F8F8;    
      border: 1px solid #CCCCCC;
      border-radius: 3px;
      overflow: auto;
      padding: 5px;
  }

  .editor-text-display pre code {
      background-color: #F8F8F8;
      border: none;    
      padding: 0;
  }

  .editor-text-display code {
      font-family: Consolas, Monaco, Andale Mono, monospace;
      background-color:#F8F8F8;
      border: 1px solid #CCCCCC;
      border-radius: 3px;
      padding: 0 0.2em;
      line-height: 1;
  }

  .editor-text-display pre > code {
      border: 0;
      margin: 0;
      padding: 0;
  }


  .editor-text-display a{ color: #0645ad; text-decoration:none;}
  .editor-text-display a:visited{ color: #0b0080; }
  .editor-text-display a:hover{ color: #06e; }
  .editor-text-display a:active{ color:#faa700; }
  .editor-text-display a:focus{ outline: thin dotted; }
  .editor-text-display a:hover, a:active{ outline: 0; }

  ::-moz-selection{background:rgba(255,255,0,0.3);color:#000}
  ::selection{background:rgba(255,255,0,0.3);color:#000}

  .editor-text-display a::-moz-selection{background:rgba(255,255,0,0.3);color:#0645ad}
  .editor-text-display a::selection{background:rgba(255,255,0,0.3);color:#0645ad}

  .editor-text-display blockquote{
      color:#666666;
      margin:0;
      padding-left: 3em;
      border-left: 0.5em #EEE solid;
  }

  .editor-text-display ul, .editor-text-display ol { margin: 1em 0; padding: 0 0 0 2em; }
  .editor-text-display li p:last-child { margin:0 }
  .editor-text-display dd { margin: 0 0 0 2em; }

  .editor-text-display img { border: 0; -ms-interpolation-mode: bicubic; vertical-align: middle; max-width:100%;}

  .editor-text-display table { border-collapse: collapse; border-spacing: 0; }
  .editor-text-display td { vertical-align: top; }

  @media only screen and (min-width: 480px) {
      body{font-size:14px;}
  }

  @media only screen and (min-width: 768px) {
      body{font-size:16px;}
  } 

</style>
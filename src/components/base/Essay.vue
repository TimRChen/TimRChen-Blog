<template>
    <div class="page-detail">
      <div class="content-area container">
        <div class="site-content">

          <section class="post-content">
            <div class="single-post-inner text-display" v-html="essayContent"></div>
          </section>
          <div class="postDesc">
            <!-- 阅读量pv计算 -->
            {{`posted @TimRChen 阅读量(${ pv })`}}
          </div>

          <div class="author-field u-textAlignCenter">
            <img src="../../assets/timrchen.jpeg" class="avatar avatar-64 photo">
            <h3>timrchen</h3>
            <p>年轻的意志</p>
          </div>

        </div>
      </div>
    </div>

</template>

<script>

  import essayActions from '../../actions/essayActions';
  import Bus from '../../plugins/bus';
  import MarkdownIt from 'markdown-it';
  const md = new MarkdownIt();


  export default {
    data() {
      return {
        essayContent: '',
        pv: ''
      }
    },
    beforeCreate: function () {
      const _self = this;

      Bus.$on('get-essay-details', function (essayDetails, essayId) {
        window.sessionStorage.setItem('essayId', essayId);
        _self.essayDetails = essayDetails;
      });

      const essayId = window.sessionStorage.getItem('essayId');

      if (essayId) {
        // 当页面刷新时，单独获取当页数据
        essayActions.getEssayDetails(essayId).then(res => {
          if (res.status === 200) {
            _self.pv = res.body.essay.pv;
            _self.essayContent = md.render(res.body.essay.content);
          }
        }).catch(err => {
          console.error(err);
        });
      }

    },

  }
</script>

<style>

  .site-content {
    padding-top: 50px;
  }

  .postDesc {
      text-align: right;
      padding: 5px 0px;
      color: #999999;
      font-size: 12px;
  }

  /* --author */
  .author-field {
      font-family: exoregular;
      border-top: 1px solid #eee;
      margin-bottom: 25px;
      padding-top: 25px;
      padding-bottom: 25px;
  }
  .author-field .avatar {
      border-radius: 100%;
      padding: 4px;
      border: 1px solid #ccc;
      height: 64px;
      width: 64px;
  }
  .author-field img {
      max-width: 100%;
      height: auto;
  }
  .author-field h3 {
      font-size: 18px;
      margin-bottom: 5px;
      color: rgba(0,0,0,.44);
  }
  .author-field p {
      font-size: 14px;
      line-height: 1.6;
      padding: 0 30px;
  }




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

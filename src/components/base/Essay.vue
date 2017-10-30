<template>
    <div class="page-detail">
      <div class="content-area detail-container">
        <div class="site-content">

          <section class="post-content">
            <div class="essay-info">
              <h1 class="post-essay-title">{{ essayTitle }}</h1>
              <h2 class="post-create-time">{{ createTime }}</h2>
            </div>
            <div
              class="pic-header"
              v-bind:style="{ backgroundImage: `url(${ picUrl })`, backgroundSize: 'cover', backgroundPosition: '50%' }">
            </div>
            <div class="single-post-inner text-display" v-html="essayContent"></div>
          </section>
          <div class="postDesc">
            <!-- 阅读量pv计算 -->
            {{`posted @TimRChen 阅读量(${ pv })`}}
          </div>

          <div class="author-field">
            <img src="../../assets/timrchen_head.jpeg" class="avatar avatar-64 photo">
            <h3>timrchen</h3>
            <p>年轻的意志</p>
            <a class="button is-dark" href="https://github.com/TimRChen/TimRChen-Blog" target="_blank">
              <span class="icon">
                <i class="fa fa-github"></i>
              </span>
              <span>Star</span>
            </a>
          </div>

        </div>
      </div>
    </div>

</template>

<script>

  import essayActions from '../../actions/essayActions';
  import Moment from 'moment';
  import MarkdownIt from 'markdown-it';
  const md = new MarkdownIt();


  export default {
    data() {
      return {
        picUrl: '',
        essayTitle: '',
        essayContent: '',
        createTime: '',
        pv: ''
      }
    },
    beforeCreate: function () {
      const _self = this;

      // 进入页面时，自动置最顶
      const scrollHeight = window.scrollY,
            scrollStep = Math.PI / ( 1000 / 15 ),
            cosParameter = scrollHeight / 2;
      let scrollCount = 0,
          scrollMargin,
          scrollInterval = setInterval(function () {
            if ( window.scrollY != 0 ) {
              scrollCount = scrollCount + 1;  
              scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
              window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
            } else {
              clearInterval(scrollInterval);
            }
          }, 15);

      const essayId = _self.$route.params.id; // 通过router params获取文章id

      if (essayId) {
        essayActions.getEssayDetails(essayId).then(res => {
          if (res.status === 200) {
            const essayObj = res.body.essay;
            _self.picUrl = essayObj.picUrl;
            _self.essayTitle = essayObj.title;
            _self.essayContent = md.render(essayObj.content);
            _self.createTime = Moment(essayObj.meta.createAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
            _self.pv = essayObj.pv;
          }
        }).catch(err => {
          console.error(err);
        });
      }

    }
  }
</script>

<style>

  .detail-container {
    max-width: 900px!important;
    margin-right: auto!important;
    margin-left: auto!important;
    width: 90%!important;
  }

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
      text-align: center;
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

  .post-content {
    position: relative;
  }

  .essay-info {
    position: absolute;
    top: 300px;
    left: 3%;
  }

  .post-essay-title {
    position: relative;
    color: #fff;
    font-size: 60px;
    font-weight: 200!important;
    z-index: 1;
  }

  .post-create-time {
    position: relative;
    color: #fff;
    font-size: 20px;
    font-weight: 300!important;
    z-index: 1;
  }

  /* 竖屏 */
  @media screen and (orientation:portrait) and (max-width: 720px) {
    .post-essay-title {
      color: #fff;
      font-size: 38px;
      font-weight: 200!important;
      z-index: 1;
    }
    .post-create-time {
      color: #fff;
      font-size: 14px;
      font-weight: 300!important;
      z-index: 1;
    }
  }


  .post-create-time:hover {
    color: #bc403e;
  }

  .pic-header {
    height: 440px;
    border-radius: 4px;
    /* -webkit-filter: blur(4px);
    -moz-filter: blur(4px);
    -ms-filter: blur(4px);
    filter: blur(4px); */
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
  }

  .text-display {
    margin-top: 5%;
    margin-bottom: 5%;
    padding: 20px;
    box-shadow: 0px 0px 15px #888888;
    border-radius: 4px;
  }

  .text-display h1, .text-display h2, .text-display h3, .text-display h4, .text-display h5, .text-display h6 {
      /* font-weight: bold; */
      /* text-align: center; */
  }

  .text-display h1 {
      color: #666464;
      font-size: 28px;
  }

  .text-display h2 {
      border-bottom: 2px solid #CCCCCC;
      color: #666464;
      font-size: 24px;
  }

  .text-display h3 {
      border-bottom: 2px solid #CCCCCC;
      color: #666464;
      font-size: 18px;
  }

  .text-display h4 {
      color: #666464;
      font-size: 16px;
  }

  .text-display h5 {
      color: #666464;
      font-size: 14px;
  }

  .text-display h6 {
      color: #666464;
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

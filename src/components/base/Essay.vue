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

          <!-- 评论 -->
          <div class="comment-area">

            <div class="comment-list">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    评论
                  </p>
                </header>
                <div class="card-content">
                  <div class="content" v-for="(comment, key) in commentInfo" v-bind:key="key">
                    <div class="comment-box">
                      <div class="comment-info">
                        <span class="create-man">{{ comment.name }}</span>
                      </div>
                      <p class="comment-content">
                        {{ comment.content }}
                      </p>
                      <time class="create-time" datetime="2016-1-1">{{ comment.meta.createAt }}</time>
                    </div>
                  </div>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item" v-on:click="commentEdit = !commentEdit">写下您的评论</a>
                </footer>
              </div>
            </div>

            <div class="comment-edit" v-show="commentEdit === true">
              <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                  <input class="input" type="text" placeholder="起个属于你的个性网名，一次性的哦" v-model="commentNickName">
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fa fa-check"></i>
                  </span>
                </div>
                <p class="help is-success" v-show="nameStatus === true">名字貌似可用.</p>
                <p class="help is-success" v-show="commentNickName.length > 0 && nameStatus === false">名字已存在.</p>
                <p class="help is-info" v-show="commentNickName.length === 0">起个名字吧.</p>
              </div>        
              <div class="field">
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <textarea class="textarea" placeholder="请输入您的评论" v-model="commentContent"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-grouped is-grouped-right">
                <p class="control">
                  <a class="button is-primary" v-on:click="preSubmit">
                    Submit
                  </a>
                </p>
                <p class="control">
                  <a class="button is-light" v-on:click="commentEdit = false">
                    Cancel
                  </a>
                </p>
              </div>
            </div>            

          </div>

          <!-- Star -->
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
  import commentActions from '../../actions/commentActions';
  import Moment from 'moment';
  import MarkdownIt from 'markdown-it';
  const md = new MarkdownIt();
  // 敏感字列表 分两次过滤，第一次为词组，第二次为单字，确保不漏关键字
  const filterList = ['垃圾', '变态', '碧池', '傻逼', '恶心', '智障', '鄙视', '放屁', '狗屎', '下三滥', '草你妈', '艹你妈', '妈的', '吗的', '妈逼', '妈的逼', '抄袭', '台独', '藏独', '共产党', '国家', '政府', 'sb', 'shit', 'fuck', 'slut', 'bitch'];
  const filterDoubleList = ['垃', '圾', '操', '傻', '抄', '狗', '屎', '坏', '恶', '尿', '屁', '袭', '死', '亡', '逼', '草', '艹', '丑', '臭', '拟', '妈', '共', '产', '党', '国', '家', '政', '府'];

  export default {
    data() {
      return {
        picUrl: '',
        essayTitle: '',
        essayContent: '',
        createTime: '',
        essayId: '',
        pv: '',
        commentInfo: [{
          name: '黄睿晨',
          content: '宇宙第一无敌吉他手，（看到这个时，说明评论加载失败了，请刷新页面重新加载）',
          meta: {
            createAt: '2017/10/30'
          }
        }],
        existName: [], // 昵称列表
        nameStatus: false, // 昵称存在状态，false - 不存在， true - 已存在
        commentEdit: false,
        commentNickName: '',
        commentContent: '',
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
      _self.essayId = essayId;

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

    },
    mounted: function () {
      const _self = this;
      let essayId = _self.$route.params.id;
      
      // if (essayId) {
      //   commentActions.getCommentList(essayId).then(res => {
      //     debugger

      //     const comments = res.body.comments;
      //     const commentSum = res.body.commentSum;

      //     _self.commentInfo = comments;

          // 记录评论昵称
          let existName = [];
          _self.commentInfo.forEach(comment => {
            existName.push(comment.name);
          });
          _self.existName = existName;


      //   }).catch(err => {
      //     console.error(err);
      //   });
      // }

    },
    watch: {
      commentNickName: function (val, oldVal) {
        const _self = this;
        let name = val;
        let existName = _self.existName;

        if (existName.indexOf(name)) { // 比对 输入昵称是否与已存在昵称相同
          _self.nameStatus = true;
        } else {
          _self.nameStatus = false;
        }

        if (name.length === 0) _self.nameStatus = false;

      }
    },
    methods: {
      splitStringToArray: function (originalString) { // 将字符串分离成数组
        let splitArray = [];
        for(let i = 0; i < originalString.length; i++) {
          splitArray.push(originalString[i].toLowerCase());
        }
        return Array.from(new Set(splitArray));
      },
      preSubmit: function () { // 提交前预处理评论
        const _self = this;
        let commentNickName = _self.commentNickName;
        let commentContent = _self.commentContent;

        // 先将输入内容进行筛选看是否有违规词汇
        if (filterList.indexOf(commentNickName.toLowerCase()) !== -1 || filterList.indexOf(commentContent.toLowerCase()) !== -1 ) {
          alert('您输入的昵称中有违规词汇，请重新输入!');
          _self.commentNickName = '';
          _self.commentContent = '';
          return;
        }

        // 拆解字符串为数组
        let to_filter_commentNickName = _self.splitStringToArray(commentNickName);
        let to_filter_commentContent = _self.splitStringToArray(commentContent);
  
        // 使用单字规则表再次排查违规字
        let evilNameWordAmonut = 0,
            evilContentWordAmonut = 0;

        to_filter_commentNickName.forEach(name => {
          if (filterDoubleList.indexOf(name) !== -1) {
            evilNameWordAmonut += 1;
          }
        });
        to_filter_commentContent.forEach(name => {
          if (filterDoubleList.indexOf(name) !== -1) {
            evilContentWordAmonut += 1;
          }
        });

        if (evilNameWordAmonut > 0 || evilContentWordAmonut > 0) {
          alert('您输入的昵称中有违规词汇，请重新输入!');
          _self.commentNickName = '';
          _self.commentContent = '';
          return;
        } else {
          _self.submitComment();
        }
        
      },
      submitComment: function () { // 提交评论
        const _self = this;
        // 请求参数
        let essayId = _self.essayId;
        let commentNickName = _self.commentNickName;
        let commentContent = _self.commentContent;
        // 功能变量
        let nameStatus = _self.nameStatus;

        if (commentNickName.length > 0 && commentContent.length >= 3 && nameStatus === true) {
          let commentInfo = {
            'essayId': essayId,
            'name': commentNickName,
            'content': commentContent,
          };
          commentActions.createComment(commentInfo).then(res => {
            debugger
          }).catch(err => {
            console.error(err);
            alert('出错了');
          });
        } else if (commentNickName.length === 0) {
          alert('您似乎忘了姓名?');
        } else if (commentContent.length < 3) {
          alert('评论最少3个字以上~');
        } else if (nameStatus === false) {
          alert('您起的名字在评论中已使用过，请重新输入~');
        }

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

  .comment-box {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    padding: 10px;
    background-color: #fffffc;
    /* background-color: #fffff0; */
  }

  .comment-box .comment-info {
    border-bottom: 1px solid #e2e2e2;
  }

  .comment-box .comment-info .create-man {
    font-size: 22px;
    color: #4093c6;
    /* font-style: italic; */
  }

  /* .comment-box .create-time {
    color: #ccc;
  } */

  .comment-edit {
    margin-top: 10px;
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

  /* 竖屏 */
  @media screen and (orientation:portrait) and (max-width: 720px) {
    .detail-container {
      width: 100%!important;
    }
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
    .text-display {
      margin-top: 0!important;
    }
    .comment-edit {
      padding: 0 12px 0 12px;
    }
  }

  .text-display {
    margin-top: 5%;
    margin-bottom: 5%;
    padding: 20px;
    box-shadow: 0px 0px 15px #888888;
    border-radius: 4px;
  }

  .text-display h1 {
    color: #666464;
    font-size: 28px;
  }

  .text-display h2 {
    border-bottom: 1px solid #CCCCCC;
    margin-bottom: 4px;
    color: #666464;
    font-size: 24px;
  }

  .text-display h3 {
    border-bottom: 1px solid #CCCCCC;
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
    margin: 1em 0;
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
    padding-left: 1em;
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

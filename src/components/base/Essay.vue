<template>
    <div class="page-detail">
      <div class="content-area detail-container">
        <div class="essay-content">

          <!-- 文章内容 -->
          <section class="post-content">
            <div class="text-display" v-html="essayContent"></div>
            <div class="post-description">
              <!-- 阅读量pv计算 -->
              <span class="abstract">{{ essayId_abstract }}</span>
              <span class="post-number">阅读量 {{ pv }}</span>
            </div>
          </section>

          <!-- 评论 -->
          <div class="comment-area">
            <div class="comment-list">
              <div class="card card-define-by-timrchen">
                <header class="card-header">
                  <p class="card-header-title">
                    评论
                  </p>
                </header>
                <div class="card-content">
                  
                  <!-- 评论列表 -->
                  <div class="content" v-for="(comment, key) in commentInfo" v-bind:key="key">
                    <div class="comment-box">
                      <div class="comment-index">
                        {{ key + 1 }}F
                      </div>
                      <div class="comment-info">
                        <span class="create-man">{{ comment.name }}:</span>
                      </div>
                      <p class="comment-content">
                        {{ comment.content }}
                      </p>
                      <time class="create-time">{{ formatCommentTime(comment.meta.createAt) }}</time>
                      <button id="comment-reply-btn" class="button is-small is-inverted is-black" v-on:click="reply(comment.name)">回复</button>
                    </div>
                  </div>

                  <!-- 编辑区 -->
                  <div class="comment-edit" v-show="commentEdit === true">
                    <div class="field">
                      <!-- 昵称不存在时 -->
                      <div class="control has-icons-left has-icons-right" v-show="nickNameInLocal === false">
                        <input class="input" type="text" placeholder="起个炫酷的名字.." v-model="commentNickName">
                        <span class="icon is-small is-left">
                          <i class="fa fa-user"></i>
                        </span>
                        <span class="icon is-small is-right">
                          <i class="fa fa-check"></i>
                        </span>
                        <p class="help is-success" v-show="nameStatus === true">昵称可用.</p>
                        <p class="help is-danger" v-show="commentNickName.length > 8 && nameStatus === false">昵称长度超过规定长度.</p>
                        <p class="help is-danger" v-show="commentNickName.length > 0 && commentNickName.length <= 8 && nameStatus === false">昵称已存在.</p>
                        <p class="help is-info" v-show="commentNickName.length === 0">起个昵称吧.</p>
                      </div>
                      <!-- 本地有昵称 -->
                      <div class="control" v-show="nickNameInLocal === true">
                        <p class="help">
                          <button class="button is-white is-small has-text-danger" v-on:click="changeNickname">换个昵称?</button>
                        </p>
                        <span class="has-text-link">{{ commentNickName }}：</span>
                      </div>
                    </div>
                    <div class="field">
                      <div class="field-body">
                        <div class="field">
                          <div class="control">
                            <textarea class="textarea is-dark" autofocus placeholder="赠人玫瑰，手留余香. say something.." v-model="commentContent"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="field is-grouped is-grouped-right">
                      <p class="control">
                        <a class="button is-dark" v-on:click="preSubmit">
                          提交
                        </a>
                      </p>
                      <p class="control">
                        <a class="button is-light" v-on:click="cancleSubmit">
                          取消
                        </a>
                      </p>
                    </div>
                  </div>
                  
                </div>
                <footer class="card-footer" v-show="commentEdit === false">
                  <a class="card-footer-item has-text-link" v-on:click="commentEdit = true">留下您的足迹</a>
                </footer>
              </div>
            </div>
          </div>

          <!-- Star -->
          <div class="author-field">
            <img src="../../assets/timrchen_head.jpeg" class="avatar avatar-64 photo">
            <h3>timrchen</h3>
            <p>一生想做浪漫极客.</p>
            <br>
            <a class="button is-dark is-outlined" href="https://github.com/TimRChen" target="_blank">
              <span class="icon">
                <i class="fa fa-github"></i>
              </span>
              <span>Follow</span>
            </a>
          </div>

        </div>
      </div>
      <div class="blank-loading-container fade-in" v-show="loadingStatus === 'loading'">
        <div class="loading-txt">向死而生</div>
      </div>
    </div>
</template>

<script>

  import Bus from '../../plugins/bus';
  import essayActions from '../../actions/essayActions';
  import commentActions from '../../actions/commentActions';
  import antiXss from '../../utils/antiXss';
  import Moment from 'moment';
  import MarkdownIt from 'markdown-it';
  const md = new MarkdownIt();
  // 敏感字列表 分两次过滤，第一次为词组，第二次为单字，确保不漏关键字
  const filterList = ['垃圾', '变态', '碧池', '傻逼', '恶心', '智障', '鄙视', '放屁', '狗屎', '下三滥', '草你妈', '艹你妈', '妈的', '吗的', '妈逼', '妈的逼', '抄袭', '台独', '藏独', '共产党', '国家', '政府', 'sb', 'shit', 'fuck', 'slut', 'bitch'];
  const filterDoubleList = ['垃', '圾', '操', '傻', '抄', '狗', '屎', '坏', '恶', '尿', '屁', '袭', '死', '亡', '逼', '草', '艹', '丑', '臭', '拟', '妈', '共', '产', '党', '政', '府'];

  export default {
    data() {
      return {
        loadingStatus: 'loading', // loading | success
        essayContent: '',
        essayId_abstract: '', // 文章id简短标识，方便查找文章对应评论
        pv: '',
        commentInfo: [{
          name: '黄睿晨',
          content: '赶快留言吧，当前暂时没有评论哦.',
          meta: {
            createAt: '2048-10-24T12:12:12.000Z'
          }
        }],
        existName: [], // 昵称列表
        nameStatus: false, // 昵称存在状态，false - 不存在， true - 已存在
        commentEdit: false, // 评论状态
        nickNameInLocal: false, // 本地之前是否有昵称
        commentNickName: '',
        commentContent: '',
        replyGuideNickName: '', // 回复开头 @人名
      }
    },
    watch: {
      commentNickName: function (val, oldVal) {
        let name = val;
        let existName = this.existName;

        if (existName.indexOf(name) !== -1) { // 比对 输入昵称是否与已存在昵称相同
          this.nameStatus = false;
        } else {
          this.nameStatus = true; // 昵称可用
        }

        if (name.length === 0) this.nameStatus = false;

        if (name.length > 8) this.nameStatus = false;
      }
    },
    beforeCreate() {
      this.loadingStatus = 'loading';
      // 进入页面时，自动置顶
      window.scrollTo(0, 0);
      // 通过router params获取文章id
      const essayId = this.$route.params.id;
      if (essayId) {
        let loadingTimer = setTimeout(() => {
          essayActions.getEssayDetails(essayId).then(res => {
            // 淡出过场动画
            const timer = setTimeout(() => {
              this.loadingStatus = 'success';
              clearTimeout(timer);
            }, 2999);
            const essayObj = res.body.essay;
            this.essayContent = md.render(essayObj.content);
            this.essayId_abstract = essayObj._id.substr(-6, essayObj._id.length - 1); // 生成文章Id简短标识，用于评论管理
            this.pv = essayObj.pv;
            // 将当前banner数据注册至bug，分发在TimHeader中使用
            Bus.$emit('current-banner-data', {
              "picUrl": essayObj.picUrl,
              "essayTitle": essayObj.title,
              "createTime": Moment(essayObj.meta.createAt, Moment.ISO_8601).format('YYYY.MM.DD hh:mm a')
            });
            // 获取文章评论
            _self.getCommentList();
            clearTimeout(loadingTimer);
          }).catch(err => {
            console.error(err);
            clearTimeout(loadingTimer);
          });
        }, 500);
      }
    },
    mounted() {
      // 取出本地存入的用户昵称
      let commentNickName = localStorage.getItem('commentNickName');
      if (commentNickName) {
        this.commentNickName = commentNickName;
        this.nickNameInLocal = true;
      }
    },
    methods: {
      /**
       * 获取评论列表
       */
      getCommentList: function () {
        const _self = this;
        let essayId = _self.$route.params.id;
        
        if (essayId) {
          commentActions.getCommentList(essayId).then(res => {
            const comments = res.body.comments;
            const commentSum = res.body.commentSum;

            if (comments.length !== 0) {
              _self.commentInfo = comments;
              // 记录评论昵称
              let existName = [];
              comments.forEach(comment => {
                existName.push(comment.name);
              });
              _self.existName = existName;
            }

          }).catch(err => {
            console.error(err);
          });
        }
      },
      /**
       * 格式化评论时间
       */
      formatCommentTime: function (time) {
        return Moment(time, Moment.ISO_8601).format('dddd, YYYY-MM-DD, h:mm:ss A');
      },
      /**
       * 将字符串分离成数组
       */
      splitStringToArray: function (originalString) {
        let splitArray = [];
        for(let i = 0; i < originalString.length; i++) {
          splitArray.push(originalString[i].toLowerCase());
        }
        return Array.from(new Set(splitArray));
      },
      /**
       * 提交前评论预处理
       */
      preSubmit: function () {
        const _self = this;
        let nameStatus = _self.nameStatus;
        let nickNameInLocal = _self.nickNameInLocal;
        let commentNickName = _self.commentNickName;
        let commentContent = _self.commentContent;

        // 先将输入内容进行筛选看是否有违规词汇
        if (filterList.indexOf(commentNickName.toLowerCase()) !== -1 || filterList.indexOf(commentContent.toLowerCase()) !== -1 ) {
          alert('您输入的评论/昵称中有违规词汇，请重新输入!');
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
          alert('您输入的评论/昵称中有违规词汇，请重新输入!');
          return;
        }

        // 综合输入处理
        if (commentNickName.length > 0 && commentNickName.length <= 8 && commentContent.length >= 3 && nameStatus === true && nickNameInLocal === false) {
          _self.submitComment();
        } else if (commentNickName.length === 0) {
          alert('您似乎忘了姓名?');
        } else if (commentNickName.length > 8) {
          alert('昵称最多8个字哦~');
        } else if (commentContent.length < 3 && nickNameInLocal === false) {
          alert('评论最少3个字以上~');
        } else if (nameStatus === false && nickNameInLocal === false) {
          alert('您起的昵称在评论中已使用过，请重新输入~');
        }

        // 判断本地是否有昵称存在
        if (nickNameInLocal === true) {
          if (commentContent === _self.replyGuideNickName) {
            alert('评论最少3个字以上~');
          } else {
            _self.submitComment();
          }
        }
      },
      /**
       * 提交评论
       */
      submitComment: function () {
        const _self = this;
        let essayId = this.$route.params.id;
        let commentNickName = this.commentNickName;
        let commentContent = this.commentContent;
        let pureComment = antiXss.enCodeHtml(commentContent);

        let commentInfo = { // 请求参数
          'essayId': essayId,
          'name': commentNickName,
          'content': pureComment,
        };
        commentActions.createComment(commentInfo).then(res => {
          _self.commentContent = '';
          _self.commentEdit = false; // 关闭编辑界面
          alert(res.body.message);
          _self.getCommentList();
          // 将昵称存入localStorage，对用户做持久化处理
          localStorage.setItem('commentNickName', commentNickName);
          _self.commentNickName = commentNickName;
          _self.nickNameInLocal = true;
        }).catch(err => {
          console.error(err);
          alert('出错了');
        });
      },
      /**
       * 取消评论
       */
      cancleSubmit: function () {
        this.commentContent = '';
        this.commentEdit = false;
      },
      /**
       * 回复某人
       * @argument respondent 被回复人
       */
      reply: function (respondent) {
        // 生成回复开头
        let replyGuideNickName = `@${respondent}\n`;
        // 打开评论输入框
        this.commentEdit = true;
        // 将开头注入评论内容中
        this.commentContent = replyGuideNickName;
        this.replyGuideNickName = replyGuideNickName;
      },
      /**
       * 更换昵称
       */
      changeNickname: function () {
        if (confirm('确认放弃这个昵称？')) {
          localStorage.removeItem('commentNickName');
          this.commentNickName = '';
          this.nickNameInLocal = false;
          alert('为了更美好的将来:)');
        } else {
          alert('从一而终是不是更好:)');
        }
      }
    },
    destroyed() {
      // 组件毁灭时唤起Bus将banner图片移除并显示默认banner标题
      Bus.$emit('banner-change-to-default', true);
    }
  }
</script>

<style>

  .blank-loading-container {
    position: fixed;
    top: 52px;
    left: 0;
    width: 100vw;
    height: 100vh;
    line-height: 100vh;
    text-align: center;
    z-index: 9999;
    opacity: 0;
  }
  .blank-loading-container .loading-txt {
    color: #fff;
    font-size: 30px;
    font-weight: 200;
  }
  .fade-in {
    animation: fadeIn 3s ease-in-out;
  }
  @keyframes fadeIn {
    0% { background: rgba(0, 0, 0, 0.9); opacity: 1; }
    50% { background: rgba(0, 0, 0, 0.85); }
    65% { background: rgba(0, 0, 0, 0.65); }
    75% { background: rgba(0, 0, 0, 0.45); }
    100% { background: rgba(0, 0, 0, 0); opacity: 0; }
  }

  .detail-container {
    max-width: 900px!important;
    margin-right: auto!important;
    margin-left: auto!important;
    width: 90%!important;
  }

  .comment-box {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    padding: 10px;
    background-color: #fffffc;
    /* background-color: #fffff0; */
  }

  .comment-box .comment-index {
    color: #808080;
  }

  .comment-box .comment-info {
    border-bottom: 1px solid #e2e2e2;
  }

  .comment-box .comment-info .create-man {
    font-size: 18px;
    color: darkcyan;
    /* font-style: italic; */
  }

  .comment-box .comment-content {
    padding: 10px;
    word-wrap: break-word;
  }

  .comment-box .create-time {
    color: #808080;
    font-size: 14px;
  }

  .comment-edit {
    margin-top: 10px;
  }

  /* --author */
  .author-field {
    font-family: exoregular;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
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
    margin-top: 5%;
    margin-bottom: 5%;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    box-shadow: 0px 0px 8px 0 rgba(0,0,0,.3);
  }

  .post-description {
    text-align: right;
    font-size: 14px;
    margin-top: 5%;
    margin-right: 10px;
  }

  .post-description .abstract {
    color: #fff;
  }

  .post-description .post-number {
    color: darkcyan;
  }

  .card-define-by-timrchen {
    border-radius: 8px;
    box-shadow: 0px 0px 8px 0 rgba(0,0,0,.3)!important;
  }

  /* 竖屏 */
  @media screen and (max-width: 768px) {
    .detail-container {
      width: 100%!important;
    }
    .essay-content {
      padding-top: 0px;
    }
    .text-display {
      margin-top: 0!important;
    }
    .comment-edit {
      padding: 0 12px 0 12px;
    }
    .post-content {
      margin-top: 0;
      margin-bottom: 0;
      border: none;
      border-radius: 0;
      box-shadow: none;
    }
    .card-define-by-timrchen {
      border-radius: 0;
    }
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

  .text-display p {
    margin: 1em 0;
  }

  .text-display pre { 
    font-family: Monaco, Andale Mono, Courier New, monospace;
    background-color: #fff;
    display: block;
    line-height: 16px;
    font-size: 11px;
    page-break-inside: avoid;
  }

  .text-display pre code {
    background-color: #fffffc;
    color: rgba(0, 0, 0, 0.75);
    padding: 1px 3px;
    font-size: 12px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
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

</style>

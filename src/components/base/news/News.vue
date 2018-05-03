<template>
  <div class="card-content">
    <div class="media">
      <h1 class="title is-4 is-info">新闻资讯</h1>
    </div>
    <div class="content">
      <p class="tag is-link">提供每日专属于你的新闻.</p>
      <div class="field">
        <div class="control">
          <div class="list-content">
            <div class="news-item" v-for="(newsItem, key) in newsList" v-bind:key="key">
              <a v-bind:href="newsItem.url">
                <article class="message is-warning">
                  <div class="message-body">
                    <div class="news-poster">
                      <img class="news-poster" v-bind:src="newsItem.thumbnail_pic_s" alt="新闻海报">
                    </div>
                    <div class="news">
                      <span class="original-type">[{{ newsItem.author_name }}]</span>{{ newsItem.title }}
                    </div>
                    <div class="news-time">{{ newsItem.date }}</div>
                  </div>
                </article>
              </a>
            </div>
            <!-- <div class="news-item">
              <a href="">
                <article class="message is-warning">
                  <div class="message-body">
                    <div class="news-poster">
                      <img src="http://01.imgmini.eastday.com/mobile/20180116/20180116110815_2c2de946c9f17d69961fc4136b1a9400_15_mwpm_03200403.jpg" alt="">
                    </div>
                    <div class="news"><span class="original-type">[环球网]</span>希腊罢工游行反对改革法案 抗议者与警察冲突</div>
                    <div class="news-time">2018-01-16 11:08</div>
                  </div>
                </article>
              </a>
            </div> -->
          </div>
        </div>
      </div>
      <span class="tag is-warning">新闻服务api为 <a href="https://www.juhe.cn">聚合数据</a> 提供</span>
    </div>
  </div>
</template>
<script>

  import extraActions from '@/actions/extraActions';

  export default {
    data () {
      return {
        newsList: [{ // 初始化数据
          url: 'http://mini.eastday.com/mobile/170105110355287.html?qid=juheshuju',
          thumbnail_pic_s: 'http://03.imgmini.eastday.com/mobile/20170105/20170105110355_806f4ed3fe71d04fa452783d6736a02b_1_mwpm_03200403.jpeg',
          author_name: '腾讯娱乐',
          title: '杨幂的发际线再也回不去了么？网友吐槽像半秃',
          date: '2017-01-05 11:03'
        }]
      }
    },
    methods: {
      initialNews: function () {
        const _self = this;
        const type = 'top'; // top(头条，默认),shehui(社会),guonei(国内),guoji(国际),yule(娱乐),tiyu(体育),junshi(军事),keji(科技),caijing(财经),shishang(时尚)
        extraActions.getNewsList(type).then(res => {
          let data = res.body.result.data;
          if (data.error_code !== void 0 && data.error_code === 10012) {
            alert(data.reason);
          } else {
            _self.newsList = data;
          }
        }).catch(err => {
          console.error(err);
        });
      }
    },
    mounted: function () {
      this.initialNews();
    }
  }
</script>
<style>

  .list-content {
    list-style: none!important;
    display: flex;
    flex-flow: column;
  }

  .news-item {
    margin-bottom: 20px;
  }

  .news-item .news {
    font-size: 18px;
    font-weight: bold;
    color: orangered!important;
  }

  .news-item .news-time {
    color: gray;
    font-size: 13px;
  }

  /* 竖屏 */
  @media screen and (max-width: 768px) {
    .news-item {
      margin-bottom: 10px;
    }

    .news-item .news {
      font-size: 15px;
      font-weight: bold;
      color: orangered!important;
    }

    .news-item .news-time {
      color: gray;
      font-size: 13px;
    }
  }

</style>

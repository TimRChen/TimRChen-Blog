<template>
  <div class="one-article-container">
    <div class="notification" v-bind:class="backgroundColor">
      <h4 class="title is-4">{{ title }}</h4>
      <h6 class="subtitle is-6">{{ author }}</h6>
      <div class="content" v-html="content"></div>
      <span class="tag">*本文由每日一文数据提供</span>
      <button class="button is-dark is-focused is-small" v-on:click="randomArticle">随机一文</button>
    </div>
    <div id="change-background-color" v-on:click="changeBKColor">C</div>
  </div>
</template>
<script>
  import extraActions from '@/actions/extraActions';
  export default {
    data() {
      return {
        title: '',
        author: '',
        content: '',
        backgroundColor: {
          'is-primary': false,
          'is-info': false,
          'is-link': false,
          'is-success': false,
          'is-warning': false,
          'is-danger': false,
          'is-dark': false,
          'is-black': false
        },
        changeCount: 0
      }
    },
    methods: {
      changeBKColor: function () {
        const colorList = ['is-dark', 'is-black'];
        let changeCount = this.changeCount;
        const maxClick = 9;
        if (changeCount > 0 && changeCount <= maxClick) {
          this.backgroundColor[colorList[changeCount]] = true;
          this.backgroundColor[colorList[changeCount - 1]] = false;
          changeCount += 1;
        } else if (changeCount === 0) {
          this.backgroundColor[colorList[changeCount]] = true;
          changeCount += 1;
        } else if (changeCount > maxClick) {
          changeCount = 0;
          this.backgroundColor[colorList[colorList.length - 1]] = false;
        }
        this.changeCount = changeCount;
      },
      randomArticle: function () {
        const _self = this;
        extraActions.getOneRandomArticle().then(res => {
          const data = res.body;
          _self.title = data.title;
          _self.author = data.author;
          _self.content = data.content;
          _self.scrollToTop(2000);
        });
      },
      // return to top
      scrollToTop: function (scrollDuration) {
        const scrollHeight = window.scrollY,
              scrollStep = Math.PI / ( scrollDuration / 15 ),
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
            }, 1);
      }
    },
    mounted: function () {
      const _self = this;
      extraActions.getOneArticle().then(res => {
        const data = res.body;
        _self.title = data.title;
        _self.author = data.author;
        _self.content = data.content;
      });
    }
  }
</script>
<style scoped>
  #change-background-color {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: fixed;
    bottom: 8vh;
    right: 8vw;
    opacity: 0.8;
    border-radius: 30px;
    background-color: #000;
    color: #9c3;
    font-size: 20px;
    cursor: pointer;
  }
  #change-background-color:hover {
    opacity: 1;
    color: #fff;
  }
  /* 竖屏 */
  @media screen and (max-width: 768px) {
    #change-background-color {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      position: fixed;
      bottom: 10px;
      right: 10px;
      opacity: 0.8;
      border-radius: 20px;
      background-color: #000;
      color: #9c3;
      font-size: 20px;
    }
    #change-background-color:hover {
      opacity: 0.8;
      color: #9c3;
    }
  }
</style>

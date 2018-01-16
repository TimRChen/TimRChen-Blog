<template>
  <div class="extra-feature container">
    <section class="hero is-info is-warning">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            新的一天！{{ nowDate }}
          </h2>
        </div>
      </div>
    </section>

    <div class="feature-box">
      <div class="card">
        <!-- 新闻资讯服务 START -->
        <news></news>
        <!-- 短链接服务 START -->
        <short-url></short-url>
      </div>
    </div>

  </div>
</template>

<script>
  import Moment from 'moment';

  import News from '@/components/base/news/News';
  import ShortUrl from '@/components/base/shortUrl/ShortUrl';

  export default {
    components: {
      News,
      ShortUrl
    },
    computed: {
      nowDate: function () {
        return Moment(new Date()).format('YYYY年MM月DD日')
      }
    }
  };
</script>

<style>

  .extra-feature {
    margin-top: 5%!important;
  }

  .feature-box {
    margin-top: 10px;
  }


</style>
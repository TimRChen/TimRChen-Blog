<template>
    <div class="page-detail">
      <div class="content-area container">
        <div class="site-content">

          <section class="post-content">
            <div class="single-post-inner grap">
              essay content
            </div>
          </section>
          <div class="postDesc">
            <!-- 阅读量pv计算 -->
            {{`posted @TimRChen 阅读量(0)`}}
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
  export default {

  }
</script>

<style>

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


</style>

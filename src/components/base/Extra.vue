<template>
  <div class="extra-feature container">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            额外的一些小功能，辛苦开发，不打算试试啊？~
          </h2>
        </div>
      </div>
    </section>

    <div class="feature-box">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <h1 class="title is-4 tag is-dark">短链接服务</h1>
          </div>
          <div class="content">
            <p class="tag is-link">1.内容需要 2.用户友好 3.便于管理</p>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="text" placeholder="输入将要缩短的长网址" v-model="longUrl">
              </div>
              <div class="control">
                <a class="button is-info" v-on:click="generateShortUrl">
                  生成短链
                </a>
              </div>
            </div>
            <span class="tag is-dark show-short-url" v-show="shorUrl.length > 0">{{ shorUrl }}</span>
            <span class="tag is-dark">短链服务api为 <a href="http://suo.im/">http://suo.im/</a> 提供</span>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-box">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <h1 class="title is-4 tag is-dark">查快递服务</h1>
          </div>
          <div class="content">
            <p class="tag is-link">1.查询速度快 2.查询方便</p>
            <p class="tag is-dark">承诺: 功能安全可靠，此功能不收集任何私人信息！</p>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="text" placeholder="输入您的快递单号" v-model="courierNumber">
              </div>
              <div class="control">
                <a class="button is-info" v-on:click="searchLogisticsInfomation">
                  查询物流
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  /**
   * 短链生成 API
   * JSONP
   * request: queryString:  url=urlencode('输入链接');
   */
  const shortUrlAPI = 'http://suo.im/api.php?format=jsonp&url=';

  /**
   * 查询物流 API
   * POST
   * request: 
   * {
   *    RequestData: String, => R, 请求内容需进行URL(utf-8)编码。请求内容JSON格式，须和DataType一致。
   *    EBusinessID: String, => R, 商户ID
   *    RequestType: String, => R, 请求指令类型：1002
   *    DataSign: String, => R, 数据内容签名：把(请求内容(未编码)+ApiKey)进行MD5加密，然后Base64编码，最后 进行URL(utf-8)编码。
   *    DataType: String => O, 请求、返回数据类型：2-json；
   * }
   * R-必填（Required），O-可选（Optional）
   */
  import md5 from 'js-md5';
  let Base64 = require('js-base64').Base64;
  const logisticsAPI = 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx';
  const ApiKey = '21c7b20d-5fa5-4bb1-8747-ac888478c7b7';
  const EBusinessID = '1309806';


  export default {
    data() {
      return {
        longUrl: '', // 输入长链接
        shorUrl: '', // 输出短链
        courierNumber: '', // 快递单号
      }
    },
    methods: {
      generateShortUrl: function () { // 生成短链接
        const _self = this;
        let longUrl = _self.longUrl;
        if (longUrl) {
          _self.$http.jsonp(
            shortUrlAPI + encodeURIComponent(longUrl), // encodeURIComponent可将 # 号进行编码，这样就能将 # 传入服务器中
            {
              jsonp: 'callback',
              jsonpCallback: "jsonPCallback"
            }
          ).then((data) => {
            let url = data.body.url;
            let err = data.body.err;
            if (url) {
              _self.shorUrl = url;
              alert('短链接已生成，感谢使用服务!');
               _self.longUrl = '';
            } else if (err) {
              alert(err);
              _self.longUrl = '';
            }
          })
        } else {
          alert('请输入需要转换的链接!');
        }
      },
      searchLogisticsInfomation: function () { // 查询物流信息
        const _self = this;
        let courierNumber = _self.courierNumber;
        if (courierNumber) {
          // DataSign 生成
          let originalDataSign = courierNumber + ApiKey;
          let hashDataSign = md5(originalDataSign);
          let enCodeDataSign = Base64.encode(hashDataSign);


          _self.$http.post(
            logisticsAPI,
            {
              "RequestData": encodeURI(courierNumber),
              "EBusinessID": EBusinessID,
              "RequestType": '1002',
              "DataSign": enCodeDataSign
            }
          ).then(res => {

            debugger
          });
        } else {
          alert('请输入需要查询的快递单号~');
        }

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
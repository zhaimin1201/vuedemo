"use strict";
try {
  var Global = {
    /// <summary>
    /// 创建名称空间
    /// </summary>
    namespace: function (ns) {
      var parts = ns.split("."),
        thisObj = this,
        i, len;
      for (i = 0, len = parts.length; i < len; i++) {
        if (!thisObj[parts[i]]) {
          thisObj[parts[i]] = {}
        }
        thisObj = thisObj[parts[i]]
      }
      return thisObj
    },
    /// <summary>
    /// 加载文件
    /// </summary>
    loadFile: {
      CreateElement: function (tagName) {
        return document.createElement(tagName);
      },
      strToDom: function (str) {
        var obje = this.CreateElement("div");
        if (typeof str === "string") {
          obje.innerHTML = str;
        }
        return obje.childNodes;
      },
      LoadFile: function (urlArray, tags) {
        if (typeof urlArray == "undefined" || urlArray == null || urlArray.length <= 0) {
          return;
        }

        function JudgmentBrowser(tag) {
          if (navigator.userAgent.indexOf("IE") >= 0) {
            tag.onreadystatechange = function () {
              if (tag && (tag.readyState == "loaded" || tag.readyState == "complete")) {
                tag.onreadystatechange = null;
                return true;
              }
            }
          } else {
            tag.onload = function () {
              tag.onload = null;
              return true;
            }
          }
        }

        function IsContains(str, substr) {
          return '' + str.indexOf(substr) >= 0;
        }

        var tag = tags;
        var iLen = urlArray.length;
        var urls;
        var rand;
        var Suffix = '';
        for (var i = 0; i < iLen; i++) {
          urls = urlArray[i];
          if (urls.length > 0) {
            rand = ('' + Math.random()).replace('.', '');

            if (tag.localName === "link") {
              !IsContains(urls, ".css") ? Suffix = '.css' : '';
              tag.setAttribute("href", urls + Suffix + "?r=" + rand);
            } else if (tag.localName === "script") {
              !IsContains(urls, ".js") ? Suffix = '.js' : '';
              tag.setAttribute("src", urls + Suffix + "?r=" + rand);
            } else {
              tag.setAttribute("src", urls + "?r=" + rand);
            }

            document.getElementsByTagName("head")[0].appendChild(tag);
            if (JudgmentBrowser(tag)) {
              tag = tags;
            }
          }
        }
      },
      Script: function (urlArray) {
        var loadScript = this.CreateElement("script");
        loadScript.setAttribute("type", "text/javascript");
        this.LoadFile(urlArray, loadScript);
      },
      Style: function (urlArray) {
        var loadStyle = this.CreateElement("link");
        loadStyle.setAttribute("type", "text/css");
        loadStyle.setAttribute("rel", "stylesheet");
        this.LoadFile(urlArray, loadStyle);
      },
      LoadTempFile: function (appendDom, url, cha) {
        var domId = appendDom || "J_TempZeroHourContainer_" + (this.tempNumber = this.tempNumber + 1);
        var dom = this.CreateElement("div");
        dom.setAttribute("id", domId);
        dom.setAttribute("style", "display: none !important;");
        $(dom).load(url, function () {
          $('body').append(dom);
          if (typeof (cha) == "function") {
            cha(domId);
          }
        });
      },
      tempNumber: 0
    },
    /// <summary>
    /// 获取URL中的参数
    /// </summary>
    getUrlParam: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },

    /// <summary>
    /// 缓存 localstorage 或 sessionstorage 读写
    /// </summary>
    storage: {
      local: {
        get: function (keys) {
          return localStorage.getItem(keys)
        },
        set: function (keys, values) {
          return localStorage.setItem(keys, values)
        },
        remove: function (keys) {
          localStorage.removeItem(keys)
        },
        clear: function () {
          return localStorage.clear()
        }
      },
      session: {
        get: function (keys) {
          return sessionStorage.getItem(keys);
        },
        set: function (keys, values) {
          return sessionStorage.setItem(keys, values);
        },
        remove: function (keys) {
          sessionStorage.removeItem(keys);
        },
        clear: function () {
          return sessionStorage.clear();
        }
      }
    },
    /// <summary>
    /// Ajax请求
    /// </summary>
    Ajax: {
      get: function (url, cha) {
        var getUrl = url || Global.page.url.ScanOrdering
        var token = Global.storage.local.get("token")
        $.ajax({
          url: getUrl,
          //data: data,
          //dataType: dataType,
          type: "get",
          headers: { 'Authorization': "Bearer " + token },
          success: function (data) {
            Global.Ajax.refFun(data, cha)
          }
        });

        //$.get(getUrl, function (data) {
        //    Global.Ajax.refFun(data, cha);
        //})
      },
      post: function (url, data, cha, erroo) {
        var postUrl = url || Global.page.url.ScanOrdering
        var token = Global.token.get()
        var hander = {}
        var code = {
          RequestSource: 3
        }
        var cod = JSON.stringify(code)
        var data2 = data + cod
        if (token) {
          hander.Authorization = "Bearer " + token
        }
        $.ajax({
          type: "post",
          url: postUrl,
          data: data2,
          async: true,
          dataType:"json",
          contentType: "application/json",
          headers: hander,
          success: function (data) {
            if (typeof (cha) === 'function') {
              cha(data)
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            var errorObj = JSON.parse(XMLHttpRequest.responseText)
            if(errorObj.error.message) {
              if (XMLHttpRequest.status == 401) {
                //跳转到登录的指定页面
                alert('请重新登录')
              } else {
                erroo(errorObj.error.message)
              }
              switch (XMLHttpRequest.status)
              {
                case 400:
                  err = "无效请求"
                  break
                case 401:
                  err = "用户未认证"
                  break
                case 403:
                  err = "服务器拒绝访问"
                  break
                case 406:
                  err = "无法使用请求那内容"
                  break
                case 407:
                  err = "需要代理权限"
                  break
                case 409:
                  err = "服务器请求冲突"
                  break
                case 410:
                  err = "资源已删除"
                  break
                case 500:
                  err = "服务器内部错误"
                  break
                case 503:
                  err = "服务不可用"
                  break
                case 504:
                  err = "网关超时"
                  break
                case 505:
                  err = "HTTP版本不受支持"
                  break
                default:
                  "请检查网络环境"
              }
            }else {
              erroo(errorObj.error.message)
              err="请求异常"
            }
            // console.log(data)
            // // 状态码
            // console.log(XMLHttpRequest.status)
            // // 状态
            // console.log(XMLHttpRequest)
            // // 错误信息
            // console.log(XMLHttpRequest.responseText)
          }
        })
      },
      refFun: function (data, cha) {
        if (data != null && data != "") {
          var json = JSON.parse(data)
          if (json != null && json.State == 200) {
            //跳转
            cha(true, json, json.Remarks)
          } else {
            cha(false, null, json.Remarks)
          }
        } else {
          cha(false, null, "数据连接异常。请稍后重试。");
        }
      }
    },
    /// <summary>
    /// jsonp 请求
    /// </summary>
    AjaxP: {
      get: function (url, cha) {
        var getUrl = url || Global.page.url.ScanOrderingJsonP;
        $.getJSON(getUrl, function (data) {
          Global.AjaxP.refFun(data, cha);
        });
      },
      getDef: function (param, cha) { //请求默认链接
        if ("?" == param[0]) {
          param[0] = "&";
        } else if ("&" != param[0]) {
          param = "&" + param;
        }
        var getUrl = Global.page.url.ScanOrderingJsonP + Global.page.url.BaseData + param;
        $.getJSON(getUrl, function (data) {
          Global.AjaxP.refFun(data, cha);
        });
      },
      refFun: function (data, cha) {
        if (data != null && data != "") {
          var json = data;
          //json= JSON.parse(data);
          if (json != null && json.State == 200 && json.IsOk) {
            cha(true, json, json.Remarks);
          } else {
            cha(false, null, json.Remarks);
          }
        } else {
          cha(false, null, "数据连接异常。请稍后重试。");
        }
      }
    },
    /// <summary>
    /// 客户端判断
    /// </summary>
    IsWeixinOrAlipay: function () {
      var ua = window.navigator.userAgent.toLowerCase();
      var strvale = "";
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        strvale = "WeChat";
      } else if (ua.match(/AlipayClient/i) == 'alipayclient') {
        strvale = "Alipay";
      }
      Global.storage.local.set("clienttype", strvale);
      return strvale;
    },
    /// <summary>
    /// 授权
    /// </summary>
    authorize: {
      /// <summary>
      /// 微信授权处理
      /// </summary>
      wechat: function () {

        function getOpenID() {
          //var u1 = window.location.href;
          //var u2 = '';
          //if (u1.indexOf('?') != -1) {
          //    u2 = u1.substr(0, u1.indexOf('?'));
          //} else {
          //    u2 = u1;
          //}

          var appid = Global.storage.session.get("wechatAppID");
          var appkey = Global.storage.session.get("wechatAppKey");

          //var where = encodeURIComponent(Global.page.url.ReDirectAccount + "?appid=" + appid + "&secret=" + appkey + "&backurl=" + u2);
          var where = Global.page.url.ReDirectAccount + "WeiXinGame/Article.html";
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + where + "&response_type=code&scope=snsapi_userinfo&state=111#wechat_redirect";

        }

        // url
        var url = Global.page.url.ScanOrder + "?Action=getpublicwcs&PcatType=" + (Global.IsWeixinOrAlipay() == "WeChat" ? 1 : 2) + '&rid=' + Math.random();

        Global.AjaxP.get(url, function (tf, Json, message) {
          if (tf) {
            var data = Json.Data;
            Global.storage.session.set("wechatAppID", data.AppID);
            Global.storage.session.set("wechatAppKey", data.AppKey);

            getOpenID();
          } else {
            // alert(message);
          }
        });

        // 获取服务器请求地址
        var rul = this.geturl();

        //var param = encodeURIComponent();

      },
      /// <summary>
      /// 支付宝授权处理
      /// </summary>
      alipay: function () {
        var rul = this.geturl();

      },
      /// <summary>
      /// 获取URL
      /// </summary>
      geturl: function () {
        var hrefs = location.href;
        var origin = hrefs.origin;
        var pathname = hrefs.pathname;
        return origin + pathname;
      },
      /// <summary>
      /// 获取微信和支付宝请求时必须的参数
      /// </summary>
      getAppIdAndAppSecret: function (urlParameter) {
        Global.AjaxP.get(
          Global.page.url.ScanOrder + urlParameter,
          function (isok, data, msg) {
            if (isok) {
              var datas = data.Data;
              return {
                AppId: datas.AppID,
                AppSecret: datas.AppKey
              }
            } else {
              alert("扫描点单程序初始化获取数据失败,请联系管理员");
            }
          }
        );
      }
    },
    /// <summary>
    /// 用户是否登录
    /// </summary>
    getIsLogin: function () {
      // 是否已经授权
      var isauthorize = false;

      // 获取临时用户信息
      var userzerohour = this.storage.session.get('userzerohour');

      // 写入临时用户
      if (userzerohour === null || userzerohour === '') {
        this.storage.session.set('userzerohour', false);
      }

      // 处理全部逻辑，没有登录就跳转登录
      var openid = this.getUrlParam("openid"); //|| '1001';
      if (openid === null || openid === '') {

        // 商户ID
        var customerId = this.getUrlParam("cid");

        // 二维码Code
        var tableCode = this.getUrlParam("code");

        // 验证二维码中的信息
        if (customerId === null || customerId === '' || tableCode === null || tableCode === '') {
          alert("二维码异常,请重新扫描二维码");
          return isauthorize;
        }

        // 写入商户ID
        this.storage.session.set("cid", customerId);

        // 写入 座位二维码Code
        this.storage.session.set("tcode", tableCode);

        // 获取客户端 调用不同的授权
        var Client = this.IsWeixinOrAlipay();

        if (Client == "WeChat") {
          this.authorize.wechat();

        } else if (Client == "Alipay") {

          this.authorize.alipay();

        } else {
          // 测试(调用微信)
          //this.authorize.wechat();

          // 默认用户
          openid = "ZeroHour_" + (Math.random() + '').replace('0.', '');

          // 是否为临时用户
          this.storage.session.set('userzerohour', true);

          // 临时用户不需要授权所以直接更改状态为 true
          isauthorize = true;
        }
      }

      if (openid !== null && openid !== '') {

        // 写入用户openid
        this.storage.session.set("openuserid", openid);
        isauthorize = true;
      }

      return isauthorize;
    },

    /// <summary>
    /// 获取请求关键Key
    /// </summary>
    getUserAndKey: function () {

      // 获取用户的OpenID
      var userId = this.storage.session.get("openuserid"); //  || '1001';

      // 获取商户ID
      var cid = this.storage.session.get("cid"); //|| 'C0717030700002';

      // 获取Table ID
      var tid = this.storage.session.get("TableID"); // || "TBCD12170614110000000014";

      // 二维码 ID
      var qrcode = this.storage.session.get("tcode"); // || "75c226ed-c9a8-4f28-81ef-e2872ab3236b";

      // 客户端类型
      var Client = this.IsWeixinOrAlipay();
      if (Client == "WeChat") {

        Client = 1;

      } else if (Client == "Alipay") {

        Client = 2;

      } else {
        Client = 3;
      }

      if (Client == 3) {//测试数据
        //userId = "oHU0QwB3XA9Ju2AEnk5C8SKuA2Gw";

        //Client = 1;
      }

      // md5 key
      var key = $.md5(userId + cid + tid);

      return '&ct=' + Client + '&customerid=' + cid + '&tableid=' + tid + '&tableqrcode=' + qrcode + '&openuserid=' + userId + '&key=' + key;

    },

    /// <summary>
    /// 扩展 template 的时间格式化
    /// </summary>
    dateFormat: function () {
      /**
       * 对日期进行格式化，
       * @param date 要格式化的日期
       * @param format 进行格式化的模式字符串
       *     支持的模式字母有：
       *     y:年,
       *     M:年中的月份(1-12),
       *     d:月份中的天(1-31),
       *     h:小时(0-23),
       *     m:分(0-59),
       *     s:秒(0-59),
       *     S:毫秒(0-999),
       *     q:季度(1-4)
       * @return String
       * @author yanis.wang
       * @see	http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
       */
      template.defaults.imports.dateFormat = function (date, format) {

        if (typeof date === "string") {
          var mts = date.match(/(\/Date\((\d+)\)\/)/);
          if (mts && mts.length >= 3) {
            date = parseInt(mts[2]);
          }
        }
        date = new Date(date);
        if (!date || date.toUTCString() == "Invalid Date") {
          return "";
        }

        var map = {
          "M": date.getMonth() + 1, //月份
          "d": date.getDate(), //日
          "h": date.getHours(), //小时
          "m": date.getMinutes(), //分
          "s": date.getSeconds(), //秒
          "q": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds() //毫秒
        };

        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
          var v = map[t];
          if (v !== undefined) {
            if (all.length > 1) {
              v = '0' + v;
              v = v.substr(v.length - 2);
            }
            return v;
          } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
          }
          return all;
        });
        return format;
      };
    },

    /// <summary>
    /// 获取url参数
    /// </summary>
    getQueryString: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    /// <summary>
    /// token操作
    /// </summary>
    token: {
      set: function (token) {
        Global.storage.local.set("token", token);
      },
      get: function () {
        return Global.storage.local.get("token");
      },
      remove: function () {
        Global.storage.local.remove("token");
      }
    },
  };
  try {

    //密封
    Object.freeze(Global.namespace);
    Object.freeze(Global.load);
    Object.freeze(Global.getUrlParam);
    Object.freeze(Global.storage);
    Object.freeze(Global.Ajax);
    Object.freeze(Global.AjaxP);
    Object.freeze(Global.IsWeixinOrAlipay);
    Object.freeze(Global.token);

    // 创建公共访问地址
    Global.namespace("page.url");
    // Global.page.url.Request = "http://yinlaijinfu.yinlaicaifu.com/"
    // Global.page.url.Request = "http://10.0.127.238:8080/";
    // Global.page.url.Request = "http://yinlaijinfu.yinlaicaifu.com:8080/";
    Global.page.url.Request = "http://106.14.237.230/";
    // Global.page.url.Request = "http://10.0.127.207";
    Global.page.url.ReDirectAccount = Global.page.url.Request + "Business/Vote/Authorization.html";

    //设置轮询时间
    Global.page.LoopingTime = 3000

  } catch (e) {
    console.log(e)
  }
} catch (e) {
  console.log(e)
}
export {
  Global
}

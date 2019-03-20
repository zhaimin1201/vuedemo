<template>
    <div id="yc" class="bj-coment">
      <div id="yd1">
        <ul>
          <li class="card-title">
            <font class="card-tx card-txcom"></font>
            <div class="card-ex">
              <font class="card-exit"></font>
            </div>
          </li>
          <li class="card-content">
            <font class="card-coment card-zy"></font>
            <font class="card-name " ><a class="cardname"></a></font>
          </li>
          <li class="card-content">
            <font class="card-coment card-number"></font>
            <font class="card-name"><a class="cardcode"></a></font>
          </li>
          <li class="card-content">
            <font class="card-coment card-compontent"></font>
            <font class="card-name"><a class="cardjt">上海银来集团</a></font>
          </li>
          <li class="card-content">
            <font class="card-coment card-phone"></font>
            <font class="card-name " id="cdphone1"><a class="cardphone"></a></font>
          </li>
          <li class="card-content">
            <font class="card-coment card-city"></font>
            <font class="card-name"><a class="cardcity">上海市浦东新区</a></font>
          </li>
          <li class="card-content">
            <font class="card-coment card-js"></font>
            <font class="card-name"><a class="jieshao">个人简介</a></font>
          </li>
        </ul>
        <div class="chose-ys" id="choseys"><span>选择样式</span><i class="card-coment card-jt"></i> </div>
      </div>

      <!--样式2-->
      <div id="yd2">
        <div class="card2-title">
          <font class="card-tx card-txcom"></font>
          <div class="card-ex">
            <font class="card-exit"></font>
          </div>
        </div>
        <div class="card2-name">
          <p class="card2-xm"></p>
          <p class="card2zw"></p>
        </div>
        <div>
          <div class="card2-number">
            <div class="card2-num">
              <font class="card-coment card-number"></font><br />
              <font class="card-name card2-name2"><a class="cardcode"></a></font>
            </div>
          </div>
          <div class="card2-city">
            <div class="card2-num">
              <font class="card-coment card-compontent"></font><br />
              <font class="card-name card2-name2"><a class="cardjt">上海银来集团</a></font>
            </div>
          </div>
        </div>
        <div>&nbsp;</div>
        <div>
          <div class="card2-number">
            <div class="card2-num">
              <font class="card-coment card-phone"></font><br />
              <font class="card-name card2-name2" id="cdphone2"><a class="cardphone"></a></font>
            </div>
          </div>
          <div class="card2-city">
            <div class="card2-num">
              <font class="card-coment card-city"></font><br />
              <font class="card-name card2-name2"><a class="cardcity">上海市浦东新区</a></font>
            </div>
          </div>
        </div>
        <div>&nbsp;</div>
        <div>
          <div class="card2-number cardtwo">
            <div class="card2-num">
              <font class="card-coment card-number"></font><br />
            </div>
          </div>
        </div>
        <div class="yl-clear"></div>
        <div class="card2-pop card-name"><a class="jieshao">个人简介

        </a></div>
        <div class="chose-ys"  id="chose2ys"><span>选择样式</span><i class="card-coment card-jt"></i> </div>
      </div>
      <!--选择样式-->
      <div class="card-chose" id="cardchose">
        <div id="chose1" class="choseor">
          <img src="image/yangshi1@2x.png" width="100%"/>
        </div>
        <div id="chose2" class="choseor">
          <img src="image/yangshi2@2x.png" width="100%"/>
        </div>
        <div class="cd-bottom">
          <button id="buttonqx" class="cd-button cd-button1">取消</button><button class="cd-button" id="buttonsure">确定</button>
        </div>
      </div>

      <div id="ylphone">
        <div class="callphone">
          <h2>提示</h2>
          <span id="qrphone"></span><br />
          <button class="butt butt1" id="phonone">取消</button><a id="call"><button class="butt butt2">呼叫</button></a>
        </div>
      </div>
    </div artic>
</template>

<script>
    export default {
        name: "card"
    }
</script>

<style scoped>
  li{
    list-style: none;
  }
  .yl-clear{
    clear: both;
  }
  .bj-coment{
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    overflow: auto;
  }
  .yl-title>span{
    margin-left: 58px;
  }
  .yl-back>font{
    font-size: 15px;
  }
  #backdrop>img{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  #yc{
    background-image: url(../image/bg1@2x.png);
  }
  #ylphone{
    display: none;
    position: fixed;
    z-index: 998;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
  }
  .callphone{
    background: white;
    width: 75%;
    height: 168px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 8px;
  }
  .callphone>h2{
    text-align: center;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
  }
  .callphone>span{
    text-align: center;
    display: inherit;
    height: 57px;
    line-height: 61px;
    font-size: 16px;
  }
  .butt{
    width: 50%;
    border-radius: 0;
    line-height: 42px;
    color: #007affd1;
    border-color: #ebebeb;
    border-bottom: none;
  }
  .butt1{
    border-right: none;
    border-radius: 0 0 0 8px;
  }
  .butt2{
    border-radius: 0 0 8px 0;
  }
  .card-txcom{
    background-image: url(../image/touxiang@2x.png);
    background-repeat:no-repeat;
    background-size: 100%;
    display: inline-block;
  }
  .card-tx{
    width: 100px;
    height: 100px;
  }
  .chose-ys{
    display: block;
    margin: auto;
    color: #f0ad4e;
    width: 140px;
    border: 1px solid;
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    position: relative;
    top: 26px;
  }
  .card-ex{
    display: inline-block;
    height: 100px;
    position: relative
  }
  .card-exit{
    background-image: url(../image/bianji222@2x.png);
    background-repeat:no-repeat;
    background-size: 100%;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    margin-left: 13px;
  }
  .card-coment{
    background-repeat:no-repeat;
    background-size: 100%;
    width: 17px;
    height: 17px;
    display: inline-block;
  }
  .card-zy{
    background-image: url(../image/xingming@2x.png);
  }
  .card-number{
    background-image:url(../image/yuangognbianhao@2x.png) ;
  }
  .card-compontent{
    background-image: url(../image/gongsi@2x.png);
  }
  .card-phone{
    background-image: url(../image/tel@2x.png);
  }
  .card-city{
    background-image: url(../image/dizhi@2x.png);
  }
  .card-js{
    background-image: url(../image/gerenjianjie@2x.png);
  }
  .card-name{
    padding-left: 14px;
    color: #eae8e8;
    font-size: 16px;
  }
  .card-content{
    padding-left: 7px;
    margin-bottom: 36px;
  }
  .card-title{
    margin-bottom: 14px;
    padding-top: 10px;
  }
  .card-jt{
    background-image: url(../image/right.png);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 22px;
  }
  .chose-ys>span{
    position: absolute;
    left: 26px;
  }
  a{
    color: white;
  }
  .card-name  a:link,
  .card-name a:visited {
    color:#FF0000 !important;
    text-decoration:none;
  }
  .card-name  a:hover,
  .card-name a:active {
    color:#f0ad4e !important;
  }
  .card-chose{
    position: fixed;
    bottom: 0px;
    /*height: 100%;*/
    min-height: 330px;
    width: 100%;
    background: white;
  }
  #cardchose{
    display: none;
  }
  .card2-title{
    width: 149px;
    margin: auto;
    margin-top: 39px;
    padding-left: 25px;

  }
  .card2-name{
    margin: auto;
    text-align: center;
  }
  .card2-xm{
    color: rgb(31, 156, 128);
    font-size: 22px;
    padding: 0;
    margin: 0;
    padding-top: 12px;

  }
  .card2-number{
    display: flex;
    float: left;
    width: 50%;
    text-align: center;
    height: 83px;
  }
  .card2-city{
    display: flex;
    float: right;
    width: 50%;
    text-align: center;
    height: 83px;
    border-left: 1px solid whitesmoke;
  }
  .card2-num{
    align-self: center;
    margin: auto;

  }
  .card2-name2{
    padding:0;
  }
  .cardtwo{
    height: 33px;
    margin-top: 10px;
  }
  .card2-pop{
    font-size: 16px;
    width: 72%;
    margin: auto
  }
  #yd1{
    display: block;
  }#yd2{
     display: none;
   }
  .choseor{
    width: 42%;
    margin-top: 15px;
  }
  #chose1{
    margin-left: 5%;
    float: left;
  }
  #chose2{
    float: right;
    margin-right: 5%;
  }
  .cd-button{
    width: 50%;
    border-radius: 0px;
    border-bottom: 0px;
    height: 50px;
    color: #007aff;
    border-right: 0px;
  }
  .cd-bottom{
    clear: both;
    position: absolute;
    width: 100%;
    bottom: 0px;
  }
  .cd-button1{
    border-left: 0px;
  }
</style>

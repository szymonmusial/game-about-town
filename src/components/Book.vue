<template>
<div class="book__container">
  <div class="couneter"><span>Poziom dostępu: </span>{{user.acceslevel}}<br><span>Obecna strona: </span>{{count}}<br><span>obecna zagadka: </span>{{user.currentriddle}}<br>
    <span v-on:click="unlockriddle(true)">Odlokuj zagadke</span><br><span v-on:click="delcoockie()">Usun stan gry </span><br>
  </div>
  <audio src="../assets/sound/bookflip.mp3" id="audio-book">
    Your browser does not support the audio element.
  </audio>
  <div class="book" v-if="pagesstatus && windowsize > 820">
    <div id="pages" class="pages">
      <div id="page__left" v-on:click="previouspage"></div>
      <div id="page__right"></div>
      <div v-for="(item, index) in pages" :key="index" class="page" v-on:click="page(index)" v-bind:style="index % 2 === 0 ? {'z-index': pages.length - index}:{}">

<div v-if="user.acceslevel + 2 >= index " class="book__if">
        <div v-if="item.type ==='pages.pagephoto'" class="book__img">
          <img :src="item.content" alt="">
        </div>
        <div v-else class="book__text">
          <VueShowdown :markdown="item.content" />
        </div>
</div>

      </div>
    </div>
  </div>
  <div class="book" v-if="pagesstatus && windowsize < 820">
    <div class="help"  v-on:click="emitpopup">
      <div class="button__container">
      <button type="button" class="button--primary"><span>Pomoc</span></button>
      </div>
    </div>
    <div class="help help--img"  v-on:click="showimg">
        <div class="button__container">
          <button type="button" class="button--primary"><span>Powiększ zdjęcie</span></button>
        </div>
    </div>
    <div class="arrow arrow--left" v-on:click="previouspagemobile()"><img src="../assets/img/arow.svg"></div>
    <div class="arrow arrow--right" v-on:click="nextpagemobile()"><img src="../assets/img/arow.svg"></div>
    <div id="pages" class="pages">

      <div class="page">

<div v-if="true" class="book__if" >
        <div v-if="pages[count+1].type ==='pages.pagephoto'" class="book__img" :class="{ 'img--cover' : count == -1 || count == 34}">
          <img :src="pages[count+1].content">
        </div>
        <div v-else class="book__text">
          <VueShowdown :markdown="pages[count+1].content" class="book__text__content"/>
        </div>
</div>

      </div>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import md5 from 'md5'
import jsondata from '../assets/json/response.json'

import {
  VueShowdown
} from 'vue-showdown'
Vue.component('VueShowdown', VueShowdown)

export default {
  name: 'Book',
  data: function () {
    return {
      desktop: false,
      windowsize: '',
      mobile: false,
      count: -1,
      user: {
        acceslevel: -1,
        currentriddle: 0
      },
      riddlesraw: {},
      riddles: [],
      pages: [],
      pagesstatus: true,
      settings: {
        baseurl: '{base_url}',
        imgbaseurl: 'https://forbrand.civ.pl/',
        localdata: true
      }
    }
  },
  methods: {
    page: function (index) {
      if (index % 2 === 0) {
        this.nextpage()
      } else {
        this.previouspage()
      }
    },
    showimg: function () {
      const imgurl = document.querySelectorAll('.book__if img')[0].src
      window.open(imgurl, '_blank')
    },
    loadbook: function () {
      var pages = document.getElementsByClassName('page')
      console.log(pages)
      for (var i = 0; i < pages.length; i++) {
        var page = pages[i]
        if (i % 2 === 0) {
          page.style.zIndex = (pages.length - i)
        }
      }
    },
    nextpage: function (event) {
      if (this.checkaccess()) {
        this.clickSound()
        this.count = this.count + 1
        const pages = document.querySelectorAll('.page')
        pages[this.count].classList.add('flipped')
        this.count = this.count + 1
        pages[this.count].classList.add('flipped')
      }
    },
    nextpagemobile: function (event) {
      if (this.checkaccess()) {
        this.clickSound()
        this.count = this.count + 1
      }
    },
    previouspage: function (event) {
      this.clickSound()
      const cos = document.querySelectorAll('.flipped')
      const elnumber = document.querySelectorAll('.flipped').length
      console.log(cos)
      console.log(elnumber)
      cos[elnumber - 1].classList.remove('flipped')
      cos[elnumber - 2].classList.remove('flipped')
      this.count = elnumber - 3
    },
    previouspagemobile: function (event) {
      this.clickSound()
      this.count = this.count - 1
    },
    clickSound: function () {
      document.querySelector('#audio-book').play()
    },
    checkaccess: function () {
      const currentpage = this.count
      let access = false
      if (currentpage < this.user.acceslevel) {
        access = true
      } else if (this.user.acceslevel === 32 && currentpage < this.user.acceslevel + 2) {
        this.user.acceslevel = this.user.acceslevel + 2
        access = true
      }
      return access
    },
    unlockriddle: function (reply) {
      if (reply) {
        const oldriddlenr = this.user.currentriddle
        const nextriddlenrpages = this.riddles[oldriddlenr + 1].numberpages
        this.user.acceslevel = this.user.acceslevel + nextriddlenrpages
        this.user.currentriddle = this.user.currentriddle + 1
        this.savedatauser()
        this.emitpassword()
      }
    },
    savedatauser: function () {
      this.$cookies.set('user', this.user)
    },
    delcoockie: function () {
      this.$cookies.remove('user')
      window.location.reload()
    },
    loaddatauser: function () {
      const datauser = this.$cookies.get('user')
      if (datauser !== null) {
        this.user = datauser
      }
    },
    loaddatafrombase: function () {
      if (!this.settings.localdata) {
        axios.get(this.settings.baseurl)
          .then(response => {
            this.riddlesraw = response.data
            this.riddlesprepare()
          }).catch(err => {
            console.log('h ', err)
          })
      } else {
        this.riddlesraw = jsondata
        this.riddlesprepare()
      }
    },
    riddlesprepare: function () {
      let id = ''
      let password = ''
      let hint = {}
      let numberpages = ''
      let data = {}
      console.log(this.riddlesraw.length)
      for (var i = 0; i < (this.riddlesraw.length); i++) {
        id = i
        password = this.riddlesraw[i].password
        hint = this.settings.imgbaseurl + this.riddlesraw[i].hint.url
        numberpages = this.riddlesraw[i].pages.length
        data = this.riddlesmodel(id, password, hint, numberpages)
        this.riddles.push(data)
      }
      this.pagessprepare()
      this.emitpassword()
    },
    riddlesmodel: function (id, password, hint, numberpages) {
      const riddleitem = {}
      riddleitem.id = id
      riddleitem.password = password
      riddleitem.hint = hint
      riddleitem.numberpages = numberpages
      return riddleitem
    },
    pagessprepare: function () {
      let type = ''
      let riddlesid = ''
      let content = ''
      let riddle = {}
      let page = {}
      let data = {}
      for (var nrriddle = 0; nrriddle < this.riddlesraw.length; nrriddle++) {
        riddle = this.riddlesraw[nrriddle]
        for (var i = 0; i < riddle.pages.length; i++) {
          page = riddle.pages[i]
          type = page.__component
          riddlesid = nrriddle
          if (type === 'pages.pagephoto') {
            content = this.settings.imgbaseurl + page.photo[0].url
          }
          if (type === 'pages.pagetext') {
            content = page.text.replace(/uploads/i, this.settings.imgbaseurl + '/uploads')
          }
          data = this.pagesmodel(type, riddlesid, content)
          this.pages.push(data)
        }
      }
      this.pagesstatus = true
    },
    pagesmodel: function (type, riddlesid, content) {
      const pageitem = {}
      pageitem.type = type
      pageitem.riddlesid = riddlesid
      pageitem.content = content
      return pageitem
    },
    hashpassword: function (password) {
      return md5(password.toLowerCase())
    },
    getcurentpassword: function () {
      const currentriddle = this.user.currentriddle
      let password = this.riddles[currentriddle].password
      password = this.hashpassword(password)
      return password
    },
    getcurentpasswordlen: function () {
      const currentriddle = this.user.currentriddle
      const passwordlen = this.riddles[currentriddle].password.length
      return passwordlen
    },
    getcurenthint: function () {
      const currentriddle = this.user.currentriddle
      const hint = this.riddles[currentriddle].hint
      return hint
    },
    emitpassword: function () {
      const password = this.getcurentpassword()
      const passwordlen = this.getcurentpasswordlen()
      const hint = this.getcurenthint()
      this.$emit('getpassword', password, passwordlen, hint)
    },
    myresize: function () {
      this.windowsize = window.innerWidth
    },
    emitpopup: function () {
      this.$emit('openpopup')
    }
  },
  mounted () {
    this.loaddatauser()
    this.loaddatafrombase()
    this.myresize()
  },
  created () {
    window.addEventListener('resize', this.myresize)
  }
}
</script>
<style>

.book__container .button__container{display: inline-block;padding: 5px;background-color:var(--color-third--darker);cursor: pointer;width:100%;height:fit-content;}

.book__container .button--primary{
  background-color:var(--color-third--darker);
  padding: 18px 36px;
  border: 0px;
  box-shadow: none;
  outline: none;
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  border: 2px solid white;
  cursor: pointer;
  width:100%;
  font-family: 'Montserrat', sans-serif;
}
.book__if{width:100%;height:100%}

.arrow {
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 1000;
  top: 50%;
  transform: translate(0, -50%);
}

.arrow--right{right:12px;}
.arrow--left{left:12px;}

.arrow--right img{transform: rotate(-90deg);}
.arrow--left img{transform: rotate(90deg);}

.book {
  overflow: visible !important;
}

.book--hide-mobile {
  animation-name: book--hide-mobile;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-delay: 1.2s;
}

@keyframes book--hide-mobile {
  from {
    top: 0px;
  }

  to {
    top: -200%
  }
}

.cat-paw {
  position: absolute;
  z-index: 100;
  transform: translate(-50%, -30%);
  left: 50%;
  top: -100%;
}

.book--showing-mobile {
  animation-name: book--showing-mobile;
  animation-duration: 1s;
  animation-delay: 0s;
  animation-fill-mode: forwards;
}

@keyframes book--showing-mobile {
  from {
    top: -200%
  }

  to {
    top: 0%
  }
}

.cat-paw--show-mobile {
  animation-name: cat-paw--show-mobile;
  animation-duration: 2.75s;

}

@keyframes cat-paw--show-mobile {
  0% {
    top: -100%
  }

  25% {
    top: 0%
  }

  40% {
    top: 0%
  }

  100% {
    top: -100%
  }
}

.book {
  padding-top: 0px !important;
}

.book__container {
  padding: 60px 0px;
  transform-origin: top;
}

div {
  -webkit-font-smoothing: antialiased;
}

p {
  margin: 0px !important;
  font-size: 20px;
  font-weight: 500;
  line-height: 2;
  padding-bottom: 18px;
}

h1 {
  font-size: 36px;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transform: translate3d(0, 0, 0) !important;
  transform: translate3d(0, 0, 0) !important;
}

.book__text img {
width: calc(100% + 64px);
margin-left: -32px;
margin-top: -27px;
}

.book__text {
  margin: 32px;
  margin-top: 32px;
}

h1 {
  margin-bottom: 16px;
  font-size: 36px;
  text-align: center;
  border-bottom: solid 2px #212121;
  padding: 16px 0px;
  padding-top: 0px;
}

h1,
p {
  color: #000;
  opacity: 0.90;
}

@media only screen and (max-width: 590px) {
.book__text br{display: none;}
.book__text .br--mobile{display:block!important;}
.book{height:750px!important;}

.book__text p{font-size:15.5px;}

.book__text h1{font-size:32px;}

.page:not(:first-child) .book__img img{
  width: 100%!important;
      height: auto!important;
      transform: translate(0px, -50%)!important;
      top: 50%!important;
      position: absolute;
}

}
</style>
<style scoped>
.book__img {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, .15) 0%, rgba(0, 0, 0, 0) 10%);
}

.couneter {
  position: absolute;
  background-color: #fff;
  text-align: center;
  font-size: 20px;
  padding: 16px;
  text-align: left;
  display:none;
  cursor:pointer;
  z-index:2000;

}

#page__left {
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0px;
  z-index: 1000;
  display: block;
}

#page__right {
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0px;
  /*z-index:1000;*/
  z-index: -1;
}

img {
  width: 100%;
  height: 100%;
}

.book {
  transition: opacity 0.4s 0.2s;
  position: relative;
  width: 1152px;
  height: 850px;
  max-width: 100%;
  margin: auto;
  padding-top: 3vw;
}

p {
  margin-top: 8vw;
  text-align: center;
  font-size: 5vw;
  color: #000000;
}

.page {
  width: 30vw;
  height: 100%;
  background-color: #111111;
  float: left;
  margin-bottom: 0.5em;
  background: left top no-repeat;
  background-size: cover;
  position: relative;
  cursor: url(https://cdn.custom-cursor.com/128/assets/arrows/32/Cat_Paw_Cursor.png) , default!important;
}

.page:nth-child(even) {
  clear: both;
}

.book {
  perspective: 250vw;
}

.book .pages {
  width: 100%;
  height: 100% !important;
  position: relative;
  transform-style: preserve-3d;
  border-radius: 4px;
}

.book .page {
  float: none;
  clear: none;
  margin: 0;
  position: absolute;
  top: 0;
  width: 50%;
  height: 100% !important;
  transform-origin: 0 0;
  transition: transform 1.4s;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  cursor: pointer;
  user-select: none;
  background-color: #f0f0f0;
  transform: translateX(-50%) translateX(-0.4px) translateY(-50%) translateY(-0.4px);
  overflow: hidden;
}

.book .page:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  transition: background 0.7s;
  z-index: 2;
}

.book .page:nth-child(odd) {
  pointer-events: all;
  transform: rotateY(0deg);
  right: 0;
  border-radius: 0 4px 4px 0;
  background-image: linear-gradient(to right, rgba(0, 0, 0, .30) 0%, rgba(0, 0, 0, 0) 10%), url(../assets/img/papper7.png);
}

.book .page:nth-child(odd):before {
  background: rgba(0, 0, 0, 0);
}

.book .page:nth-child(even) {
  pointer-events: none;
  transform: rotateY(180deg);
  transform-origin: 100% 0;
  left: 0;
  border-radius: 4px 0 0 4px;
  border-color: black;
  background-image: linear-gradient(to left, rgba(0, 0, 0, .30) 0%, rgba(0, 0, 0, 0) 10%), url(../assets/img/papper7__miror.png);
}

.book .page:nth-child(even):before {
  background: rgba(0, 0, 0, 0.2);
}

.book .page.grabbing {
  transition: none;
}

.book .page.flipped:nth-child(odd) {
  pointer-events: none;
  transform: rotateY(-180deg);
  visibility: visible;
}

.book .page.flipped:nth-child(odd):before {
  background: rgba(0, 0, 0, 0.2);
}

.book .page.flipped:nth-child(even) {
  pointer-events: all;
  transform: rotateY(0deg);
  visibility: visible;
}

.book .page.flipped:nth-child(even):before {
  background: rgba(0, 0, 0, 0);
}

*,
* :before,
*:after {
  box-sizing: border-box;
}

html,
body {
  font-family: 'Lovers Quarrel', cursive;
  background: #333;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

html {
  height: 100%;
}

body {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em 0;
  line-height: 1.5em;
}

.page:nth-child(odd) {
  background-position: right top;
}

@media only screen and (max-width: 820px) {
  .book {
    width: 576px;
    overflow: hidden;
  }

  .book .page {
    width: 100%;
  }

  .book .page:nth-child(even) {
    pointer-events: all;
    transform: rotateY(0deg);
    right: 0;
    border-radius: 0 4px 4px 0;
    background-image: linear-gradient(to right, rgba(0, 0, 0, .30) 0%, rgba(0, 0, 0, 0) 10%), url(../assets/img/papper7.png);
  }
}
@media only screen and (max-width: 590px) {
.book__container{padding:0px;}

.book__text {
    margin: 16px;
    margin-top: 16px;
}

}
@media only screen and (max-width: 830px) {
.book__img img{width:100%;height:auto!important;position:absolute;transform: translate(0, -50%);top: 50%;}
.arrow{
      padding: 4px;
      border-radius: 50%;
      background-color: #fff;
      width: 28px;
      height: 28px;
}

.img--cover img{height:100%!important;}
.help{
    height: 60px;
    background-color: #cfd1cc;
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    bottom: -50px;
    z-index: 1000;
    width: 100%;
    right: 0px;
    font-style: normal;
    font-weight: 900;
    color: #041C1A;
    text-align: center;
}

.help--img{bottom:-118px;height: 60px;border-top: 1.5px solid black;}

.book__text {
    margin: 16px;
    margin-top: 16px;
    position: absolute;
    z-index: 1000;
}

}

</style>

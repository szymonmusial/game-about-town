<template>
<div>
  <transition name="fade--slow">
    <div class="hint-popup" v-if="popup">
      <div class="hint-popup__content">
        <div class="hint-popup__close"  v-on:click="closepopup"><img src="../assets/img/close.svg"><span class="hint-popup__close__text">Zamknij Podpowiedz</span></div>
        <img :src="Hint">
      </div>
    </div>
  </transition> <!-- // dodałem tutaj zoom funkcje v-bind -->
  <section id="game__book" v-bind:style="firefox ? Zoomfirefoxbook : Zoomstyle">
    <book @getpassword="sendpassword" ref="book" :onLoad="isloaded()" @openpopup="openpopup" v-bind:style= "firefox ? Zoomfirefox :{}"></book>
  </section>
  <transition name="fade">
    <Transitionn v-if="ShowModal"></Transitionn>
  </transition>                               <!-- // dodałem tutaj zoom funkcje v-bind -->
  <section id="game__keyboard" v-bind:class="{ active: ShowPage }" v-bind:style="firefox ? Zoomfirefoxcontainer : Zoomstyle">
    <keyboard :password="Password" :passwordlen="Passwordlen" @passwordcorect="passwordcorect" @openpopup="openpopup" v-bind:style= "firefox ? Zoomfirefox :{}"></keyboard>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import Transitionn from '@/components/Transition.vue'
import Book from '@/components/Book.vue'
import Keyboard from '@/components/Keyboard.vue'

export default {
  name: 'Game',
  components: {
    Transitionn,
    Book,
    Keyboard
  },
  data: function () {
    return {
      ShowModal: true,
      ShowPage: false,
      popup: false,
      firefox: false,
      Password: '',
      Passwordlen: '',
      Hint: '',
      Zoomstyle: {
        zoom: '0'
      },
      Zoomfirefox: {
        '-moz-transform': 'scale(100%)',
        width: '100%',
        'margin-left': '0'
      },
      Zoomfirefoxcontainer: {
        padding: ''
      },
      Zoomfirefoxbook: {
        height: 'auto'
      }
    }
  },
  methods: {
    isloaded: function () {
      setTimeout(() => {
        this.ShowPage = true
        this.ShowModal = false
      }, 2100)
    },
    sendpassword: function (password, passwordlen, hint) {
      this.Password = password
      this.Passwordlen = passwordlen
      this.Hint = hint
    },
    passwordcorect: function () {
      this.$refs.book.unlockriddle(true)
    },
    openpopup: function () {
      this.popup = true
    },
    closepopup: function () {
      this.popup = false
    },
    // dodałem tutaj zoom funkcje
    changezoom: function () {
      if (window.innerWidth < 1600 && window.innerWidth > 1250) {
        this.Zoomstyle.zoom = '75%'
        this.Zoomfirefox = { '-moz-transform': 'scale(75%)', 'margin-left': '-16.65%' }
        this.Zoomfirefox.width = '133.3%'
        this.Zoomfirefoxcontainer.padding = '80px 0 0 0 !important'
        this.Zoomfirefoxbook.height = '750px !important'
      } else if (window.innerWidth < 1250 && window.innerWidth > 800) {
        this.Zoomstyle.zoom = '60%'
        this.Zoomfirefox = { '-moz-transform': 'scale(60%)', 'margin-left': '-33.3333%' }
        this.Zoomfirefox.width = '166.6666%'
        this.Zoomfirefoxcontainer.padding = '0px !important'
        this.Zoomfirefoxbook.height = '590px !important'
      }
      if (window.innerWidth > 1600) {
        this.Zoomstyle.zoom = '0%'
        this.Zoomfirefox = { '-moz-transform': 'scale(1)' }
        this.Zoomfirefox.width = '100%'
        this.Zoomfirefoxcontainer.padding = 'padding: 240px 0 0 160px'
        this.Zoomfirefoxbook.height = 'auto'
      }
    },
    firefoxf: function () {
      const userAgentString = navigator.userAgent
      const firefoxAgent = userAgentString.indexOf('Firefox') > -1
      return firefoxAgent
    }
  },
  mounted () {
    // dodałem tutaj zoom funkcje
    this.changezoom()
    if (this.$cookies.get('user') === null) {
      this.openpopup()
    }
  },
  created () {
    this.firefox = this.firefoxf()
    window.addEventListener('resize', this.changezoom)
  }
}
</script>
<style>
.hint-popup {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: rgba(4, 31, 28, 0.9);
  z-index: 1000;
  text-align: center;
}

.hint-popup__content {
  height: calc(100% - 72px);
  margin: 0 auto;
  margin-top: 36px;
  width: fit-content;
  position: relative;
}

.hint-popup__content>img {
  height: 100%;
}

.hint-popup__close {
  position: absolute;
  width: 24px;
  height: 24px;
  padding: 20px;
  background-color: #fff;
  border-radius: 50%;
  right: -24px;
  top: -24px;
  cursor:pointer;
}

.hint-popup__close__text{display:none;}
@media only screen and (max-width: 640px) {
.hint-popup__close__text{display:block;}
.hint-popup__content{
  height: fit-content;
      vertical-align: middle;
      top: 50%;
      transform: translate(0, -50%);
      margin-top:0px;
      max-height: 100vh;
}
.hint-popup__close{
position: absolute;
    height: 24px;
    padding: 12px;
    background-color: #fff;
    border-radius: 0px;
    right: 0px;
    top: 0px;
    cursor: pointer;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    vertical-align: middle;
    line-height: 2;
    font-weight: 600;
}
.hint-popup__close img {
    height: 100%;
    margin: 12px;
}

.hint-popup__content>img{width:100%;}
}

.hint-popup__close img {
  height: 100%;
}

#home {
  display: none;
}

.active {
  display: block !important;
}

#game__book {
  height: auto;
}

#game__keyboard {
  padding: 240px 0px;
  height: auto;
  padding-bottom: 160px;
}

@media only screen and (max-width: 600px) {
#game__book{
zoom: 0;
position: absolute;
top: 140px;
z-index: 1;
}
}
</style>

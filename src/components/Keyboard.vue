<template>
<div id="keyboard">

  <div class="input-info__container">
    <span id="input-info__text" v-html="info"></span>
  </div>

  <div class="input__container" v-if="mobile">

    <input :value="input" class="input" @input="onInputChange" placeholder="Kliknij, by wpisać szyfr">

  </div>

  <div class="input__container" v-if="!mobile">

    <div class="input__circle" v-for="index in passwordlen" v-bind:key="index">
      <span class="input__text" >{{input[index-1]}}</span>
    </div>

  </div>

  <div v-show="!mobile">
    <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" />
  </div>
</div>
</template>

<script>
import SimpleKeyboard from './SimpleKeyboard'
import md5 from 'md5'

export default {
  name: 'Keyboard',
  props: ['password', 'passwordlen'],
  components: {
    SimpleKeyboard
  },
  data: () => ({
    input: '',
    info: 'Jakie hasło kryje się pod szyfrem?',
    mobile: true
  }),
  methods: {
    checkpassword: function () {
      let inputcopy = this.input
      inputcopy = inputcopy.replace('ż', 'z')
      inputcopy = inputcopy.replace('ź', 'z')
      inputcopy = inputcopy.replace('ó', 'o')
      inputcopy = inputcopy.toLowerCase()
      inputcopy = inputcopy.replace(' ', '')
      if (this.password === md5(inputcopy)) {
        this.$emit('passwordcorect')
        this.changeinfo()
        this.info = 'Poprawne hasło!<br class="mobile"> Odblokowałeś następne strony'
      } else {
        this.changeinfo()
        this.info = 'Nie poprawne hasło, nie podawaj się!'
      }
      this.input = ''
    },
    changeinfo () {
      const infodiv = document.querySelector('.input-info__container')
      infodiv.classList.add('changing')
      setTimeout(() => {
        infodiv.classList.remove('changing')
      }, 3000)
    },
    onChange (input) {
      if (input.length <= this.passwordlen) {
        this.input = input
      }
    },
    onKeyPress (button) {
      console.log('button', button)
      if (button === '{enter}') {
        this.checkpassword()
      }
      if (button === '{pomoc}') {
        this.emitpopup()
      }
      if (button === '{bksp}') {
        this.input = this.input.slice(0, -1)
      }
    },
    onInputChange (input) {
      this.input = input.target.value
    },
    emitpopup: function () {
      this.$emit('openpopup')
    },
    catchkeyboard () {
      document.onkeypress = (e) => {
        // do usunieca na produkcji
        if (e.key === '`') {
          this.showpanel()
        }
        const key = e.key.toLowerCase()
        if (key !== ' ' && key !== 'enter') {
          //      this.onKeyPress(key)
          //      let copyinput = this.input
          //      copyinput = copyinput + key
          //      this.onChange(copyinput)
        } else {
          this.onKeyPress('{enter}')
        }
      }
    },
    showpanel () {
      console.log('work')
      if (document.querySelector('.couneter').style.display === '' || document.querySelector('.couneter').style.display === 'none') {
        document.querySelector('.couneter').style.display = 'block'
      } else {
        document.querySelector('.couneter').style.display = 'none'
      }
    },
    myresize () {
      if (window.innerWidth < 600) {
        this.mobile = true
      } else {
        this.mobile = false
      }
    }
  },
  mounted () {
    this.changeinfo()
    this.myresize()
    window.addEventListener('resize', this.myresize)
    if (this.mobile) { this.catchkeyboard() }

    window.addEventListener('keydown', (e) => {
      const key = event.key // const {key} = event; ES6+
      if (key === 'Backspace') {
        this.input = this.input.slice(0, -1)
      }
    })
  }
}
</script>

<style>
.mobile {
  display: none;
}

.input__container {
  padding: 25px;
  background-color: #F8C101;
  background-image: url("../assets/img/noise.png");
  display: flex;
  justify-content: center;
  z-index: 1;
  position: relative;
}

.input__circle {
  /* width: 90px; */
  /* height: 90px; */
  border-radius: 50%;
  display: block;
  background-color: #fff;
  margin: 0 1vw;
  box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5.5vw;
  width: 5.5vw;
}

#keyboard {
  position: relative;
}

.input-info__container {
  width: 60%;
  height: 130px;
  background: #CFD1CC;
  position: absolute;
  z-index: 0;
  /*top: -130px;*/
  left: 20%;
  z-index: 0;
  border-top-left-radius: 130px;
  border-top-right-radius: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-duration: 2s;
}

#input-info__text {
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  color: #041C1A;
  text-align: center;
}

.input__text {
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  color: #041C1A;
  text-transform: capitalize;
}

.changing {
  animation-name: infochange;
  animation-duration: 2s;
}

@media only screen and (min-width: 1100px) {
  .input-info__container {
    top: -130px;
  }

  @keyframes infochange {
    0% {
      top: -130px;
      opacity: 1;
    }

    25% {
      top: 0px;
      opacity: 0;
    }

    50% {
      top: 0px;
      opacity: 0;
    }

    100% {
      top: -130px;
      opacity: 1;
    }
  }
}

@media only screen and (max-width: 1100px) {
  #input-info__text {
    font-size: 24px !important;
  }

  #game__keyboard {
    padding-top: calc(80px + 10vh) !important;
    height: auto !important;
    padding-bottom: 10vh !important;
  }

  .input-info__container {
    top: -80px;
  }

  @keyframes infochange {
    0% {
      top: -80px;
      opacity: 1;
    }

    25% {
      top: 0px;
      opacity: 0;
    }

    50% {
      top: 0px;
      opacity: 0;
    }

    100% {
      top: -80px;
      opacity: 1;
    }
  }
}

@media only screen and (min-width: 700px) {
  #input-info__text {
    font-size: 24px;
  }
}

@media only screen and (max-width: 700px) {
  .mobile {
    display: block;
  }

  /*
  .input__circle {
      height: 11vw;
      width: 11vw;
      border-radius: 50%;
      display: block;
      background-color: #fff;
      margin: 0 4px;
      box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      float: left;
      justify-content: center;
  }

.input__container {
    background-color: #F8C101;
    background-image: url(/img/noise.6b073ea5.png);
    display: inline-flex;
    justify-content: center;
    z-index: 1;
    width: 100%;
    position: relative;
    text-align: center;
    padding: 25px 0px;
    margin-bottom: 3vw !important;
}
*/
}

@media only screen and (max-width: 500px) {
  .input__container {
    padding: 25px 0px;
  }

  .input__circle {
    height: 7vw;
    width: 7vw;
    margin: 0 0.5vw;
  }

  .input__text {
    font-size: 18px;
  }

  #input-info__text {
    font-size: 18px !important;
  }
}

@media only screen and (max-width: 600px) {
  .input {
    height: 60px;
    width: 100%;
    padding: 16px;
    font-size: 16px;
    border: none;
    box-sizing: border-box;
    text-align: center;
  }

  .input__container {
    padding: 0px !important;
    height: auto;
  }

  .input-info__container{
    border-top-left-radius: 0px!important;
    border-top-right-radius: 0px!important;
  }
  #game__keyboard{
    zoom: 0;
    position: absolute;
    top: 0px;
    padding-top: 80px!important;
    padding-bottom: 0px!important;
  }

  #input-info__text {
      font-size: 16px !important;
  }

}
</style>

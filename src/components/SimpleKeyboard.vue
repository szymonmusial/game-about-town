<template>
<div class="keyboard__container">
  <audio src="../assets/sound/typewriterclick.mp3" id="audio-typewriter">
    Your browser does not support the audio element.
  </audio>
  <audio src="../assets/sound/typewriterenter.mp3" id="audio-typewriter--enter">
    Your browser does not support the audio element.
  </audio>
  <div :class="keyboardClass"></div>
</div>
</template>

<script>
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'

export default {
  name: 'SimpleKeyboard',
  props: {
    keyboardClass: {
      default: 'simple-keyboard',
      type: String
    },
    input: {
      type: String
    }
  },
  data: () => ({
    keyboard: null
  }),
  mounted () {
    this.catchkeyboard()

    this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layout: {
        default: [
          '{bksp} 1 2 3 4 5 6 7 8 9 0 {pomoc}',
          'q w e r t y u i o p',
          'a s d f g h j k l ;',
          'z x c v b n m ż ź ó',
          '{enter}'
        ]
      }
    })
    this.myresize()
  },
  methods: {
    catchkeyboard () {
      document.onkeypress = (e) => {
        if (e.key === '`') {
          /* this.showpanel() */
        }
        if (e.key === '{bksp}') {
          alert('test')
        }
        const key = e.key.toLowerCase()
        if (key !== ' ' && key !== 'enter') {
          this.onKeyPress(key)
          let copyinput = this.input
          copyinput = copyinput + key
          this.onChange(copyinput)
        } else {
          this.onKeyPress('{enter}')
        }
      }
    },
    mediumlayout: function () {
      this.keyboard = new Keyboard({
        onChange: this.onChange,
        onKeyPress: this.onKeyPress,
        layout: {
          default: [
            '1 2 3 4 5 6 7 8 9 0',
            'q w e r t y u i o p',
            'a s d f g h j k l ;',
            'z x c v b n m ż ź ó',
            '{enter}',
            '{pomoc}'
          ]
        }
      })
    },
    largelayout: function () {
      this.keyboard = new Keyboard({
        onChange: this.onChange,
        onKeyPress: this.onKeyPress,
        layout: {
          default: [
            '{bksp} 1 2 3 4 5 6 7 8 9 0 {pomoc}',
            'q w e r t y u i o p',
            'a s d f g h j k l ;',
            'z x c v b n m ż ź ó',
            '{enter}'
          ]
        }
      })
    },
    mobilelayout: function () {
      this.keyboard = new Keyboard({
        onChange: this.onChange,
        onKeyPress: this.onKeyPress,
        layout: {
          default: [
            '{bksp} 1 2 3 4 5 6 7 8 9 0 {pomoc}',
            'q w e r t y u i o p',
            'a s d f g h j k l ;',
            'z x c v b n m ż ź ó',
            '{enter}'
          ]
        }
      })
    },
    smalllayout: function () {
      this.keyboard = new Keyboard({
        onChange: this.onChange,
        onKeyPress: this.onKeyPress,
        layout: {
          default: [
            'q w e r t y u i o',
            'a s d f g h j k p',
            'z x c v b n m l ż ź ó ?',
            '{enter}',
            '{shift}',
            '{pomoc}'
          ],
          shift: [
            '1 2 3 4 5 6 7 8 9 0',
            '{enter}',
            '{shift}',
            '{pomoc}'
          ]
        }
      })
    },
    clickSound: function () {
      document.querySelector('#audio-typewriter').play()
    },
    clickEnterSound: function () {
      document.querySelector('#audio-typewriter--enter').play()
    },
    onChange (input) {
      this.$emit('onChange', input)
    },
    onKeyPress (button) {
      this.$emit('onKeyPress', button)
      if (button !== '{enter}') {
        this.clickSound()
      } else {
        this.clickEnterSound()
      }
      if (button === '{shift}' || button === '{lock}') this.handleShift()
      if (button === '{pomoc}') {

      }
    },
    myresize: function () {
      const size = window.innerWidth
      if (size < 1000 && size > 500) {
        this.mediumlayout()
      } else if (size > 500) {
        this.largelayout()
      } else {
        this.smalllayout()
      }
    },
    handleShift () {
      const currentLayout = this.keyboard.options.layoutName
      const shiftToggle = currentLayout === 'default' ? 'shift' : 'default'

      this.keyboard.setOptions({
        layoutName: shiftToggle
      })
    }
  },
  watch: {
    input (input) {
      this.keyboard.setInput(input)
    }
  },
  created () {
    window.addEventListener('resize', this.myresize)
  }
}
</script>

<style>

.hg-theme-default{font-family: 'Montserrat', sans-serif;font-weight:bold;}

input {
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 20px;
  border: none;
  box-sizing: border-box;
}

@media only screen and (min-width: 1000px) {
  .hg-row:first-child .hg-button:first-child {
    width: 140px;
    height: 140px;
    margin-top: -6px;
  }

  .hg-row:first-child .hg-button:last-child {
    width: 140px;
    height: 140px;
    margin-top: -6px;
  }

  .hg-row:nth-child(2) .hg-button {
    margin-top: -6px;
  }
}

.keyboard__container {
  width: 100%;
  margin: 0 auto;
}

.simple-keyboard {
  max-width: 100%;
}

.hg-theme-default .hg-button {
  height: 90px;
  width: 90px;
  border-radius: 50%;
  float: left;
  text-transform: uppercase;
  margin: 20px;
  border: 4px solid #A7ABAB;
  background-color: #191E1E;
  color: #D9D9D9;
  font-size: 20px;
}

.hg-theme-default .hg-row:not(:last-child) {
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  display: block;
}

.hg-theme-default .hg-row:last-child {
  width: 45%;
  clear: both;
  margin: auto;
}

@media only screen and (max-width: 1502px) {
  .keyboard__container {
    width: 90%;
  }

  .hg-theme-default .hg-row:nth-child(5) {
    width: 70%;
    clear: both;
    margin: auto;
    display: flex;
  }
}

.hg-button-enter {
  border-radius: 25px !important;
  height: 80px !important;
}

.hg-button-shift {
  border-radius: 25px !important;
  height: 80px !important;
}

.hg-theme-default {
  background-color: transparent;
  overflow: visible;
  margin-top: 2.5vw;
  margin-top: 2vw;
}

@media only screen and (max-width: 1000px) {
.hg-button-pomoc {
  border-radius: 25px !important;
  height: 80px !important;
}
}

@media only screen and (max-width: 1100px) {

  .simple-keyboard {
    margin-left: 1.5vw;
  }

  .hg-theme-default .hg-row>div:last-child {
    margin-right: 1vw;
  }

  .hg-theme-default .hg-button {
    height: 9vw;
    width: 9vw;
    border-radius: 50%;
    float: left;
    text-transform: uppercase;
    margin: 1vw;
    border: 4px solid #A7ABAB;
    margin: 0px;
    background-color: #191E1E;
    color: #D9D9D9;
    font-size: 20px;
    margin: 1vw;
  }

  .input-info__container {
    width: 100% !important;
    height: 80px !important;
    top: -80px;
    left: 0px !important;
    border-top-left-radius: 25px !important;
    border-top-right-radius: 25px !important;
  }

}

@media only screen and (max-width: 700px) {
  .hg-theme-default .hg-row:nth-child(5) {
    width: 100%;
  }

  .hg-theme-default .hg-row:nth-child(6) {
    width: 100%;
  }

  .hg-theme-default .hg-row:last-child {
    width: 100%;
  }

  .hg-button-enter {
    height: 13vw !important;
  }

  .hg-button-pomoc {
    height: 13vw !important;
  }

  .hg-button-shift {
    height: 13vw !important;
  }

  .simple-keyboard {
    margin-left: 0px;
    margin-left: 0.5vw;
  }

  .hg-theme-default .hg-button {
    font-size: 16px !important;
  }

  .input-info__container {
    font-size: 24px !important;
  }
}

@media only screen and (max-width: 500px) {
  .hg-functionBtn{height: 15vw !important;}
  .hg-button-shift{width:calc(100vw - 20px)!important;border-radius:12.5px!important;}
  .hg-button-enter{width:calc(100vw - 20px)!important;border-radius:12.5px!important;}
  .hg-button-pomoc{width:calc(100vw - 20px)!important;border-radius:12.5px!important;}

  .keyboard__container {
    width: 100% !important;
  }

  .hg-theme-default .hg-row:nth-child(4) {
    width: 100%;
    clear: both;
    margin: auto;
    display: flex;
  }

  .hg-theme-default .hg-button {
    height: 14vw;
    width: 14vw;
    border-radius: 50%;
    float: left;
    text-transform: uppercase;
    margin: 1vw;
    border: 4px solid #A7ABAB;
    margin: 0px;
    background-color: #191E1E;
    color: #D9D9D9;
    font-size: 20px;
    margin: 0.8vw;
    border: 3px solid #A7ABAB;
  }

  .hg-button-enter {
    margin-top: 6vw !important;
    margin-bottom: 3vw !important;
  }
  .hg-button-shift {
    margin-bottom: 3vw !important;
  }

}
</style>

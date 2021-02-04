<template>
<div>
  <transition name="fade">
    <Loading v-if="ShowModal"></Loading>
  </transition>
  <section id="home" v-bind:class="{ active: ShowPage }">
    <HomeBlock></HomeBlock>
    <div class="logo color--second">
    <div class="logo__text logo__text--mobile"><span>Projekt dofinansowana z projektu  Fundacji BGK z programu "Dzieci Kapitana Nemo".<br>Fotografie: www.kepnosocjum.pl, WDK.</span></div>
    <div class="logo__img"><img src="../assets/img/nemo__logo.png"></div>
    <div class="logo__img"><img src="../assets/img/bgh__logo.png"></div>
    <div class="logo__text logo__text--desktop">Projekt dofinansowana z projektu  Fundacji BGK z programu "Dzieci Kapitana Nemo".<br>Fotografie: www.kepnosocjum.pl, WDK.</div>
    <div class="logo__img"><img src="../assets/img/wier__logo.png"></div>
    <div class="logo__img"><img src="../assets/img/wdk__logo.png"></div>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import HomeBlock from '@/components/HomeBlock.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'home',
  components: {
    HomeBlock,
    Loading
  },
  data: function () {
    return {
      ShowModal: true,
      ShowPage: false
    }
  },
  methods: {
    isloaded: function () {
      setTimeout(() => {
        this.ShowPage = true
        this.ShowModal = false
      }, 4600)
    }
  },
  mounted () {
    this.isloaded()
  }
}
</script>
<style>
.logo__text--mobile{display:none;}

.logo{
  width: 100%;
  height: 80px;
  background-color: #fff;
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight:500;
  font-size:14px;
}

.logo__text{text-align:center;}

.logo__img{height:calc(100% - 12px);padding:6px 32px;}

.logo img{height:100%;}

#home{display:none;}
.active{display:block!important;}

@media only screen and (max-width: 1100px) {
.logo__text--desktop{display:none;}
.logo__text--mobile{display:block;width:100%;padding: 12px;padding-bottom: 6px;}
.logo{flex-wrap: wrap;height: 70px;}
.logo__img{background-color: #fff;}
}
@media only screen and (max-width: 500px) {
.logo{height: fit-content;top:calc(100% - 72px);}
.logo__img {height: 50px;}
}
</style>

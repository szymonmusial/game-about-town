<template>
<div class="home__block">

  <div class="home__block__sub">
    <h2 class="sub color--second">Zostań kryptologiem!</h2>
  </div>

  <div class="home__block__header">
    <h1 class="header color--third">Dołącz do gry</h1>
  </div>

  <div class="home__block__text">
    <h2 class="sub color--primary">Wieruszów kryje wiele sekretów. Odwiedź najważniejsze <br class="medium"> punkty w naszym  <br class="desktop">mieście, złam szyfry i dowiedz <br class="medium">się jaka tajemnica kryje się pod nimi!</h2>
  </div>
<router-link to="/game">
  <div class="button__container">
    <button type="button" class="button--primary">Rozpocznij Grę</button>
  </div>
</router-link>
</div>
</template>

<script>
export default {
  name: 'HomeBlock',
  props: {
    msg: String
  }
}
</script>
<style scoped>

.button--primary{text-transform: uppercase;}

.medium{display:none;}
.desktop{display:block;}
.home__block {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 45%;
  left: 50%;
  text-align: center;
  font-family: 'Playfair Display';
  min-width: 625px;
}

.home__block__sub {
  padding: 18px 36px;
  background-color: var(--color-primary);
  margin: 24px;
  display: inline-block;
}

.home__block__text {
  margin: 24px;
}

.header {
  font-size: 96px;
  font-weight: 900;
  margin-bottom: 0px;
  padding-bottom: 0px;
  border: 0px;
}

.button__container{margin-top: 24px;margin-bottom: 24px;display: inline-block;padding: 5px;background-color:var(--color-third--darker);cursor: pointer;}

.button--primary{
  background-color:var(--color-third--darker);
  padding: 18px 36px;
  border: 0px;
  box-shadow: none;
  outline: none;
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  border: 2px solid white;
  cursor: pointer;
}

@media only screen and (max-width: 1400px) {

.desktop{display:none;}

.medium{display:block;}

.home__block{top:50%;}

.header{font-size: 96px;}

.sub{font-size:20px;}

.home__block__text{margin: 16px;}

.button__container{margin-top: 16px;}

.home__block__sub{margin: 8px;}

}

@media only screen and (max-width: 700px) {

.medium{display:none;}

.home__block{min-width: auto;
  min-width: auto;
      transform: none;
      top: 48px;
      left: auto;
      width: 100%;
      transform: translate(0, -50%);
      top: 42.5%;
}
.home__block__text{margin: 24px 12px;}
.home__block__text > h2{font-size: 18px;padding: 0px 8px;line-height: 1.6;}

.home__block__sub{margin: 24px 12px;}
.home__block__sub > h2{font-size: 18px;}

.header{font-size:48px; }

.button--primary{  padding: 16px 32px; }
.button__container{margin-top: 12px;}
}
</style>

<template>
<div class="main">
  <h2>Решение Квадратного Уравнения</h2>
  <form class="mainForm">
    <input type="text" class="Koef" id="KoefA" placeholder="A">
    <label>X^2 + </label>
    <input type="text" class="Koef" id="KoefB" placeholder="B">
    <label>X + </label>
    <input type="text" class="Koef" id="KoefC" placeholder="C">
    <label>= 0</label>
  </form>
  <h1></h1>
  <button @click="() => {calculate()}"><h3>Расчитать</h3></button>
  <h1></h1>
  <h1 id="EnterEq"></h1>
  <h1></h1>
  <h2 id="Disc"></h2>
  <h1></h1>
  <h2 id="countRoots"></h2>
  <h1></h1>
  <h2 id="Roots"></h2>
  <h1></h1>
 </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomePage',
  methods: {
    calculate() {
      let A = document.getElementById("KoefA").value;
      let B = document.getElementById("KoefB").value;
      let C = document.getElementById("KoefC").value;
      const data = {A: A, B: B, C: C};
      axios.post("http://localhost:3001/calculate/", data).then((response) => {
        const data = response.data;

        const EnterEq = document.getElementById("EnterEq");
        let enterText = "Вы ввели: " + data['A'] + "X^2 ";
        if(data['B'] < 0) {
          enterText += data['B'] + "X ";
        } else {
          enterText += " +" + data['B'] + "X ";
        }

        if(data['C'] < 0) {
          enterText += data['C'];
        } else {
          enterText += " +" + data['C'];
        }

        enterText += " = 0";

        EnterEq.textContent = enterText;

        const Disc = document.getElementById("Disc");
        if(data['D']) {
          Disc.textContent = "Квадратное уравнение, его Дискриминант равен: " + data['D'];
        } else {
          Disc.textContent = "";
        }

        const countRoots = document.getElementById("countRoots");
        const Roots = document.getElementById("Roots");

        if(data['ManyRoot']) {
          countRoots.textContent = "Уравнение имеет бесконечное количество корней";
          Roots.textContent = "X∈R";
        } else {
          if(data['ZeroRoot']) {
            countRoots.textContent = "Уравнение не имеет корней";
            Roots.textContent = "X∈Ø";
          } else {
            if(data['OneRoot']) {
              countRoots.textContent = "Уравнение имеет единственный корень";
              Roots.textContent = "X = " + data['X'];
            } else {
              if(data['TwoRoot']) {
                countRoots.textContent = "Уравнение имеет два корня";
                Roots.textContent = "X1 = " + data['X1'] + "; X2 = " + data['X2'];
              } else {
                countRoots.textContent = "";
                Roots.textContent = "";
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style>
div.main {
  font-family: system-ui;
  color: white;
  margin: left;
  text-align: center;
}
body {
  background: #f06d06;
}

.Koef {
  width: 23px;
  text-align: center;
}
</style>

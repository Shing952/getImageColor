<template>
  <div id="app">
    <section>
      <!-- <button>按钮</button> -->
      <input type="file" @change="onFileChange" />
      <div>
        <h2>图片</h2>
        <img :src="src" />
      </div>
    </section>
    <section>
      <h1>颜色效果</h1>
      <div class="div" :style="{ backgroundColor }"></div>
    </section>
  </div>
</template>

<script>
import { getImageColor } from "./plugins/getImageColor";

export default {
  name: "App",
  data() {
    return {
      src: "",
      backgroundColor: "",
    };
  },
  methods: {
    onFileChange(e) {
      const { target } = e;
      const files = target.files;
      if (files.length === 0) {
        alert("请选择图片");
        return;
      }

      const reader = new FileReader(); //新建一个FileReader
      reader.readAsArrayBuffer(files[0]); //读取文件
      reader.onload = (evt) => {
        //读取完文件之后会回来这里
        const fileDataURL = evt.target.result; // 读取文件内容
        const blob = new Blob([fileDataURL]);
        this.src = URL.createObjectURL(blob);
        this.getImageColor(fileDataURL);
        // console.log(fileDataURL)
      };
      console.log(files);
    },
    async getImageColor(url) {
      const color = await getImageColor(url);
      console.log(color);
      this.backgroundColor = ["rgb(", color, ")"].join("");
    },
  },
};
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  width: 100vw;
  margin-top: 60px;
  margin-bottom: 100px;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  flex-direction: column;
}

img {
  max-width: 100%;
}

.div {
  width: 100vw;
  height: 100vw;
  border: 1px solid #ccc;
}
</style>

<script setup lang="ts">
import { fetchEventSource } from "@fortaine/fetch-event-source";
import { Ref, ref } from "vue";
const text = ref("");

// message容器
const messageArr: Ref<string[]> = ref([]);
const loading = ref(false);
const status = ref(false);
function test() {
  loading.value = true;
  status.value = true;
  fetchEventSource(`${import.meta.env.VITE_APP_BASE_API}`, {
    method: "post",
    onopen(response) {
      console.log("on open", response);
      loading.value = false;
      setTimeout(() => {
        setWords();
      }, 10);
      return Promise.resolve();
    },
    onmessage(event) {
      messageArr.value.push(event.data);
    },
    onerror(err) {
      console.log("on err", err);
    },
    onclose() {
      console.log("on close");
      status.value = false;
    },
    openWhenHidden: true,
  });
}

function setWords() {
  let index = 0;
  const timer = setInterval(() => {
    text.value += messageArr.value[index];
    index++;

    if (messageArr.value.length === index && !status.value) {
      clearInterval(timer);
    }
  }, 200);
}
</script>

<template>
  <div id="content">
    {{ text }}

  </div>
  <n-input placeholder="请输入"></n-input>
  <n-button @click="test">发送</n-button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
#content::after {
  content: "|";
  color: #000;
  animation: blink 1.5s infinite;
}
@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

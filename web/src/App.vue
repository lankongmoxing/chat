<script setup lang="ts">
import { fetchEventSource } from "@fortaine/fetch-event-source";
import { Ref, ref } from "vue";
const text = ref("");

// message容器
const messageArr: Ref<string[]> = ref([]);
const loading = ref(false);
const status = ref(false);
const content = ref("");
function test() {
  loading.value = true;
  status.value = true;
  fetchEventSource(`${import.meta.env.VITE_APP_BASE_API}/session`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content.value,
    }),
    onopen(response) {
      console.log("1 on open", response);
      loading.value = false;
      setTimeout(() => {
        setWords();
      }, 10);
      return Promise.resolve();
    },
    onmessage(event) {
      console.log("on message", event);
      const data = JSON.parse(event.data);
      messageArr.value.push(data.content);
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
    if (messageArr.value.length !== index) {
      text.value += messageArr.value[index];
      index++;
    } else if (!status.value) {
      clearInterval(timer);
    }
  }, 200);
}
</script>

<template>
  <div id="content">
    {{ text }}
  </div>
  <n-input v-model:value="content" placeholder="请输入"></n-input>
  <n-button @click="test">发送</n-button>
</template>

<style scoped>
#content {
  white-space: pre-line;
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

<script setup lang="ts">
import routesConfig from '@/config/routes';
import PrivateRoute from '@/components/PrivateRoute.vue'
import BiSearch from '@/assets/icons/BiSearch.vue';
import ChatBox from '@/components/ChatBox.vue';
import { computed, onMounted, ref, watch } from 'vue';
import type { TMes } from '@/models/TMes';
import { socketContext, stateEvents } from '@/context/SocketContext';
import { Helper } from '@/helper';
import ChatItem from '@/components/ChatItem.vue';

const messages  = ref<TMes[]>([])
const open = ref<boolean>(false)
const isUser = ref<boolean>(true)
const seen = ref<string[]>([])
const idUser = ref<string>('')

const renderUser = computed(() => {
  if(messages.value.length > 0 && messages.value[messages.value.length - 1].role === 'admin') {
    isUser.value = false
  } else {
    isUser.value = true
  }


  return messages.value.filter(item => item.role === 'user')
    .filter((v: TMes, i, a: TMes[]) => a.findLastIndex((v2: TMes) => v2.id === v.id) === i)
    .reverse()
})

onMounted(() => {
  const data = sessionStorage.getItem('messages-admin');

        if (data) {
            const values = JSON.parse(data) as TMes[];

            if (values.length > 0) {
                messages.value = (values);
            }
        }
})

watch(renderUser, () => {
  if (isUser && !open) {
            const idNew = renderUser.value[0]?.id;
            if (idNew) {
              if(seen.value.indexOf(idNew) === -1) {
                seen.value = [...seen.value, idNew]
              }
            }
        }
})

onMounted(() => {
  if(stateEvents.connected) {
    socketContext.on('user_sent', (data) => {
                    messages.value.push({
                      message: data.message,
                            name: data.name,
                            role: data.role,
                            id: data.id,
                    })
                    Helper.handleCreateOrSaveMessage({
                        message: data.message,
                        name: data.name,
                        role: data.role,
                        id: data.id,
                    });
                });
  }
})

const setIdUser = (data: string) => {
  idUser.value = data;
}

const setOpen = (data: boolean) => {
  open.value = data;
}

const setMessages = (data: TMes) => {
  messages.value.push(data);
}

</script>

<template>
  <PrivateRoute :redirect="routesConfig.chat">
    <div class="wrapper">
            <div class="header-chat">
                <h3 class="heading-chat">Chats</h3>
                <div class="searching">
                    <BiSearch />
                    <input type="text" placeholder="Tìm kiếm..." />
                </div>
            </div>
            <div>
                  <div
                    v-for="item in renderUser.reverse()"
                      @click="() => {
                        idUser = (item.id ?? '');
                          open = (true);
                          seen = seen.filter(k => k !== item.id)
                      }"
                      :key="item.id"
                  >
                      <ChatItem :item="item" :seen="seen" />
                  </div>
                <ChatBox
                    :idUser="idUser"
                    :setIdUser="setIdUser"
                    :open="open"
                    :setOpen="setOpen"
                    :messages="messages"
                    :setMessages="setMessages"
                />
            </div>
        </div>
  </PrivateRoute>
</template>

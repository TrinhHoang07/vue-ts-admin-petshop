<script setup lang="ts">
import routesConfig from '@/config/routes';
import PrivateRoute from '@/components/PrivateRoute.vue';
import BiSearch from '@/assets/icons/BiSearch.vue';
import ChatBox from '@/components/ChatBox.vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import type { TMes } from '@/models/TMes';
import { socketContext, stateEvents } from '@/context/SocketContext';
import { Helper } from '@/helper';
import ChatItem from '@/components/ChatItem.vue';

const messages = reactive<{
    data: TMes[];
}>({
    data: [],
});
const open = reactive<{
    data: boolean;
}>({
    data: false,
});
const isUser = ref<boolean>(true);
const seen = ref<string[]>([]);
const idUser = reactive<{
    data: string;
}>({
    data: '',
});

const renderUser = computed(() => {
    if (messages.data.length > 0 && messages.data[messages.data.length - 1].role === 'admin') {
        isUser.value = false;
    } else {
        isUser.value = true;
    }

    return messages.data
        .filter((item) => item.role === 'user')
        .filter((v: TMes, i, a: TMes[]) => a.findLastIndex((v2: TMes) => v2.id === v.id) === i)
        .reverse();
});

onMounted(() => {
    const data = sessionStorage.getItem('messages-admin');

    if (data) {
        const values = JSON.parse(data) as TMes[];

        if (values.length > 0) {
            messages.data = values;
        }
    }
});

watch(renderUser, () => {
    if (isUser && !open) {
        const idNew = renderUser.value[0]?.id;
        if (idNew) {
            if (seen.value.indexOf(idNew) === -1) {
                seen.value = [...seen.value, idNew];
            }
        }
    }
});

onMounted(() => {
    if (stateEvents.connected) {
        socketContext.on('user_sent', (data) => {
            messages.data.push({
                message: data.message,
                name: data.name,
                role: data.role,
                id: data.id,
            });
            Helper.handleCreateOrSaveMessage({
                message: data.message,
                name: data.name,
                role: data.role,
                id: data.id,
            });
        });
    }
});

const setIdUser = (data: string) => {
    idUser.data = data;
};

const setOpen = (data: boolean) => {
    open.data = data;
};

const setMessages = (data: TMes) => {
    messages.data.push(data);
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.chat">
        <div class="wrapper-chat">
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
                    @click="
                        () => {
                            idUser.data = item.id ?? '';
                            open.data = true;
                            seen = seen.filter((k) => k !== item.id);
                        }
                    "
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

<style lang="scss" scoped>
.wrapper-chat {
    background-color: #181924;
    padding: 16px;
    min-height: calc(100vh - 80px - 48px);

    .header-chat {
        color: #fff;
        .heading-chat {
            font-size: 2.2rem;
            font-weight: 500;
        }
    }

    .searching {
        display: flex;
        align-items: center;
        margin: 16px 0;
        background-color: #353640;
        border-radius: 999px;
        padding: 0 8px;

        input {
            margin-left: 8px;
            outline: none;
            border: none;
            background-color: transparent;
            padding: 12px 0;
            caret-color: #fff;
            color: #fff;
            font-size: 1.4rem;
        }
    }

    .chat-item {
        display: flex;
        align-items: center;
        padding: 16px;
        background-color: #2a2b36;
        color: #fff;

        &:hover {
            border-radius: 5px;
            background-color: #353640;
            cursor: pointer;
        }

        .avatar {
            display: flex;
            width: 48px;
            height: 48px;
            position: relative;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 999px;
            }

            .seen-message {
                position: absolute;
                top: -8px;
                right: -4px;

                span {
                    background-color: red;
                    font-size: 1.4rem;
                    padding: 0 8px;
                    border-radius: 999px;
                }
            }
        }

        .info-user {
            padding-left: 16px;

            .noti-mes {
                font-size: 1.4rem;
            }
        }
    }
}
</style>

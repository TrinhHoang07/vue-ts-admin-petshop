<script setup lang="ts">
import logo from '@/assets/images/logo-petshop.jpg';
import cat from '@/assets/images/meoww.jpg';
import { socketContext, stateEvents } from '@/context/SocketContext';
import { Helper } from '@/helper';
import { computed, onMounted, ref, watch } from 'vue';
import TypeAdmin from './TypeAdmin.vue';
import BiMinus from '@/assets/icons/BiMinus.vue';
import BsFillImage from '@/assets/icons/BsFillImage.vue';
import BiHappy from '@/assets/icons/BiHappy.vue';
import IoSend from '@/assets/icons/IoSend.vue';

type TMes = {
    role: string;
    message: string;
    id?: string;
    name: string;
};

type _T_Props = {
    idUser: any;
    setIdUser: (value: string) => void;
    messages: {
        data: TMes[]
    };
    setMessages: Function;
    open: any;
    setOpen: Function;
};

const props = defineProps<_T_Props>();
const visible = ref<boolean>(false)
const value = ref<string>('')
const mesRef = ref<any>()
const inputRef = ref<any>()
const mesEndRef = ref<any>()
const nameCurrent = ref<string>('')


watch([props.messages, props.open, props.idUser],() => {

    console.log('calling open')

    setTimeout(() => {
        scrollToBottom();
        inputRef.value.focus()
    }, 300)
})

watch(value, () => {
    if(stateEvents.connected) {
        if(value.value.trim().length > 0) {
            socketContext.emit('typing_admin', nameCurrent.value)
        } else {
            socketContext.emit('clear_typing_admin', nameCurrent.value)

        }
    }
})

watch([props.idUser], () => {

    console.log('calling idUser')

    nameCurrent.value = props.idUser.data
})

const renderMessages = computed(() => {
    return props.messages.data.filter((item) => item.id === props.idUser.data);
})

watch(nameCurrent, () => {
    if(stateEvents.connected) {
        socketContext.on(`typing_user_${nameCurrent.value}`, (data: any) => {
                if (nameCurrent.value === data.isType) {
                    visible.value = (true);
                } else {
                    visible.value = (false);
                }
            });

            socketContext.on(`clear_typing_user_${nameCurrent.value}`, (data: any) => {
                if (data.isType === nameCurrent.value) {
                    visible.value = (false);
                }
            });
    }
})

const scrollToBottom = () => {
    mesEndRef.value.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = () => {
        if (value.value.trim().length > 0) {
            socketContext.emit('messageToUser', {
                id: props.idUser.data,
                name: 'Van Hoang',
                message: value.value,
                role: 'admin',
            });

            props.setMessages({
                message: value.value, name: 'Van Hoang', role: 'admin', id: props.idUser.data
            })
            // props.setMessages((prev) => [
            //     ...prev,
            //     { message: value, name: 'Van Hoang', role: 'admin', id: props.idUser },
            // ]);
            Helper.handleCreateOrSaveMessage({ message: value.value, name: 'Van Hoang', role: 'admin', id: props.idUser.data });
            value.value = ''
            inputRef.value && inputRef.value.focus();
        }
    };

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };


</script>

<template>
    <div class="chat-box">
                <div v-if="props.open.data" class="content">
                    <div class="header-chat">
                        <div class="info-header">
                            <div class="wrap-img">
                                <img :src="logo" alt="logo shop" />
                            </div>
                            <h3 class="heading">Chat với {{renderMessages[0]?.name ?? 'Unknown'}}</h3>
                        </div>
                        <div @click="() => props.setOpen(false)" class="close-btn">
                            <BiMinus />
                        </div>
                    </div>
                    <div ref="mesRef" class="messages">
                        <template v-for="(message, index) in renderMessages">
                            <div v-if="message.role === 'user'" :key="index" class="message getview">
                                <div class="avatar">
                                    <img :src="logo" alt="shop-admin" />
                                </div>
                                <p class="content-message">{{message.message}}</p>
                            </div>
                            <div v-if="message.role === 'admin'" :key="index" class="message-2 getview">
                                <div class="avatar-2">
                                    <img :src="cat" alt="shop-admin" />
                                </div>
                                <p class="content-message-2">{{message.message}}</p>
                            </div>
                        </template>
                        <div ref="mesEndRef" />
                    </div>
                    <div class="footer-chat">
                        <TypeAdmin v-if="visible" />
                        <div class="footer-content">
                            <div class="input-footer">
                                <span class="icons">
                                    <BsFillImage />
                                </span>
                                <span class="icons mr-6">
                                    <BiHappy />
                                </span>
                                <input
                                    @keyup="handleEnter"
                                    ref="inputRef"
                                    v-model="value"
                                    type="text"
                                    placeholder="Aa..."
                                />
                            </div>
                            <div @click="handleSubmit" class="btn-submit">
                                <IoSend />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
</template>

<style lang="scss" scoped>
    .chat-box {
    position: fixed;
    bottom: 30%;
    left: 16px;
    z-index: 999;
    animation: fade 0.2s ease;
}

.content {
    position: fixed;
    top: 70px;
    right: 6px;
    width: 360px;
    height: calc(100vh - 70px);
    background: rgba(186, 206, 163, 1);
    background-image: url('@/assets/images/pattern.svg');
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 999;
}

.header-chat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px 12px 16px;
    background-color: darkcyan;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}

.wrap-img {
    width: 36px;
    height: 36px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 999px;
    }
}

.info-header {
    display: flex;
    align-items: center;
}

.heading {
    font-size: 1.6rem;
    color: #FFF;
    font-weight: 500;
    padding-left: 16px;
}

.close-btn {
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
}

.messages {
    flex: 1;
    padding: 8px 16px;
    height: 390px;
    overflow: overlay;
    overflow-y: scroll;
}

.message-2 {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    margin-bottom: 6px;
}

.content-message-2 {
    font-size: 1.4rem;
    height: auto;
    word-wrap: break-word;
    word-break: break-all;
    padding: 8px;
    background-color: #0084ff;
    border-radius: 16px;
    margin-right: 8px;
    color: #fff;
}

.message {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
}

.avatar-2,
.avatar {
    width: 36px;
    height: 36px;
    display: flex;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 999px;
    }
}

.content-message {
    font-size: 1.4rem;
    height: auto;
    word-wrap: break-word;
    word-break: break-word;
    padding: 8px;
    background-color: #e4e6eb;
    border-radius: 16px;
    margin-left: 8px;
    color: #333;
}

.footer-chat {
    background-color: inherit;
}

.footer-content {
    display: flex;
    align-items: center;
    padding: 10px 8px;
}

.input-footer {
    display: flex;
    align-items: center;
    flex: 1;

    input {
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 12px;
        width: 100%;
        caret-color: rgb(116, 184, 40);
    }
}

.icons {
    color: #0084ff;
    font-size: 2rem;
    display: flex;
    margin: 0 6px;
    cursor: pointer;

    &.mr-6 {
        margin-right: 12px;
    }
}

.btn-submit {
    font-size: 2rem;
    color: #0084ff;
    display: flex;
    cursor: pointer;
}

@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

</style>
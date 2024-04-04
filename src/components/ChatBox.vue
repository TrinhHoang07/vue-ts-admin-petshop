<script setup lang="ts">
import logo from '@/assets/images/logo-petshop.jpg';
import cat from '@/assets/images/meoww.jpg';
import { socketContext, stateEvents } from '@/context/SocketContext';
import { Helper } from '@/helper';
import { computed, ref, watch } from 'vue';
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
    idUser: string;
    setIdUser: (value: string) => void;
    messages: TMes[];
    setMessages: Function;
    open: boolean;
    setOpen: Function;
};

const props = defineProps<_T_Props>();
const visible = ref<boolean>(false)
const value = ref<string>('')
const mesRef = ref<any>()
const inputRef = ref<any>()
const mesEndRef = ref<any>()
const nameCurrent = ref<string>('')

watch([props.open, props.messages], () => {
    scrollToBottom();
    inputRef.value.focus()
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
    nameCurrent.value = props.idUser
})

const renderMessages = computed(() => {
    return props.messages.filter((item) => item.id === props.idUser);
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
                id: props.idUser,
                name: 'Van Hoang',
                message: value,
                role: 'admin',
            });
            // props.setMessages((prev) => [
            //     ...prev,
            //     { message: value, name: 'Van Hoang', role: 'admin', id: props.idUser },
            // ]);
            Helper.handleCreateOrSaveMessage({ message: value.value, name: 'Van Hoang', role: 'admin', id: props.idUser });
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
                <div v-if="props.open" class="content">
                    <div class="header-chat">
                        <div class="info-header">
                            <div class="wrap-img">
                                <img :src="logo" alt="logo shop" />
                            </div>
                            <h3 class="heading">Chat với {{renderMessages[0].name ?? 'Unknown'}}</h3>
                        </div>
                        <div @click="() => props.setOpen(false)" class="close-btn">
                            <BiMinus />
                        </div>
                    </div>
                    <div ref="mesRef" class="messages">
                        <template v-for="(message, index) in renderMessages">
                            <div v-if="message.role === 'admin'" :key="index" class="message getview">
                                <div class="avatar">
                                    <img :src="logo" alt="shop-admin" />
                                </div>
                                <p class="content-message">{{message.message}}</p>
                            </div>
                            <div v-if="message.role === 'user'" :key="index" class="message-2 getview">
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
                                <span class="icons', 'mr-6">
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
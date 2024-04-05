<script setup lang="ts">
import type { TMes } from '@/models/TMes';
import img from '@/assets/images/unknown-user.jpg';
import { onMounted, ref } from 'vue';
import { socketContext, stateEvents } from '@/context/SocketContext';
type T_Props = {
    item: TMes;
    seen: string[];
};

const props = defineProps<T_Props>();
const idChats = ref<any>({})

onMounted(() => {
    if(stateEvents.connected) {
        socketContext.on('connect', () => {
            socketContext.on(`${props.item.id}`, (data) => {
                idChats.value = {
                    ...idChats.value,
                    [`${props.item.id}`]: data,
                }
            });

            socketContext.on('user_sent', (data) => {
                idChats.value = {
                    ...idChats.value,
                    [`${data.id}`]: data,
                }
            });
        });
    }
})
</script>

<template>
    <div class="chat-item">
            <div class="avatar">
                <img :src="img" alt="unknown user" />
                    <div v-if="props.seen.includes(props.item.id ?? '')" class="seen-message">
                        <span>1</span>
                    </div>
            </div>
            <div class="info-user">
                <p class="name-unknown">{{props.item.name ?? 'Unknown'}}</p>
                <p class="noti-mes">
                    {{Object.keys(idChats).length && idChats[`${props.item.id}`]
                        ? idChats[`${props.item.id}`].role === 'admin'
                            ? 'Bạn: ' + idChats[`${props.item.id}`].message
                            : idChats[`${props.item.id}`].message
                        : props.item.message}}
                </p>
            </div>
        </div>
</template>


<style lang="scss" scoped>

    .chat-item {
        display: flex;
        align-items: center;
        padding: 16px;
        background-color: #2a2b36;
        color: #FFF;

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

</style>
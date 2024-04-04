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
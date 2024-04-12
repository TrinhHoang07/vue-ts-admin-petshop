import { App } from '@/const/App';
import { Helper } from '@/helper';
import { io } from 'socket.io-client';
import { reactive } from 'vue';

export const stateEvents = reactive<{
    connected: boolean;
}>({
    connected: false,
});

export const socketContext = io(App.URL_EVENT, {
    timeout: 5000,
    autoConnect: true,
});

socketContext.on('connect', () => {
    stateEvents.connected = true;

            socketContext.on('user_sent', (data) => {
                Helper.handleCreateOrSaveMessage({
                    message: data.message,
                    name: data.name,
                    role: data.role,
                    id: data.id,
                });
            });
});

socketContext.on('disconnect', () => {
    stateEvents.connected = false;
});

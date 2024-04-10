<script lang="ts" setup>
import { ApiService } from '@/axios/ApiService';
import { Form, Input, InputNumber, Modal } from 'ant-design-vue';
import { useToast } from 'primevue/usetoast';
import { ref, watch } from 'vue';

type T_Props = {
    open: any;
    setOpen: (open: boolean) => void;
    setDataSource: Function;
};

const props = defineProps<T_Props>();
const apiService = new ApiService();
const toast = useToast();

const name = ref<string>('');
const password = ref<string>('');
const email = ref<string>('');
const address = ref<string>('');
const gender = ref<string>('');
const phone_number = ref<string>('');
const avatar_path = ref<string>('');
const birth_date = ref<string>('');

watch(props.open, () => {
    name.value = '';
    password.value = '';
    email.value = '';
    address.value = '';
    gender.value = '';
    phone_number.value = '';
    avatar_path.value = '';
    birth_date.value = '';
});

const handleFinish = () => {
    const values = {
        name: name.value,
        password: password.value,
        email: email.value,
        avatar_path: avatar_path.value,
        address: address.value,
        gender: gender.value,
        birth_date: birth_date.value,
        phone_number: phone_number.value,
    };

    apiService.customers
        .createCustomer(values)
        .then((res) => {
            console.log(res);
            if (res.message === 'success') {
                toast.add({
                    severity: 'success',
                    detail: 'Product created successfully',
                    life: 3000,
                });
                props.setDataSource({
                    key: res.data.id,
                    address: res.data.address,
                    avatarPath: res.data.avatar_path,
                    birthDate: res.data.birth_date,
                    email: res.data.email,
                    gender: res.data.gender,
                    name: res.data.name,
                    phoneNumber: res.data.phone_number,
                    id: res.data.id,
                });
                props.setOpen(false);
            }
        })
        .catch((_) => {
            toast.add({
                severity: 'error',
                detail: 'ERROR !!!',
                life: 3000,
            });
        });
};
</script>

<template>
    <Modal
        :open="props.open.val"
        title="Thêm người dùng mới"
        @cancel="() => props.setOpen(false)"
        width="50%"
        okText="Thêm mới"
        @ok="handleFinish"
        forceRender
    >
        <div class="form-container">
            <Form layout="vertical" autoComplete="off" name="add_customer">
                <Form.Item name="name" label="Tên người dùng">
                    <Input v-model:value="name" />
                </Form.Item>
                <Form.Item name="password" label="Mật khẩu">
                    <Input v-model:value="password" />
                </Form.Item>
                <Form.Item name="email" label="Email">
                    <Input v-model:value="email" />
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ">
                    <Input v-model:value="address" />
                </Form.Item>
                <Form.Item name="gender" label="Giới tính">
                    <Input v-model:value="gender" />
                </Form.Item>
                <Form.Item name="phone_number" label="Số điện thoại">
                    <InputNumber v-model:value="phone_number" :style="{ width: '100%' }" />
                </Form.Item>
                <Form.Item name="avatar_path" label="Ảnh đại diện (URL)">
                    <Input v-model:value="avatar_path" />
                </Form.Item>
                <Form.Item name="birth_date" label="Ngày sinh">
                    <Input v-model:value="birth_date" />
                </Form.Item>
            </Form>
        </div>
    </Modal>
</template>

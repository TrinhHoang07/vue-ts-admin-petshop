<script lang="ts" setup>
import { ApiService } from '@/axios/ApiService';
import { Form, Input, InputNumber, Modal } from 'ant-design-vue';
import { useToast } from 'primevue/usetoast';
import { ref, watch, reactive } from 'vue';

type T_Props = {
    open: any;
    setOpen: (open: boolean) => void;
    setDataSource: Function;
};

const props = defineProps<T_Props>();
const apiService = new ApiService();
const toast = useToast();

const errors = reactive<
    | {
          name: boolean;
          email: boolean;
          password: boolean;
          address: boolean;
          gender: boolean;
          phone_number: boolean;
          avatar_path: boolean;
          birth_date: boolean;
      }
    | any
>({
    name: false,
    email: false,
    password: false,
    address: false,
    gender: false,
    phone_number: false,
    avatar_path: false,
    birth_date: false,
});

const REGEXPASS = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const REGEX_EMAIL = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
const REGEX_PHONE = /(|0[3|5|7|8|9])+([0-9]{8})\b/g;

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

const handleError = (name: string) => {
    errors[`${name}`] = true;
};

const handleClearError = (name: string) => {
    errors[`${name}`] = false;
};

const handleFinish = () => {
    if (!name.value.trim()) {
        handleError('name');
    } else {
        handleClearError('name');
    }
    if (!REGEX_EMAIL.test(email.value.trim())) {
        handleError('email');
    } else {
        handleClearError('email');
    }
    if (!REGEXPASS.test(password.value.trim())) {
        handleError('password');
    } else {
        handleClearError('password');
    }
    if (!address.value.trim()) {
        handleError('address');
    } else {
        handleClearError('address');
    }
    if (!REGEX_PHONE.test(phone_number.value.trim())) {
        handleError('phone_number');
    } else {
        handleClearError('phone_number');
    }
    if (!avatar_path.value.trim()) {
        handleError('avatar_path');
    } else {
        handleClearError('avatar_path');
    }
    if (!birth_date.value.trim()) {
        handleError('birth_date');
    } else {
        handleClearError('birth_date');
    }
    if (!gender.value.trim()) {
        handleError('gender');
    } else {
        handleClearError('gender');
    }

    if ((Object as any).entries(errors).every((item: any) => item[1] === false)) {
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
    }
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
                    <Input
                        @input="
                            () => {
                                handleClearError('name');
                            }
                        "
                        v-model:value="name"
                    />
                    <p v-if="errors.name" class="error-field">Trường này là bắt buộc!</p>
                </Form.Item>
                <Form.Item name="password" label="Mật khẩu">
                    <Input
                        @input="
                            () => {
                                handleClearError('password');
                            }
                        "
                        v-model:value="password"
                    />
                    <p v-if="errors.password" class="error-field">
                        Mật khẩu tối thiểu 8 ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt!
                    </p>
                </Form.Item>
                <Form.Item name="email" label="Email">
                    <Input
                        @input="
                            () => {
                                handleClearError('email');
                            }
                        "
                        v-model:value="email"
                    />
                    <p v-if="errors.email" class="error-field">Trường này phải là email!</p>
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ">
                    <Input
                        @input="
                            () => {
                                handleClearError('address');
                            }
                        "
                        v-model:value="address"
                    />
                    <p v-if="errors.address" class="error-field">Trường này là bắt buộc!</p>
                </Form.Item>
                <Form.Item name="gender" label="Giới tính">
                    <Input
                        @input="
                            () => {
                                handleClearError('gender');
                            }
                        "
                        v-model:value="gender"
                    />
                    <p v-if="errors.gender" class="error-field">Trường này là bắt buộc!</p>
                </Form.Item>
                <Form.Item name="phone_number" label="Số điện thoại">
                    <Input
                        @input="
                            () => {
                                handleClearError('phone_number');
                            }
                        "
                        v-model:value="phone_number"
                        :style="{ width: '100%' }"
                    />
                    <p v-if="errors.phone_number" class="error-field">Trường này phải là số điện thoại!</p>
                </Form.Item>
                <Form.Item name="avatar_path" label="Ảnh đại diện (URL)">
                    <Input
                        @input="
                            () => {
                                handleClearError('avatar_path');
                            }
                        "
                        v-model:value="avatar_path"
                    />
                    <p v-if="errors.avatar_path" class="error-field">Trường này là bắt buộc!</p>
                </Form.Item>
                <Form.Item name="birth_date" label="Ngày sinh">
                    <Input
                        @input="
                            () => {
                                handleClearError('birth_date');
                            }
                        "
                        v-model:value="birth_date"
                    />
                    <p v-if="errors.birth_date" class="error-field">Trường này là bắt buộc!</p>
                </Form.Item>
            </Form>
        </div>
    </Modal>
</template>

<style lang="scss" scoped>
.error-field {
    color: red;
}
</style>

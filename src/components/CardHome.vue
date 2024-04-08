<script setup lang="ts">
import { RouterLink } from 'vue-router';

    const props = defineProps<{
        title: string;
    value: number;
    subTitle: string;
    type: string;
    redirect: string;
    }>()
</script>

<template>
    <div class="card-home">
            <div class="container">
                <h3>{{props.title}}</h3>
                <h5>
                    {{props.value}} <span>{{props.type}}</span>
                </h5>
                <p>
                    <span>{{props.subTitle}}</span>
                    <RouterLink :to="props.redirect">Chi tiết</RouterLink>
                </p>
            </div>
        </div>
</template>

<style lang="scss" scoped>
    .card-home {
    flex: 1;
    padding: 0 12px;

    .container {
        min-height: 160px;
        background-color: #312890;
        border-radius: 8px;
        color: #fff;
        padding: 16px;

        h3 {
            font-weight: 500;
            font-size: 1.8rem;
        }

        h5 {
            margin: 16px 0;
            font-size: 3.2rem;

            span {
                font-size: 1.4rem;
                font-weight: 500;
            }
        }

        p {
            font-size: 1.4rem;
            font-weight: 400;
            opacity: 0.75;
            display: flex;
            justify-content: space-between;

            a {
                text-decoration: none;
                color: #fff;
                font-size: 1.2rem;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}

</style>
<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-focus v-model="searchQuery" />
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions" />
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading" />
        <h2 v-else style="color:green">Идет загрузка постов...</h2>
        <div v-view="loadMorePosts" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
                    'current-page': page === pageNumber
                }" @click="changePage(pageNumber)">{{ pageNumber }}</div>
        </div> -->
    </div>
</template>

<script>

import axios from "axios"
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList'
export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            posts: [],
            isPostLoading: true,
            dialogVisible: false,
            selectedSort: "",
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                { value: "title", name: "По названию" },
                { value: "body", name: "По содержанию" },
            ],
            searchQuery: ""
        };
    },

    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        // changePage(pageNumber) {
        //     this.page = pageNumber;

        // },
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPages = Math.ceil(res.headers["x-total-count"] / this.limit);
                this.posts = res.data;
                this.isPostLoading = false;

            } catch (e) {
                alert("Ошибка при загрузке данных")
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1;

                const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPages = Math.ceil(res.headers["x-total-count"] / this.limit);
                this.posts = [...this.posts, ...res.data];


            } catch (e) {
                alert("Ошибка при загрузке данных")
            }
        }

    },
    mounted() {
        this.fetchPosts();

        // inView(".observer")
        //     .on('enter', () => {
        //         if (this.page < this.totalPages) {
        //             this.loadMorePosts()
        //             console.log("Loaded more posts")
        //         }
        //     });

    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        // page() {
        //     this.fetchPosts();
        // }
    }

}
</script>



<style>
.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}

.current-page {
    border: 2px solid green;
}

.observer {
    height: 30px;

}
</style>
<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск" />
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading" />
        <h2 v-else style="color:green">Идет загрузка постов...</h2>
        <div v-view="loadMorePosts" class="observer"></div>

        <h3>{{ }}</h3>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList'
export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            dialogVisible: false,
        };
    },

    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            fetchPosts: 'post/fetchPosts',
            loadMorePosts: 'post/loadMorePosts',
        }),
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
    },
    mounted() {
        this.fetchPosts()
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostLoading: state => state.post.isPostLoading,
            selectedSort: state => state.post.selectedSort,
            page: state => state.post.page,
            searchQuery: state => state.post.searchQuery,
            totalPages: state => state.post.totalPages,
            limit: state => state.post.limit,
            sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    },

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

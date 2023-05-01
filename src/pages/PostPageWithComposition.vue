<template>
    <div>
        <h1>Страница с постами</h1>

        <my-input v-focus v-model="searchQuery" />
        <div class="app__btns">
            <my-button>Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions" />
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form />
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
        <h2 v-else style="color:green">Идет загрузка постов...</h2>

    </div>
</template>

<script>


import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList'
import usePost from '@/hooks/usePost'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'

export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                { value: "title", name: "По названию" },
                { value: "body", name: "По содержанию" },
            ],
        };
    },
    setup(props) {
        const { posts, isPostsLoading, totalPages } = usePost(10);
        const { selectedSort, sortedPosts } = useSortedPosts(posts)
        const { sortedAndSearchedPosts, searchQuery } = useSortedAndSearchedPosts(sortedPosts)

        return {
            posts, isPostsLoading, totalPages, selectedSort, sortedPosts, sortedAndSearchedPosts, searchQuery
        }
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
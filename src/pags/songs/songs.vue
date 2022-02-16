<template>
    <div class="container">
        <!-- 顶部tag标签区域 -->
        <div class="newSongs_header">
            <ul class="clearfix">
                <li
                    :class="[item.value == tag ? 'active' : '']"
                    v-for="item in tags"
                    :key="item.value"
                    @click="tagClick(item.value)"
                >
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <!-- 歌曲列表数据展示区域 -->
        <div class="song_list">
            <songs-list :songs="songs"></songs-list>
        </div>
    </div>
</template>

<script>
import songsList from "../../components/songsList.vue";
import api from "../../api/index";
export default {
    data() {
        return {
            tags: [
                { title: "全部", value: 0 },
                { title: "华语", value: 7 },
                { title: "欧美", value: 96 },
                { title: "日本", value: 8 },
                { title: "韩国", value: 16 },
            ], //tag数据
            tag: 0, //当前选中的tag的值
            songs: [], //音乐列表的数据
        };
    },
    components: {
        songsList,
    },
    methods: {
        // tag标签的点击事件
        tagClick(v) {
            this.tag = v;
            this.getSongs();
        },
        // 获取音乐列表
        getSongs() {
            api.song.topsongs({ type: this.tag }).then((res) => {
                let reslut = res.data;
                reslut.forEach((e) => {
                    e.album.picUrl =
                        e.album.picUrl.replace("http", "https") +
                        "?param=100y100";
                });
                this.songs = reslut;
            });
        },
    },
    created() {
        this.getSongs();
    },
};
</script>

<style scoped>
.active {
    color: #d33a31;
}

.newSongs_header {
    margin-bottom: 30px;
}
.newSongs_header ul li {
    float: left;
    font-size: 20px;
    margin-right: 20px;
    cursor: pointer;
}
</style>
<template>
    <div class="container">
        <!-- 顶部歌单详情信息 -->
        <div
            class="header_msg"
            :style="{ '--bgurl': 'url(' + playListTop.coverImgUrl + ')' }"
        >
            <div class="msg_img">
                <img :src="playListTop.coverImgUrl" alt="" />
            </div>
            <div class="msg_content">
                <div class="content_tag">精品歌单</div>
                <div class="content_text">{{ playListTop.name }}</div>
                <div class="content_describe">
                    {{ playListTop.description }}
                </div>
            </div>
        </div>
        <!-- 导航栏标签 -->
        <div class="nav">
            <ul class="clearfix">
                <li
                    v-for="(item, index) in playlisttags"
                    :key="index"
                    :class="[item.playlistTag.name == cat ? 'active_tag' : '']"
                    @click="tagClick(item.playlistTag.name)"
                >
                    {{ item.playlistTag.name }}
                </li>
            </ul>
        </div>
        <div class="playlists_container">
            <recommen-song-list :songs="playList"></recommen-song-list>
        </div>
        <!-- 底部分页 -->
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
            :page-size="queryInfo.limit"
            :current-page.sync="currentPage"
        >
        </el-pagination>
    </div>
</template>

<script>
import recommenSongList from "../../components/recommenSongList.vue";
import api from "../../api/index";
export default {
    data() {
        return {
            playlisttags: [], //nav歌单分类标签数据
            playListTop: {}, //歌单头部数据
            cat: "全部", //当前选中的tag标签
            playList: [], //歌单列表数据
            queryInfo: {
                cat: "全部",
                limit: 50,
                offset: 0,
            }, //获取歌单列表数据参数
            total: 0, //列表数据总条数
            currentPage: 1, //当前所在页
        };
    },
    components: {
        recommenSongList,
    },
    methods: {
        initPlayList() {
            this.getPlayListTop();
            this.getPlayList();
        },
        // 获取歌单数据
        getPlayListTop() {
            api.playlist
                .playlisttop({ cat: this.cat, limit: 1 })
                .then((res) => {
                    res.playlists[0].coverImgUrl =
                        res.playlists[0].coverImgUrl.replace("http", "https") +
                        "?param=300y300";
                    this.playListTop = res.playlists[0];
                });
        },
        // 获取歌单列表数据
        getPlayList() {
            api.playlist.playlist(this.queryInfo).then((res) => {
                res.playlists.forEach((e) => {
                    e.coverImgUrl =
                        e.coverImgUrl.replace("http", "https") +
                        "?param=300y300";
                });
                let result = res.playlists;
                this.playList = result;
                this.total = res.total;
                console.log(this.total);
            });
        },
        tagClick(cat) {
            this.cat = cat;
            this.queryInfo.cat = cat;
            this.queryInfo.offset = 0;
            this.currentPage = 1;
        },
        handleCurrentChange(i) {
            this.queryInfo.offset = (i - 1) * 50;
            this.getPlayList();
        },
    },
    watch: {
        cat() {
            this.initPlayList();
        },
    },
    created() {
        // 获取所有的歌单标签数据
        api.playlist.playlisttags().then((res) => {
            let reslut = res.tags;
            reslut.unshift({ playlistTag: { name: "全部" } });
            this.playlisttags = reslut;
        });

        // 获取歌单数据
        this.initPlayList();
    },
};
</script>

<style scoped>
.active_tag {
    color: #d33a31;
}
.header_msg {
    display: flex;
    align-items: center;
    position: relative;
    padding: 30px;
    border-radius: 7px;
    background-size: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    font-size: 20px;
    height: 200px;
}
.header_msg ::after {
    content: "";
    background-image: var(--bgurl);
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    border-radius: 7px;
    filter: blur(7px);
    opacity: 0.3;
}

.msg_img {
    /* z-index: 2; */
    width: 200px;
    height: 200px;
    margin-right: 20px;
}
.msg_img img {
    width: 100%;
    height: 100%;
}
.msg_content {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
}
.msg_content .content_tag {
    width: 120px;
    color: #d6a05b;
    border: 1px solid #d6a05b;
    text-align: center;
    padding: 5px 0;
    border-radius: 5px;
}
.msg_content .content_text {
    line-height: 60px;
    color: #fff;
}
.msg_content .content_describe {
    flex: 1;
    font-size: 17px;
    width: 100%;
    line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
}

.nav {
    margin: 50px 0 20px 0;
}
.nav ul li {
    float: left;
    font-size: 20px;
    margin-right: 20px;
    cursor: pointer;
}
</style>
<template>
    <!--发现音乐页  -->
    <div class="container">
        <!--轮播图区域 -->
        <div class="lunbo">
            <el-carousel
                :interval="4000"
                type="card"
                height="200px"
                :autoplay="false"
            >
                <el-carousel-item v-for="(item, index) in banners" :key="index">
                    <el-image :src="item.imageUrl"></el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 推荐歌单 -->
        <div class="recomment_song_list">
            <div class="recomment_title title_text">推荐歌单</div>
            <recomment-song-list :songs="playlist"></recomment-song-list>
        </div>
        <!-- 最新音乐 -->
        <div class="new_songs">
            <div class="title_text">最新音乐</div>
            <div class="new_songs_content">
                <songs-list
                    :songs="newsongs1"
                    :isShow="true"
                    class="songs_content_item"
                ></songs-list>
                <songs-list
                    :songs="newsongs1"
                    :isShow="true"
                    class="songs_content_item"
                ></songs-list>
            </div>
        </div>
        <!-- 推荐mv -->
        <div class="recomment_mv">
            <div class="title_text">推荐MV</div>
            <recomment-mv :mvs="recommentMv"></recomment-mv>
        </div>
    </div>
</template>

<script>
import recommentSongList from "../../components/recommenSongList.vue";
import songsList from "../../components/songsList.vue";
import recommentMv from "../../components/recommentMv.vue";
import api from "../../api/index";
export default {
    data() {
        return {
            banners: [], //轮播图数据
            playlist: [], //推荐歌单数据
            newsongs1: [],
            newsongs2: [],
            recommentMv: [], //推荐mv数据
        };
    },
    components: {
        recommentSongList,
        songsList,
        recommentMv,
    },
    methods: {
        send() {},
    },
    created() {
        // 获取banner数据
        api.song.banner().then((res) => {
            res.banners.forEach((e) => {
                e.imageUrl =
                    e.imageUrl.replace("http", "https") + "?param=250y700";
            });
            // console.log(res.banners);
            this.banners = res.banners;
        });

        // 获取推荐歌单数据
        api.playlist
            .personalized({ limit: 10 })
            .then((res) => {
                res.result.forEach((e) => {
                    e.picUrl = e.picUrl + "?param=300y300";
                });
                this.playlist = res.result;
            })
            .catch((err) => {
                console.log(err);
            });

        // 获取推荐最新音乐
        api.song.newsong({ limit: 5 }).then((res) => {
            let result = res.result;
            result.forEach((e) => {
                e.picUrl = e.picUrl.replace("http", "https") + "?param=100y100";
            });
            this.newsongs1 = result;
        });

        // 获取推荐mv
        api.mv.personalizedMv().then((res) => {
            res.result.forEach((e) => {
                e.picUrl = e.picUrl + "?param=280y150";
            });
            this.recommentMv = res.result;
        });
    },
};
</script>

<style scoped>
.el-carousel__item {
    border-radius: 7px;
}
.title_text {
    margin: 20px 0;
    font-size: 30px;
}
.new_songs_content {
    display: flex;
    margin-bottom: 40px;
}
.songs_content_item {
    flex: 50%;
}
</style>
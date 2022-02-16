<template>
    <!-- 音乐列表 -->
    <div class="songs_list_container">
        <div class="song_item" v-for="(item, index) in songs" :key="index">
            <div class="item_index">{{ ++index }}</div>
            <div class="item_img">
                <el-image :src="item.picUrl || item.album.picUrl" lazy>
                    <span class="demonstration">默认</span></el-image
                >
                <!-- <img src="../assets/logo.png" alt="" /> -->
            </div>
            <div class="item_msg" v-if="isShow">
                <div class="name">{{ item.name }}</div>
                <div class="singer">
                    {{ item.song.artists[0].name }}
                </div>
            </div>
            <div class="item_msg2" v-if="!isShow">
                <div class="name">{{ item.name }}</div>
                <div class="singer">{{ item.album.artists[0].name }}</div>
                <div class="album_name">{{ item.album.name }}</div>
                <div class="time">{{ item.lMusic.playTime | formatTime }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["songs", "isShow"],
};
</script>

<style scpoed>
.song_item {
    display: flex;
    align-items: center;
    height: 100px;
    /* font-size: 20px; */
    cursor: pointer;
}
.song_item:hover {
    background-color: #f5f5f5;
}
.song_item .item_index {
    width: 50px;
    text-align: center;
}
.song_item img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
}
.item_msg {
    flex: 1;
    /* width: 100%; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.item_msg .name,
.item_msg .singer {
    line-height: 40px;
    margin-left: 15px;
}
.item_msg2 {
    width: 100%;
    display: flex;
}
.item_msg2 .name {
    margin-left: 30px;
}
.item_msg2 > div {
    width: calc(30% - 30px);
    line-height: 40px;
    margin-right: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.item_msg2 > .time {
    width: 10%;
    margin-right: 10px;
}
</style>
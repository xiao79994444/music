<template>
    <!-- 推荐mv -->
    <div class="recommenmv_container">
        <div class="recomment_item" v-for="(item, index) in mvs" :key="index">
            <div class="item_img">
                <el-image
                    :src="item.picUrl || item.cover"
                    alt=""
                    lazy
                ></el-image>
                <div class="playCount">
                    <span class="iconfont icon-fangxiangsanjiao-xiangyou"></span
                    >{{ item.playCount | formatCount }}
                </div>
                <div class="playTime">{{ item.duration | formatTime }}</div>
            </div>
            <div class="text">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["mvs"],
};
</script>

<style scoped>
.recommenmv_container {
    display: flex;
    flex-wrap: wrap;
}
.recomment_item {
    width: calc(25% - 20px);
    margin-bottom: 30px;
    margin-right: 20px;
    cursor: pointer;
}
.item_img {
    position: relative;
}
.item_img .el-image {
    width: 100%;
    height: 150px;
    border-radius: 5px;
}
.playCount {
    color: #fff;
    position: absolute;
    top: 5px;
    right: 5px;
}
.playTime {
    color: #fff;
    position: absolute;
    bottom: 10px;
    right: 10px;
}
.recomment_item .text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 20px;
    line-height: 36px;
}
.recomment_item .singer {
    font-size: 16px;
    color: #bec4d5;
}
</style>
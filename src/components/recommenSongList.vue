<template>
    <div class="recomment_container">
        <div class="recomment_item" v-for="(item, index) in songs" :key="index">
            <el-image
                :src="item.picUrl || item.coverImgUrl"
                alt=""
                lazy
            ></el-image>
            <div class="text">{{ item.name }}</div>
            <div class="playCount">
                <span class="iconfont icon-fangxiangsanjiao-xiangyou"></span
                >{{ item.playCount | formatCount }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["songs"],
};
</script>

<style scoped>
.recomment_container {
    display: flex;
    /* justify-content: space-evenly; */
    flex-wrap: wrap;
    font-size: 16px;
    width: 100%;
}
.recomment_item {
    width: calc(20% - 15px);
    height: 230px;
    margin-right: 15px;
    margin-bottom: 70px;
    cursor: pointer;
    position: relative;
}
.recomment_item .el-image {
    width: 100%;
    /* height: 100%; */
    border-radius: 7px;
}
.recomment_item .text {
    width: 100%;
    /* width: 200px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 20px;
    /* margin-bottom: 60px; */
}
.playCount {
    color: #fff;
    position: absolute;
    top: 5px;
    right: 5px;
}
</style>
<template>
    <div class="container">
        <!-- 顶部标签选项区域 -->
        <div class="mv_header">
            <!-- 地区 -->
            <div class="area">
                <div class="title">地区:</div>
                <div class="nav">
                    <ul class="chearfix">
                        <li
                            v-for="(item, index) in areas"
                            :key="index"
                            :class="[item == queryInfo.area ? 'active' : '']"
                            @click="areaTagClick(item)"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 类型 -->
            <div class="type">
                <div class="title">类型:</div>
                <div class="nav">
                    <ul class="chearfix">
                        <li
                            v-for="(item, index) in types"
                            :key="index"
                            :class="[item == queryInfo.type ? 'active' : '']"
                            @click="typeTagClick(item)"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 排序 -->
            <div class="order">
                <div class="title">排序:</div>
                <div class="nav">
                    <ul class="chearfix">
                        <li
                            v-for="(item, index) in orders"
                            :key="index"
                            :class="[item == queryInfo.order ? 'active' : '']"
                            @click="orderTagClick(item)"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- mv列表数据展示区域 -->
        <div class="mv_list">
            <recommentMV :mvs="mvs"></recommentMV>
        </div>
        <!-- 底部分页区域 -->
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
import recommentMV from "../../components/recommentMv.vue";
import api from "../../api/index";
export default {
    data() {
        return {
            areas: ["全部", "内地", "港台", "欧美", "日本", "韩国"], //地区
            types: ["全部", "官方版", "原生", "现场版", "网易出品"], //类型
            orders: ["上升最快", "最热", "最新"], //排序
            mvs: [], //mv列表数据
            queryInfo: {
                area: "全部",
                type: "全部",
                order: "上升最快",
                limit: 40,
                offset: 0,
            },
            total: 50, //mv总数
            currentPage: 1, //当前所在页
        };
    },
    components: { recommentMV },

    methods: {
        areaTagClick(tag) {
            this.queryInfo.area = tag;
            this.queryInfo.offset = 0;
            this.currentPage = 1;
            this.getMvs();
        },
        typeTagClick(tag) {
            this.queryInfo.type = tag;
            this.queryInfo.offset = 0;
            this.currentPage = 1;
            this.getMvs();
        },
        orderTagClick(tag) {
            this.queryInfo.order = tag;
            this.queryInfo.offset = 0;
            this.currentPage = 1;
            this.getMvs();
        },
        // 分页改变
        handleCurrentChange(i) {
            this.queryInfo.offset = (i - 1) * 50;
            this.getMvs();
        },
        // 获取mv列表数据
        getMvs() {
            api.mv.mvall(this.queryInfo).then((res) => {
                res.count && (this.total = res.count);
                let result = res.data;
                result.forEach((e) => {
                    if (e.cover) {
                        e.cover =
                            e.cover.replace("http", "https") + "?param200y200";
                    }
                });
                console.log(result);
                this.mvs = result;
            });
        },
    },
    created() {
        this.getMvs();
    },
};
</script>

<style scpoed>
.active {
    color: #d33a6a;
}
.mv_header > div {
    display: flex;
    font-size: 16px;
    margin: 10px 0;
}
.nav {
    margin-left: 30px;
}
.nav ul li {
    display: inline-block;
    padding: 0 20px;
    cursor: pointer;
}
.mv_list {
    margin-top: 20px;
}
</style>
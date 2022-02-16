<template>
    <div class="container">
        <el-container>
            <!-- 顶部区域 -->
            <el-header>
                <!-- 顶部logo -->
                <div class="header_logo">
                    <img
                        src="../../assets/logo.png"
                        alt=""
                        width="200px"
                        height="50px"
                    />
                </div>
                <!-- 顶部搜索框 -->
                <div class="seach_input">
                    <el-input
                        class="header_input"
                        v-model="header_input"
                        placeholder="搜索"
                        prefix-icon="el-icon-search"
                        size="small"
                    ></el-input>
                </div>
                <!-- 顶部用户信息（头像） -->
                <div class="user">
                    <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    ></el-avatar>
                </div>
                <!-- 退出登录按钮 -->
                <div class="logOut">
                    <el-button size="small">退出</el-button>
                </div>
            </el-header>
            <el-main class="main_box">
                <el-container>
                    <!-- 侧边栏 -->
                    <el-aside width="200px">
                        <el-menu
                            default-active="/discovery"
                            background-color="#ededed"
                            text-color="#000"
                            active-text-color="#d33a31"
                            router
                        >
                            <el-menu-item
                                v-for="(item, index) in pages"
                                :key="index"
                                :index="item.path"
                            >
                                <i :class="item.icon"></i>
                                <span slot="title">{{ item.title }}</span>
                            </el-menu-item>
                        </el-menu>
                    </el-aside>
                    <el-main class="main_content">
                        <router-view></router-view>
                    </el-main>
                    <el-backtop target=".main_content"></el-backtop>
                </el-container>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            header_input: "", //顶部输入框的值
            pages: [
                { icon: "el-icon-menu", title: "发现音乐", path: "/discovery" },
                { icon: "el-icon-menu", title: "推荐歌单", path: "/playlists" },
                { icon: "el-icon-menu", title: "最新音乐", path: "/songs" },
                { icon: "el-icon-menu", title: "最新mv", path: "/mvs" },
            ],
        };
    },
    methods: {},
    created() {
        console.log(1111);
    },
};
</script>

<style scoped>
.el-container {
    height: 100%;
}
.el-header {
    height: 50px;
    background-color: #f9f9f9;
    display: flex;
    align-items: center;
}

.seach_input {
    flex: 1;
    margin-left: 30px;
}
.logOut {
    margin: 20px;
}
.el-menu {
    height: 100%;
}
</style>
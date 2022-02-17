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
                <div class="user" @click="dialogVisible = true">
                    <el-avatar
                        icon="el-icon-user-solid"
                        :src="userUrl"
                    ></el-avatar>
                </div>
                <!-- 退出登录按钮 -->
                <div class="logOut">
                    <el-button type="primary" size="small">退出</el-button>
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
                    <el-backtop
                        target=".main_content"
                        bottom="100"
                    ></el-backtop>
                </el-container>
            </el-main>
            <el-footer>
                <!-- 播放进度条 -->
                <div class="progress_bar">
                    <el-slider id="slider" v-model="sliderValue"></el-slider>
                </div>

                <div class="footer_container">
                    <!-- 右边歌曲信息 -->
                    <div class="song">
                        <div class="song_img">
                            <img src="../../assets/logo.png" alt="" />
                        </div>
                        <div class="song_msg">
                            <div class="name">歌名 歌手</div>
                            <div class="time">时间</div>
                        </div>
                    </div>
                    <!-- 中间控制按钮 -->
                    <div class="play">
                        <div class="last">
                            <span class="iconfont icon-shangyishou icon"></span>
                        </div>
                        <div class="pause">
                            <span
                                v-if="!isPlay"
                                class="iconfont icon-24gf-play icon"
                                @click="togglePaly"
                            ></span>
                            <span
                                v-else
                                class="iconfont icon-bofangzanting icon"
                                @click="togglePaly"
                            ></span>
                        </div>
                        <div class="next">
                            <span
                                class="iconfont icon-shangyishou1 icon"
                            ></span>
                        </div>
                    </div>
                    <!-- 右边控制按钮 -->
                    <div class="btns">
                        <div class="volume">
                            <el-popover
                                placement="right"
                                width="50"
                                trigger="click"
                            >
                                <el-slider
                                    id="volumeSlider"
                                    v-model="volumeValue"
                                ></el-slider>
                                <span
                                    slot="reference"
                                    class="iconfont icon-24gl-volumeMiddle icon"
                                ></span>
                            </el-popover>
                        </div>
                        <div class="play_way">
                            <span class="iconfont icon-suijibofang icon"></span>
                            <!-- <span class="iconfont icon-danquxunhuan icon"></span> -->
                            <!-- <span class="iconfont icon-shunxubofang icon"></span> -->
                        </div>
                        <div class="play_list">
                            <span
                                class="iconfont icon-bofangliebiao icon"
                                @click="drawer = true"
                            ></span>
                        </div>
                    </div>
                </div>
            </el-footer>
        </el-container>

        <!-- 登录弹框 -->
        <el-dialog
            title="登录"
            :visible.sync="dialogVisible"
            width="380px"
            @close="dialogClose"
            :closeOnClickModal="false"
        >
            <div class="login">
                <el-form
                    :model="loginForm"
                    :rules="loginRules"
                    ref="loginRef"
                    class="demo-ruleForm"
                >
                    <el-form-item prop="phone">
                        <el-input
                            v-model="loginForm.phone"
                            prefix-icon="el-icon-user"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="loginForm.password"
                            prefix-icon="el-icon-unlock"
                            show-password
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" id="loginBtn" @click="loginBtn"
                    >登录</el-button
                >
                <div class="login_footer">
                    <el-checkbox v-model="checked" id="checkbox"
                        >同意</el-checkbox
                    >
                    <span class="clause">《服务条款》</span>
                    <span class="clause">《隐私政策》</span>
                    <span class="clause">《儿童隐私政策》</span>
                </div>
            </div>
        </el-dialog>
        <!-- 歌单列表弹窗 -->
        <el-drawer
            title="我是标题"
            :modal="false"
            :visible.sync="drawer"
            :show-close="false"
            direction="rtl"
        >
            <div class="drawer_content">
                <ul>
                    <li
                        v-for="(item, index) in songs"
                        :key="index"
                        :class="[index % 2 == 0 ? 'li_bgc' : '']"
                    >
                        <div class="name">{{ item.name }}</div>
                        <div class="singer">{{ item.singer }}</div>
                        <div class="time">{{ item.time }}</div>
                    </li>
                </ul>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import api from "../../api/index";
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
            dialogVisible: false, //登录对话框的状态
            loginForm: {
                phone: "",
                password: "",
            }, //登录表单信息
            loginRules: {
                phone: [
                    {
                        required: true,
                        message: "请输入账号",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 15,
                        message: "长度在 6 到 15 个字符",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        min: 8,
                        max: 15,
                        message: "长度在 8到 15 个字符",
                        trigger: "blur",
                    },
                ],
            }, //登录表单校验规则
            checked: false, //是否同意条款
            userUrl: "", //头像地址
            sliderValue: 0, //进度条的值
            volumeValue: 0, //音量的值
            isPlay: false, //音乐是否播放
            drawer: false, //右侧歌单列表弹出框
            songs: [
                {
                    name: "歌名",
                    singer: "歌手",
                    time: "04:25",
                },
                {
                    name: "歌名",
                    singer: "歌手",
                    time: "04:25",
                },
            ],
        };
    },

    methods: {
        // 监听登录对话框的关闭
        dialogClose() {
            this.$refs.loginRef.resetFields();
        },
        // 登录按钮
        loginBtn() {
            if (!this.checked) {
                this.$message.error(
                    "请先勾选《服务条款》《隐私政策》《儿童隐私政策》"
                );
            } else {
                this.$refs.loginRef.validate((valid) => {
                    if (valid) {
                        // 发送登录请求
                        api.user.login(this.loginForm).then((res) => {
                            console.log(res.code);
                            if (res.code == 200) {
                                this.userUrl = res.profile.avatarUrl;
                                window.localStorage.setItem("token", res.token);
                                this.dialogVisible = false;
                            } else {
                                this.$message.error(res.message);
                            }
                        });
                    } else {
                        this.$message.error("密码或账号错误");
                    }
                });
            }
        },
        // 切换播放状态
        togglePaly() {
            this.isPlay = !this.isPlay;
        },
    },
    created() {},
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
#loginBtn {
    width: 100%;
    color: #fff;
    margin: 20px 0;
}
.login_footer {
    display: flex;
    justify-content: space-around;
}
.clause {
    color: #507daf;
}
.clause:hover {
    cursor: pointer;
}

.footer_container {
    display: flex;
    align-items: center;
    /* line-height: 97px; */
    height: 100%;
    padding: 20px 20px;
    box-sizing: border-box;
}
.footer_container .song {
    display: flex;
    width: 20%;
}
.song .song_img {
    position: relative;
    width: 60px;
    height: 60px;
    border: 1px solid red;
    border-radius: 7px;
}
.song .song_img img {
    width: 100%;
    height: 100%;
}
.song .song_msg {
    margin-left: 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 22px;
}
.song_msg > div:nth-child(1) {
    line-height: 30px;
}
.song_msg > div:nth-child(2) {
    font-size: 16px;
}
.footer_container .play {
    flex: 1;
    display: flex;
    justify-content: center;
    height: 100%;
}

.footer_container .play .icon {
    font-size: 25px;
    text-align: center;
    line-height: 60px;
}
.pause {
    position: relative;
    background-color: #f4f4f4;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    margin: 0 20px;
}
.footer_container .play .pause .icon {
    font-size: 40px;
    position: absolute;
    top: 0;
    left: 2px;
    right: 0;
    bottom: 0;
    margin: auto;
}
.footer_container .btns {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btns .icon {
    font-size: 30px;
}
.btns .play_way {
    margin: 0 30px;
}
.drawer_content ul li {
    display: flex;
    padding: 0 50px;
    height: 35px;
    line-height: 35px;
    color: #939393;
}
.drawer_content ul li:hover {
    color: #000;
    background-color: #f5f5f5;
}
li .name {
    width: 40%;
}
li .singer {
    margin: 0 20px;
    flex: 1;
}
li .time {
    width: 5%;
}
.li_bgc {
    background-color: #fafafa;
}
</style>
<template>
  <!-- 引入布局，竟然不允许有div -->
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header class="el-header">
      <div>
        <img src="../assets/logo.png" alt />
      </div>
      <span>xxx平台</span>
      <div>
        <el-button type="info" @click="logout">安全退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="el-aside" width="200px">
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :router="true"
        >
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="subItem.path"
              v-for="subItem in item.subMenuList"
              :key="subItem.id"
              @click="changeActivePath(subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ subItem.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 菜单列表
      menuList: [],
      // 侧边菜单伸缩
      isCollapse: false,
      // 侧边菜单开启的页面路径
      activePath: '/user'
    };
  },
  created() {
    // 查询侧边栏菜单
    this.getMenuList();
    // 获取侧边栏菜单默认打开的页面路径
    this.activePath = window.sessionStorage.getItem('activePath');
  },

  methods: {
    // 安全退出按钮方法
    logout() {
      window.sessionStorage.clear(); // 清除session
      this.$router.push("/login"); // 跳转登录页
    },

    // 查询侧边栏菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.status == "error") {
        return this.$message.error("菜单加载失败");
      }
      this.menuList = res.menus;
    },

    // 侧边栏菜单点击事件
    changeActivePath(path) {
      this.activePath = path;
      window.sessionStorage.setItem('activePath', path);
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
// 头部
.el-header {
  height: 200px;
  padding-left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  background-color: #545c64;
  img {
    width: 50px;
    height: 50px;
  }
}
// 侧边栏
.el-aside {
  .el-menu-vertical-demo {
    height: 100%;
    border-right: none;
  }
}
// 主体
.el-main {
  
}
</style>
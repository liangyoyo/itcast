<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <!-- default-active 当前激活菜单的 index -->
        <!-- collapse 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） -->
        <!-- 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu
          :collapse='iscollapse'
          :router='true'
          :unique-opened='true'
          :default-active= "'1-3'"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/home/users">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/home/roles">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/rights">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="toggle-btn myicon myicon-menu" @click="iscollapse=!iscollapse"></span>
          <span class="system-title">电商后台管理系统</span>
          <a href="/login" class="exit">退出</a>
        </el-header>
        <el-main>
           <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      iscollapse: false
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .exit{
    color: white;
  }
}
</style>

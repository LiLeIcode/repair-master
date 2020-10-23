<template>
  <div class="home">
    <!-- 导航栏菜单部分 -->
    <el-container>
      <el-header>
        <div class="grid-content bg-purple-dark">
          <img src="//game.gtimg.cn/images/lol/v3/logo-public.png" alt />
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            v-for="menu in menuList"
            :key="menu.id"
            router
            active-text-color="#4D94DD"
          >
            <el-menu-item
              :index="'/'+i.path"
              v-for="i in menu"
              :key="i.id"
              @click="saveNavState('/'+i.path)"
            >
              <template>
                <i class="el-icon-menu"></i>
                <span slot="title">{{i.menuName}}</span>
              </template>
</el-menu-item>
</el-menu>
</div>
<el-button type="warning" round @click="logout()">退出</el-button>
</el-header>
<el-main>
    <router-view></router-view>
</el-main>
<el-footer style="height:70px">
    <el-row :gutter="20" style="margin-top:3px;margin-left:44%">
        <el-col :span="10">
            <span>联系邮箱:2424117373@qq.com</span>
        </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-left:44%;">
        <el-col :span="10">
            <a href="https://github.com/LiLeIcode/SchoolRepairSystem.Core.git">下载后端源码</a>
            <a href="https://github.com/LiLeIcode/repair-master.git">下载前端源码</a>
        </el-col>
    </el-row>
</el-footer>
</el-container>
</div>
</template>
<script>
    export default {
        data() {
            return {
                menuList: [],
                activeIndex: ""
            };
        },
        created() {
            this.activeIndex = window.sessionStorage.getItem("activeIndex");
        },
        mounted() {
            this.getMenus();
        },
        methods: {
            saveNavState(param) {
                window.sessionStorage.setItem("activeIndex", param);
                this.activeIndex = param;
            },
            logout() {
                window.sessionStorage.clear();
                this.$router.push("/Login");
            },
            async getMenus() {
                const {
                    data: res
                } = await this.$http.get(
                    "http://localhost:5000/api/Menu/menu"
                );
                console.log(res);
                if (res.status != 200) {
                    return this.$message.error("获取菜单失败");
                } else {
                    this.menuList.push(res.responseInfo);
                    console.log(this.menuList);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    a {
        text-decoration: none;
        color: #570404;
        background-color: rgba(150, 150, 150, 0.5);
        border-radius: 30px;
        border: 1px solid #888;
        padding: 2px;
    }
    
    .el-header {
        //background-color: #b3c0d1;
        color: #333;
        //text-align: center;
        //line-height: 60px;
    }
    
    .el-footer {
        background-color: #b3c0d1;
    }
    
    .el-header {
        .el-button {
            float: right;
            margin-top: 10px;
        }
    }
    
    .el-aside {
        background-color: #d3dce6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    
    .el-main {
        background-color: #e9eef3;
        color: #333;
        text-align: center;
        line-height: 40px;
    }
    
    body>.el-container {
        margin-bottom: 40px;
    }
    
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    
    .el-col {
        border-radius: 4px;
    }
    
    .bg-purple-dark {
        background: #99a9bf;
    }
    
    .bg-purple {
        background: #d3dce6;
    }
    
    .bg-purple-light {
        background: #e5e9f2;
    }
    
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        display: inline;
        img {
            float: left;
            margin-left: 20px;
        }
        /deep/.el-menu {
            float: left;
            margin-left: 100px;
        }
    }
    
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
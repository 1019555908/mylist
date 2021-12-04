<template>
  <div>
    <div>
      <div id="left">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          :collapse="isCollapse" background-color="#263445" text-color="#fff" active-text-color="#ffd04b">
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">首页</el-menu-item>
              <el-menu-item index="1-2">运营位管理</el-menu-item>
              <el-menu-item index="1-3">会员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-submenu index="1-4">
              <span slot="title">商品管理</span>
              <el-menu-item index="1-4-1">商品管理</el-menu-item>
            </el-submenu>
          </el-submenu> -->
          <!-- <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
           -->
          <!-- <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item> -->
          <div>
            <div>
              <el-submenu :index="item.path" v-for="(item,index) in ruteslist" :key="index">
                <span slot="title">{{item.title}}</span>
                <el-menu-item :index="childname" v-for="(childname,index) in item.rows" :key="index"
                  @click="routechange(childname.path)">{{childname.names}}
                </el-menu-item>
              </el-submenu>
            </div>
            <!-- <el-submenu index="1-4">
              <span slot="title">商品管理</span>
              <el-menu-item index="1-4-1">商品管理</el-menu-item>
              <el-menu-item index="1-4-2">商品管理2</el-menu-item>
              <el-menu-item index="1-4-3">商品管理3</el-menu-item>
            </el-submenu> -->
            <!-- <sidebar-item v-for="route in prod_permission_routes" :key="route.menuId" :item="route"
              :base-path="route.path" /> -->
          </div>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MylistIndexleft',

  data() {
    return {
      arrlist: [],
      isCollapse: false,
      prod_permission_routes: [
        { menuId: '123', path: '123' },
        { menuId: '1234', path: '1234' },
        { menuId: '1235', path: '1235' },
      ],
      ruteslist: [
        {
          title: '商品管理',
          menuId: '123',
          path: '/benlaiweb/vipuser',
          nametext: '商品管理1',
          rows: [
            { names: '商品管理2', path: '/benlaiweb/vipuser' },
            { names: '商品管理1', path: '/benlaiweb/vipuser' },
          ],
        },
        {
          title: '会员',
          menuId: '1234',
          path: '/',
          nametext: '商品管理2',
          rows: [
            { names: '会员1', path: '/benlaiweb/memberCenter/vipuser' },
            { names: '会员管理', path: '/benlaiweb/memberCenter/memberManagement' },
          ],
        },
        {
          title: '卡券',
          menuId: '1235',
          path: '1235',
          nametext: '商品管理3',
          rows: [
            { names: '卡券', path: '/benlaiweb/vipuser' },
            { names: '卡券2', path: '/benlaiweb/vipuser' },
          ],
        },
      ],
    }
  },

  mounted() {},

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    routechange(url) {
      console.log(url)
      this.$router.push(url)
    },
  },
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  min-height: 400px;
}
#left {
  width: 160px;
  height: 100%;
}
::v-deep .el-submenu .el-menu-item {
  min-width: 160px;
}
</style>
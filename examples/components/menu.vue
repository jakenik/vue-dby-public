<template lang="html">
  <div class="menu-model" v-if="routes">
    <el-menu
      default-active="1"
      :unique-opened="false"
      :default-openeds="['1', '2', '3']"
      :default-active="defaultActive"
      :router="true"
    >
    <div v-for="(item, index) in routes" :key="item.name">
      <el-submenu :index="item.name" v-if="item.name && item.children">
        <template slot="title">
          <i :class="item.icon" v-if="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group v-if="!item.group">
          <el-menu-item :index="item.path + '/' + citem.path" v-for="(citem, cindex) in item.children" :key="citem.name">
            {{citem.name}}
          </el-menu-item>
        </el-menu-item-group>
        <div v-else>
          <el-menu-item-group v-for="(citem) in item.children" :key="citem.name" :title="citem.name">
            <el-menu-item :index="item.path + '/' + citem.path + '/' + sitem.path" v-for="(sitem) in citem.children" :key="sitem.name">
              {{sitem.name}}
            </el-menu-item>
          </el-menu-item-group>
        </div>
      </el-submenu>
      <el-menu-item :index="item.path" v-else-if="item.name">
        <i :class="item.icon" v-if="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '/guide/install',
      routes: null
    }
  },
  mounted() {
    let routes = this.$router.options.routes
    this.routes = routes
  }
}
</script>

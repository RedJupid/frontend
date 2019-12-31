<template>
  <div style="height: 100%">
  <a-layout id="components-layout-demo-custom-trigger" :style="{height:'100%'}">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" :style="{background:'#fff'}">
      <div class="logo">
        <img src="../../src/assets/logo.png" style="height:100%">
      </div>
      <a-menu
              mode="inline"
              :defaultSelectedKeys="['1']"
              :defaultOpenKeys="['sub1']"
              :style="{ borderRight: 0}"
      >
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" />系统管理</span>
          <a-menu-item key="1"><router-link to="/user">用户管理</router-link></a-menu-item>
          <a-menu-item key="2"><router-link to="/role">角色管理</router-link></a-menu-item>
          <a-menu-item key="3"><router-link to="/menu">菜单管理</router-link></a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="laptop" />subnav 2</span>
          <a-menu-item key="5">option5</a-menu-item>
          <a-menu-item key="6">option6</a-menu-item>
          <a-menu-item key="7">option7</a-menu-item>
          <a-menu-item key="8">option8</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="notification" />subnav 3</span>
          <a-menu-item key="9">option9</a-menu-item>
          <a-menu-item key="10">option10</a-menu-item>
          <a-menu-item key="11">option11</a-menu-item>
          <a-menu-item key="12">option12</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; height: 50px; line-height: 50px">
        <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content
              :style="{ margin: '5px', padding: '5px', background: '#fff'}"
      >
        <router-view/>
      </a-layout-content>

<!--      <a-layout-footer style="text-align: center; padding:5px 5px">-->
<!--        Ant Design ©2018 Created by Ant UED-->
<!--      </a-layout-footer>-->
    </a-layout>
  </a-layout>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        collapsed: false,
      };
    },
  };
</script>
<style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 50px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }


</style>

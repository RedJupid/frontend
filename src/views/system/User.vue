<template>
  <div>
    用户管理
  <a-table :columns="columns" :dataSource="data">
    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
<!--    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>-->
    <span slot="status" slot-scope="status">
      <a-tag
              :color="status==='可用' ? 'green' : 'red'"
              :key="status"
      >
        {{status}}
      </a-tag>
    </span>
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;">Invite 一 {{record.name}}</a>
      <a-divider type="vertical" />
      <a href="javascript:;">Delete</a>
      <a-divider type="vertical" />
      <a href="javascript:;" class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
    </span>
  </a-table>
  </div>
</template>
<script>
  const columns = [
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' },
    },
    {
      title: 'Action',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    },
  ];
  const data = [];

  export default {
    data() {
      return {
        data,
        columns,
      };
    },
    created() {
      this.axios.get('/sys/user/list').then(res=>{
        console.log(res.data);
        this.data = res.data;
      })
    }
  };
</script>

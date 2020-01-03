<template>
  <div>
    用户管理
    <a-row>
      <a-col :span="20">
        <a-form layout="inline">
          <a-form-item label="姓名">
            <a-input v-model="page.username"/>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="4">
        <a-button @click="getByPage(1)">
          <a-icon type="search" />
        </a-button>
      </a-col>
    </a-row>



  <a-table :columns="columns" :dataSource="records" :pagination="false" :rowKey="record=>record.id">
    <span slot="status" slot-scope="status">
      <a-tag
              :color="status==='可用' ? 'green' : 'red'"
              :key="status"
      >
        {{status}}
      </a-tag>
    </span>
    <span slot="action" slot-scope="text">
      <span style="cursor:pointer; margin-left: 6px; padding: 5px; color: #84cf46"><a-icon type="eye"/></span>
      <span style="cursor:pointer; margin-left: 6px; padding: 5px; color: #1890ff"><a-icon type="edit"/></span>
      <span style="cursor:pointer; margin-left: 6px; padding: 5px; color: #f5626a"><a-icon type="delete" /></span>
    </span>
  </a-table>
    <div style="margin-top: 10px; float: right">
      <a-pagination showQuickJumper :pageSize="page.size" :defaultCurrent="1" :total="page.total" @change="getByPage" :showTotal="total => `Total ${total} items`" />
    </div>
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
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    },
  ];
  const records = [];
  const page = {
    current:1,
    size:3,
    total:0,
    username: ""
  };

  export default {
    data() {
      return {
        records,
        columns,
        current:1,
        page
      };
    },
    methods:{
      // onChange(current) {
      //   this.getByPage(current, this.page.size, this.page.username);
      // },
      getByPage(current){
        this.axios.get('/sys/user/getByPage', {
          params: {
            current: current,
            size: this.page.size,
            username: this.page.username
          }
        }).then(res=>{
          let data = res.data.data;
          console.log(data);
          this.records = data.records;
          this.page.total = data.total;
          this.page.current = data.current;
          // this.data = data;
        })
      }
    },
    created() {
      this.getByPage(1);
    }
  };
</script>

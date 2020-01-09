<template>
  <div>
    角色管理
    <a-row>
      <a-col :span="12">
        <a-table :columns="columns" :dataSource="records" :pagination="false" :rowKey="record=>record.id" :customRow="onSelectRow">
          <span slot="status" slot-scope="status">
            <a-tag
              :color="status==='可用' ? 'green' : 'red'"
              :key="status"
            >
              {{status}}
            </a-tag>
          </span>
          <span slot="action" slot-scope="text">
<!--            <span style="cursor:pointer; margin-left: 6px; padding: 5px; color: #84cf46"><a-icon type="eye"/></span>-->
<!--            <span style="cursor:pointer; margin-left: 6px; padding: 5px; color: #1890ff"><a-icon type="edit"/></span>-->
            <span style="cursor:pointer; margin-left: 6px; padding: 5px; color: #f5626a"><a-icon type="delete" /></span>
          </span>
        </a-table>
        <div style="margin-top: 10px; float: right">
          <a-pagination showQuickJumper :pageSize="page.size" :defaultCurrent="1" :total="page.total" @change="getByPage" :showTotal="total => `Total ${total} items`" />
        </div>
      </a-col>
      <a-col :span="12">
        <a-form :form="form">
          <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-decorator="['id']" :disabled="true" />
          </a-form-item>
          <a-form-item label="角色名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-decorator="['name']"/>
          </a-form-item>
          <a-form-item label="角色描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-decorator="['remark']"/>
          </a-form-item>
<!--          <a-form-item>-->
<!--            <a-button type="primary" @click="updateMenu" v-show="selectPage.update">更新</a-button>-->
<!--            <a-button type="primary" @click="addMenu" v-show="selectPage.add">添加</a-button>-->
<!--          </a-form-item>-->
        </a-form>
        <a-tree
                checkable
                @expand="onExpand"
                :expandedKeys="expandedKeys"
                :autoExpandParent="autoExpandParent"
                v-model="checkedKeys"
                @select="onSelect"
                :selectedKeys="selectedKeys"
                :treeData="treeData"
                :replaceFields="replaceFields"
        />
        <a-button @click="updateRoleMenu">更新角色权限</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色描述',
      dataIndex: 'remark',
      key: 'remark',
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
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    watch: {
      checkedKeys(val) {
        console.log('onCheck', val);
      },
    },
    data() {
      return {
        records,
        page,
        columns,
        formItemLayout,
        expandedKeys: [1],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        menu:{},//菜单数据
        treeData:[],//所有菜单数据
        replaceFields:{
          title:'name',
          key:'id'
        },
      };
    },
    methods:{
      updateRoleMenu: function () {
        let roleId,ids;
        roleId = this.form.getFieldValue('id');
        console.log(roleId);
        ids = JSON.parse("[" + this.checkedKeys.toString() + "]");
        console.log(ids);
        let formData=new FormData();
        formData.append('roleId',roleId);
        formData.append('ids',ids);
        this.axios.put("/sys/role/updateRoleMenu", formData).then(res => {
          console.log(res.data);
        })
      },
      onExpand(expandedKeys) {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.expandedKeys = expandedKeys;
        this.autoExpandParent = false;
      },
      onCheck(checkedKeys) {
        console.log('onCheck', checkedKeys);
        this.checkedKeys = checkedKeys;
      },
      onSelect(selectedKeys, info) {
        console.log(info);
        this.menu = info.selectedNodes[0].data.props;
        console.log(this.menu);
        this.selectedKeys = selectedKeys;
      },
      getByPage(current){
        this.axios.get('/sys/role/getByPage', {
          params: {
            current: current,
            size: this.page.size,
            name: this.page.name
          }
        }).then(res=>{
          let data = res.data.data;
          console.log(data);
          this.records = data.records;
          this.page.total = data.total;
          this.page.current = data.current;
          // this.data = data;
        })
      },
      setRole(role){
        this.form.setFieldsValue({
          'id':role.id,
          'name':role.name,
          'remark':role.remark,
        });
      },
      onSelectRow(record, index){
        return {
          on: {
            click: () => {
              console.log(record,index);
              this.setRole(record);
            }
          }
        }
      }
    },
    created() {
      this.getByPage(1);
      this.axios.get('/sys/menu/getTree').then(res=>{
        let data = res.data.data;
        console.log(data);
        this.treeData = data;
      });
    }
  }
</script>

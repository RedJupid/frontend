<template>
  <div>
    <a-row>
      <a-col :span="12">
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
      </a-col>
      <a-col :span="12">
        <a-form :form="form">
          <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <span>{{menuData.id}}</span>
          </a-form-item>
          <a-form-item label="上级id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="menuData.parentId"/>
          </a-form-item>
          <a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="menuData.name"/>
          </a-form-item>
          <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-radio-group name="radioGroup" v-model="menuData.type" :defaultValue="0">
              <a-radio :value="0">菜单</a-radio>
              <a-radio :value="1">按钮</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="图标" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="menuData.icon"/>
          </a-form-item>
          <a-form-item label="URL" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="menuData.url"/>
          </a-form-item>
          <a-form-item label="权限" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="menuData.perms"/>
          </a-form-item>
          <a-form-item label="排序" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="menuData.orderNum"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="updateMenu">保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>

</template>
<script>
  const treeData = [];

  const plainOptions = ['Apple', 'Pear', 'Orange'];


  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  export default {
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    data() {
      return {
        expandedKeys: [1],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        treeData,
        replaceFields:{
          title:'name',
          key:'id'
        },
        formItemLayout,
        menuData:{}
      };
    },
    watch: {
      checkedKeys(val) {
        console.log('onCheck', val);
      },
    },
    methods: {
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
        // console.log('onSelect', info);
        let menu = info.selectedNodes[0].data.props;
        console.log(menu);
        this.menuData = menu;
        this.selectedKeys = selectedKeys;
      },
      updateMenu(){
        console.log("updatemenu");
        console.log(this.form.getFieldValue("parentId"));
      }
    },
    created() {
      this.axios.get('/sys/menu/getTree').then(res=>{
        let data = res.data.data;
        console.log(data);
        this.treeData = data;
        // this.data = data;
      })
    }
  };
</script>

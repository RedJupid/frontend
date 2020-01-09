<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-button @click="onSelectAdd"><a-icon type="plus" /></a-button>
        <a-button><a-icon type="sync" /></a-button>
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
        {{selectPage.name}}
        <a-form :form="form">
          <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-decorator="['id']" :disabled="true" />
          </a-form-item>
          <a-form-item label="上级id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-decorator="['parentId']"/>
          </a-form-item>
          <a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-decorator="['name']"/>
          </a-form-item>
          <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-radio-group name="radioGroup" v-decorator="['type',{initialValue:0}]">
              <a-radio :value="0">菜单</a-radio>
              <a-radio :value="1">按钮</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="图标" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-decorator="['icon']"/>
          </a-form-item>
          <a-form-item label="URL" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-decorator="['url']"/>
          </a-form-item>
          <a-form-item label="权限" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-decorator="['perms']"/>
          </a-form-item>
          <a-form-item label="排序" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-decorator="['orderNum']"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="updateMenu" v-show="selectPage.update">更新</a-button>
            <a-button type="primary" @click="addMenu" v-show="selectPage.add">添加</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>

</template>
<script>
  const treeData = [];

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
        selectPage:{
          name:"编辑菜单",
          add:false,
          update:true
        },
        expandedKeys: [1],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        menu:{},//菜单数据
        treeData,//所有菜单数据
        replaceFields:{
          title:'name',
          key:'id'
        },
        formItemLayout,
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
      //设置菜单的属性值
      setMenu(menu){
        this.form.setFieldsValue({
          'id':menu.id,
          'parentId':menu.parentId,
          'name':menu.name,
          'type':menu.type,
          'icon':menu.icon,
          'url':menu.url,
          'perms':menu.perms,
          'orderNum':menu.orderNum
        });
      },
      onSelect(selectedKeys, info) {
        this.selectPage.name = "编辑菜单"
        this.selectPage.update = true;
        this.selectPage.add = false;
        this.menu = info.selectedNodes[0].data.props;
        console.log(this.menu);
        this.setMenu(this.menu);
        this.selectedKeys = selectedKeys;
      },
      onSelectAdd(){
        this.selectPage.update = false;
        this.selectPage.add = true;
        this.selectPage.name = "新增菜单";
        this.form.setFieldsValue({
          'id':"",
          'parentId':"",
          'name':"",
          'type':0,
          'icon':"",
          'url':"",
          'perms':"",
          'orderNum':""
        });
      },
      updateMenu(){
        this.axios.put('/sys/menu',{
          'id':this.form.getFieldValue('id'),
          'parentId':this.form.getFieldValue('parentId'),
          'name':this.form.getFieldValue('name'),
          'type':this.form.getFieldValue('type'),
          'icon':this.form.getFieldValue('icon'),
          'url':this.form.getFieldValue('url'),
          'perms':this.form.getFieldValue('perms'),
          'orderNum':this.form.getFieldValue('orderNum')
        }).then(res=>{
          console.log(res.data);
        })
      },
      addMenu(){

        console.log("addmenu");
      }
    },
    created() {
      this.axios.get('/sys/menu/getTree').then(res=>{
        let data = res.data.data;
        console.log(data);
        this.treeData = data;
      })
    }
  };
</script>

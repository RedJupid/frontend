<template>
    <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
    >
        <a-form-item>
            <a-input
                    v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
                    placeholder="Username"
            >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-input
                    v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
                    type="password"
                    placeholder="Password"
            >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-checkbox
                    v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
            >
                Remember me
            </a-checkbox>
            <a class="login-form-forgot" href="">
                Forgot password
            </a>
            <a-button type="primary" html-type="submit" class="login-form-button">
                Log in
            </a-button>
            Or
            <a href="">
                register now!
            </a>
        </a-form-item>
    </a-form>
</template>

<script>
    export default {
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let userName = this.form.getFieldValue('userName')
                        let password = this.form.getFieldValue('password')
                        this.axios({
                            url:'/login',
                            method:'post',
                            data: this.qs.stringify({
                                username:userName,
                                password:password
                            })
                        }).then(res=>{
                            console.log(res.data)
                            if(res.data.code==200){{
                                localStorage.setItem("loginInfo",userName);
                                this.$router.push({ path:'/'  })
                            }}else{
                                alert(res.data.msg);
                            }
                        }, res=>{
                            console.log(res.data)
                        })
                        // console.log('Received values of form: ', values);
                        // localStorage.setItem("loginInfo",userName);
                        // this.$router.push({ path:'/'  })
                    }
                });
            },
        },
    };
</script>
<style>
    #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }
    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>
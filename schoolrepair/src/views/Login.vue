<template>
  <div class="login-background">
    <div class="login-frame">
      <el-form label-width="80px" :model="loginData" ref="loginDataRef" :rules="rules">
        <el-form-item prop="userName">
          <el-input v-model="loginData.userName" placeholder="用户名" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginData.password"
            type="password"
            show-password
            placeholder="密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="login">登录</el-button>
          <el-button size="medium" @click="dialogVisible = true">注册</el-button>

        </el-form-item>
        <!-- 注册 -->
        <el-dialog title="普通注册" :visible.sync="dialogVisible" width="400px">
          <el-form
            label-width="30px"
            :model="registerData"
            ref="registerDataRef"
            :rules="registerRules"
          >
            <el-form-item prop="userName">
              <el-input placeholder="用户名" v-model="registerData.userName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="密码"
                type="password"
                v-model="registerData.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input placeholder="手机号码" v-model.number="registerData.phone"></el-input>
            </el-form-item>
            <el-form-item prop="mail">
              <el-input placeholder="邮箱" v-model="registerData.mail"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="register()">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
    </div>
  </div>
</template>
<script>
import Schema from "async-validator";
export default {
  data() {
    return {
      loginData: {
        userName: "111",
        password: "111"
      },
      registerData: {
        userName: "",
        password: "",
        phone: "18307001845",
        mail: "2424117373@qq.com"
      },
      rules: {
        userName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ]
      },
      registerRules: {
        userName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱号", trigger: "blur" },
          {
            trigger: "blur",
            validator: function(rule, value, callback) {
              if (value === "") {
                callback(new Error("请填写正确邮箱"));
              } else {
                if (value !== "") {
                  var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                  if (!reg.test(value)) {
                    callback(new Error("请输入有效的邮箱"));
                  }
                } else {
                  callback();
                }
              }
            }
          }
        ]
      },
      dialogVisible: false
    };
  },
  methods: {
    login() {
      this.$refs.loginDataRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post(
            "http://localhost:5000/api/Login/GetToken",
            this.loginData
          );
          console.log(res);
          if (res.status != 200) {
            return this.$message.error("登陆失败");
          } else {
            this.$message.success("登陆成功");
            window.sessionStorage.setItem(
              "token",
              res.responseInfo.token_type + " " + res.responseInfo.token
            );
            this.$router.push("/Home");
          }
        }
      });
    },
    register() {
      this.$refs.registerDataRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post(
            "http://localhost:5000/api/Register/register",
            this.registerData
          );
          if (res.status != 200) {
            return this.$message.error(res.msg);
          } else {
            this.$refs.registerDataRef.resetFields();
            this.dialogVisible = false;
            return this.$message.success(res.msg);
          }
          console.log(res);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-background {
  background-image: url("../assets/loginbackground.jpg");
  overflow: hidden;
  width: 100%;
  height: 938px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 50px;
  .login-frame {
    position: relative;
    border: 1px solid #ccc;
    box-shadow: -1px 2px 20px #ccc;
    width: 450px;
    height: 250px;
    top: 250px;
    margin: auto;
    .el-form {
      position: relative;
      margin-top: 20px;
      .el-form-item {
        .el-button {
          background-color: rgba(246, 250, 243, 0.7);
          margin-left: 45px;
        }
        /deep/ .el-form-item__label {
          font-size: 16px;
          font-family: "微软雅黑";
          color: mediumpurple;
        }
        /deep/.el-input {
          width: 300px;
          margin-top: 5px;
        }
        /deep/ .el-input__inner {
          //width: 300px;
          background-color: rgba(141, 49, 49, 0.5);
          color: mediumpurple;
        }
      }
      /deep/.el-dialog__body {
        padding: 10px;
      }
    }
  }
}
</style>
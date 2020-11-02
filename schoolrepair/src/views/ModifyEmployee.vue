<template>
  <div class="modify">
    <el-card>
      <div>
        <el-table :data="dataTable" style="width: 100%">
          <el-table-column type="index" label="#" width="80px"></el-table-column>
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <el-table-column prop="password" label="密码"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="mail" label="邮箱"></el-table-column>

          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="dialogVisible=true;formData.id=scope.row.id;
formData.userName=scope.row.userName;
formData.password=scope.row.password;
formData.phone=scope.row.phone;
formData.mail=scope.row.mail;"
              >修改信息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :current-page="pageNum"
        :total="100"
      ></el-pagination>
      <el-dialog title="修改用户信息" :visible.sync="dialogVisible" width="30%">
        <div>
          <el-form ref="formRef" :model="formData" label-width="80px">
            <el-form-item label="密码">
              <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formData.mail"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updataUserInfo();dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <h1>修改用户信息</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTable: [],
      pageNum: 1,
      size: 10,
      formData: {
        id: "",
        userName: "",
        password: "",
        phone: "",
        mail: ""
      },

      dialogVisible: false
    };
  },
  mounted() {
    this.getAllUser(this.pageNum, this.size);
  },
  methods: {
    async updataUserInfo() {
      const { data: res } = await this.$http.post(
        "http://localhost:5000/api/User/updateUserInfo",
        this.formData
      );
      console.log(res);
      if (res.status != 200) {
        return this.$message.error("修改失败");
      } else {
        this.getAllUser(this.pageNum, this.size);
        return this.$message.success("修改成功");
      }
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAllUser(this.pageNum, this.size);
    },
    async getAllUser(pageNum, size) {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/User/userList",
        {
          params: { pageNum: pageNum, size: size }
        }
      );
      console.log(res);

      if (res.status != 200) {
        return this.$message.error("请求失败");
      } else {
        this.dataTable = res.responseInfo;
      }
      console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
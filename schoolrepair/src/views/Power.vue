<template>
  <div class="power">
    <el-card>
      <div>
        <el-table :data="dataTable" style="width: 100%">
          <el-table-column type="index" label="#" width="80px"></el-table-column>
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <!-- <el-table-column prop="password" label="密码"></el-table-column> -->
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="mail" label="邮箱"></el-table-column>
          <el-table-column label="身份">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.roleId===1">管理员</el-tag>
              <el-tag type="success" v-else-if="scope.row.roleId===2">电工</el-tag>
              <el-tag type="success" v-else-if="scope.row.roleId===3">木工</el-tag>
              <el-tag type="info" v-else-if="scope.row.roleId===4">普通</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="dialogVisible=true;userRole.userId=scope.row.id"
              >修改身份</el-button>
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
      <el-dialog title="修改身份" :visible.sync="dialogVisible" width="30%">
        <div>
          <el-radio-group v-model="userRole.roleId">
            <el-radio :label="4">普通用户</el-radio>
            <el-radio :label="2">电工</el-radio>
            <el-radio :label="3">木工</el-radio>
          </el-radio-group>
        </div>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="powerUp();dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <h1>权限管理</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTable: [],
      pageNum: 1,
      size: 10,
      userRole: { userId: "", roleId: 4 },

      dialogVisible: false
    };
  },
  mounted() {
    this.getAllUser(this.pageNum, this.size);
  },
  methods: {
    async powerUp() {
      console.log(this.userRole);

      const { data: res } = await this.$http.post(
        "http://localhost:5000/api/UserRole/empowerment",
        this.userRole
      );
      console.log(res);
      if (res.status != 200) {
        return this.$message.error("请求失败");
      } else {
        this.getAllUser(this.pageNum, this.size);
        return this.$message.success("修改权限成功");
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
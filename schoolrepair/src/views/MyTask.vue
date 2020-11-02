<template>
  <div class="repairTask">
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="tung" label="栋"></el-table-column>
        <el-table-column prop="layer" label="层"></el-table-column>
        <el-table-column prop="dorm" label="寝室号"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column label="处理">
          <template slot-scope="scope">
            <div>
              <el-tag v-if="scope.row.waitHandle===1">正在处理</el-tag>
              <el-tag type="success" v-else-if="scope.row.waitHandle===2">处理完成</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="评论">
          <template slot-scope="scope">
            <div>
              <el-tag type="info" v-if="scope.row.evaluate===0">暂无评论</el-tag>
              <el-tag type="danger" v-else-if="scope.row.evaluate===3">差评</el-tag>
              <el-tag type="warning" v-else-if="scope.row.evaluate===2">中评</el-tag>
              <el-tag type="success" v-else-if="scope.row.evaluate===1">好评</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="报修时间">
          <template slot-scope="scope">
            <div>
              <span>{{utils.formatTime(scope.row.dateTime,'yyyy-MM-dd hh:mm:ss')}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                size="mini"
                v-if="scope.row.waitHandle===1"
                @click="finishTheTask(scope.row.id)"
              >完成任务</el-button>
              <el-button type="info" size="mini" v-if="scope.row.waitHandle===2" disabled>已完成</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :current-page="pageNum"
        :total="100"
      ></el-pagination>
      <h1 style="margin-top:5px">个人维修记录</h1>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      size: 10
    };
  },
  created() {
    this.getMyTask();
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getMyTask();
    },
    async getMyTask() {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/RoleReportForRepair/myTask",
        {
          params: {
            pageNum: this.pageNum,
            size: this.size
          }
        }
      );
      if (res.status != 200) {
        return this.$message.error("获取失败");
      } else {
        this.tableData = res.responseInfo;
        return this.$message.success("获取成功");
      }
      console.log(res);
    }, //完成任务
    async finishTheTask(param) {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/RoleReportForRepair/completeTask",
        {
          params: { repairId: param }
        }
      );
      if (res.status != 200) {
        return this.$message.error("结束失败");
      } else {
        this.getMyTask();
        return this.$message.success("完成任务");
      }
      console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
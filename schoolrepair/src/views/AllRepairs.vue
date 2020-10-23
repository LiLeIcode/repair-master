<template>
  <div class="allRepair">
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
              <el-tag type="info" v-if="scope.row.waitHandle===0">未处理</el-tag>
              <el-tag v-else-if="scope.row.waitHandle===1">正在处理</el-tag>
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
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :current-page="pageNum"
        :total="100"
      ></el-pagination>
      <h1 style="margin-top:5px">所有报修记录</h1>
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
    this.getAllRepair(this.pageNum, this.size);
  },
  methods: {
    handleCurrentChange(val) {
      this.getAllRepair(val, this.size);
    },

    async getAllRepair(pageNum, size) {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/Repair/allRepair",
        {
          params: {
            pageNum: pageNum,
            size: size
          }
        }
      );
      console.log(res.responseInfo);
      this.tableData = res.responseInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
.allRepair {
  /deep/.el-main {
    line-height: 30px;
  }
}
</style>
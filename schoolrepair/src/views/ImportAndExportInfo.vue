<template>
  <div class="allRepair">
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="userName" label="用户"></el-table-column>
        <el-table-column prop="goods" label="物品"></el-table-column>
        <el-table-column prop="purchase" label="进货"></el-table-column>
        <el-table-column prop="pickUp" label="取货"></el-table-column>
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
    this.getAllAccessInfo(this.pageNum, this.size);
  },
  methods: {
    handleCurrentChange(val) {
      this.getAllAccessInfo(val, this.size);
    },

    async getAllAccessInfo(pageNum, size) {
      const  {data:res} = await this.$http.get(
        "http://localhost:5000/api/WareHouse/AllAccessInfo",
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
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
              <span>{{formatTime(scope.row.dateTime,'yyyy-MM-dd hh:mm:ss')}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <h1 style="margin-top:10px">所有报修记录</h1>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getAllRepair();
  },
  methods: {
    async getAllRepair() {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/Repair/allRepair"
      );
      console.log(res.responseInfo);
      for (let i = 0; i < res.responseInfo.length; i++)
        this.tableData.push(res.responseInfo[i]);
    },
    formatTime(date, fmt) {
      var date = new Date(date);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          var str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
          );
        }
      }
      return fmt;
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
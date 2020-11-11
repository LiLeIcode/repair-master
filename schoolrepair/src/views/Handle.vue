<template>
  <div class="handle">
    <el-card>
      <el-table :data="repairRecordList">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="栋" prop="tung"></el-table-column>
        <el-table-column label="楼" prop="layer"></el-table-column>
        <el-table-column label="寝室号" prop="dorm"></el-table-column>
        <el-table-column label="描述" prop="desc"></el-table-column>
        <el-table-column label="报修时间">
          <template slot-scope="scope">
            <div>
              <span>{{utils.formatTime(scope.row.reportDateTime,"yyyy-MM-dd hh:mm:ss")}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="处理结果">
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
              <el-tag type="info" v-if="scope.row.evaluate===0">暂未评论</el-tag>
              <el-tag type="danger" v-else-if="scope.row.evaluate===3">差评</el-tag>
              <el-tag type="warning" v-else-if="scope.row.evaluate===2">中评</el-tag>
              <el-tag type="success" v-else-if="scope.row.evaluate===1">好评</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                v-if="scope.row.waitHandle===2&&scope.row.evaluate===0"
                size="medium"
                @click="getRepairId(scope.row.id)"
              >点评</el-button>
              <el-button
                type="info"
                v-if="scope.row.waitHandle!=2||(scope.row.waitHandle===2&&scope.row.evaluate!=0)"
                size="medium"
                disabled
              >点评</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="选择你的评论" :visible.sync="dialogVisible" width="30%">
        <el-radio-group v-model="commentValue.evaluate">
          <el-radio :label="1">好评</el-radio>
          <el-radio :label="2">中评</el-radio>
          <el-radio :label="3">差评</el-radio>
        </el-radio-group>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subEvaluate()">确 定</el-button>
      </el-dialog>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :current-page="pageNum"
        :total="100"
      ></el-pagination>
      <h1 style="margin-top:5px">个人报修记录</h1>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repairRecordList: [],
      dialogVisible: false,
      commentValue: {
        evaluate: 1,
        reportForRepairId: ""
      },
      pageNum: 1,
      size: 10
    };
  },
  created() {
    this.getMyRepairRecord(this.pageNum, this.size);
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getMyRepairRecord(val, this.size);
    },
    async getMyRepairRecord(pageNum, size) {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/Repair/allRepairRecord",
        {
          params: {
            pageNum: pageNum,
            size: size
          }
        }
      );
      console.log(res);
      if (res.status != 200) {
        return this.$message.error("请求失败");
      } else {
        this.repairRecordList = res.responseInfo;
      }
    },
    getRepairId(param) {
      this.dialogVisible = true;
      this.commentValue.reportForRepairId = param;
    },
    async subEvaluate() {
      console.log(this.commentValue);
      const { data: res } = await this.$http.post(
        "http://localhost:5000/api/Repair/comment",
        this.commentValue
      );

      console.log(res);

      if (res.status != 200) {
        return this.$message({
          type: "error",
          message: "提交失败",
          duration: 500
        });
      } else {
        this.getMyRepairRecord(this.pageNum, this.size);
        this.dialogVisible = false;
        return this.$message({
          type: "success",
          message: "提交成功",
          duration: 500
        });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.el-radio-group {
  display: block;
  margin-bottom: 20px;
}
</style>
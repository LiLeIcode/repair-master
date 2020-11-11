<template>
  <div class="miantenance">
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#" width="80"></el-table-column>
        <el-table-column prop="goods" label="名称"></el-table-column>
        <el-table-column prop="number" label="数量"></el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <div>
              <span>{{utils.formatTime(scope.row.dateTime,'yyyy-MM-dd hh:mm:ss')}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="dialogVisible=true;currentId=scope.row.id;getMyHITATask()"
            >取出货物</el-button>
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
      <el-dialog title :visible.sync="dialogVisible" width="30%">
        <div>请选择任务</div>
        <el-select v-model="selectValue" placeholder="请选择">
          <el-option
            v-for="item in myHITATask"
            :key="item.id"
            :label="item.tung+item.layer+item.dorm+item.desc"
            :value="item.id"
          ></el-option>
        </el-select>
        <div>请输入要取走的数量</div>
        <el-input v-model.number="takeOutNumber" placeholder="10"></el-input>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="getOutGoods(currentId,takeOutNumber)">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectValue: "",
      myHITATask: [],
      tableData: [],
      pageNum: 1,
      size: 10,
      dialogVisible: false,
      takeOutNumber: "",
      currentId: "",
      addDdialogVisible: false,
      addNumber: "",
      goodsName: ""
    };
  },
  mounted() {
    this.getAllGoods(this.pageNum, this.size);
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAllGoods(this.pageNum, this.size);
    },
    async addGoods(goodsName, number) {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/WareHouse/addGoods",
        {
          params: {
            goodsName: goodsName,
            number: number
          }
        }
      );
      this.addDdialogVisible = false;
      if (res.status != 200) {
        return this.$message.error("添加失败");
      } else {
        this.getAllGoods(this.pageNum, this.size);

        return this.$message.success("添加完成");
      }
    },
    async getOutGoods(currentId, takeOutNumber) {
      this.dialogVisible = false;
      console.log(this.selectValue);
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/WareHouse/takeOutGoods",
        {
          params: {
            goodsId: currentId,
            number: takeOutNumber,
            workerId: this.selectValue
          }
        }
      );
      console.log(res);
      if (res.status != 200) {
        return this.$message.error("请求失败");
      } else {
        this.getAllGoods(this.pageNum, this.size);
        return this.$message({
          type: "success",
          message: "获取成功",
          duration: 500
        });
      }
    },
    async getAllGoods(pageNum, size) {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/WareHouse/allGoods",
        {
          params: {
            pageNum: pageNum,
            size: size
          }
        }
      );
      console.log(res.responseInfo);

      if (res.status != 200) {
        return this.$message.error("获取失败");
      } else {
        this.tableData = res.responseInfo;
      }
    },
    async getMyHITATask() {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/RoleReportForRepair/myHITATask"
      );
      console.log(res);
      if (res.status != 200) {
        return this.$message({
          type: "error",
          message: "获取失败",
          duration: 500
        });
      } else {
        this.myHITATask = res.responseInfo;
        return this.$message({
          type: "success",
          message: "获取成功",
          duration: 500
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
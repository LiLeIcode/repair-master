<template>
  <div class="about">
    <el-card>
      <el-dialog title="添加物品" :visible.sync="addDdialogVisible" width="30%">
        <div>
          <el-input v-model="goodsName" placeholder="物品名：钉子"></el-input>
          <el-input v-model.number="addNumber" placeholder="数量：10"></el-input>
        </div>
        <div slot="footer">
          <el-button @click="addDdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGoods(goodsName,addNumber)">确 定</el-button>
        </div>
      </el-dialog>

      <el-row :gutter="10">
        <el-col :span="1">
          <el-button type="primary" size="mini" @click="addDdialogVisible = true">添加货物</el-button>
        </el-col>
      </el-row>
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
              @click="dialogVisible=true;currentId=scope.row.id"
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
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/WareHouse/takeOutGoods",
        {
          params: {
            goodsId: currentId,
            number: takeOutNumber
          }
        }
      );
      console.log(res);
      if (res.status != 200) {
        return this.$message.error("请求失败");
      } else {
        this.getAllGoods(this.pageNum, this.size);
        return this.$message.success("取出成功");
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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
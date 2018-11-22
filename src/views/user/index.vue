<template>
  <div class="con">
    <div class="search-con">
      <el-input v-model="phone" placeholder="手机号码" clearable class="search-input" size="small" />
      <el-input v-model="email" placeholder="邮箱" clearable class="search-input" size="small" />
    </div>
    <el-table :data="userList" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="username" label="账户名" width="120" />
      <el-table-column label="头像" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="图片" class="img">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phoneNumber" label="手机号码" />
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="sex" label="性别" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.sex == '1'?'男':'女' }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">详情</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="账户详情" width="35%">
      <div class="card">
        <p><img :src="row.avatar" alt="图片" class="img"></p>
        <p><span>{{ row.username }}</span><span>{{ row.age }}</span><span>{{ row.sex==1?'男':'女' }}</span></p>
      </div>
      <div class="list">
        <p><span><span>姓名:</span><span>{{ row.name }}</span></span><span><span>邮箱:</span><span>{{ row.email }}</span></span></p>
        <p><span><span>手机号码:</span><span>{{ row.phoneNumber }}</span></span></p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList } from '@/api/user'
export default {
  name: 'User',
  data() {
    return {
      userList: [],
      phone: '',
      email: '',
      row: '',
      dialogVisible: false
    }
  },
  created() {
    getUserList().then(res => {
      this.userList = res.data.records
    })
  },
  methods: {
    handleClick(row) {
      this.row = row
      this.dialogVisible = true
      console.log(this.row)
    },
    handleSelectionChange() {}
  }
}
</script>
<style lang="scss" scoped>
.con {
  padding: 0 20px;
}
.img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  vertical-align: middle;
}
.search-con {
  margin: 20px 0;
}
.search-input {
  width: 120px;
  margin-right: 20px;
}
.card{
  text-align: center;
  margin-bottom: 20px;
    span{
      margin: 0 10px;
    }
    img{
      width: 100px;
      height: 100px;
      border-radius: 50px;
    }
}
.list p{
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.list p span span:nth-child(1) {
  display: inline-block;
  width: 70px;
  text-align: right;
  margin-right: 10px;
}
</style>


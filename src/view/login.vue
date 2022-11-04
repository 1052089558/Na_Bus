<template>
  <div class="content">
    <div class="demo-ruleForm login-container">
      <el-form
        v-if="flag"
        :model="loginForm"
        :rules="loginrules"
        ref="form"
        label-position="left"
        label-width="0px"
      >
        <h3 class="title">系统登录</h3>
        <el-form-item label="账号:" prop="username" label-width="70px">
          <el-input
            v-model="loginForm.username"
            prefix-icon="user"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password" label-width="70px">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="lock"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码:" prop="code" label-width="70px">
          <el-input
            v-model="loginForm.code"
            autocomplete="off"
            placeholder="请输入验证码"
          ></el-input>
          <div class="img-verify">
            <canvas
              ref="verify"
              :width="codewidth"
              :height="codeheight"
              @click="handleDraw"
            ></canvas>
          </div>
          <i class="refresh" @click="handleDraw">刷新</i>
        </el-form-item>
        <el-row
          type="flex"
          style="margin-bottom: 22px"
          class="row-bg"
          justify="space-between"
        >
          <el-col :span="6"
            ><el-checkbox v-model="checked" checked
              >记住密码</el-checkbox
            ></el-col
          >
          <el-col :span="4"
            ><el-button @click="flag = false" type="text" style="padding: 0"
              >用户注册</el-button
            ></el-col
          >
        </el-row>
        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 100%"
            :loading="logining"
            @click="submitForm"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <el-form
        v-else
        :model="registerForm"
        :rules="registerrules"
        ref="form2"
        label-position="left"
        label-width="0px"
      >
        <h3 class="title">系统注册</h3>
        <el-form-item label="账号" prop="username" label-width="70px">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="70px">
          <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-row
          type="flex"
          style="margin-bottom: 22px"
          class="row-bg"
          justify="space-between"
        >
          <el-col :span="5"></el-col>
          <el-col :span="8"
            ><el-button @click="toLogin" type="text" style="padding: 0"
              >使用已有账户登录</el-button
            ></el-col
          >
        </el-row>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 100%" :loading="logining"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch, ref } from "vue";
import { ElLoading, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  setup() {
    const state = reactive({
      pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      flag: true,
      imgCode: "",
      logining: false,
      codewidth: 150,
      codeheight: 40,
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      registerForm: {
        username: "",
        password: "",
      },
      loginrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      registerrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      checked: true,
    });
    onMounted(() => {
      handleDraw();
    });
    const verify = ref(null);
    const router = useRouter();
    const form = ref(null); //登录dom
    const form2 = ref(null); //注册dom

    // 随机数
    const randomNum = (min, max) => {
      return parseInt(Math.random() * (max - min) + min);
    };
    // 随机颜色
    const randomColor = (min, max) => {
      const r = randomNum(min, max);
      const g = randomNum(min, max);
      const b = randomNum(min, max);
      return `rgb(${r},${g},${b})`;
    };
    // 绘制图片
    const handleDraw = () => {
      // 3.填充背景颜色，背景颜色要浅一点
      const ctx = verify.value.getContext("2d");
      // 填充颜色
      ctx.fillStyle = randomColor(180, 230);
      // 填充的位置
      ctx.fillRect(0, 0, state.codewidth, state.codeheight);
      // 定义paramText
      state.imgCode = "";
      // 4.随机产生字符串，并且随机旋转
      for (let i = 0; i < 4; i++) {
        // 随机的四个字
        const text = state.pool[randomNum(0, state.pool.length)];
        state.imgCode += text;
        // 随机的字体大小
        const fontSize = randomNum(18, 40);
        // 字体随机的旋转角度
        const deg = randomNum(-30, 30);
        /*
         * 绘制文字并让四个文字在不同的位置显示的思路 :
         * 1、定义字体
         * 2、定义对齐方式
         * 3、填充不同的颜色
         * 4、保存当前的状态（以防止以上的状态受影响）
         * 5、平移translate()
         * 6、旋转 rotate()
         * 7、填充文字
         * 8、restore出栈
         * */
        ctx.font = fontSize + "px Simhei";
        ctx.textBaseline = "top";
        ctx.fillStyle = randomColor(80, 150);
        /*
         * save() 方法把当前状态的一份拷贝压入到一个保存图像状态的栈中。
         * 这就允许您临时地改变图像状态，
         * 然后，通过调用 restore() 来恢复以前的值。
         * save是入栈，restore是出栈。
         * 用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。 restore：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。
         *
         * */
        ctx.save();
        ctx.translate(30 * i + 15, 15);
        ctx.rotate((deg * Math.PI) / 180);
        // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色。
        // 请使用 font 属性来定义字体和字号，并使用 fillStyle 属性以另一种颜色/渐变来渲染文本。
        // context.fillText(text,x,y,maxWidth);
        ctx.fillText(text, -15 + 5, -15);
        ctx.restore();
      }

      // 5.随机产生5条干扰线,干扰线的颜色要浅一点
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(
          randomNum(0, state.codewidth),
          randomNum(0, state.codeheight)
        );
        ctx.lineTo(
          randomNum(0, state.codewidth),
          randomNum(0, state.codeheight)
        );
        ctx.strokeStyle = randomColor(180, 230);
        ctx.closePath();
        ctx.stroke();
      }
    };

    const submitForm = () => {
      if (state.loginForm.code != state.imgCode) {
        ElMessage({
          message: "验证码有误",
          type: "warning",
          center: true,
          duration: 1000,
        });
        state.loginForm.code = "";
        return;
      }
      form.value.validate((valid) => {
        if (valid) {
          //掉登录接口

          router.replace({ path: "/" });
          ElMessage({
            message: "登录成功！",
            type: "success",
            center: true,
            duration: 1000,
          });
        }
      });
    };
    const toLogin = async () => {
      location.reload();
      state.flag = true;
    };
    return {
      ...toRefs(state),
      router,
      form,
      form2,
      verify,
      handleDraw,
      toLogin,
      submitForm,
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  width: 100%;
  height: 100%;
}
.login-container {
  position: relative;
  top: 240px;
  border-radius: 5px;
  background-clip: padding-box;
  margin: 0 auto 0;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .img-verify {
    margin-top: 10px;
  }
  .refresh {
    cursor: pointer;
    margin-left: 20px;
    font-size: 16px;
  }
}
</style>
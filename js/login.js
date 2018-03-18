// 功能模块一：后台管理员登录
// 1:获取登录按钮
// 2:绑定点击事件
// 3:获取用户输入用户名和密码
// 4.创建正则表达式验证用户名和密码
// 5:发送ajax请求并且获取返回数据
// 6:获取返回结果
// 7:判断登录成功
// 8:成功    提示:"用户名或密码有误"
// 9：失败
$(()=>{
  $("#btn").click(e=>{
      e.preventDefault();//a submit button 要阻止跳转
      var uname=$("#uname").val();
      var upwd=$("#upwd").val();
      var reg=/^[a-zA-Z0-9]{3,12}$/i;
      if(!reg.test(uname)) {
          alert("用户名格式不正确");
          return;
      }
          // else if (!reg.test(upwd)){
          // alert("密码格式不正确");
          // return;
     // }
      else{
              // $.get("data/01_admin_login.php",{uname,upwd}).then(data=>{
              //       if (data.code==1){
              //           location="index.html";
              //       }
              // });
              $.ajax({
                  type:"POST",
                  url:"data/01_admin_login.php",
                  data:{uname,upwd},
                  success:function(data){
                      //console.log(data);//js对象
                      if(data.code>0){
                          alert(data.msg);
                          location.href="index.html";//如果成功，跳转到主页面
                      }else {
                          alert(data.msg);
                      }
                  },
                  error:function () {
                      // 1、php语法出错
                      // 2、php sql语法出错
                      // 3、php header 出错
                      // 4、js 请求地址不正确或参数出错
                      alert("网络故障，请检查");
                  }
              })
      }

  })
});
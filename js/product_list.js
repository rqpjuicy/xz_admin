//存取页面大小
var pageSize = localStorage['pageSize'];
if(!pageSize){
  pageSize = 10;
}
$('#page-size').val(pageSize).change(function(){
  localStorage['pageSize'] = $(this).val();
  loadProductByPage(1, $(this).val());
});

//分页条单击事件处理
$('#pagination').on('click', 'li a', function(e){
  e.preventDefault();
  if ($(this).attr('href')!==""){
      loadProductByPage($(this).attr('href'), localStorage['pageSize']);
  }
})
//按title查找内容
$(()=>
  $(document.body).on("click","[data-trigger=search]",function(){
      var $txtSearch=$(this).parent().children("input").val().trim();
      if($txtSearch!==""){
        location.href="product_list.html?kw="+$txtSearch;
      }else{
        location="product_list.html";
      }
  })
)
//分页加载数据
function loadProductByPage(pno, pageSize){
  var search=location.search;
  if (search.indexOf("kw")!=-1){
    var kw=decodeURI(search.split("=")[1]);
  }
  $('#table-laptop tbody').html('<div class="loading"><img src="img/loading.gif" alt=""></div>');
  $.ajax({
      type:"GET",
      url: 'data/02_product_list.php',
      data: {pageIndex:pno, pageSize: pageSize,kw:kw},
      success: function(pager){
      //表格内容
      var html = '';
      $.each(pager.data, function(i, l){
        html += `
          <tr>
            <td><input type="checkbox"></td>
            <td>${l.lid}</td>
            <td><img class="pic" src="${l.pic}"></td>
            <td><p class="fname" title="${l.fname}">${l.fname}</p></td>
            <td><p class="title" title="${l.title}">${l.title}</p></td>
            <td><p class="spec" title="${l.spec}">${l.spec}</p></td>
            <td>￥${l.price}</td>
            <td>
              <a href="${l.lid}" class="btn-detail">详情</a>
              <a href="${l.lid}" class="btn-update">修改</a>
              <a href="${l.lid}" class="btn-del">删除</a>
            </td>
          </tr>
        `;
      })
      $('#table-laptop tbody').html(html);
      pager.pno=parseInt(pager.pno);
      //分页条
      var html = '';
      html += `<li class="${pager.pno<=1?'disabled':''}"><a href="${pager.pno>1?pager.pno-1:''}">上一页</a></li>`;
      // if(pager.pno-2>0){
      //   html += `<li><a href="${pager.pno-2}">${pager.pno-2}</a></li>`;
      // }
      html +=`<li class="${pager.pno==1?'active':''}"><a href="1">1</a></li>`;
      if (pager.pno-3>0){html+=`<li><span>...</span></li>`;}
      if(pager.pno-2>0){
        html += `<li><a href="${pager.pno-1}">${pager.pno-1}</a></li>`;
      }
      if (pager.pno-1>0 && pager.pno+1<=pager.totalPages){
          html += `<li class="active"><a href="${pager.pno}">${pager.pno}</a></li>`;
      }
      if(pager.pno+2<=pager.totalPages){
        html += `<li><a href="${pager.pno+1}">${pager.pno+1}</a></li>`;
        //html+=`<li><span>...</span></li>`;
      }
      if (pager.pno+3<=pager.totalPages){html+=`<li><span>...</span></li>`;}
      // if(pager.pno+2<=pager.totalPages){
      //   html += `<li><a href="${pager.pno+2}">${pager.pno+2}</a></li>`;
      // }
      if(pager.totalPages-1>0){
          html+= `<li class="${pager.pno==pager.totalPages?'active':''}"><a href="${pager.totalPages}">${pager.totalPages}</a></li>`;
      }
      html += `<li class="${pager.pno>=pager.totalPages?'disabled':''}"><a href="${pager.pno<pager.totalPages?pager.pno+1:''}">下一页</a></li>`;
      $('#pagination').html(html);
    }
  })
}
loadProductByPage(1, 10)
//删除产品
$("tbody").on("click",".btn-del",e=> {
    e.preventDefault();
    var lid=$(e.target).attr("href");
    if(confirm("确认要删除编号为"+lid+"的商品吗？")){
      $.ajax({
          type:"POST",
          url:"data/03_product_del.php",
          data:{lid:lid},
          success:function (data) {
              if(data.code>0){
                alert(data.msg);
                loadProductByPage(1, 10)
              }else{
                alert(data.msg);
              }
          },
          error:function () {
              alert("网络故障，请检查");
          }
      });
    }
})
app.controller('searchController',function($scope,$location,searchService){
	
	//定义搜索对象的结构  category:商品分类
	$scope.searchMap={'keywords':'手机','category':'','brand':'','spec':{},'price':'','pageNo':1,'pageSize':40,'sort':'','sortField':''};
	
	//搜索
	$scope.search=function(){

		//没有用
		$scope.searchMap.pageNo= parseInt($scope.searchMap.pageNo);//转换为数字


		//搜索  入参:Map  此时此刻就一个关键词
		//URL
		//入参: searchMap
		//返回值 : resultMap
		searchService.search($scope.searchMap).success(
			function(response){
				$scope.resultMap=response;	//map
				
				buildPageLabel();//构建分页栏			
				//$scope.searchMap.pageNo=1;//查询后显示第一页
			}
		);		
	}
	
	//构建分页栏	
	buildPageLabel=function(){
		//构建分页栏
		$scope.pageLabel=[];


		var firstPage=1;//开始页码
		var lastPage=$scope.resultMap.totalPages;//截止页码
		$scope.firstDot=true;//前面有点
		$scope.lastDot=true;//后边有点
		
		if($scope.resultMap.totalPages>5){  //如果页码数量大于5
			
			if($scope.searchMap.pageNo<=3){//如果当前页码小于等于3 ，显示前5页
				lastPage=5;
				$scope.firstDot=false;//前面没点
			}else if( $scope.searchMap.pageNo>= $scope.resultMap.totalPages-2 ){//显示后5页
				firstPage=$scope.resultMap.totalPages-4;	
				$scope.lastDot=false;//后边没点
			}else{  //显示以当前页为中心的5页
				firstPage=$scope.searchMap.pageNo-2;
				lastPage=$scope.searchMap.pageNo+2;
			}			
		}else{
			$scope.firstDot=false;//前面无点
			$scope.lastDot=false;//后边无点
		}
		
		
		//构建页码
		for(var i=firstPage;i<=lastPage;i++){
			$scope.pageLabel.push(i);
		}
	}


    //添加搜索项  改变searchMap的值
	// key: 表示更改哪个属性  常量  category
	// value: 变量 手机或 电视
	$scope.addSearchItem=function(key,value){
		
		if(key=='category' || key=='brand' || key=='price'){//如果用户点击的是分类或品牌


			$scope.searchMap[key]=value;
			
		}else{//用户点击的是规格
			$scope.searchMap.spec[key]=value;		
		}
		$scope.search();//查询
	}
	
	//撤销搜索项
	$scope.removeSearchItem=function(key){
		if(key=='category' || key=='brand' || key=='price' ){//如果用户点击的是分类或品牌
			$scope.searchMap[key]="";
		}else{//用户点击的是规格
			delete $scope.searchMap.spec[key];		
		}
		$scope.search();//查询
	}
	
	//分页查询
	$scope.queryByPage=function(pageNo){
		if(pageNo<1 || pageNo>$scope.resultMap.totalPages){
			return ;
		}		
		$scope.searchMap.pageNo=pageNo;
		$scope.search();//查询
	}
	
	//判断当前页是否为第一页
	$scope.isTopPage=function(){
		if($scope.searchMap.pageNo==1){
			return true;
		}else{
			return false;
		}		
	}
	
	//判断当前页是否为最后一页
	$scope.isEndPage=function(){
		if($scope.searchMap.pageNo==$scope.resultMap.totalPages){
			return true;
		}else{
			return false;
		}	
	}


    //排序查询
	$scope.sortSearch=function(sortField,sort){
		$scope.searchMap.sortField=sortField;
		$scope.searchMap.sort=sort;
		
		$scope.search();//查询
	}
	
	//判断关键字是否是品牌
	$scope.keywordsIsBrand=function(){		
		for(var i=0;i< $scope.resultMap.brandList.length;i++){			
			if( $scope.searchMap.keywords.indexOf( $scope.resultMap.brandList[i].text )>=0  ){
				return true;				
			}			
		}
		return false;
	}


    //定义搜索对象的结构  category:商品分类
   // $scope.searchMap={'keywords':'手机','category':'','brand':'','spec':{},'price':'','pageNo':1,'pageSize':40,'sort':'','sortField':''};

    //加载关键字
	$scope.loadkeywords=function(){

		//关键词
		$scope.searchMap.keywords= $location.search()['keywords'];


		//查询
		$scope.search();//查询
	}

	//跳转到静态页面
	$scope.openDetailPage = function(goodsId){
		//alert(goodsId);  http://localhost:9001/149187842867976.html
		//重新打开一个新页面
		window.open("http://localhost:9003/"+goodsId+".html");
		//当前页面打开
		//location.href = "";
	}
	
});
try {
  var InterFace = {
    carousel: 'api/services/app/siteConfig/getAppSowingMap', //获取轮播图片
    workgrade: 'api/services/app/siteConfig/getUserDetail', //业绩统计
    advisory: 'api/services/app/siteConfig/getCalenderAll', //获取日程
    allviso: 'api/services/app/siteConfig/getCalenderAll', //全部日程
    choseallviso: 'api/services/app/siteConfig/getCalenderAll', //选择日程
    createcalender: 'api/services/app/siteConfig/createCalender',//增加日程
    deletesection: 'api/services/app/siteConfig/deleteCalender', //删除日程
    consulis: 'api/services/app/siteConfig/getInformation', //资讯列表
    newcon: 'api/YinLaiZhuShow/GetInformarionAppDetail',//资讯
    produce: 'api/services/app/projectInfo/apiGetProductList',//产品
    gettoken: 'api/Account/getAccessToken',//授权获取token
    handlogin: 'api/Account/createUserAothorize',//确认授权
    phonecod: 'api/Account/apiRegVerifyCode', //获取验证码
    apificationcode: 'api/Account/apiISVerificationCode',//判断验证码是否正确
    updatepassword: 'api/Account/updatepassword',//修改密码
    userlogin: 'api/Account/userLogin',//用户名登录
    edituser:  'api/services/app/siteConfig/editUser', //保存个人资料
    getUserdetail: 'api/services/app/siteConfig/getUserDetail', //用户详细信息
    apiGetCount:'api/services/app/orderInfo/apiGetCount',
    apiGetDepatmentName: 'api/services/app/userReport/apiGetDepatmentName', //选择下属部门
    datayear: 'api/services/app/userReport/apiGetPerformanceRankingByToDay', //个人当天规模业绩，年化业绩排名
    apiGetPerFormanceRateTeamRank: 'api/services/app/userReport/apiGetPerFormanceRateRank', //个人年化业绩前30名
    apiGetPerFormanceTeamRank: 'api/services/app/userReport/apiGetPerformanceRanking', //团队规模业绩前10名
    apiGetPerFormanceTeamRankToMonth: 'api/services/app/userReport/apiGetPerformanceRankingByToMonth', //团队当月规模业绩，年化业绩排名
    scallinter: 'api/services/app/userReport/apiGetPersonalReportDay',//个人当天规模业绩，年化业绩，折标率
    investmenter: 'api/services/app/userReport/apiGetPersonalMarkingRate',//个人当天续投率
    newrater: 'api/services/app/userReport/apiGetNewCustomerToDay',//个人当天新客增长
    scallinter2:  'api/services/app/userReport/apiGetPersonalReportMonth',//个人当月规模业绩，年化业绩，折标率
    investmenter2: 'api/services/app/userReport/apiGetPersonalMarkingRateToMonth',
    newrater2: 'api/services/app/userReport/apiGetNewCustomerToDay',
    weekscallinter: 'api/services/app/userReport/apiGetPersonalReportSection',//一周规模业绩，年化业绩，折标率
    weeknewadd: 'api/services/app/userReport/apiGetNewCustomerToSevenDay',//一周新客增长
    weekinvestmenter: 'api/services/app/userReport/apiGetMarkingRatePersonalSevenDay',//续投率
    scallinteam: 'api/services/app/userReport/apiGetTeamReportDay',//团队当天规模业绩，年化业绩，折标率
    investmenteam: 'api/services/app/userReport/apiGetTeamMarkingRate',//团队当天续投率
    newrateam: 'api/services/app/userReport/apiGetNewCustomerTeamToDay',//团队当天新客增长
    peopleRrater: 'api/services/app/userReport/apiGetTeamAverageProductivityToDay',//团队当天人均产能
    peopleRrater2: 'api/services/app/userReport/apiGetTeamAverageProductivityToMonth',//团队当月人均产能
    scallinterteam2: 'api/services/app/userReport/apiGetTeamReportMonth',//团队当月规模业绩，年化业绩，折标率
    investmenterteam2: 'api/services/app/userReport/apiGetTeamMarkingRateToMonth',
    newraterteam2: 'api/services/app/userReport/apiGetNewCustomerTeamToMonth',
    weekscallinterteam: 'api/services/app/userReport/apiGetTeamReportSection',//一周规模业绩，年化业绩，折标率
    weeknewaddteam: 'api/services/app/userReport/apiGetNewCustomerTeamToSevenDay',//一周新客增长
    weekinvestmenteam: 'api/services/app/userReport/apiGetMarkingRateTeamSevenDay',//续投率
    dataYear: 'api/services/app/userReport/apiGetPerFormanceTeamRankToDay',//本日年化业绩排名
    apiGetPerFormanceRateRanks: 'api/services/app/userReport/apiGetPerFormanceRateTeamRank',//团队年化业绩前10名
    apiGetPerFormanceTeamRank2: 'api/services/app/userReport/apiGetPerFormanceTeamRank',//团队规模业绩前10名
    apiGetPerFormanceTeamRankToMonth2: 'api/services/app/userReport/apiGetPerFormanceTeamRankToMonth',//团队当月规模业绩，年化业绩排名
    apiGetUser: '/api/services/app/customer/apiGetCustomers4User',//获取客户列表
    apiInsertCallRecord: 'api/services/app/customer/apiInsertCallRecord',//新建拜访记录
  }
} catch (e) {
  console.log(e)
}
export {
  InterFace
}

import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'

const types = ['pop','new','sell']
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods: {
      'pop': {page:0,list:[] },
      'new': {page:0,list :[]},
      'sell': {page:0,list :[]}
    },
    currentIndex:'pop'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //1.发送轮播图及数据
  this._getMultiData()
  //请求商品数据
  this._getGoodsData('pop')
  this._getGoodsData('new')
  this._getGoodsData('sell')

  },
  //网络请求函数
  _getMultiData() {
    getMultiData().then(res =>{
      //取出轮播图和数据
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list

      //将banners和recommend放到data中
      this.setData({
        banners,
        recommends
      })
    })
  },

  _getGoodsData(type) {
   //获取页码
   const page = this.data.goods[type].page +1
   //发送网络请求
   getGoodsData(type,page).then(res =>{
     //取出数据
     const list = res.data.data.list;
     //将数据设置到对应type的list中
     const oldList = this.data.goods[type].list;
     oldList.push(...list)

     //将数据设置到data中goods中
     const typeKey = `goods.${type}.list`;
     const pageKey = `goods.${type}.page`;
     this.setData({
       [typeKey]:oldList,
       [pageKey]:page
     })
   })
  },
  //事件监听函数
  handleTabClick(event) {

     //取出index
     const index = event.detail.index;
     //设置currentIndex
     this.setData({
       currentIndex:types[index]
     })
  }

  

})
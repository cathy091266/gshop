/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops
} from '../api'

export default {
  async getAddress ({commit,state}){
    //发送异步Ajax请求
    const geohash=state.latitude+','+state.longitude
    const result= await reqAddress(geohash)
    if(result.code===0){
      const address=result.data
      //提交一个mutation
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  async getCategorys ({commit}){
    //发送异步Ajax请求
    const result= await reqFoodCategorys()
    if(result.code===0){
      const categorys=result.data
      //提交一个mutation
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  async getShops ({commit,state}){
    //发送异步Ajax请求
    const {longitude,latitude}=state
    const result= await reqShops(longitude,latitude)
    if(result.code===0){
      const shops=result.data
      //提交一个mutation
      commit(RECEIVE_SHOPS,{shops})
    }
  }
}

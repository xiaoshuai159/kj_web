import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let result = await login({username: username.trim(), password: password});
    // console.dir(Promise)
    //console.log('走到store里的user里了');
    //console.log(result);
    if(result.code == 200){
      commit('SET_TOKEN', result.token)
      setToken(result.token)
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'))
    }
  },

  // get user info
  async getInfo({ commit, state }) {
    //console.log('走到store里的getInfo了');
    //console.log(state);
    const info = await getInfo(state.token)
    //console.log(info);
    if(!info){
      return Promise.reject(new Error('Verification failed, please Login again.'))
    }else{
      commit('SET_NAME', info.username)
      return 'ok'
    }
    
    // const {data} = info
    // if(!data){
    //   return Promise.reject(new Error('Verification failed, please Login again.'))
    // }else{
    //   const { name, avatar } = data
    //   commit('SET_NAME', name)
    //   commit('SET_AVATAR', avatar)
    //   return 'ok'
    // }    
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}
const state = getDefaultState()
export default {
  namespaced: true,
  state,
  mutations,
  actions
}


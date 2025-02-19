import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo, topHeader } = defaultSettings

const state = {
  showSettings: showSettings,
  tagsView: tagsView, // 新增tagsView
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  topHeader: topHeader
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


export default {
  namespaced: true,
  state: { 
    toasts: [], 
  },
  mutations: { 
    ADD_TOAST(state, payload){
      state.toasts.push(payload); 
    },
    REMOVE_TOAST(state){
      state.toasts.shift();
    }
  },
  actions: {
    triggerToast({ commit }, payload){
      // message, type = 'success'
      commit('ADD_TOAST', {
        id: Date.now(),
        message: payload.message,
        type: payload.type,
      })
      setTimeout(() => { 
        commit('REMOVE_TOAST')
      }, 5000); 
    }
  },
  getters: { //computed와 비슷한 성질
    toastMessageWidthSmile(state) {
      return state.tostMessage + ' ^_^';
    }
  }
}
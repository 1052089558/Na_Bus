import { defineStore } from 'pinia'
export const loginStore = defineStore('logininfo', {
  state: () => {
    return {
      count: 0,
      list: [1, 2, 3, 4 ]
    }
  },
actions: {

// updateName(name) {
//   this.name =  this.name=="凉白开"?name:"凉白开"
// }
},
getters: {

// fullName: (state) => {
//   return "你到底是谁？是"+state.name+"吗"
// }
}
})
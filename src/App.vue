<template>
  <div>
    <div class="flex justify-center mt-24 mb-20">
      <input v-model="Name" placeholder="Enter Your Name" class="mx-2 pl-3 focus:border-none outline-none h-10 bg-yellow-400 text-white text-xl font-medium rounded-lg" type="text" required>
      <input v-model="Email" placeholder="Enter Your Email" class="mx-2 pl-3 focus:border-none outline-none h-10 bg-yellow-400 text-white text-xl font-medium rounded-lg" type="email" required>
      <input v-model="Tel" placeholder="Enter Your Tel" class="mx-2 pl-3 focus:border-none outline-none h-10 bg-yellow-400 text-white text-xl font-medium rounded-lg" type="tel" required>
      <button :disabled="checkBtn"  @click="sendData" class="bg-green-500 w-20 rounded-lg hover:bg-lime-500">
        <unicon name="user-plus" height="35" width="35" fill="white" />
      </button>
    </div>
    <div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Email
                </th>
                <th scope="col" class="py-3 px-6">
                    Tel
                </th>
                <th scope="col" class="py-3 px-6">
                    Delete
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in usersList" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ user.Name }}
                </th>
                <td class="py-4 px-6">
                    {{ user.Email }}
                </td>
                <td class="py-4 px-6">
                    {{ user.Tel }}
                </td>
                <td class="py-4 px-6">
                  <button @click="deleteUser(user)">
                     <unicon name="trash-alt" height="35" width="35" fill="red" />
                  </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
  data(){
    return{
        usersList:[],
        Name:'',
        Email:'',
        Tel:'',
        url:'http://localhost:3000/users'
    }
  },
  mounted(){
    axios.get(this.url)
    .then(res=>{
      console.log(res)
      this.usersList=res.data || []
    })
  },
  methods:{
    sendData(){
      const userModel={
        Name:this.Name,
        Email:this.Email,
        Tel:this.Tel
      }
      axios.post(this.url,userModel)
      .then(res=>{
        console.log(res)
         this.Name=''
        this.Email=''
        this.Tel=''
        this.usersList.push(res.data)
      })
    },
    deleteUser(user){
      axios.delete(`${this.url}/${user.id}`)
      .then(res=>{
        console.log(res)
        this.usersList=this.usersList.filter(data=>data!==user)
      })
    },


  },
  computed:{
    checkBtn(){
      return this.Name.length>3 && this.Email.length>5 && this.Tel.length>3 ? false : true
    }
  }
}
</script>
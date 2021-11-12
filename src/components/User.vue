<template>
  <div class="user">
    <!-- user list -->
    <div class="user-list">
      <div class="user-search">
        <input type="text" v-model="search" placeholder="Search account..."/>
      </div>
      <div class="user-info" v-for = "(user,index) in filterUsers" :key = index @click="showUserDetail(user.picture.thumbnail,user.name.title,user.name.last,user.name.first,user.login.username,user.email,user.location.country,user.dob.age)">
        <img class="user-pic" :src=user.picture.thumbnail />
        <div class="user-data">
          <div class="name">{{user.name.title}}. {{user.name.last}} {{user.name.first}}</div>
          <div class="account">{{user.login.username}}</div>
          <div class="email">{{user.email}}</div>
        </div>
      </div>
    </div>
    <!-- popup detail -->
    <div id="app" class="modal-vue">
      <div class="overlay" v-if="showModal" @click="showModal = false"></div>
      <div class="modal" v-if="showModal">
        <button class="close" @click="showModal = false">Back</button>
        <div class="user-detail">
          <img class="pic" :src=userdetail[0].pic />
          <div class="name">FullName: {{userdetail[0].name}}</div>
          <div class="account">Username: {{userdetail[0].account}}</div>
          <div class="email">Email: {{userdetail[0].email}}</div>
          <div class="country">Age: {{userdetail[0].country}}</div>
          <div class="age">Country: {{userdetail[0].age}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {getUsers} from "./api/users.api"

interface UD {
    name: string,
    pic: string,
    account:string,
    email:string,
    country:string,
    age:number
}

@Component
export default class User extends Vue {

  private users: string[] = [];
  private search: string = "";
  private userdetail: Array<UD> = [];
  private showModal: boolean =false;
  
  // @Prop() private msg!: string;

  async mounted() {

    try{
          const [error, users] = await getUsers();
          this.users = users.results;
          
    }catch(error){
            return [error];
    }

  }

  get filterUsers(): Array<string> {
    
    return this.users.filter(user=>{
      return user.login.username.toLowerCase().includes(this.search.toLowerCase())
    });
  }

  public showUserDetail(pic:any,title:any,firstname:any,lastname:any,account:any,email:any,country:any,age:any){
      this.userdetail = [];
      let obj = {
        name: title+". "+firstname+" "+lastname,
        pic: pic,
        account:account,
        email:email,
        country:country,
        age:age
      }
      this.userdetail.push(obj);
      this.showModal = true
  }
}

</script>
<style lang="scss" scoped>
.user{
  display: flex;
  justify-content: center;
  background-color: black;
  height: 350vh;
  @media (max-width: 767px) {
    height: 310vh;
  }
  
  .user-list{
    width: 380px;
    .user-search {
      margin-top: 10px;
      input{
        height: 30px;
        width: 300px;
      }
    }
    .user-info{
      display: flex;
      margin-top: 30px;
      border: solid 1px grey;
      border-radius: 10px;
      padding: 10px;
      cursor: pointer;
      color: blueviolet;
      &:hover{
        background-color: #6e6e7a;
      }
      .user-pic{
        border-radius: 50%;
      }
      .user-data{
        text-align: left;
        margin-left: 30px;
        .name{
          font-weight: 700;
        }
        .account{
          color:greenyellow;
          text-decoration: underline;
        }
        .email{
          color: rgb(199, 194, 194);
        }
      }
    }
  }

  .modal-vue {
    .overlay {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
    }
    .modal {
      position: fixed;
      top: 25%;
      right: 25%;
      width: 25%;
      z-index: 9999;
      padding: 20px 30px;
      background-color: #fff;
      @media (max-width: 767px) {
        width: 70%;
        right: 10%;
      }


      .user-detail{
        text-align: left;
        .pic{
          width: 100px;
          margin-bottom: 10px;
        }
        .emial{
          color: blue;
          text-decoration: underline;
        }

      }

    }
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }

}

</style>

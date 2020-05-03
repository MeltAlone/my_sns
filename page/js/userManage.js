let user_list = Vue.component("user_list", {

    template: `
           <div class="content">
                <table border="0" >
                    <thead>
                        <tr>
                            <th>昵称</th>
                            <th>性别</th>
                            <th>电话</th>
                            <th>邮箱</th>
                            <th>地址</th>
                            <th>个性签名</th>
                            <th>编辑/删除</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in dataList" v-bind:key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.sex ? "男" : "女" }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.description }}</td>
                            <td>
                                <button class="btn del">删除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
       
            </div> 
    `,
    data(){
        return{
            dataList:[
                {
                    name:"小红",
                    sex:0,
                    phone: "13466223344",
                    email: "23541@qq.com",
                    address: "中国",
                    description: "hahaha"
                },
                {
                    name:"12",
                    sex:1,
                    phone: "12345678909",
                    email: "1234@qq.com",
                    address: "中国",
                    description: "hahaha"
                },
                {
                    name:"马大哈",
                    sex:1,
                    phone: "15660159156",
                    email: "1532998154@qq.com",
                    address: "中国",
                    description: "这个人很懒，没留下什么。"
                },
                {
                    name:"阿光",
                    sex:0,
                    phone: "17124211789",
                    email: "13234567@qq.com",
                    address: "中国",
                    description: "hahaha"
                },
                {
                    name:"admin_4343",
                    sex:1,
                    phone: "12345676543",
                    email: "1234@qq.com",
                    address: "中国",
                    description: "hahaha"
                },
                {
                    name:"老沈",
                    sex:1,
                    phone: "11223344556",
                    email: "1234@qq.com",
                    address: "中国",
                    description: "hahaha"
                }
            ]
        }
    },


    created(){
        // var xhr = new XMLHttpRequest();
        // xhr.open("get", "/queryAllUser", false);
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4 && xhr.status == 200) {
        //         console.log(JSON.parse(xhr.responseText).data);
        //         this.dataList = JSON.parse(xhr.responseText).data;
        //         console.log(this)
        //     }
        // }
        // xhr.send();


        axios({
            method: "get",
            url: "/queryAllUser"
        }).then(function(resp){
            user_list.dataList = resp.data.data;
            console.log(this);
            console.log(user_list.dataList);
        })
    }

})

let add_user = Vue.component("add_user", {
    data() {
        return {
            name: "",
            sex:1,
            phone: "",
            email: "",
            password: "",
            address: "",
            description: ""
        }
    },
    template:`
        <div class="content">
            <form id="addUserForm">
                <div>
                    <label for="name">昵称</label>
                    <input v-model="name" type="text" name="name">
                </div>
                <div class="sex">
                    <label for="sex">性别</label>
                    <input v-model="sex" type="radio" name="sex" value="0" checked>
                    <span>男</span>
                    <input v-model="sex" type="radio" name="sex" value="1">
                    <span>女</span>
                </div>
                <div>
                    <label for="phone">电话</label>
                    <input v-model="phone" type="text" name="phone">
                </div>
                <div>
                    <label for="email">邮箱</label>
                    <input v-model="email" type="text" name="email">
                </div>
                <div>
                    <label for="address">住址</label>
                    <input v-model="address" type="text" name="address">
                </div>
                <div>
                    <label for="description">个性签名</label>
                    <input v-model="description" type="text" name="description">
                </div>
                <div>
                    <label for=""></label>
                    <input v-on:click="sendUser()" type="submit" class="btn" id="add-submit" value="提交">
                    <input type="reset" class="btn" value="重置">
                </div>
            </form>
        </div>
    `,
    methods:{
        sendUser: function () {
            let password = this.password;
            let phone = this.phone;
            let name = this.name;
            let email = this.email;
            let address = this.address;
            let sex = this.sex;
            let description = this.description;


            return function () {

                if(!name || !phone || !email || !password){
                    alert("请输入完整")
                    return;
                }

                async function reg () {
                    var resp = await axios({
                        method: "post",
                        url: "/addUser",
                        data: {
                            name: name,
                            phone: phone,
                            email: email,
                            password: password,
                            address: address,
                            sex: sex,
                            description: description
                        }
                    });
                }
                reg();
            }
        }
    }

})

let routes = [
    {
        path: "/",
        component: user_list
    },
    {
        path: "/add-user",
        component: add_user
    }
]

let router = new VueRouter({
    routes,
    linkExactActiveClass: 'active',
})



const userManage = new Vue({
    data:{
        dataList: []
    },
    router
}).$mount("#app")














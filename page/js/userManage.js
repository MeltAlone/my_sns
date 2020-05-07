
const userManage = new Vue({
    el:"#app",
    data:{
        show: true,
        name: "",
        sex:1,
        phone: "",
        email: "",
        password: "",
        address: "",
        description: "",
        dataList:[]
    },
    methods:{
        changeToAdd(){
            this.show = false;
        },
        changeToList(){
            this.show = true;
        },
        removeThis(index, id){
            this.dataList.splice(index, 1);
            console.log(typeof id);
            axios({
                method: "get",
                url: "/deleteUserById?id=" + id,
            })
        },
        sendUser: function () {
            let password = this.password;
            let phone = this.phone;
            let name = this.name;
            let email = this.email;
            let address = this.address;
            let sex = this.sex;
            let description = this.description;


            if(!name || !phone || !email || !password){
                    alert("请输入完整")
                    return;
                }

            axios({
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
    },
    created(){
        axios({
            method: "get",
            url: "/queryAllUser"
        }).then(function(resp){
            userManage.dataList = resp.data.data;
            console.log(userManage.dataList);
        })
    }

})














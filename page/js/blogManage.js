var blogManage = new Vue({
    el: "#app",
    data: {
        blogList: []
    },
    methods: {
        removeThis(index, id) {
            this.blogList.splice(index, 1)
            axios({
                method: "get",
                url: "/deleteBlogById?id=" + id
            })
        },
    },
    created(){
        axios({
            method: "get",
            url: "/queryAllBlog"
        }).then(function(resp){
            blogManage.blogList = resp.data.data;
            console.log(resp.data.data);
        })
    }
})
var blogManage = new Vue({
    el: "#app",
    data: {
        blogList: [],
        commentList: [],
        isShow: true
    },
    methods: {
        removeThis(index, id) {
            this.blogList.splice(index, 1)
            axios({
                method: "get",
                url: "/deleteBlogById?id=" + id
            })
        },
        changeToCommentList(){
            this.isShow = false;
        },
        changeToBlogList(){
            this.isShow = true;
        }
    },
    created(){
        axios({
            method: "get",
            url: "/queryAllBlog"
        }).then(function(resp){
            blogManage.blogList = resp.data.data;
            console.log(resp.data.data);
        })
        axios({
            method: "get",
            url: "/queryAllComments"
        }).then(function(resp){
            blogManage.commentList = resp.data.data;
            console.log(resp.data.data);
        })
    }
})
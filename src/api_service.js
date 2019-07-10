import axios from 'axios'

const baseURL = 'http://localhost:5000/'

const api_service = {
    login_user(mail, pass){
        axios.get(baseURL+'user/'+mail+'/'+pass).then(({data})=>{
            if(data=='wrong password' || data=='User not found'){
                return false
            }
            else{
                 data.new_user = false
                 this.$cookie.set('squarenetLogin', JSON.stringify(data) , 5)
                 return true
            }
        })
    },

    register_user(email, pass, username){
        axios.post(baseURL+'user',{
            email: email,
            password: pass,
            name: username
        }).then(({data})=>{
            data.new_user = false
            this.$cookie.set('squarenetLogin', JSON.stringify(data) , 5)
            return data     
        })
    },

    login_log(user){
        axios.post(baseURL+'login',{
            user_id:user
        }).then()
    },

    get_posts(){
        return axios.get(baseURL+'posts')
    },

    get_profile_posts(user){
        return axios.get(baseURL+'profile_posts/'+user)
    },

    get_user_profile(user){
        return axios.get(baseURL+'user/profile/'+user)
    },

    update_user(user_data){
        axios.put(baseURL+'user', {
            id: user_data.id,
            name: user_data.name
        }).then()
    },

    update_profile(profile_data){
        axios.put(baseURL+'profile', {
            id: profile_data.id,
            gender: profile_data.gender,
            age: profile_data.age,
            description: profile_data.description
        }).then()
    },
    create_profile(user){
        axios.post(baseURL+'profile', {
            user_id: user
        }).then(({data})=>{
            return data
        })
    },
    update_apply_user(user, post){
        axios.put(baseURL+'posts', {
            post_id: post,
            apply_users: user
        }).then()
    },

    create_post(post_data){
        axios.post(baseURL+'posts', {
            title: post_data.title,
            body: post_data.description,
            time_posted: "",
            user_id: post_data.user_id,
            due_time: post_data.time,
            location: post_data.location,
            tag_id: post_data.tag,
            need_users: parseInt(post_data.people)
        }).then()
    },

    get_tags(){
        return axios.get(baseURL+'tags')
    },

    get_notifications(user){
        return axios.get(baseURL+'notification/user/'+user.id)
    },

    create_notification(notif){
        axios.post(baseURL+'notification', {
            time_created: "",
            from_user: notif.from_user,
            to_user: notif.to_user,
            post: notif.post_id, 
            notification_type: 'N'
        }).then()
    },

    profile_picture(gender){
        if(gender == 'M'){return require('./assets/profile_male.png')}
        else if(gender == 'F'){return require('./assets/profile_female.png')}
        else{return require('./assets/profile_neutral.png')}
    }
}

export default api_service
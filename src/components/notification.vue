<template>
    <div class="modal-notification">
        <div class="square"></div>
        <div class="body">
            <ul v-for="n in notify_data" :key="n.id">
                <li>
                    <table>
                        <tr>
                            <td><img :src="set_picture(n.from_user.gender)"/></td>
                            <td v-if="n.notification_type == 'N' || n.notification_type == 'O'">{{n.from_user.name}} has <b>applied</b> to your event</td>
                            <td v-if="n.notification_type == 'A'" >{{n.from_user.name}} has <b>accepted</b> your apply</td>
                            <td v-if="n.notification_type == 'D'">{{n.from_user.name}} has <b>declined</b> your apply</td>
                        </tr>
                        <tr v-if="n.notification_type == 'N'">
                            <td colspan="2" >
                                <button @click.prevent="accept_apply(n.to_user, n.from_user.id, n.posts, n.id)">Accept apply</button>
                                <button @click.prevent="accept_apply(n.to_user, n.from_user.id, n.posts, n.id)">Decline apply</button>
                            </td>
                        </tr>
                    </table>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'notify',
    props: ['user_id'],
    data(){
        return{
            notify_data: {},
            user_picture: null,
            user_name: null,
            user_data: {
                id: this.user_id.id,
                gender: this.user_id.profile.gender,
                name: this.user_id.name
            }
        }
    },
    beforeMount(){
        this.get_notifications()
    },
    methods:{
        get_notifications(){
            axios.get('http://localhost:5000/notification/user/'+String(this.user_id.id)).then(({data})=>{
                this.notify_data = data.data
            })
        },
        set_picture(g){
                if(g == 'M'){
                    return require('../assets/profile_male.png')
                }
                else if(g == 'F'){
                    return  require('../assets/profile_female.png')
                }
                else{
                    return require('../assets/profile_neutral.png')
                }
        },
        get_user_data(user_id, w){
            if(w == 'P'){
                axios.get('http://localhost:5000/user/profile/'+String(user_id.id)).then(({data})=>{
                    if(data.gender == 'M'){
                        this.user_picture = require('../assets/profile_male.png')
                    }
                    else if(data.gender == 'F'){
                        this.user_picture =  require('../assets/profile_female.png')
                    }
                    else{
                        this.user_picture = require('../assets/profile_neutral.png')
                    }
                })
            }
            else if(w == 'N'){
                axios.get('http://localhost:5000/user/'+String(user_id.id)).then(({data})=>{
                    this.user_name = String(data.name)
                })
            }
            
        },
        accept_apply(user_from, user_to, id_post, notif_id){
            axios.post('http://localhost:5000/notification', {
                time_created: "",
                from_user: this.user_data,
                to_user: user_to,
                post: id_post,
                notification_type: 'A'
            }).then(
                axios.put('http://localhost:5000/notification', {
                    id_notify: notif_id,
                    type: 'O'
                })
            )
        },
        decline_apply(user_from, user_to, id_post, notif_id){
            axios.post('http://localhost:5000/notification', {
                time_created: "",
                from_user: this.user_data,
                to_user: user_to,
                post: id_post,
                notification_type: 'D'
            }).then(
                axios.put('http://localhost:5000/notification', {
                    id_notify: notif_id,
                    type: 'O'
                })
            )
        }
    }
}
</script>

<style>
.modal-notification{
    display: inline-block;
    position: absolute;
    width: 350px;
    min-height: 80px;
    max-height: 380px !important;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.square{
    position: absolute;
    height: 25px;
    width: 25px;
    top: 0;
    right: 30px;
    transform: rotate(45deg);
    background-image: linear-gradient(145deg, rgb(114, 133, 134) 0%, rgb(19, 123, 134) 51%, rgb(17, 93, 121) 75%);
    z-index: -1;

}

.modal-notification .body{
    min-height: 80px;
    max-height: 350px !important;
    width: 100%;
    padding: 15px 0;
    margin: 0;
    margin-top: 10px;
    background-image: linear-gradient(141deg, rgb(114, 133, 134) 0%, rgb(19, 123, 134) 51%, rgb(17, 93, 121) 75%);
    border-radius: 13px;
    overflow: auto;
}
.modal-notification .body ul{
    width: 300px;
    margin: auto;
    list-style: none;
    padding: 0;
    background: none;
}
.modal-notification .body ul li{
    color: #ffffff;
    margin:0;
    border-bottom: 1px solid #ffffff;
}
.modal-notification .body ul img{
    height: 55px;
    vertical-align: middle;
}
.modal-notification .body ul button{
    height: 28px;
    width: 110px;
    background: none;
    border: 1px solid #ffffff;
    border-radius: 14px;
    color: #ffffff;
    margin: 2px 5px;
    vertical-align: middle;
}
.modal-notification .body ul button:hover{
    cursor: pointer;
}
.modal-notification .body ul table{
    width: 100%;
}
.modal-notification .body ul table tr:nth-child(2){
    text-align: center;
}
</style>

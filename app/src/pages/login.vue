<template>
    <div>
        <h1>login</h1>
        <label for="">email</label><input type="text" v-model="emailLogin">
        <label for="">password</label><input type="password" v-model="pwdLogin">
        <button @click="login">login</button>
        <h2>signup</h2>
        <label for="">email</label><input type="text" v-model="email">
        <label for="">password</label><input type="password" v-model="pwd">
        <button @click="signup">signup</button>
    </div>
</template>
<script>
export default{
    data(){
        return{
            email:'',
            pwd:'',
            emailLogin:'',
            pwdLogin:''
        }
    },
    methods:{
        login(){
            firebase.auth().signInWithEmailAndPassword(this.emailLogin, this.pwdLogin).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            }).then(function(){
                firebase.auth().onAuthStateChanged(function(user) {
                    var userObject = firebase.auth().currentUser;
                    if (userObject) {
                        localStorage.mapUid = userObject.uid;
                        window.location.assign('/map');
                    } else {
                        alert('error occur');
                    }
                });
            });
        },
        signup(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.pwd).then((user) => {
                this.sendEmail();
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
        },
        sendEmail(){
            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function() {
                alert('email sent');
            }, function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
        }
    }
}
</script>
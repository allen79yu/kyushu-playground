<template>
    <div>
        <ul>
            <li v-for="(pin, key) in modifyArray"><span>{{pin.description}}</span> <button @click="removePin(pin.id)">delete</button></li>
        </ul>
    </div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    watch:{
        modifyArray(val){
            this.modifyArray = val;
        }
    },
    props:['modifyArray'],
    methods:{
        removePin(key){
            swal({
            title: "Are you sure?",
            text: "將會移除這個地點",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "刪除",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            (isConfirm) => {
                if (isConfirm) {
                    firebase.database().ref('/member_pins/'+ localStorage.mapUid +'/'+key).remove();
                    swal("Deleted!", "這個地點已被移除", "success");
                } else {
                    swal("Cancelled", "移除動作取消", "error");
                }
            });
        }
    }
}
</script>
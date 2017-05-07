<template>
    <div>
        <ul>
            <li v-for="(pin, index) in modifyArray"><span>{{pin.description}}</span> <button @click="removePin(pin.id, index)">delete</button></li>
        </ul>
    </div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    props:['modifyArray'],
    methods:{
        removePin(key, index){
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
                    this.$parent.modifyArray[index].setMap(null);
                    swal("Deleted!", "這個地點已被移除", "success");
                } else {
                    swal("Cancelled", "移除動作取消", "error");
                }
            });
        }
    }
}
</script>
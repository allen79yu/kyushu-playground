<template>
    <div>
        <button @click="changeMode">Edit</button>
        <br>
        <ul>
            <li v-for="(pin, index) in modifyArray">
                <span v-if="!editMode">{{pin.description}}</span>
                <input type="text" :id="pin.id + '_des'" :value="pin.description" v-if="editMode">
                <button @click="editPin(pin.id, index)" v-if="editMode">ok</button>
                <button @click="removePin(pin.id, index)">delete</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default{
    data(){
        return{
            editMode:false
        }
    },
    props:['modifyArray'],
    methods:{
        changeMode(){
            this.editMode = !this.editMode;
        },
        editPin(key, index){
            var pin = document.getElementById(key + '_des');
            firebase.database().ref('/member_pins/'+ localStorage.mapUid +'/'+key).update({
                description:pin.value
            });
            this.$parent.infos[index].setContent(pin.value);
            this.$parent.markers[index].description = pin.value;
            this.editMode = !this.editMode;
        },
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
                    this.$parent.markers.splice(index, 1);
                    swal("Deleted!", "這個地點已被移除", "success");
                } else {
                    swal("Cancelled", "移除動作取消", "error");
                }
            });
        }
    }
}
</script>
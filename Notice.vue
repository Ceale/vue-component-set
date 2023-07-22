<style scoped>
.notice-move, .notice-enter-active, .notice-leave-active {
    transition: all 500ms ease;
}
.notice-enter-from {
    opacity: 0;
    transform: translateX(100%);
}
.notice-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
.notice-leave-active {
    position: absolute;
}

.notice {
    position: fixed;
    top: 0;
    right: 0;
    width: 220px;
    padding-top: 20px;
    padding-right: 15px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    user-select:none;    
    -ms-user-select:none;
    -moz-user-select:none;
    -webkit-user-select:none;
}

.notice .item {
    max-width: 220px;
    margin-top: 10px;
    border-radius: 1px;
    padding: 15px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.notice .item.success {
    background: rgb(150 229 89);
}
.notice .item.failed {
    background: rgb(229, 122, 89);
}

.notice .item h1 {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
}

.notice .item p {
    margin-top: 5px;
    font-size: 12px;
}
</style>


<template>
    <div class="notice">
        <TransitionGroup name="notice">
            <div v-for="item in notice" :key="item" class="item" :class="item.type">
                <h1>{{ item.title }}</h1>
                <p v-if="item.description != undefined && item.description != ''">{{ item.description }}</p>
            </div>
        </TransitionGroup>
    </div>
</template>


<script setup>const notice = ref([])
let id = 1

function add(type, title, description, time) {
    if (time == undefined) time = 4.5
    const selfid = id
    
    notice.value.push({
        type: type,
        title: title,
        description: description,
        id: selfid,
        // color: color
    })
    setTimeout(()=>{
        notice.value.splice(notice.value.findIndex(item => item.id === selfid),1)
    }, time * 1000)

    id += 1
    return selfid
}


function remove(id) {
    notice.value.splice(notice.value.findIndex(item => item.id === id),1)
}
defineExpose({ add, remove })
</script>
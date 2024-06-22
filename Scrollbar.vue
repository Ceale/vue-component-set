<script lang="ts" setup>
import { onMounted } from "vue"

const body = document.body

const scrollbar = document.createElement("div")
scrollbar.classList.add("scrollbar")

const thumb = document.createElement("div")
thumb.classList.add("thumb")
thumb.addEventListener("mousedown", mousedown)

scrollbar.appendChild(thumb)
body.appendChild(scrollbar)

window.addEventListener("resize", updateScrollbar)

let scrollTimer: number
window.addEventListener("scroll", () => {
    updateScrollbar()

    thumb.classList.add("scroll")
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
        thumb.classList.remove("scroll")
    }, 700)
})

onMounted(() => {
    updateScrollbar()
})

function updateScrollbar() {

    // 当前窗口可视高度
    const windowHeight = window.innerHeight
    // 文档总高度
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    // 当前滚动位置
    const scrollTop = document.documentElement.scrollTop
    
    const thumbHeight = Math.min(100, Math.max(5, (windowHeight / documentHeight * 100)))
    const thumbTop = Math.min(100, Math.max(0, (scrollTop / documentHeight * 100)))

    thumb.style.height = thumbHeight + "%"
    thumb.style.top = thumbTop + "%"
}

function mousedown() {
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', stopDrag)
}

function handleDrag(event) {
    window.scrollBy({
        top: event.movementY / scrollbar.offsetHeight * document.documentElement.scrollHeight,
        left: 0,
        behavior: "instant",
    })
    updateScrollbar()
    event.preventDefault()
}

function stopDrag() {
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
}
</script>

<style>
body > .scrollbar {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    padding: max(1vh, 10px) max(0.5vw, 5px);
    box-sizing: content-box;
    width: max(0.4vw, 4px);
    z-index: 10;
}

body > .scrollbar .thumb {
    position: relative;
    border-radius: max(0.25vw, 2px);
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 200ms ease, height 300ms ease;
    cursor: pointer;
    backdrop-filter: blur(10px);
}

body > .scrollbar:hover .thumb, body > .scrollbar .thumb.scroll {
    opacity: 1;
}
</style>

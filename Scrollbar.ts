export default function init() {

const body = document.body

const scrollbar = document.createElement("div")
scrollbar.classList.add("scrollbar")

const thumb = document.createElement("div")
thumb.classList.add("thumb")
thumb.addEventListener("mousedown", mousedown)
thumb.addEventListener("touchstart", touchstart)

scrollbar.appendChild(thumb)
if (!isAppleSystem()) {
    body.appendChild(scrollbar)
}

window.addEventListener("resize", updateScrollbar)

let scrollTimer: number
window.addEventListener("scroll", () => {
    updateScrollbar()

    thumb.classList.add("scroll")
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
        thumb.classList.remove("scroll")
    }, 500)
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

let mouseStartClientY: number

function mousedown(event) {
    event.preventDefault()
    mouseStartClientY = event.clientY
    document.addEventListener("mousemove", mousemove)
    document.addEventListener("mouseup", mouseup)
    thumb.classList.add("action")
}


function mousemove(event) {
    const delta = event.clientY - mouseStartClientY
    mouseStartClientY = event.clientY
    window.scrollBy({
        top: delta / scrollbar.offsetHeight * document.documentElement.scrollHeight,
        left: 0,
        behavior: "instant",
    })
    updateScrollbar()
}

function mouseup() {
    document.removeEventListener("mousemove", mousemove)
    document.removeEventListener("mouseup", mouseup)
    setTimeout(() => {
        thumb.classList.remove("action")
    }, 500)
}

let touchStartClientY: number

function touchstart(event) {
    touchStartClientY = event.touches[0].clientY
    document.addEventListener("touchmove", touchmove)
    document.addEventListener("touchend", touchend)
    thumb.classList.add("action")
}

function touchmove(event) {
    const delta = event.touches[0].clientY - touchStartClientY
    touchStartClientY = event.touches[0].clientY
    window.scrollBy({
        top: delta / scrollbar.offsetHeight * document.documentElement.scrollHeight,
        left: 0,
        behavior: "instant",
    })
    updateScrollbar()
}

function touchend() {
    document.removeEventListener("touchmove", touchmove)
    document.removeEventListener("touchend", touchend)
    setTimeout(() => {
        thumb.classList.remove("action")
    }, 500)
}

const style  = document.createElement("style")
style.textContent = 
`
body > .scrollbar {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    padding: max(1vh, 10px) max(0.5vw, 5px);
    box-sizing: content-box;
    width: max(0.4vw, 4px);
    z-index: 1000;
}

body > .scrollbar .thumb {
    touch-action: none;
    position: relative;
    border-radius: max(0.25vw, 2px);
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 200ms ease;
    cursor: pointer;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

body > .scrollbar:hover .thumb, body > .scrollbar .thumb.scroll, body > .scrollbar .thumb.action {
    opacity: 1;
}
`
document.head.appendChild(style)

function isAppleSystem(): boolean {
	const userAgent = window.navigator.userAgent;
	const platform = window.navigator?.userAgentData?.platform || window.navigator.platform;
	const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
	const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
	const iosPlatforms = ["iPhone", "iPad", "iPod"];

	if (macosPlatforms.includes(platform)) {
		// os = "Mac OS";
        return true;
	} else if (iosPlatforms.includes(platform)) {
		// os = "iOS";
        return true;
	} else if (windowsPlatforms.includes(platform)) {
		// os = "Windows";
        return false;
	} else if (/Android/.test(userAgent)) {
		// os = "Android";
        return false;
	} else if (/Linux/.test(platform)) {
		// os = "Linux";
        return false;
	} else {
        return false;
    }
}


}

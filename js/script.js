const submitButton = document.querySelector("#confirm");

function updateValueBasic(start, des) {
    if (start.value === "") {
        des.innerHTML = start.getAttribute('data-empty');
        return;
    }
    des.innerHTML = start.value;
}

function updateValueCardNumber(start, des) {
    if (start.value === "") {
        des.innerHTML = start.getAttribute('data-empty');
        return;
    }
    var result = "";
    var source = start.value.replace(/\s/g, '');
    for (var i = 0; i < source.length; i++) {
        if (i % 4 == 0 && i != 0) {
            result += " ";
        }
        result += source[i];
    }
    des.innerHTML = result;
    start.value = result;
}

function onlyNumber(start) {
    start.value = start.value.replace(/[^0-9]/g, "");
}

function getErrorTag(item) {
    do {
        if (item.classList.contains("error")) {
            return item;
        } else {
            item = item.nextElementSibling;
        }
    } while (item != null);
    return null;
}

const nonblank = document.querySelectorAll(".nonblank");
nonblank.forEach(item => {
    item.addEventListener('blur', () => {
        if (item.value === "") {
            item.classList.add("active");
            getErrorTag(item).innerHTML = "Can't be blank";
            getErrorTag(item).classList.add("active");

        } else {
            item.classList.remove("active");
            getErrorTag(item).classList.remove("active");
        }
    })
})

const onlynumbers = document.querySelectorAll(".onlynumbers");
const reg = new RegExp(/^[0-9 ]+$/);
onlynumbers.forEach(item => {
    item.addEventListener('blur', () => {
        if (item.value != "") {
            if (!reg.test(item.value)) {
                item.classList.add("active");
                getErrorTag(item).innerHTML = "Wrong format. Numbers only.";
                getErrorTag(item).classList.add("active");
            } else {
                item.classList.remove("active");
                getErrorTag(item).classList.remove("active");
            }
        }
    })
})

document.querySelectorAll(".fullnumber").forEach(item => {
    item.addEventListener('blur', () => {
        if(item.value.length < 2 && item.value.length > 0) {
            item.value = "0" + item.value;
        }
    })
})

submitButton.addEventListener('click', () => {
    if(document.querySelectorAll(".error.active").length == 0) {
        document.querySelector("section.inputs").classList.add("disabled");
        document.querySelector("section.complete").classList.add("active");
    }
})

